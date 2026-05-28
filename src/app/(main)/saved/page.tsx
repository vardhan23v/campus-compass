// src/app/(main)/saved/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import CollegeCard from "@/components/college/CollegeCard";
import { useSavedColleges } from "@/hooks/useSavedColleges";
import { useEffect } from "react";

export default function SavedCollegesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const { data: savedColleges, isLoading, isError } = useSavedColleges();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/saved");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8 skeleton h-10 w-64 rounded-xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-[420px] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-500">
        Failed to load saved colleges. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Saved Colleges</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Your personal shortlist of {savedColleges?.length || 0} colleges
          </p>
        </div>
      </div>

      {!savedColleges?.length ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
            <Search className="h-10 w-10 text-[var(--text-muted)]" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">No saved colleges yet</h3>
          <p className="mb-8 max-w-md text-[var(--text-secondary)] leading-relaxed">
            Keep track of the colleges you're interested in by clicking the heart icon on any college card.
          </p>
          <Link
            href="/colleges"
            className="rounded-xl bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--primary-dark)] hover:scale-105"
          >
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedColleges.map((college, i) => (
            <CollegeCard key={college.id} college={college} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
