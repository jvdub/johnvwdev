import React from "react";

import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

import { MdxGallery } from "../components/MdxGallery";
import { MdxImage } from "../components/MdxImage";

import type { PostFrontmatter } from "./posts";
import { createHeadingIdFactory } from "./toc";

type MdxNode = {
  type?: string;
  tagName?: string;
  value?: unknown;
  properties?: Record<string, unknown>;
  children?: MdxNode[];
};

function getNodeText(node: MdxNode): string {
  if (typeof node?.value === "string") {
    return node.value;
  }

  if (!Array.isArray(node?.children)) {
    return "";
  }

  return node.children.map(getNodeText).join("");
}

function withHeadingIds() {
  return (tree: MdxNode) => {
    const getHeadingId = createHeadingIdFactory();

    const visit = (node: MdxNode) => {
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const headingText = getNodeText(node).trim();
        if (headingText.length > 0) {
          if (!node.properties) {
            node.properties = {};
          }
          node.properties.id = getHeadingId(headingText);
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

export async function compilePostMdx(
  source: string,
  options?: {
    addHeadingIds?: boolean;
  },
): Promise<React.ReactElement> {
  const rehypePlugins = options?.addHeadingIds ? [withHeadingIds] : [];

  const { content } = await compileMDX<PostFrontmatter>({
    source,
    components: {
      img: MdxImage,
      Image: MdxImage,
      Gallery: MdxGallery,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins,
      },
      parseFrontmatter: false,
    },
  });

  return content;
}
