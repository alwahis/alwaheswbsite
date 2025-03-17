// Main JavaScript for Alwahes Website

document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements when they come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    animateElements.forEach(element => {
      element.classList.add('animate-fade-in');
    });
  }
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });
  
  // City rotation for hero section
  const cityElement = document.querySelector('.rotating-city');
  if (cityElement) {
    const cities = ['بغداد', 'البصرة', 'أربيل', 'الموصل', 'كربلاء', 'النجف', 'السليمانية', 'دهوك'];
    let currentIndex = 0;
    
    setInterval(() => {
      cityElement.style.opacity = 0;
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % cities.length;
        cityElement.textContent = cities[currentIndex];
        cityElement.style.opacity = 1;
      }, 500);
    }, 3000);
  }
});

// Add structured data for SEO
function addStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "عالواهس - منصة مشاركة الرحلات",
    "url": "https://alwahes.vercel.app",
    "applicationCategory": "TransportationApplication",
    "operatingSystem": "Web",
    "description": "منصة عالواهس لمشاركة الرحلات والتنقل بين المدن العراقية بسهولة وأمان",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IQD"
    },
    "author": {
      "@type": "Organization",
      "name": "عالواهس",
      "url": "https://alwahes.vercel.app",
      "email": "iraqsmartransport@gmail.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+9647850244072",
        "contactType": "customer service"
      }
    }
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Call the function to add structured data
addStructuredData();
