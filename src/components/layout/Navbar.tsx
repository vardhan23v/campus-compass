// src/components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Compass,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Heart,
  GitCompareArrows,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCompareStore } from "@/store/useCompareStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const compareCount = useCompareStore((s) => s.colleges.length);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-[var(--shadow-color)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
          >
            <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text hidden sm:block">CampusCompass</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                )}
              >
                {link.label}
                {link.href === "/compare" && compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {compareCount}
                  </span>
                )}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : mounted ? (
                <Moon className="h-[18px] w-[18px]" />
              ) : null}
            </button>

            {session ? (
              <>
                <Link
                  href="/saved"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--danger)]"
                  aria-label="Saved colleges"
                >
                  <Heart className="h-[18px] w-[18px]" />
                </Link>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-white text-sm font-semibold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--danger)]"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="gradient-bg rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] md:hidden hover:bg-[var(--bg-tertiary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="glass border-t border-[var(--border)] md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                )}
              >
                {link.href === "/" && <GraduationCap className="h-4 w-4" />}
                {link.href === "/colleges" && <Compass className="h-4 w-4" />}
                {link.href === "/compare" && (
                  <GitCompareArrows className="h-4 w-4" />
                )}
                {link.label}
                {link.href === "/compare" && compareCount > 0 && (
                  <span className="ml-auto rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">
                    {compareCount}
                  </span>
                )}
              </Link>
            ))}

            {session ? (
              <>
                <Link
                  href="/saved"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                >
                  <Heart className="h-4 w-4" />
                  Saved Colleges
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--danger)] hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-lg border border-[var(--border)] py-2.5 text-center text-sm font-medium text-[var(--text-secondary)]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 gradient-bg rounded-lg py-2.5 text-center text-sm font-medium text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
