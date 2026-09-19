'use client';

import { useState, useMemo } from 'react';
import BlogHero from '@/components/blogs/BlogHero';
import BlogPortfolio from '@/components/blogs/BlogPortfolio';

/**
 * Interactive Client Controller for /blogs
 * 
 * Orchestrates category filter state between BlogHero and BlogPortfolio:
 * - Instant client-side topic filtering without page reload
 * - Accessible state transitions
 * - Preserves server-side SEO generation in app/blogs/page.js
 */
export default function BlogsClientView({ allBlogs = [], allCategories = [] }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredBlogs = useMemo(() => {
    if (!activeCategory) return allBlogs;
    return allBlogs.filter(
      (blog) =>
        blog.category &&
        blog.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [allBlogs, activeCategory]);

  const handleResetCategory = () => {
    setActiveCategory(null);
  };

  return (
    <div className="w-full bg-[#FAF6F0]">
      {/* 1. Editorial Hero & Topic Selector */}
      <BlogHero
        categories={allCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 2. Adaptive Editorial Portfolio */}
      <BlogPortfolio
        blogs={filteredBlogs}
        activeCategory={activeCategory}
        onResetCategory={handleResetCategory}
      />
    </div>
  );
}
