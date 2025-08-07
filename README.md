# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

- **Responsive Design**: Looks great on all devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Blog Support**: MDX-based blog with syntax highlighting
- **Video Gallery**: YouTube video integration
- **Gadgets Shop**: Curated list of recommended products
- **Animations**: Smooth page transitions and micro-interactions
- **GitHub Integration**: Live GitHub contribution graph
- **SEO Optimized**: Meta tags and OpenGraph support
- **Performance Focused**: Optimized for Core Web Vitals

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: [MDX](https://mdxjs.com/)
- **Deployment**: [Vercel](https://vercel.com)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/StarKnightt/prasendev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

1. Update `src/data/resume.tsx` with your personal information.
2. Add your blog posts in the `content` directory as MDX files.
3. Update `src/data/products.ts` to add your recommended products.
4. Customize theme colors in `tailwind.config.ts`.

## 📁 Project Structure

```
├── content/          # Blog posts (MDX)
├── public/           # Static assets
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   ├── data/        # Data files and types
│   └── lib/         # Utility functions
```

## 🎨 Customization

### Theme

The theme can be customized in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
    }
  }
}
```

### Content

Update the following files to customize content:

- `src/data/resume.tsx`: Personal information and experience
- `src/data/products.ts`: Recommended products
- `content/*.mdx`: Blog posts

## 📝 Adding Blog Posts

Create a new MDX file in the `content` directory:

```mdx
---
title: "Your Post Title"
publishedAt: "2024-01-01"
summary: "Brief description of your post"
---

Your content here...
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📱 Progressive Web App

This website is PWA-ready with:
- Service Worker support
- Offline functionality
- Install prompt
- App manifest

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=StarKnightt/prasendev&type=Date)](https://www.star-history.com/#StarKnightt/prasendev&Date)


## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

## 📧 Contact

Your Name - [@Prasenjit](https://twitter.com/Star_Knight12)

Project Link: [Try it here](https://prasen.dev)