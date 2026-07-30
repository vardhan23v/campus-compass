# 🎓 Campus Compass

**Campus Compass** is a full-stack college discovery and comparison platform that helps students explore, compare, and review colleges across India. With powerful search, advanced filtering, side-by-side comparisons, and personalized recommendations, finding the right college has never been easier.

[![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

---

## 🚀 Features

### 🔍 Smart College Discovery
- **Powerful Search**: Search colleges by name, location, course, or ranking with instant results and debounced queries.
- **Advanced Filtering**: Filter by institution type (IIT, NIT, IIIT, Private, Public, Deemed), location, minimum rating, and maximum fees with range sliders.
- **Pagination**: Browse through results with smooth page navigation and URL-based state persistence.

### 📊 Side-by-Side Comparison
- **Compare Up to 3 Colleges**: Add colleges to your comparison list and view them side-by-side in a detailed comparison table.
- **Comprehensive Metrics**: Compare ratings, institution type, establishment year, ranking, fees, placement stats (rate, highest package, average package), and facilities.
- **Facility Checklist**: See which facilities each college offers with a visual checkmark/cross grid.
- **Persistent State**: Comparison list persists via Zustand store — your selections survive page navigation.

### 🏛️ Detailed College Profiles
- **Rich College Pages**: Each college has a dedicated profile page with description, courses offered, fees, placement statistics, top recruiters, and campus facilities.
- **User Reviews & Ratings**: Read authentic student reviews with star ratings, titles, and detailed comments.
- **Save Favorites**: Bookmark colleges to your profile for quick access later.

### 🏠 Engaging Homepage
- **Hero Section**: Animated gradient background with a prominent search bar and live animated counters (30+ colleges, 120+ courses, 50,000+ students, 4.5★ avg rating).
- **Trending Colleges**: Curated section showcasing popular colleges with Framer Motion scroll animations.
- **Featured Colleges**: Handpicked recommendations in a dedicated section.
- **CTA Section**: Gradient call-to-action banner encouraging sign-ups.

### 🔐 Authentication
- **NextAuth.js v5**: Full authentication system with credential-based login and signup.
- **Protected Routes**: Save favorites, write reviews, and access your dashboard after logging in.
- **Session Management**: Secure session handling with PostgreSQL-backed sessions.

### 🎨 Premium UI/UX
- **Dark/Light Mode**: Full theme support with `next-themes` and CSS custom properties.
- **Glass Morphism**: Modern frosted-glass design system throughout the app.
- **Framer Motion Animations**: Smooth page transitions, scroll-triggered reveals, and micro-interactions.
- **Responsive Design**: Fully responsive from mobile to desktop with a collapsible mobile filter drawer.
- **Skeleton Loading**: Beautiful skeleton placeholders while data loads.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **State Management** | Zustand, TanStack React Query |
| **Backend** | Next.js API Routes |
| **ORM** | Prisma 6 |
| **Database** | PostgreSQL (Neon Serverless) |
| **Authentication** | NextAuth.js v5 (Beta) |
| **Icons** | Lucide Icons |
| **Notifications** | React Hot Toast |
| **Theming** | next-themes |

---

## 📊 Database Schema

The application uses a relational PostgreSQL database with the following models:

| Model | Description |
|-------|-------------|
| **User** | Student accounts with saved colleges and reviews |
| **College** | Institution profiles with full metadata (fees, placements, facilities, rankings) |
| **Course** | Courses offered by each college with duration, fees, and seat count |
| **Review** | Student reviews with ratings, titles, and comments |
| **SavedCollege** | Many-to-many relationship for bookmarking colleges |
| **Account / Session / VerificationToken** | NextAuth.js authentication models |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (local or [Neon Serverless](https://neon.tech))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vardhan23v/campus-compass.git
   cd campus-compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Setup the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database (optional)**
   
   Add sample colleges, courses, and reviews to get started quickly.

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open in Browser**

   Navigate to `http://localhost:3000` to start exploring colleges!

---

## 📖 How to Use

1. **Browse the Homepage** — See trending and featured colleges, or use the search bar to find specific institutions.
2. **Explore Colleges** — Visit `/colleges` to browse all colleges with powerful filters (type, location, rating, fees).
3. **View Details** — Click any college card to see its full profile: courses, placements, facilities, and student reviews.
4. **Compare Side-by-Side** — Add colleges to your comparison list and visit `/compare` to see a detailed comparison table.
5. **Save Favorites** — Sign up / log in to bookmark colleges to your profile.
6. **Write Reviews** — Share your experience by rating and reviewing colleges you've attended.

---

## 📁 Project Structure

```
campus-compass/
├── prisma/
│   └── schema.prisma              # Database schema (User, College, Course, Review, SavedCollege)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── signup/page.tsx     # Signup page
│   │   ├── (main)/
│   │   │   ├── college/[id]/page.tsx  # College detail page
│   │   │   ├── colleges/page.tsx      # College listing with filters
│   │   │   ├── compare/page.tsx       # Side-by-side comparison
│   │   │   └── saved/page.tsx         # Saved/bookmarked colleges
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth API
│   │   │   ├── auth/signup/route.ts         # Signup endpoint
│   │   │   ├── colleges/route.ts            # College listing API
│   │   │   ├── colleges/[id]/route.ts       # Single college API
│   │   │   └── save/route.ts                # Save/unsave college API
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Homepage (hero, trending, featured)
│   │   └── providers.tsx           # Theme & Query providers
│   ├── components/
│   │   ├── college/
│   │   │   └── CollegeCard.tsx     # Reusable college card component
│   │   └── layout/
│   │       ├── Navbar.tsx          # Top navigation bar
│   │       └── Footer.tsx          # Site footer
│   ├── hooks/
│   │   ├── useColleges.ts          # College data fetching hook
│   │   └── useSavedColleges.ts     # Saved colleges hook
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── prisma.ts               # Prisma client singleton
│   │   ├── utils.ts                # Utility functions (formatting, debounce)
│   │   └── validators.ts           # Zod validation schemas
│   ├── services/
│   │   ├── api.ts                  # API client functions
│   │   └── collegeService.ts       # College business logic
│   ├── store/
│   │   ├── useCompareStore.ts      # Comparison state (Zustand)
│   │   └── useThemeStore.ts        # Theme state
│   ├── types/
│   │   └── college.ts              # TypeScript type definitions
│   └── generated/prisma/           # Auto-generated Prisma client
├── public/images/                  # Static images & college photos
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.js
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/campus-compass/issues).

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Sree Vardhan V](https://github.com/vardhan23v)
