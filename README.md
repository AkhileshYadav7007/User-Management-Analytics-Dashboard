# 📊 Admin Dashboard - User Management & Analytics

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, responsive admin dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Zustand** state management.

[Live Demo](#) • [Report Bug](https://github.com/AkhileshYadav7007/AI-Powered-Research-Assistant/issues) • [Request Feature](https://github.com/AkhileshYadav7007/AI-Powered-Research-Assistant/issues)

</div>

---

## 🚀 Features

### 📋 Users List Page (`/users`)
- ✅ **Table View** - Clean, responsive table displaying user information
- 🔍 **Smart Search** - Debounced search by name or email (300ms delay)
- 🎯 **Advanced Filtering** - Filter users by status (Active/Inactive)
- 📊 **Sorting** - Sort by Name or Created Date (ascending/descending)
- 📄 **Pagination** - Client-side pagination with customizable items per page
- 👁️ **Quick Actions** - View user details with a single click

### 👤 User Details Page (`/users/:id`)
- 🎴 **Profile Card** - Comprehensive user profile with avatar and details
- 📈 **Activity Summary** - Visual representation of user engagement metrics
- 🔄 **Recent Actions** - Display last 5 user activities
- ✏️ **Edit Modal** - Update user information with form validation
- ✔️ **Real-time Updates** - Instant UI updates using Zustand state management
- 🔐 **Form Validation** - Powered by Zod schema validation

### 📈 Analytics Overview Page (`/analytics`)
- 📊 **Signup Trend Chart** - Bar chart showing last 7 days of user signups
- 🥧 **Status Distribution** - Pie chart for Active vs Inactive users
- 📱 **Responsive Charts** - Built with Recharts, fully mobile-friendly
- 🎨 **Beautiful Visualizations** - Clean, modern chart designs

### 🎨 General Features
- 🌓 **Dark Mode** - Toggle between light and dark themes with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design with adaptive sidebar
- ⚡ **Performance Optimized** - Debounced search, code splitting, lazy loading
- 🧩 **Reusable Components** - Modular, maintainable component architecture
- 🎯 **Type Safety** - 100% TypeScript coverage
- 🎭 **Custom UI Library** - Hand-crafted components (no bloated libraries)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4.1](https://tailwindcss.com/) |
| **State Management** | [Zustand 5.0](https://zustand-demo.pmnd.rs/) |
| **Charts** | [Recharts 3.6](https://recharts.org/) |
| **Form Handling** | [React Hook Form 7.70](https://react-hook-form.com/) |
| **Validation** | [Zod 4.3](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Package Manager** | npm |

---

## 📁 Project Structure

```
Assessment Task/
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── analytics/          # Analytics page
│   │   ├── users/              # Users list page
│   │   │   └── [id]/          # Dynamic user details page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home/redirect page
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Select.tsx
│   │   ├── Sidebar.tsx
│   │   └── Table.tsx
│   ├── store/                  # Zustand state management
│   │   └── useUserStore.ts
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   └── lib/                    # Utilities and mock data
│       ├── utils.ts
│       └── mockData.ts
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkhileshYadav7007/AI-Powered-Research-Assistant.git
   cd "Assessment Task"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🎯 Key Implementation Details

### State Management with Zustand

```typescript
// Lightweight, simple, and performant
const { users, searchQuery, setSearchQuery } = useUserStore();
```

**Why Zustand?**
- 🪶 Smaller bundle size than Redux
- 🎯 Simple API with minimal boilerplate
- ⚡ Built-in performance optimizations
- 🔄 Easy localStorage persistence

### Form Validation with Zod

```typescript
const editSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  status: z.enum(["Active", "Inactive"]),
});
```

### Debounced Search

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setSearchQuery(localSearch);
  }, 300);
  return () => clearTimeout(timer);
}, [localSearch]);
```

### Dark Mode Implementation

- Uses localStorage for persistence
- Applies Tailwind's `dark:` classes
- Instant theme switching with zero flash

---

## 🏗️ Architecture Decisions

### Component Design
- **Atomic Design Principles** - Small, reusable, composable components
- **Separation of Concerns** - Logic separated from presentation
- **Type Safety** - Comprehensive TypeScript interfaces and types

### State Management Strategy
- **Zustand over Redux** - Simpler API, less boilerplate
- **Selective Subscriptions** - Components only re-render when needed
- **Centralized Store** - Single source of truth for app state

### Styling Approach
- **Tailwind CSS** - Utility-first for rapid development
- **Custom Components** - No heavy UI libraries (MUI, Ant Design)
- **Mobile-First** - Responsive design from the ground up
- **Dark Mode** - Native Tailwind dark mode support

### Performance Optimizations
- ⚡ Debounced search inputs
- 📦 Code splitting with Next.js dynamic imports
- 🎯 Selective component re-renders
- 💾 LocalStorage caching for preferences

---

## 🎨 UI/UX Highlights

- 🎭 **Consistent Design Language** - Unified spacing, colors, typography
- 📱 **Mobile-Responsive** - Works seamlessly on all device sizes
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🌓 **Dark Mode Support** - Easy on the eyes, day or night
- ⚡ **Fast & Smooth** - Optimized animations and transitions
- 🎯 **Intuitive Navigation** - Clear information hierarchy

---

## 📸 Screenshots

### Users List Page (Light Mode)
> Comprehensive user management with search, filters, and pagination

### User Details Page (Dark Mode)
> Detailed user profiles with edit capabilities and activity tracking

### Analytics Dashboard
> Beautiful charts showing user metrics and trends

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Akhilesh Yadav**

- GitHub: [@AkhileshYadav7007](https://github.com/AkhileshYadav7007)
- Project Link: [AI-Powered-Research-Assistant](https://github.com/AkhileshYadav7007/AI-Powered-Research-Assistant)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

Made with ❤️ by Akhilesh Yadav

</div>
# User-Management-Analytics-Dashboard
