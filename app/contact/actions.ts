"use server";

import { headers } from "next/headers";
import { saveSubmission } from "@/lib/db/submissions";
import { checkRateLimit } from "@/lib/auth/rateLimit";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form fields
  const name        = ((formData.get("name")        as string) ?? "").trim();
  const email       = ((formData.get("email")       as string) ?? "").trim();
  const projectType = ((formData.get("projectType") as string) ?? "").trim();
  const budget      = ((formData.get("budget")      as string) ?? "").trim();
  const message     = ((formData.get("message")     as string) ?? "").trim();

  // M-1: IP-based rate limiting — max 3 submissions per hour
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  const { allowed } = checkRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return {
      status: "error",
      message: "Too many submissions from your network. Please try again later.",
    };
  }

  // Basic presence validation
  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  // M-2: Length limits to prevent payload stuffing / DB abuse
  if (name.length > 100) {
    return { status: "error", message: "Name is too long (max 100 characters)." };
  }
  if (email.length > 254) {
    return { status: "error", message: "Email address is too long." };
  }
  if (projectType.length > 100) {
    return { status: "error", message: "Project type is too long (max 100 characters)." };
  }
  if (budget.length > 100) {
    return { status: "error", message: "Budget field is too long (max 100 characters)." };
  }
  if (message.length > 5000) {
    return {
      status: "error",
      message: `Message is too long (${message.length}/5000 characters).`,
    };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Save to database — always, regardless of email success — appears in admin inbox
  try {
    await saveSubmission({
      name,
      email,
      projectType: projectType || undefined,
      budget:      budget || undefined,
      message,
    });
  } catch (dbErr) {
    console.error("DB save error:", dbErr);
    // Don't block the user experience — proceed to email attempt
  }

  // --- SEND EMAIL VIA RESEND ---
  const apiKey    = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT ?? "hello@functional.studio";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:     "Functional Enterprises <onboarding@resend.dev>",
          to:       [recipient],
          reply_to: email,
          subject:  `New enquiry from ${name} — ${projectType || "General"}`,
          text: `
Name:         ${name}
Email:        ${email}
Project Type: ${projectType || "Not specified"}
Budget:       ${budget || "Not specified"}

Message:
${message}
          `.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
      }
    } catch (err) {
      console.error("Network error sending email:", err);
    }
  } else {
    console.log("[Contact Form] No RESEND_API_KEY set — saved to DB only.");
  }

  return {
    status: "success",
    message: "Thank you! We'll be in touch within 1 business day.",
  };
}
