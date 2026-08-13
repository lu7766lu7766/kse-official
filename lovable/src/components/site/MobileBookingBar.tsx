import { Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

export function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <Link
        to="/faq"
        hash="booking"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary text-base font-bold text-primary-foreground"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        立即預約
      </Link>
    </div>
  );
}
