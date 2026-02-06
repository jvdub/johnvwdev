export function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-xs"
      style={{
        backgroundColor: "var(--bg2)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </div>
  );
}
