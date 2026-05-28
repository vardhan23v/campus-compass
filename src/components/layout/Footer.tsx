// src/components/layout/Footer.tsx
import Link from "next/link";
import { Compass, Globe, MessageCircle, Share2, Mail } from "lucide-react";

const footerLinks = {
  Platform: [
    { href: "/colleges", label: "Browse Colleges" },
    { href: "/compare", label: "Compare Colleges" },
    { href: "/saved", label: "Saved Colleges" },
  ],
  Resources: [
    { href: "#", label: "Blog" },
    { href: "#", label: "Career Guide" },
    { href: "#", label: "Admission Tips" },
  ],
  Company: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* Gradient accent line */}
      <div className="h-1 gradient-bg-accent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <div className="gradient-bg flex h-8 w-8 items-center justify-center rounded-xl">
                <Compass className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">CampusCompass</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              India&apos;s premier college discovery platform. Find, compare, and
              choose the perfect college for your future.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} CampusCompass. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Built with ❤️ for students across India
          </p>
        </div>
      </div>
    </footer>
  );
}
