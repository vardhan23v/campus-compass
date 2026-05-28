// src/components/college/CollegeCard.tsx
"use client";
import Link from "next/link";
import { Star, MapPin, IndianRupee, Heart, GitCompareArrows, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { College } from "@/types/college";
import { formatCurrency, cn } from "@/lib/utils";
import { useCompareStore } from "@/store/useCompareStore";
import { useSaveCollege, useUnsaveCollege, useSavedColleges } from "@/hooks/useSavedColleges";

interface CollegeCardProps {
  college: College;
  index?: number;
}

export default function CollegeCard({ college, index = 0 }: CollegeCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { addCollege, removeCollege, isInCompare, isFull } = useCompareStore();
  const saveCollege = useSaveCollege();
  const unsaveCollege = useUnsaveCollege();
  const { data: savedColleges } = useSavedColleges();

  const isSaved = savedColleges?.some((c) => c.id === college.id) ?? false;
  const inCompare = isInCompare(college.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const typeColors: Record<string, string> = {
    IIT: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    NIT: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    IIIT: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    PRIVATE: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    PUBLIC: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    DEEMED: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/college/${college.id}`} className="block group">
        <div className="glass rounded-2xl overflow-hidden card-hover">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={college.image}
              alt={college.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
                  typeColors[college.type] || typeColors.PRIVATE
                )}
              >
                {college.type}
              </span>
              {college.isTrending && (
                <span className="flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500 backdrop-blur-md">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={handleSave}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110",
                  isSaved
                    ? "bg-red-500 text-white"
                    : "bg-black/30 text-white hover:bg-red-500"
                )}
                aria-label={isSaved ? "Unsave college" : "Save college"}
              >
                <Heart
                  className={cn("h-4 w-4", isSaved && "fill-current")}
                />
              </button>
              <button
                onClick={handleCompare}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110",
                  inCompare
                    ? "bg-[var(--primary)] text-white"
                    : "bg-black/30 text-white hover:bg-[var(--primary)]"
                )}
                aria-label={inCompare ? "Remove from compare" : "Add to compare"}
              >
                <GitCompareArrows className="h-4 w-4" />
              </button>
            </div>

            {/* Rating */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-white">
                {college.rating.toFixed(1)}
              </span>
              <span className="text-xs text-white/70">
                ({college.totalReviews})
              </span>
            </div>

            {/* Ranking */}
            {college.ranking && (
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
                <span className="text-xs text-white/70">Rank </span>
                <span className="text-sm font-bold text-white">
                  #{college.ranking}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="mb-1.5 text-lg font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
              {college.name}
            </h3>

            <div className="mb-3 flex items-center gap-1 text-sm text-[var(--text-muted)]">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{college.location}</span>
            </div>

            <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
              {college.description}
            </p>

            <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
              <div className="flex items-center gap-1 text-sm">
                <IndianRupee className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span className="font-semibold text-[var(--text-primary)]">
                  {formatCurrency(college.feesMin)}
                </span>
                <span className="text-[var(--text-muted)]">-</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {formatCurrency(college.feesMax)}
                </span>
              </div>
              {college.placementRate && (
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="font-semibold text-emerald-500">
                    {college.placementRate}%
                  </span>
                  <span className="text-[var(--text-muted)]">placed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
