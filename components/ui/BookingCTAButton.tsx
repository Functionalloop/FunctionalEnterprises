"use client";

import Button, { type ButtonProps } from "@/components/ui/Button";
import { useBooking } from "@/lib/context/BookingContext";

export default function BookingCTAButton({
  children = "Start a project",
  ...props
}: Omit<ButtonProps, "href" | "onClick">) {
  const { openDrawer } = useBooking();

  return (
    <Button
      onClick={() => openDrawer()}
      {...props}
    >
      {children}
    </Button>
  );
}
