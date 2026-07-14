interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 22 }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 21 Q11 23 5 28 Q11 33 24 35 Z" fill="currentColor" opacity="0.85" />
      <path d="M24 21 Q37 23 43 28 Q37 33 24 35 Z" fill="currentColor" opacity="0.85" />
      <rect x="21.5" y="9" width="5" height="23" rx="2" fill="currentColor" />
      <rect x="15" y="16" width="18" height="5" rx="2" fill="currentColor" />
    </svg>
  );
}
