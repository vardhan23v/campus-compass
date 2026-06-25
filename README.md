# 🎓 Campus Compass

**Campus Compass** is a full-stack college discovery and comparison platform that helps students explore, compare, and review colleges across India. With powerful search, filtering, and personalized recommendations, finding the right college has never been easier.

## 🚀 Features

- **Smart College Search**: Search colleges by name, location, course, or ranking with instant results.
- **Advanced Filtering**: Filter colleges by type, location, fees, rankings, and more to narrow down your choices.
- **College Profiles**: Detailed college pages with courses offered, fees, placement stats, and campus information.
- **User Reviews & Ratings**: Read and write authentic reviews from students to make informed decisions.
- **Save Favorites**: Bookmark colleges to your profile and compare them side-by-side.
- **Trending & Featured**: Discover trending and featured colleges curated on the homepage.
- **Secure Authentication**: Full sign-up/login system with NextAuth.js supporting multiple providers.

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: NextAuth.js v5 (Beta)
- **State Management**: Zustand, TanStack React Query
- **UI/UX**: Lucide Icons, React Hot Toast, next-themes (Dark Mode)

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (or [Neon](https://neon.tech) serverless)

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

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**

   Navigate to `http://localhost:3000` to start exploring colleges!

## 📁 Project Structure

```
campus-compass/
├── prisma/
│   └── schema.prisma        # Database schema (User, College, Review, etc.)
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages (login, register)
│   │   ├── (main)/           # Main app pages (colleges, dashboard)
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── services/             # API service functions
│   ├── store/                # Zustand state stores
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── package.json
└── tsconfig.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/campus-compass/issues).

## 📄 License

This project is licensed under the MIT License.
