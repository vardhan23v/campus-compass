// src/app/(main)/compare/page.tsx
"use client";

import { useCompareStore } from "@/store/useCompareStore";
import { formatCurrency, formatRating, parseCSV } from "@/lib/utils";
import Link from "next/link";
import { 
  GitCompareArrows, X, Plus, MapPin, IndianRupee, 
  TrendingUp, Star, Building2, Calendar, CheckCircle2 
} from "lucide-react";

export default function ComparePage() {
  const { colleges, removeCollege, clearAll } = useCompareStore();

  const renderEmptySlot = () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center h-[300px]">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
        <Plus className="h-8 w-8 text-[var(--text-muted)]" />
      </div>
      <h3 className="mb-2 text-lg font-bold">Add College</h3>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        Select another college to compare side by side
      </p>
      <Link
        href="/colleges"
        className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
      >
        Browse Colleges
      </Link>
    </div>
  );

  if (colleges.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center pt-16">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
          <GitCompareArrows className="h-12 w-12 text-[var(--text-muted)]" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Compare Colleges</h1>
        <p className="mb-8 max-w-md text-lg text-[var(--text-secondary)]">
          Add up to 3 colleges side-by-side to compare fees, placements, rankings, and facilities.
        </p>
        <Link
          href="/colleges"
          className="gradient-bg rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-[var(--primary)]/30 hover:scale-105"
        >
          Start Exploring
        </Link>
      </div>
    );
  }

  const allFacilities = Array.from(
    new Set(
      colleges.flatMap((c) => parseCSV(c.facilities))
    )
  ).sort();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Compare Colleges</h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Detailed side-by-side comparison of your selected colleges.
          </p>
        </div>
        <button
          onClick={clearAll}
          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20 w-fit"
        >
          <X className="h-4 w-4" />
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px] space-y-8">
          
          {/* Header Row: Basic Info & Image */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 flex flex-col justify-end">
              <h3 className="text-lg font-bold text-[var(--text-muted)] uppercase tracking-wider">Overview</h3>
            </div>
            {colleges.map((college) => (
              <div key={college.id} className="relative glass rounded-2xl p-4 overflow-hidden">
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-500"
                  title="Remove from comparison"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl mb-4">
                  <img src={college.image} alt={college.name} className="h-full w-full object-cover" />
                </div>
                <Link href={`/college/${college.id}`}>
                  <h3 className="text-xl font-bold hover:text-[var(--primary)] transition-colors line-clamp-2 mb-2">
                    {college.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <MapPin className="h-4 w-4 text-[var(--primary)]" />
                  <span className="truncate">{college.location}</span>
                </div>
              </div>
            ))}
            {Array.from({ length: 3 - colleges.length }).map((_, i) => (
              <div key={`empty-${i}`}>{renderEmptySlot()}</div>
            ))}
          </div>

          {/* Comparison Sections */}
          <div className="glass rounded-3xl overflow-hidden border border-[var(--border)]">
            
            {/* Key Stats Row */}
            <div className="grid grid-cols-4 border-b border-[var(--border)]">
              <div className="p-6 bg-[var(--bg-tertiary)] flex items-center gap-2 font-semibold text-[var(--text-secondary)]">
                <Star className="h-5 w-5" /> Rating & Reviews
              </div>
              {colleges.map(c => (
                <div key={c.id} className="p-6 border-l border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{formatRating(c.rating)}</span>
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">{c.totalReviews} student reviews</div>
                </div>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <div key={`empty-rating-${i}`} className="border-l border-[var(--border)] bg-[var(--bg-secondary)]/50" />
              ))}
            </div>

            {/* Institution Row */}
            <div className="grid grid-cols-4 border-b border-[var(--border)]">
              <div className="p-6 bg-[var(--bg-tertiary)] flex items-center gap-2 font-semibold text-[var(--text-secondary)]">
                <Building2 className="h-5 w-5" /> Institution Details
              </div>
              {colleges.map(c => (
                <div key={c.id} className="p-6 border-l border-[var(--border)] space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Type:</span>
                    <span className="font-semibold">{c.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Established:</span>
                    <span className="font-semibold">{c.established || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Ranking:</span>
                    <span className="font-semibold">{c.ranking ? `#${c.ranking}` : "N/A"}</span>
                  </div>
                </div>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <div key={`empty-inst-${i}`} className="border-l border-[var(--border)] bg-[var(--bg-secondary)]/50" />
              ))}
            </div>

            {/* Fees Row */}
            <div className="grid grid-cols-4 border-b border-[var(--border)]">
              <div className="p-6 bg-[var(--bg-tertiary)] flex items-center gap-2 font-semibold text-[var(--text-secondary)]">
                <IndianRupee className="h-5 w-5" /> Fees (per year)
              </div>
              {colleges.map(c => (
                <div key={c.id} className="p-6 border-l border-[var(--border)]">
                  <div className="text-lg font-bold text-[var(--primary)]">
                    {formatCurrency(c.feesMin)} - {formatCurrency(c.feesMax)}
                  </div>
                </div>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <div key={`empty-fees-${i}`} className="border-l border-[var(--border)] bg-[var(--bg-secondary)]/50" />
              ))}
            </div>

            {/* Placements Row */}
            <div className="grid grid-cols-4 border-b border-[var(--border)]">
              <div className="p-6 bg-[var(--bg-tertiary)] flex items-center gap-2 font-semibold text-[var(--text-secondary)]">
                <TrendingUp className="h-5 w-5" /> Placement Stats
              </div>
              {colleges.map(c => (
                <div key={c.id} className="p-6 border-l border-[var(--border)] space-y-4">
                  <div>
                    <div className="text-sm text-[var(--text-muted)]">Placement Rate</div>
                    <div className="text-lg font-semibold text-emerald-500">
                      {c.placementRate ? `${c.placementRate}%` : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-muted)]">Highest Package</div>
                    <div className="text-base font-semibold">
                      {c.highestPackage ? formatCurrency(c.highestPackage) : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-muted)]">Average Package</div>
                    <div className="text-base font-semibold">
                      {c.avgPackage ? formatCurrency(c.avgPackage) : "N/A"}
                    </div>
                  </div>
                </div>
              ))}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <div key={`empty-placement-${i}`} className="border-l border-[var(--border)] bg-[var(--bg-secondary)]/50" />
              ))}
            </div>

            {/* Facilities Row */}
            <div className="grid grid-cols-4">
              <div className="p-6 bg-[var(--bg-tertiary)] flex items-start gap-2 font-semibold text-[var(--text-secondary)]">
                <CheckCircle2 className="h-5 w-5 shrink-0" /> Facilities
              </div>
              {colleges.map(c => {
                const cFacilities = parseCSV(c.facilities);
                return (
                  <div key={c.id} className="p-6 border-l border-[var(--border)] space-y-3">
                    {allFacilities.map(f => {
                      const hasFacility = cFacilities.includes(f);
                      return (
                        <div key={f} className="flex items-center gap-2 text-sm">
                          {hasFacility ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                          )}
                          <span className={hasFacility ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
                            {f}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {Array.from({ length: 3 - colleges.length }).map((_, i) => (
                <div key={`empty-facility-${i}`} className="border-l border-[var(--border)] bg-[var(--bg-secondary)]/50" />
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
