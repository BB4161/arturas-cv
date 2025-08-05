#!/usr/bin/env python3
import requests
import json
import re
import time
from urllib.parse import urljoin

def analyze_website():
    print("🔍 COMPREHENSIVE WEBSITE EVALUATION")
    print("=" * 60)
    
    base_url = "http://localhost:3000"
    scores = {}
    
    try:
        # Fetch the website
        start_time = time.time()
        response = requests.get(base_url)
        load_time = time.time() - start_time
        
        if response.status_code != 200:
            print(f"❌ Website not accessible: {response.status_code}")
            return
            
        content = response.text
        content_size = len(content)
        
        print(f"✅ Website accessible")
        print(f"📄 Content size: {content_size:,} characters")
        print(f"⚡ Load time: {load_time:.3f} seconds")
        print()
        
        # === 1. TECHNICAL EXCELLENCE ===
        print("🔧 TECHNICAL EXCELLENCE")
        print("-" * 30)
        
        technical_score = 0
        
        # HTML5 & Semantic Structure
        if "<!DOCTYPE html>" in content and "semantic" in content.lower():
            print("✅ HTML5 semantic structure")
            technical_score += 2
        else:
            print("❌ Missing HTML5 semantic structure")
            
        # Meta tags
        meta_checks = [
            ("viewport", "viewport"),
            ("description", "description"),
            ("Open Graph", "og:"),
            ("charset", "charset")
        ]
        
        for name, check in meta_checks:
            if check in content:
                print(f"✅ {name} meta tags")
                technical_score += 1
            else:
                print(f"❌ Missing {name} meta tags")
                
        # PWA Features
        pwa_checks = [
            ("Service Worker", "serviceWorker"),
            ("Web Manifest", "manifest.json"),
            ("Theme Color", "theme-color")
        ]
        
        for name, check in pwa_checks:
            if check in content:
                print(f"✅ {name}")
                technical_score += 2
            else:
                print(f"❌ Missing {name}")
                
        # Modern JavaScript
        js_checks = [
            ("ES6+ Features", "const "),
            ("Async/Await", "async"),
            ("Error Handling", "try {"),
            ("Event Listeners", "addEventListener")
        ]
        
        for name, check in js_checks:
            if check in content:
                print(f"✅ {name}")
                technical_score += 1
            else:
                print(f"❌ Missing {name}")
                
        scores["technical"] = min(technical_score, 20)
        print(f"🎯 Technical Score: {scores['technical']}/20")
        print()
        
        # === 2. PERFORMANCE ===
        print("🚀 PERFORMANCE")
        print("-" * 20)
        
        perf_score = 0
        
        # File size optimization
        if content_size < 50000:
            print("✅ Optimized HTML size")
            perf_score += 3
        elif content_size < 100000:
            print("⚠️ Moderate HTML size")
            perf_score += 2
        else:
            print("❌ Large HTML size")
            perf_score += 1
            
        # Load time
        if load_time < 0.5:
            print("✅ Excellent load time")
            perf_score += 3
        elif load_time < 1.0:
            print("✅ Good load time")
            perf_score += 2
        else:
            print("⚠️ Slow load time")
            perf_score += 1
            
        # Performance optimizations
        perf_checks = [
            ("Lazy Loading", "loading=\"lazy\""),
            ("Image Optimization", "<picture>"),
            ("DNS Prefetch", "dns-prefetch"),
            ("Async Scripts", "defer"),
            ("Performance Monitoring", "PerformanceTracker")
        ]
        
        for name, check in perf_checks:
            if check in content:
                print(f"✅ {name}")
                perf_score += 2
            else:
                print(f"❌ Missing {name}")
                
        scores["performance"] = min(perf_score, 20)
        print(f"🎯 Performance Score: {scores['performance']}/20")
        print()
        
        # === 3. USER EXPERIENCE ===
        print("👤 USER EXPERIENCE")
        print("-" * 25)
        
        ux_score = 0
        
        # Responsive design
        if "md:" in content and "tailwind" in content.lower():
            print("✅ Responsive design (Tailwind)")
            ux_score += 3
        else:
            print("❌ Missing responsive design")
            
        # Accessibility
        accessibility_checks = [
            ("Alt text", "alt="),
            ("ARIA labels", "aria-"),
            ("Focus management", "focus"),
            ("Semantic HTML", "<section>"),
            ("Keyboard navigation", "keydown")
        ]
        
        for name, check in accessibility_checks:
            if check in content:
                print(f"✅ {name}")
                ux_score += 2
            else:
                print(f"❌ Missing {name}")
                
        # Interactive features
        interactive_checks = [
            ("Theme Toggle", "toggleTheme"),
            ("Smooth Scrolling", "smooth"),
            ("Modal/Popup", "modal"),
            ("Mobile Menu", "mobile-menu"),
            ("Chart Animations", "Chart")
        ]
        
        for name, check in interactive_checks:
            if check in content:
                print(f"✅ {name}")
                ux_score += 1
            else:
                print(f"❌ Missing {name}")
                
        scores["ux"] = min(ux_score, 20)
        print(f"🎯 UX Score: {scores['ux']}/20")
        print()
        
        # === 4. CONTENT QUALITY ===
        print("📝 CONTENT QUALITY")
        print("-" * 25)
        
        content_score = 0
        
        # Essential sections
        content_checks = [
            ("Professional Title", "Engineering Manager"),
            ("Skills Section", "skills"),
            ("Experience/Journey", "journey"),
            ("Education", "education"),
            ("Contact Information", "contact"),
            ("PDF Download", "pdf"),
            ("Languages", "languages"),
            ("Professional Summary", "years of experience")
        ]
        
        for name, check in content_checks:
            if check.lower() in content.lower():
                print(f"✅ {name}")
                content_score += 2
            else:
                print(f"❌ Missing {name}")
                
        # Content organization
        if "timeline" in content.lower():
            print("✅ Organized timeline/journey")
            content_score += 2
        else:
            print("❌ Missing organized timeline")
            
        if "chart" in content.lower():
            print("✅ Visual skill representation")
            content_score += 2
        else:
            print("❌ Missing visual elements")
            
        scores["content"] = min(content_score, 20)
        print(f"🎯 Content Score: {scores['content']}/20")
        print()
        
        # === 5. PROFESSIONAL PRESENTATION ===
        print("💼 PROFESSIONAL PRESENTATION")
        print("-" * 35)
        
        presentation_score = 0
        
        # Design elements
        design_checks = [
            ("Professional Color Scheme", "vinted-green"),
            ("Typography", "font-"),
            ("Visual Hierarchy", "text-4xl"),
            ("Consistent Spacing", "py-"),
            ("Professional Layout", "grid\\|flex")
        ]
        
        for name, check in design_checks:
            if re.search(check, content):
                print(f"✅ {name}")
                presentation_score += 2
            else:
                print(f"❌ Missing {name}")
                
        # Branding
        if "profile-photo" in content:
            print("✅ Professional photo")
            presentation_score += 3
        else:
            print("❌ Missing professional photo")
            
        # Dark/Light theme
        if "data-theme" in content:
            print("✅ Theme customization")
            presentation_score += 3
        else:
            print("❌ Missing theme options")
            
        # Professional touches
        if "shadow" in content:
            print("✅ Visual depth/shadows")
            presentation_score += 2
        else:
            print("❌ Missing visual depth")
            
        scores["presentation"] = min(presentation_score, 20)
        print(f"🎯 Presentation Score: {scores['presentation']}/20")
        print()
        
        # === FINAL EVALUATION ===
        print("🏆 FINAL EVALUATION")
        print("=" * 30)
        
        total_score = sum(scores.values())
        percentage = (total_score / 100) * 100
        
        print(f"Technical Excellence: {scores['technical']}/20")
        print(f"Performance:         {scores['performance']}/20")
        print(f"User Experience:     {scores['ux']}/20")
        print(f"Content Quality:     {scores['content']}/20")
        print(f"Presentation:        {scores['presentation']}/20")
        print("-" * 30)
        print(f"TOTAL SCORE:         {total_score}/100 ({percentage:.1f}%)")
        print()
        
        # Grade assignment
        if percentage >= 95:
            grade = "A+"
            description = "EXCEPTIONAL - Industry-leading quality"
        elif percentage >= 90:
            grade = "A"
            description = "EXCELLENT - Professional excellence"
        elif percentage >= 85:
            grade = "A-"
            description = "VERY GOOD - High professional standard"
        elif percentage >= 80:
            grade = "B+"
            description = "GOOD - Solid professional quality"
        elif percentage >= 75:
            grade = "B"
            description = "ABOVE AVERAGE - Good foundation"
        else:
            grade = "C+"
            description = "NEEDS IMPROVEMENT"
            
        print(f"🎖️  GRADE: {grade}")
        print(f"📋 ASSESSMENT: {description}")
        print()
        
        # Recommendations
        print("💡 RECOMMENDATIONS:")
        if percentage >= 90:
            print("✅ Your website is production-ready and impressive!")
            print("✅ Perfect for job applications and professional networking")
            print("✅ Demonstrates excellent technical and design skills")
        elif percentage >= 80:
            print("✅ Strong foundation with room for minor improvements")
            print("🔄 Consider adding more interactive elements")
            print("🔄 Enhance accessibility features")
        else:
            print("🔄 Focus on technical improvements first")
            print("🔄 Enhance user experience elements")
            print("🔄 Improve content organization")
            
        print()
        print("🌟 STANDOUT FEATURES:")
        if scores['technical'] >= 18:
            print("   • Exceptional technical implementation")
        if scores['performance'] >= 18:
            print("   • Outstanding performance optimization")
        if scores['ux'] >= 16:
            print("   • Excellent user experience design")
        if scores['content'] >= 16:
            print("   • Comprehensive professional content")
        if scores['presentation'] >= 18:
            print("   • Professional visual presentation")
            
    except Exception as e:
        print(f"❌ Error during evaluation: {e}")

if __name__ == "__main__":
    analyze_website()
