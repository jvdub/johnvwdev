import React from "react";
import { AUTHOR_HANDLE, SITE_URL } from "./site";

/**
 * JSON-LD utility functions for Schema.org structured data.
 * These functions generate structured data for better SEO and rich results.
 */

export type ArticleSchema = {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Person";
    name: string;
    url: string;
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string[];
};

export type PersonSchema = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  image: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
  alumniOf: Array<{
    "@type": "Organization";
    name: string;
  }>;
};

export type WebSiteSchema = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
};

export type BreadcrumbListSchema = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
};

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: params.imageUrl,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      "@type": "Person",
      name: "John Van Wagenen",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "John Van Wagenen",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    ...(params.keywords && params.keywords.length > 0
      ? { keywords: params.keywords }
      : {}),
  };
}

/**
 * Generate Person schema for about page
 */
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John Van Wagenen",
    url: SITE_URL,
    image: `${SITE_URL}/jvw_headshot.jpg`,
    jobTitle: "Senior Software Engineer & Technical Leader",
    description:
      "Software engineer and technical leader focused on pragmatic AI integration and full-stack development.",
    sameAs: [
      `https://github.com${AUTHOR_HANDLE.replace("@", "/")}`,
      `https://bsky.app/profile/${AUTHOR_HANDLE.replace("@", "")}`,
      `https://x.com/${AUTHOR_HANDLE}`,
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "Georgia Institute of Technology",
      },
      {
        "@type": "Organization",
        name: "Utah State University",
      },
    ],
  };
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "John Van Wagenen",
    url: SITE_URL,
    description:
      "Portfolio and blog of John Van Wagenen, software engineer and technical leader focused on pragmatic AI integration and full-stack development.",
    author: {
      "@type": "Person",
      name: "John Van Wagenen",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>,
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.url ? { item: crumb.url } : {}),
    })),
  };
}

/**
 * Helper function to render JSON-LD script tag
 */
export function renderJsonLd(data: object): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
