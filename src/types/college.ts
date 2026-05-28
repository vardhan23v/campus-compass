// src/types/college.ts

export interface College {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  image: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  totalReviews: number;
  feesMin: number;
  feesMax: number;
  established?: number | null;
  type: string;
  accreditation?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
  ranking?: number | null;
  avgPackage?: number | null;
  highestPackage?: number | null;
  placementRate?: number | null;
  topRecruiters?: string | null;
  facilities?: string | null;
  isFeatured: boolean;
  isTrending: boolean;
  courses?: Course[];
  reviews?: Review[];
  _count?: {
    savedBy: number;
  };
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats?: number | null;
  collegeId: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  userId: string;
  collegeId: string;
  createdAt: string;
  user?: {
    name: string;
    image?: string | null;
  };
}

export interface CollegeListResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CollegeFilters {
  search?: string;
  location?: string;
  type?: string;
  minRating?: number;
  maxFees?: number;
  page?: number;
  limit?: number;
}
