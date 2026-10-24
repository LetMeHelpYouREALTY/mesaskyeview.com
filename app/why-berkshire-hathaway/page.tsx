import { permanentRedirect } from "next/navigation";

// Brokerage name appears only in the site footer; this legacy route now points to the About page.
export default function WhyBerkshireHathawayPage() {
  permanentRedirect("/about");
}
