// src/hooks/useColleges.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { collegeService } from "@/services/collegeService";
import type { CollegeFilters } from "@/types/college";

export function useColleges(filters: CollegeFilters = {}) {
  return useQuery({
    queryKey: ["colleges", filters],
    queryFn: () => collegeService.getColleges(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ["college", id],
    queryFn: () => collegeService.getCollege(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    retry: 2,
  });
}
