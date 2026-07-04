"use server";

import { saveSubmission } from "@/lib/db/submissions";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("projectType") as string;
  const budget = formData.get("budget") as string;
  const message = formData.get("message") as string;

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Build email body
  const body = JSON.stringify({
    name,
    email,
    projectType: projectType || "Not specified",
    budget: budget || "Not specified",
    message,
    submittedAt: new Date().toISOString(),
  });

  // Save to database (always, regardless of email send) — appears in admin inbox
  try {
    await saveSubmission({ name, email, projectType: projectType || undefined, budget: budget || undefined, message });
  } catch (dbErr) {
    console.error("DB save error:", dbErr);
    // Don't block — proceed to email attempt and still show success
  }

  // --- SEND EMAIL VIA RESEND ---
  // To activate: set RESEND_API_KEY + CONTACT_RECIPIENT in .env.local
  // Docs: https://resend.com/docs/send-email
  const apiKey = process.env.RESEND_API_KEY;
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
          from: "Functional Enterprises <onboarding@resend.dev>",
          to: [recipient],
          reply_to: email,
          subject: `New enquiry from ${name} — ${projectType || "General"}`,
          text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}

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
    console.log("[Contact Form — No RESEND_API_KEY set, saved to DB only]");
  }

  return {
    status: "success",
    message: "Thank you! We'll be in touch within 1 business day.",
  };
}
