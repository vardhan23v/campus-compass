// src/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Star,
  Sparkles,
} from "lucide-react";
import CollegeCard from "@/components/college/CollegeCard";
import { useColleges } from "@/hooks/useColleges";

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: trendingData } = useColleges({
    limit: 6,
    page: 1,
  });

  const { data: featuredData } = useColleges({
    limit: 6,
    page: 1,
  });

  const trendingColleges =
    trendingData?.colleges?.filter((c) => c.isTrending).slice(0, 6) ?? [];
  const featuredColleges =
    featuredData?.colleges?.filter((c) => c.isFeatured).slice(0, 6) ?? [];

  // Combine and deduplicate for display
  const allColleges = trendingData?.colleges ?? [];
  const displayTrending = trendingColleges.length > 0 ? trendingColleges : allColleges.slice(0, 4);
  const displayFeatured = featuredColleges.length > 0 ? featuredColleges : allColleges.slice(2, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[var(--bg-primary)]" />
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[96px]" />
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]">
                Discover 30+ Top Colleges Across India
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="text-[var(--text-primary)]">Find Your </span>
              <span className="gradient-text">Perfect</span>
              <br />
              <span className="text-[var(--text-primary)]">College Match</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed sm:text-xl">
              Search, compare, and discover the best colleges in India. Make an
              informed decision about your future with CampusCompass.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="mx-auto mb-12 max-w-2xl"
            >
              <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3 shadow-xl shadow-[var(--shadow-color)] transition-shadow focus-within:shadow-indigo-500/10 focus-within:border-[var(--primary)]">
                <Search className="h-5 w-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search colleges, cities, or courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-base"
                />
                <button
                  type="submit"
                  className="gradient-bg rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { icon: Building2, value: 30, suffix: "+", label: "Colleges" },
                { icon: BookOpen, value: 120, suffix: "+", label: "Courses" },
                { icon: Users, value: 50000, suffix: "+", label: "Students" },
                { icon: Star, value: 4.5, suffix: "★", label: "Avg Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-[var(--primary)]" />
                  <div className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                    {stat.value < 10 ? (
                      <>
                        {stat.value}
                        {stat.suffix}
                      </>
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trending Colleges ────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                <TrendingUp className="h-4 w-4" />
                TRENDING NOW
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
                Popular Colleges
              </h2>
            </div>
            <Link
              href="/colleges"
              className="hidden items-center gap-1 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)] sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayTrending.length > 0
              ? displayTrending.slice(0, 3).map((college, i) => (
                  <CollegeCard key={college.id} college={college} index={i} />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton h-[420px] rounded-2xl" />
                ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)]"
            >
              View All Colleges
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Colleges ────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                <GraduationCap className="h-4 w-4" />
                HANDPICKED FOR YOU
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
                Featured Colleges
              </h2>
            </div>
            <Link
              href="/colleges"
              className="hidden items-center gap-1 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)] sm:flex"
            >
              Explore All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayFeatured.length > 0
              ? displayFeatured.slice(0, 6).map((college, i) => (
                  <CollegeCard key={college.id} college={college} index={i} />
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton h-[420px] rounded-2xl" />
                ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-bg relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/10" />

            <h2 className="relative mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Find Your Dream College?
            </h2>
            <p className="relative mb-8 mx-auto max-w-xl text-lg text-white/80">
              Join thousands of students who&apos;ve found their perfect match using
              CampusCompass. Start your journey today.
            </p>
            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/colleges"
                className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-xl transition-all hover:bg-white/90 hover:shadow-2xl"
              >
                Browse Colleges
              </Link>
              <Link
                href="/signup"
                className="rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
