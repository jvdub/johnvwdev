import React from "react";

import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

import { MdxGallery } from "../components/MdxGallery";
import { MdxImage } from "../components/MdxImage";

import type { PostFrontmatter } from "./posts";

export async function compilePostMdx(
  source: string,
): Promise<React.ReactElement> {
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
      },
      parseFrontmatter: false,
    },
  });

  return content;
}
