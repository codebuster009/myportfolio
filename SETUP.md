# Quick Setup Guide

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
cd /Users/kartavya/Documents/GitHub/Personal/myportfolio
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Font Awesome
- shadcn/ui components
- All other required dependencies

### Step 2: Verify Images

Make sure these files exist:
- ✅ `public/Kartavya.jpg` - Profile image
- ✅ `public/images/` - Project images (parties.png, marketing.png, etc.)

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📁 File Structure Overview

```
myportfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navbar & Footer
│   ├── sections/         # All page sections
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── data.ts           # Projects & social links
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   ├── images/           # Project images
│   └── Kartavya.jpg     # Profile image
└── design-system.json    # Design specifications
```

## 🎨 Design System

The portfolio uses a **Light Frosted Glass** design system:
- Primary: Purple (#7E74F1)
- Secondary: Light Blue (#A1B2FF)
- Background: Gradient from #E6EBFF to #F9FAFF
- Glass Effect: backdrop-blur with semi-transparent white

See `design-system.json` for complete details.

## ✨ Features Implemented

- ✅ Next.js 14 with App Router
- ✅ TypeScript throughout
- ✅ Tailwind CSS with custom design system
- ✅ shadcn/ui components
- ✅ Framer Motion animations
- ✅ Font Awesome icons
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Frosted glass effects
- ✅ Smooth scroll navigation
- ✅ Project cards with video support
- ✅ Technology icons with tooltips
- ✅ Social media links
- ✅ Contact section

## 🔄 Next Steps (Optional)

1. **Add Theme Switcher**: Implement light/frost/dark theme toggle
2. **Add Project Videos**: Create video previews for projects
3. **Optimize Images**: Convert images to WebP/AVIF formats
4. **Add Analytics**: Integrate Google Analytics or similar
5. **Deploy**: Deploy to Vercel or your preferred platform

## 🐛 Troubleshooting

### Images not showing?
- Check that images are in `public/` folder
- Use `/image-name.jpg` (not `/images/image-name.jpg`) for root public files
- Use `/images/project.png` for files in `public/images/`

### TypeScript errors?
- Run `npm install` to ensure all types are installed
- Check that `tsconfig.json` is properly configured

### Styles not applying?
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.ts` and `postcss.config.js`
- Verify `app/globals.css` imports Tailwind

### Animations not working?
- Check that Framer Motion is installed
- Verify components are marked with `"use client"` directive

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

**Ready to go!** 🎉


