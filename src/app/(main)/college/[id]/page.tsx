// src/app/(main)/college/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MapPin, Star, GraduationCap, Building2, Calendar, 
  IndianRupee, Globe, Phone, Mail, CheckCircle2,
  Heart, GitCompareArrows, ArrowLeft, TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";
import { useCollege } from "@/hooks/useColleges";
import { useSaveCollege, useUnsaveCollege, useSavedColleges } from "@/hooks/useSavedColleges";
import { useCompareStore } from "@/store/useCompareStore";
import { formatCurrency, formatRating, parseCSV, cn } from "@/lib/utils";
import Link from "next/link";

export default function CollegeDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: session } = useSession();
  
  const { data: college, isLoading, isError } = useCollege(id);
  const { data: savedColleges } = useSavedColleges();
  const saveCollege = useSaveCollege();
  const unsaveCollege = useUnsaveCollege();
  const { addCollege, removeCollege, isInCompare, isFull } = useCompareStore();

  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="skeleton h-[400px] w-full rounded-3xl" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="skeleton h-12 w-full rounded-xl" />
            <div className="skeleton h-64 w-full rounded-2xl" />
          </div>
          <div className="skeleton h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Building2 className="mb-4 h-16 w-16 text-[var(--text-muted)]" />
        <h1 className="mb-2 text-2xl font-bold">College Not Found</h1>
        <p className="mb-6 text-[var(--text-secondary)]">
          The college you are looking for does not exist or has been removed.
        </p>
        <Link href="/colleges" className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white">
          Browse All Colleges
        </Link>
      </div>
    );
  }

  const isSaved = savedColleges?.some((c) => c.id === college.id) ?? false;
  const inCompare = isInCompare(college.id);

  const handleSave = () => {
    if (!session) {
      toast.error("Please login to save colleges");
      router.push("/login");
      return;
    }
    if (isSaved) {
      unsaveCollege.mutate(college.id);
    } else {
      saveCollege.mutate(college.id);
    }
  };

  const handleCompare = () => {
    if (inCompare) {
      removeCollege(college.id);
      toast.success("Removed from comparison");
    } else if (isFull()) {
      toast.error("You can compare up to 3 colleges");
    } else {
      addCollege(college);
      toast.success("Added to comparison");
    }
  };

  const facilitiesList = parseCSV(college.facilities);
  const recruitersList = parseCSV(college.topRecruiters);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[400px] w-full lg:h-[50vh]">
        <img
          src={college.image}
          alt={college.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-black/50 to-transparent" />
        
        <div className="absolute inset-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 pt-24">
          <button 
            onClick={() => router.back()}
            className="mb-auto inline-flex w-fit items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-black/50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
                  {college.type}
                </span>
                {college.ranking && (
                  <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">
                    Rank #{college.ranking}
                  </span>
                )}
                {college.accreditation && (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                    {college.accreditation}
                  </span>
                )}
              </div>
              
              <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {college.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 sm:text-base">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {college.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{formatRating(college.rating)}</span>
                  <span className="text-white/70">({college.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            
            {/* Floating Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold backdrop-blur-md transition-all hover:scale-105",
                  isSaved 
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                )}
              >
                <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
                {isSaved ? "Saved" : "Save"}
              </button>
              
              <button
                onClick={handleCompare}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold backdrop-blur-md transition-all hover:scale-105",
                  inCompare
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                )}
              >
                <GitCompareArrows className="h-5 w-5" />
                {inCompare ? "Added" : "Compare"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="mb-8 flex overflow-x-auto border-b border-[var(--border)] scrollbar-hide">
          {["overview", "courses", "placements", "facilities", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap border-b-2 px-6 py-4 text-sm font-semibold capitalize transition-colors",
                activeTab === tab
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Tab Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="glass rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="mb-4 text-2xl font-bold">About {college.name}</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {college.longDescription || college.description}
                  </p>
                </div>
                
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--bg-secondary)]">
                    <div className="mb-1 text-sm text-[var(--text-muted)]">Established</div>
                    <div className="flex items-center gap-2 font-semibold">
                      <Calendar className="h-4 w-4 text-[var(--primary)]" />
                      {college.established || "N/A"}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--bg-secondary)]">
                    <div className="mb-1 text-sm text-[var(--text-muted)]">Institution Type</div>
                    <div className="flex items-center gap-2 font-semibold capitalize">
                      <Building2 className="h-4 w-4 text-[var(--primary)]" />
                      {college.type.toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="mb-6 text-2xl font-bold">Programs & Courses</h2>
                {college.courses?.length ? (
                  college.courses.map((course) => (
                    <div key={course.id} className="glass rounded-2xl p-6 transition-all hover:border-[var(--primary)]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)]">{course.name}</h3>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                            <span className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
                              <Calendar className="h-4 w-4" /> {course.duration}
                            </span>
                            {course.seats && (
                              <span className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
                                <GraduationCap className="h-4 w-4" /> {course.seats} Seats
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-sm text-[var(--text-muted)]">Total Fees</div>
                          <div className="text-xl font-bold text-[var(--primary)]">
                            {formatCurrency(course.fees)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--text-secondary)]">No courses information available.</p>
                )}
              </div>
            )}

            {/* Placements Tab */}
            {activeTab === "placements" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold">Placement Records</h2>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                      <TrendingUp className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Placement Rate</div>
                    <div className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                      {college.placementRate ? `${college.placementRate}%` : "N/A"}
                    </div>
                  </div>
                  
                  <div className="glass rounded-2xl p-6 text-center border-l-4 border-l-[var(--primary)]">
                    <div className="text-sm text-[var(--text-muted)]">Highest Package</div>
                    <div className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                      {college.highestPackage ? formatCurrency(college.highestPackage) : "N/A"}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">per annum</div>
                  </div>
                  
                  <div className="glass rounded-2xl p-6 text-center border-l-4 border-l-[var(--accent)]">
                    <div className="text-sm text-[var(--text-muted)]">Average Package</div>
                    <div className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                      {college.avgPackage ? formatCurrency(college.avgPackage) : "N/A"}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">per annum</div>
                  </div>
                </div>
                
                {recruitersList.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="mb-4 text-lg font-bold">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {recruitersList.map((recruiter) => (
                        <span 
                          key={recruiter}
                          className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] px-4 py-2 text-sm font-medium"
                        >
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab === "facilities" && (
              <div className="glass rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="mb-6 text-2xl font-bold">Campus Facilities</h2>
                {facilitiesList.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-[var(--text-secondary)]">
                    {facilitiesList.map((facility) => (
                      <div key={facility} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium">{facility}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--text-secondary)]">No facilities information available.</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--bg-secondary)] px-4 py-2 border border-[var(--border)]">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{formatRating(college.rating)}</span>
                    <span className="text-sm text-[var(--text-muted)]">({college.totalReviews})</span>
                  </div>
                </div>

                {college.reviews?.length ? (
                  <div className="grid gap-4">
                    {college.reviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-white font-bold">
                              {review.user?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <div className="font-bold text-[var(--text-primary)]">{review.user?.name || "Anonymous User"}</div>
                              <div className="text-xs text-[var(--text-muted)]">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded font-bold text-sm">
                            {review.rating} <Star className="h-3.5 w-3.5 fill-current" />
                          </div>
                        </div>
                        <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass rounded-2xl p-8 text-center text-[var(--text-secondary)]">
                    No reviews yet. Be the first to review this college!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Contact Info Card */}
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-4 text-lg font-bold">Contact Information</h3>
                <div className="space-y-4">
                  {college.website && (
                    <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="truncate">{college.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                  {college.email && (
                    <a href={`mailto:${college.email}`} className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="truncate">{college.email}</span>
                    </a>
                  )}
                  {college.phone && (
                    <a href={`tel:${college.phone}`} className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span>{college.phone}</span>
                    </a>
                  )}
                  <div className="flex gap-3 text-sm text-[var(--text-secondary)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="mt-2.5">{college.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="gradient-border rounded-2xl p-[1px]">
                <div className="h-full w-full rounded-[15px] bg-[var(--bg-primary)] p-6">
                  <h3 className="mb-4 text-lg font-bold">Quick Facts</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-[var(--border)] pb-2">
                      <span className="text-[var(--text-muted)]">Fees Range</span>
                      <span className="font-semibold">{formatCurrency(college.feesMin)} - {formatCurrency(college.feesMax)}</span>
                    </li>
                    <li className="flex justify-between border-b border-[var(--border)] pb-2">
                      <span className="text-[var(--text-muted)]">City</span>
                      <span className="font-semibold">{college.city}</span>
                    </li>
                    <li className="flex justify-between border-b border-[var(--border)] pb-2">
                      <span className="text-[var(--text-muted)]">State</span>
                      <span className="font-semibold">{college.state}</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span className="text-[var(--text-muted)]">Students Saved</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500 fill-red-500" /> 
                        {college._count?.savedBy || 0}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
