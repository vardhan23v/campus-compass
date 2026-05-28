// src/hooks/useSavedColleges.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { collegeService } from "@/services/collegeService";
import toast from "react-hot-toast";

export function useSavedColleges() {
  const { status } = useSession();

  return useQuery({
    queryKey: ["savedColleges"],
    queryFn: () => collegeService.getSavedColleges(),
    staleTime: 2 * 60 * 1000,
    retry: 1,
    enabled: status === "authenticated",
  });
}

export function useSaveCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collegeId: string) => collegeService.saveCollege(collegeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
      toast.success("College saved!");
    },
    onError: () => {
      toast.error("Failed to save college. Please try again.");
    },
  });
}

export function useUnsaveCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collegeId: string) => collegeService.unsaveCollege(collegeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
      toast.success("College removed from saved");
    },
    onError: () => {
      toast.error("Failed to remove college. Please try again.");
    },
  });
}
