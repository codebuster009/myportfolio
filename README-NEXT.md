# Kartavaya Portfolio - Next.js Version

A modern, revamped portfolio website built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion. Features a stunning frosted-glass design system with smooth animations and interactive elements.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Frosted Glass Design**: Beautiful glassmorphism effects with backdrop blur
- **Smooth Animations**: Framer Motion for page transitions, scroll reveals, and hover effects
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Component Library**: shadcn/ui components for consistent design
- **Font Awesome Icons**: Beautiful icons for social links and technologies
- **Video Support**: Project cards support video previews (mp4/webm)
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up images:**
   - Copy `src/Kartavya.jpg` to `public/Kartavya.jpg`
   - Ensure all project images are in `public/images/` folder

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🏗️ Project Structure

```
myportfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer component
│   ├── sections/
│   │   ├── HeroSection.tsx      # Hero section with profile
│   │   ├── AboutSection.tsx    # About me section
│   │   ├── ProjectsSection.tsx  # Projects showcase
│   │   ├── TechnologiesSection.tsx # Tech stack icons
│   │   └── ContactSection.tsx  # Contact form/section
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── data.ts             # Project data and constants
│   └── utils.ts            # Utility functions
├── public/
│   ├── images/             # Project images
│   └── Kartavya.jpg        # Profile image
└── design-system.json      # Design system reference
```

## 🎨 Design System

The design system follows a light frosted-glass theme with:
- **Primary Color**: #7E74F1 (Purple)
- **Secondary Color**: #A1B2FF (Light Blue)
- **Accent Color**: #C3C8FF (Lavender)
- **Background**: Gradient from #E6EBFF to #F9FAFF
- **Glass Effect**: backdrop-blur with rgba(255,255,255,0.45) background

See `design-system.json` for complete design specifications.

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Font Awesome
- **Deployment**: Vercel (recommended)

## 📝 Customization

### Adding Projects

Edit `lib/data.ts` to add or modify projects:

```typescript
{
  id: 7,
  src: "project-image.png",
  title: "Project Name",
  tech: ["React", "TypeScript", "Tailwind"],
  live: "https://project-url.com",
  github: "https://github.com/username/project",
  video: "/videos/project-preview.mp4", // Optional
  description: "Project description"
}
```

### Adding Technologies

Edit `components/sections/TechnologiesSection.tsx` to add new tech icons.

### Changing Colors

Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` folder. Deploy according to your hosting platform's Next.js documentation.

## 📄 License

This project is private and personal.

## 👤 Author

**Kartavaya Sharma**
- GitHub: [@codebuster009](https://github.com/codebuster009)
- Twitter: [@codebuster09](https://twitter.com/codebuster09)
- LinkedIn: [Kartavya Sharma](https://www.linkedin.com/in/kartavya-sharma-a17035230)
- Email: kartavyasharmajs@gmail.com

---

Built with ❤️ using Next.js and modern web technologies.


