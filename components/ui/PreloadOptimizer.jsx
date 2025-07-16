'use client';

import { useEffect } from 'react';

/**
 * PreloadOptimizer - Helps reduce CSS preloading warnings by ensuring
 * styles are only loaded when components are actually rendered
 */
const PreloadOptimizer = ({ children, cssFiles = [] }) => {
  useEffect(() => {
    // Remove any unused preloaded CSS files
    const removeUnusedPreloads = () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="style"]');

      preloadLinks.forEach((link) => {
        const href = link.getAttribute('href');
        // Check if this CSS file is actually used by checking for corresponding stylesheet
        const stylesheetExists = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);

        if (!stylesheetExists) {
          // Remove preload link if no corresponding stylesheet is found
          link.remove();
        }
      });
    };

    // Add a small delay to allow components to render
    const timer = setTimeout(removeUnusedPreloads, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Preload specified CSS files for this component
    cssFiles.forEach((cssFile) => {
      const existingPreload = document.querySelector(`link[rel="preload"][href="${cssFile}"]`);
      if (!existingPreload) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = cssFile;
        document.head.appendChild(link);
      }
    });
  }, [cssFiles]);

  return <>{children}</>;
};

export default PreloadOptimizer;
