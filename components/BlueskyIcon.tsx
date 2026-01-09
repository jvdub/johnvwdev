type Props = {
  className?: string;
};

export function BlueskyIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 13c-1.3-2.4-3.7-5.1-6.7-6.9-1.2-.7-2.3.4-2.1 1.7.4 2.7 2.3 5.3 5.2 6.6" />
      <path d="M12 13c1.3-2.4 3.7-5.1 6.7-6.9 1.2-.7 2.3.4 2.1 1.7-.4 2.7-2.3 5.3-5.2 6.6" />
      <path d="M12 13c-.9 2.1-2.8 4.6-5.9 6.1-1.1.5-1.1 2 .1 2.4 2.6.8 4.9-.2 5.8-1.9" />
      <path d="M12 13c.9 2.1 2.8 4.6 5.9 6.1 1.1.5 1.1 2-.1 2.4-2.6.8-4.9-.2-5.8-1.9" />
    </svg>
  );
}
