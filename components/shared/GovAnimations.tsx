"use client";

import { useEffect } from "react";

export default function GovAnimations() {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gov-visible");
            // Don't unobserve — keep visible once triggered
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all elements with scroll-animation classes
    const targets = document.querySelectorAll(
      ".gov-fade-up, .gov-fade-in, .gov-slide-left, .gov-slide-right, .gov-scale-in, .gov-stagger-child"
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
