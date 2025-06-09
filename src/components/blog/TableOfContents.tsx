import React, { useEffect, useRef, useState } from "react";

// Utility to slugify heading text for anchor links
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRootSelector?: string; // Optional: CSS selector for the content root
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentRootSelector = ".prose",
}) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the content root (default: .prose)
    const contentRoot = document.querySelector(contentRootSelector);
    if (!contentRoot) return;
    // Find all h2 and h3 headings
    const headings = Array.from(contentRoot.querySelectorAll("h2, h3"));
    const tocItems: TocItem[] = headings.map((heading) => {
      let id = heading.id;
      if (!id) {
        id = slugify(heading.textContent || "");
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
    setToc(tocItems);
  }, [contentRootSelector, window.location.pathname]);

  if (toc.length === 0) return null;

  // Smooth scroll handler
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optionally update the URL hash without jumping
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      ref={tocRef}
      className="toc mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow max-w-xs"
      aria-label="Table of contents"
    >
      <h2 className="text-lg font-bold mb-3">On this page</h2>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="block px-2 py-1 rounded transition-all duration-150 text-blue-700 hover:text-blue-900 hover:font-bold hover:bg-blue-50 hover:border-l-4 hover:border-blue-500"
              onClick={(e) => handleTocClick(e, item.id)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
