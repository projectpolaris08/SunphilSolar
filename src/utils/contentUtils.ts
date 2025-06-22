import React from "react";

/**
 * Extracts plain text content from React components for SEO purposes
 */
export const extractTextContent = (content: React.ReactNode): string => {
  if (typeof content === "string") {
    return content;
  }

  if (React.isValidElement(content)) {
    const children = content.props.children;
    if (children) {
      return extractTextContent(children);
    }
    return "";
  }

  if (Array.isArray(content)) {
    return content.map((child) => extractTextContent(child)).join(" ");
  }

  return "";
};

/**
 * Calculates word count from React content
 */
export const calculateWordCount = (content: React.ReactNode): number => {
  const text = extractTextContent(content);
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

/**
 * Estimates reading time based on word count
 */
export const estimateReadingTime = (
  wordCount: number,
  wordsPerMinute: number = 200
): number => {
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generates meta description from content
 */
export const generateMetaDescription = (
  content: React.ReactNode,
  maxLength: number = 160
): string => {
  const text = extractTextContent(content);
  if (text.length <= maxLength) {
    return text;
  }

  // Try to break at sentence boundaries
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let description = "";

  for (const sentence of sentences) {
    if ((description + sentence).length <= maxLength) {
      description += sentence;
    } else {
      break;
    }
  }

  // If no sentences fit, truncate at word boundary
  if (!description) {
    const words = text.split(" ");
    for (const word of words) {
      if ((description + " " + word).length <= maxLength) {
        description += (description ? " " : "") + word;
      } else {
        break;
      }
    }
  }

  return description.trim();
};

/**
 * Sanitizes text for SEO purposes
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/[^\w\s\-.,!?;:()]/g, "") // Remove special characters except basic punctuation
    .trim();
};

/**
 * Extracts headings from content for table of contents
 */
export const extractHeadings = (
  content: React.ReactNode
): Array<{ level: number; text: string; id: string }> => {
  const headings: Array<{ level: number; text: string; id: string }> = [];

  const traverse = (node: React.ReactNode) => {
    if (React.isValidElement(node)) {
      const tagName = node.type;
      if (typeof tagName === "string" && /^h[1-6]$/.test(tagName)) {
        const level = parseInt(tagName.charAt(1));
        const text = extractTextContent(node.props.children);
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        headings.push({ level, text, id });
      }

      if (node.props.children) {
        traverse(node.props.children);
      }
    } else if (Array.isArray(node)) {
      node.forEach(traverse);
    }
  };

  traverse(content);
  return headings;
};
