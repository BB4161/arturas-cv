# Artūras Pščelovskis - Professional CV Website

A modern, responsive portfolio website showcasing my experience as an Engineering Manager specializing in Data Infrastructure & Innovation.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Automatic theme switching with user preference persistence
- **Interactive Timeline**: Expandable career journey with detailed accomplishments
- **Skills Visualization**: Dynamic radar charts showing technical and leadership competencies
- **Progressive Web App**: Installable with offline functionality
- **Performance Optimized**: Fast loading with service worker caching
- **Accessibility First**: Full keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/BB4161/arturas-cv.git
   cd arturas-cv
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
arturas-cv/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker for caching
├── chart-manager.js       # Skills chart management
├── performance-tracker.js # Performance monitoring
├── robots.txt            # SEO robots file
├── fonts/                # Custom Inter font files
│   ├── inter.css
│   ├── Inter-400.ttf
│   ├── Inter-500.ttf
│   ├── Inter-600.ttf
│   └── Inter-700.ttf
├── images/               # Profile photos and assets
│   ├── profile-photo.jpg
│   ├── profile-photo.webp
│   ├── profile-photo-dark.jpg
│   ├── profile-photo-dark.webp
│   └── danske-bank-logo.svg
└── videos/               # Profile animation videos
    ├── arturas CV-video.mp4
    └── arturas CV-video-DARK.mp4
```

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS (CDN)
- **Charts**: Chart.js for skills visualization
- **PWA**: Service Worker + Web App Manifest
- **Typography**: Inter font family
- **Icons**: Heroicons (inline SVG)

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 Development

### Key Components

1. **Theme System**: CSS custom properties with JavaScript toggle
2. **Chart Manager**: Responsive radar charts with theme awareness
3. **Timeline**: Interactive career progression with smooth animations
4. **Performance Tracking**: Core Web Vitals monitoring
5. **Service Worker**: Caching strategy for offline functionality

### Code Quality
- Semantic HTML5 markup
- Accessible design patterns
- Progressive enhancement
- Error handling and fallbacks
- Performance optimizations

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Loading**: < 2s on 3G networks
- **Bundle Size**: Minimal with CDN dependencies

## 🌐 SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap ready
- Mobile-friendly

## 📄 License

This project is licensed under the MIT License - see the code for personal/educational use.

## 📞 Contact

**Artūras Pščelovskis**
- Email: psceartu@gmail.com
- Phone: +370 629 56412
- LinkedIn: [arturas-p](https://www.linkedin.com/in/arturas-p)
- Location: Vilnius, Lithuania

---

*Built with ❤️ using modern web technologies*
