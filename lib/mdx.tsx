import React from "react";

import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Pluggable } from "unified";

import { MdxGallery } from "../components/MdxGallery";
import { MdxImage } from "../components/MdxImage";
import { MdxPre } from "../components/MdxPre";

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

const prettyCodeOptions = {
  theme: {
    dark: "github-dark-default",
    light: "github-light-default",
  },
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  keepBackground: false,
  onVisitLine(node: MdxNode) {
    if (!Array.isArray(node.children) || node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export async function compilePostMdx(
  source: string,
  options?: {
    addHeadingIds?: boolean;
  },
): Promise<React.ReactElement> {
  const rehypePlugins: Pluggable[] = [
    [rehypePrettyCode, prettyCodeOptions],
    ...(options?.addHeadingIds ? [withHeadingIds] : []),
  ];

  const { content } = await compileMDX<PostFrontmatter>({
    source,
    components: {
      img: MdxImage,
      Image: MdxImage,
      Gallery: MdxGallery,
      pre: MdxPre,
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
