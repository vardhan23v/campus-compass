// src/services/collegeService.ts
import api from "./api";
import type { College, CollegeListResponse, CollegeFilters } from "@/types/college";

export const collegeService = {
  async getColleges(filters: CollegeFilters = {}): Promise<CollegeListResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    if (filters.minRating) params.set("minRating", String(filters.minRating));
    if (filters.maxFees) params.set("maxFees", String(filters.maxFees));
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));

    const { data } = await api.get(`/colleges?${params.toString()}`);
    return data;
  },

  async getCollege(id: string): Promise<College> {
    const { data } = await api.get(`/colleges/${id}`);
    return data;
  },

  async saveCollege(collegeId: string): Promise<void> {
    await api.post("/save", { collegeId });
  },

  async unsaveCollege(collegeId: string): Promise<void> {
    await api.delete("/save", { data: { collegeId } });
  },

  async getSavedColleges(): Promise<College[]> {
    const { data } = await api.get("/save");
    return data;
  },
};
