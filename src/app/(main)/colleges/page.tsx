// src/app/(main)/colleges/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import CollegeCard from "@/components/college/CollegeCard";
import { useColleges } from "@/hooks/useColleges";
import { debounce } from "@/lib/utils";

function CollegesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0);
  const [maxFees, setMaxFees] = useState(Number(searchParams.get("maxFees")) || 5000000);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 9;

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data, isLoading, isError } = useColleges({
    search: searchParams.get("search") || undefined,
    location: searchParams.get("location") || undefined,
    type: searchParams.get("type") || undefined,
    minRating: Number(searchParams.get("minRating")) || undefined,
    maxFees: Number(searchParams.get("maxFees")) || undefined,
    page,
    limit,
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (minRating > 0) params.set("minRating", minRating.toString());
    if (maxFees < 5000000) params.set("maxFees", maxFees.toString());
    params.set("page", "1");
    setPage(1);
    router.push(`/colleges?${params.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setType("");
    setMinRating(0);
    setMaxFees(5000000);
    setPage(1);
    router.push("/colleges");
    setIsMobileFiltersOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/colleges?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Explore Colleges</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {data?.total ? `${data.total} colleges found` : "Find your perfect match"}
          </p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium sm:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside
          className={`fixed inset-0 z-50 transform bg-[var(--bg-primary)] transition-transform lg:static lg:block lg:w-72 lg:flex-shrink-0 lg:translate-x-0 ${
            isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col glass lg:rounded-2xl lg:border lg:border-[var(--border)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] p-4 lg:hidden">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    Search Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="e.g. IIT Bombay"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Delhi, Mumbai"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                    Institution Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                  >
                    <option value="">All Types</option>
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="IIIT">IIIT</option>
                    <option value="PRIVATE">Private</option>
                    <option value="PUBLIC">Public</option>
                    <option value="DEEMED">Deemed</option>
                  </select>
                </div>

                {/* Min Rating */}
                <div>
                  <label className="mb-2 flex justify-between text-sm font-medium text-[var(--text-primary)]">
                    <span>Min Rating</span>
                    <span className="text-[var(--primary)]">{minRating}+ ★</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>

                {/* Max Fees */}
                <div>
                  <label className="mb-2 flex justify-between text-sm font-medium text-[var(--text-primary)]">
                    <span>Max Fees (per year)</span>
                    <span className="text-[var(--primary)]">
                      {maxFees >= 5000000 ? "Any" : `₹${(maxFees / 100000).toFixed(1)}L`}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={maxFees}
                    onChange={(e) => setMaxFees(Number(e.target.value))}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-[var(--border)] p-4">
              <button
                onClick={clearFilters}
                className="flex-1 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--bg-tertiary)]"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                Apply
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="skeleton h-[420px] rounded-2xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
              <p className="text-red-500 mb-4">Failed to load colleges. Please try again.</p>
              <button 
                onClick={() => window.location.reload()}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
              >
                Retry
              </button>
            </div>
          ) : data?.colleges.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] text-center px-4">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
                <Search className="h-8 w-8 text-[var(--text-muted)]" />
              </div>
              <h3 className="mb-2 text-xl font-bold">No colleges found</h3>
              <p className="mb-6 max-w-md text-[var(--text-secondary)]">
                We couldn't find any colleges matching your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="rounded-xl bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {data?.colleges.map((college, i) => (
                  <CollegeCard key={college.id} college={college} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-[var(--bg-tertiary)]"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: data.totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                          page === i + 1
                            ? "bg-[var(--primary)] text-white"
                            : "hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data.totalPages}
                    className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-[var(--bg-tertiary)]"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading...</div>}>
      <CollegesContent />
    </Suspense>
  );
}
