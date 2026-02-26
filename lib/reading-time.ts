const DEFAULT_READING_SPEED_WORDS_PER_MINUTE = 225;

function countWordsFromMdx(source: string): number {
  const withoutCodeBlocks = source.replace(/```[\s\S]*?```/g, " ");
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]*`/g, " ");
  const withoutImages = withoutInlineCode.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  const withoutLinks = withoutImages.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  const withoutJsxTags = withoutLinks.replace(/<[^>]+>/g, " ");
  const normalized = withoutJsxTags.replace(/[_*#>-]+/g, " ").trim();

  if (!normalized) {
    return 0;
  }

  const words = normalized.match(/[\p{L}\p{N}'’-]+/gu);
  return words?.length ?? 0;
}

export function getReadingTimeMinutesFromSource(
  source: string,
  wordsPerMinute: number = DEFAULT_READING_SPEED_WORDS_PER_MINUTE,
): number {
  if (wordsPerMinute <= 0) {
    throw new Error("wordsPerMinute must be greater than 0.");
  }

  const wordCount = countWordsFromMdx(source);
  return Math.round(wordCount / wordsPerMinute);
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "< 1 min read";
  }

  return `${minutes} min read`;
}
