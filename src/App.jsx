/**
 * MAIN APP COMPONENT
 * =================
 * 
 * Root component that orchestrates the entire application.
 * Handles routing, fullscreen viewing, and scroll-to-top functionality.
 */

import React, { useState, useEffect } from 'react';

// Layout components
import { GlobalStyles } from './components/Layout/GlobalStyles';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Layout/Footer';
import { FloatingButtons } from './components/Layout/FloatingButtons';

// Section components  
import { HeroSection } from './components/Sections/HeroSection';
import { RoomsSection } from './components/Sections/RoomsSection';
import { Gallery } from './components/Gallery/Gallery';
import { FAQ } from './components/FAQ/FAQ';

// Viewer component
import { FullscreenViewer } from './components/Viewer/FullscreenViewer';

// Data and utilities
import { findRoomBySlug } from './data/rooms';
import { galleryImages } from './data/gallery';

/**
 * Main application component
 */
export default function App() {
  // Fullscreen viewer state
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [viewerSlug, setViewerSlug] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Determine URL handling strategy (hash for file:// protocol)
  const useHashNavigation = typeof window !== 'undefined' && 
    window.location.protocol === 'file:';

  /**
   * Opens fullscreen room viewer
   */
  const openRoomViewer = (slug, index = 0) => {
    const room = findRoomBySlug(slug);
    if (!room) return;

    const path = `/view/room/${slug}/${index}`;
    
    // Update browser URL
    if (useHashNavigation) {
      window.location.hash = `#${path}`;
    } else {
      history.pushState({ slug, index }, "", path);
    }

    // Update state
    setIsFullscreenMode(true);
    setViewerSlug(slug);
    setViewerIndex(index);
  };

  /**
   * Opens fullscreen gallery viewer
   */
  const openGalleryViewer = (index = 0) => {
    const path = `/view/gallery/${index}`;
    
    // Update browser URL
    if (useHashNavigation) {
      window.location.hash = `#${path}`;
    } else {
      history.pushState({ gallery: true, index }, "", path);
    }

    // Update state
    setIsFullscreenMode(true);
    setViewerSlug('gallery');
    setViewerIndex(index);
  };

  /**
   * Parses current URL to determine if we should show fullscreen viewer
   */
  const parseCurrentLocation = () => {
    const { pathname, hash } = window.location;
    
    // Helper to split path into segments
    const getPathSegments = (path) => path.split('/').filter(Boolean);
    
    let pathSegments = null;

    // Check for room anchor links first (e.g., #standart-2-1)
    if (hash && !hash.startsWith('#/view/')) {
      const roomSlug = hash.slice(1); // Remove the #
      const room = findRoomBySlug(roomSlug);
      if (room) {
        // Scroll to the room element after a short delay
        setTimeout(() => {
          const element = document.getElementById(roomSlug);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        return;
      }
    }

    // Check for fullscreen viewer paths
    if (pathname.startsWith('/view/room/') || pathname.startsWith('/view/gallery/')) {
      pathSegments = getPathSegments(pathname);
    } else if (hash.startsWith('#/view/room/') || hash.startsWith('#/view/gallery/')) {
      pathSegments = getPathSegments(hash.slice(1));
    }

    // Parse room viewer URL
    if (pathSegments && pathSegments.length >= 2) {
      if (pathSegments[1] === 'room' && pathSegments.length >= 3) {
        const slug = pathSegments[2];
        const index = parseInt(pathSegments[3] || '0', 10) || 0;
        
        setIsFullscreenMode(true);
        setViewerSlug(slug);
        setViewerIndex(index);
        return;
      }

      // Parse gallery viewer URL
      if (pathSegments[1] === 'gallery') {
        const index = parseInt(pathSegments[2] || '0', 10) || 0;
        
        setIsFullscreenMode(true);
        setViewerSlug('gallery');
        setViewerIndex(index);
        return;
      }
    }

    // Default to normal page view
    setIsFullscreenMode(false);
  };

  /**
   * Handle scroll-to-top button visibility
   * Shows when footer comes into view or after significant scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      // Fallback: show after scrolling down significantly
      if (window.scrollY > 10000) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    const footer = document.getElementById('page-footer');
    let intersectionObserver;

    // Use Intersection Observer if available to detect footer visibility
    if ('IntersectionObserver' in window && footer) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          const isFooterVisible = entry.isIntersecting;
          setShowScrollToTop(isFooterVisible);
        },
        {
          root: null,
          // Trigger when footer is 60% into view
          rootMargin: '0px 0px -60% 0px',
          threshold: 0,
        }
      );
      
      intersectionObserver.observe(footer);
    }

    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      intersectionObserver?.disconnect();
    };
  }, []);

  /**
   * Set up URL parsing and navigation handlers
   */
  useEffect(() => {
    // Parse initial URL
    parseCurrentLocation();

    // Handle browser back/forward navigation
    const handlePopState = () => parseCurrentLocation();
    const handleHashChange = () => parseCurrentLocation();

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // FULLSCREEN VIEWER MODE
  if (isFullscreenMode && viewerSlug) {
    
    // Exit fullscreen handler
    const exitFullscreen = () => {
      if (useHashNavigation) {
        window.location.hash = '#/';
      } else {
        history.back();
      }
      setIsFullscreenMode(false);
    };

    // Handle index changes in viewer
    const handleIndexChange = (newIndex) => {
      const path = viewerSlug === 'gallery' 
        ? `/view/gallery/${newIndex}`
        : `/view/room/${viewerSlug}/${newIndex}`;
      
      if (useHashNavigation) {
        window.location.hash = `#${path}`;
      } else {
        const stateData = viewerSlug === 'gallery' 
          ? { gallery: true, index: newIndex }
          : { slug: viewerSlug, index: newIndex };
        history.replaceState(stateData, "", path);
      }
    };

    // Gallery viewer
    if (viewerSlug === 'gallery') {
      return (
        <>
          <GlobalStyles />
          <FullscreenViewer 
            slug={viewerSlug}
            images={galleryImages} 
            index={viewerIndex}
            title="Галерея"
            onExit={exitFullscreen}
            onIndexChange={handleIndexChange}
          />
        </>
      );
    }

    // Room viewer
    const room = findRoomBySlug(viewerSlug);
    const roomImages = room?.images || [];
    const roomTitle = room?.title || 'Просмотр';

    return (
      <>
        <GlobalStyles />
        <FullscreenViewer 
          slug={viewerSlug}
          images={roomImages}
          index={viewerIndex}
          title={roomTitle}
          onExit={exitFullscreen}
          onIndexChange={handleIndexChange}
        />
      </>
    );
  }

  // NORMAL PAGE MODE
  return (
    <div id="top" className="scroll-smooth">
      <GlobalStyles />
      <Navigation />
      
      {/* Main content sections */}
      <HeroSection />
      <RoomsSection onOpenStandalone={openRoomViewer} />
      <Gallery onOpenFullscreen={openGalleryViewer} />
      <FAQ />
      
      <Footer />
      <FloatingButtons showScrollToTop={showScrollToTop} />
    </div>
  );
}