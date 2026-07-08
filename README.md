# Deeksha Pal | Data Analyst Portfolio

A high-conversion, production-ready, mobile-first portfolio website for **Deeksha Pal**, a Data Analyst and MCA student. Built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion, organized using a modular, feature-based architecture.

## 🚀 Live Demo & Repository
* **GitHub Repository**: [https://github.com/okritu](https://github.com/okritu)
* **Email**: deeksha30pal@gmail.com
* **LinkedIn**: [LinkedIn Profile](https://linkedin.com/in/deeksha-pal-48b333235)

---

## 🛠️ Tech Stack & Libraries
* **Framework**: Next.js (App Router)
* **Language**: TypeScript (Type-Safe Components)
* **Styling**: Tailwind CSS (Tailwind v4 configuration with CSS variables)
* **Animations**: Framer Motion (Smooth scrolls, fade-in transitions, layout transitions, hover animations)
* **Icons**: Lucide React (Vector-based crisp SVG icons)
* **Utilities**: clsx, tailwind-merge (Dynamic conditional class styling)

---

## 💎 Design System & UI/UX
* **Theme**: Deep Space Premium Dark
* **Palette**: 
  * Background: `#0B1020` (Dark Space Blue)
  * Primary Accent: `#6366F1` (Logic Indigo)
  * Secondary Accent: `#06B6D4` (Insight Cyan)
  * Text Colors: `#E5E7EB` (Primary Slate), `#94A3B8` (Muted Slate)
* **Aesthetics**: Glassmorphism (`backdrop-blur`), subtle borders, soft shadows, floating interactive SVGs representing data analytics terminals.
* **Mobile-First**: 100% responsive across breakpoints from 320px up to 4K displays. Eliminates layout overflows and introduces optimized touch targets (minimum 44x44px).

---

## 📁 Modular Directory Structure (Feature-Based Architecture)
The codebase uses a domain-driven, feature-based architecture to isolate code and improve scalability:

```
src/
├── app/                  # App Router entrypoints, global styles, page composition
├── components/           # Reusable shared components
│   ├── ui/               # Core design system atomic elements (Button, Heading, Card, etc.)
│   └── common/           # Common layouts (Header navigation, Footer, ScrollToTop)
├── features/             # Isolated domain features containing logic & domain UI
│   ├── hero/             # Headline, quick contact, interactive mockup and statistics
│   ├── about/            # Academic narrative and core professional capability pillars
│   ├── skills/           # Technical taxonomy categorized grid with interactive badges
│   ├── projects/         # Case studies detailing data preprocessing, SQL CTEs, Power BI
│   └── education/        # Academic timelines and certified credentials (IBM, etc.)
├── hooks/                # Custom React hooks (useScroll state detection)
└── utils/                # Helper utilities (Tailwind class merger)
```

---

## ⚙️ Getting Started (Local Development)

### 1. Prerequisites
Ensure you have Node.js (version 18+ recommended) and npm installed.

### 2. Clone and Install Dependencies
Navigate to the directory and run:
```bash
npm install
```

### 3. Start the Development Server
Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 4. Build for Production
Generate the optimized static build:
```bash
npm run build
```
Verify the production build runs:
```bash
npm run start
```

---

## ⚡ Deployment (Vercel)
This Next.js application is fully optimized for single-click deployment to **Vercel**:

1. Push the code to a GitHub repository (e.g. `github.com/okritu/portfolio`).
2. Log into the [Vercel Dashboard](https://vercel.com).
3. Click **New Project** and import your repository.
4. Next.js settings are auto-detected. Click **Deploy**.
5. Your portfolio is live with SSL, global CDN, and automated preview branch builds.
