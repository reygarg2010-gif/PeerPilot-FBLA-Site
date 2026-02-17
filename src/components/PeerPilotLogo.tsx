export default function PeerPilotLogo({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="PeerPilot logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.25"
      />

      {/* Inner ring */}
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.45"
      />

      {/* Compass needle / arrow */}
      <path
        d="M35.5 16L26 37.5L48 28L35.5 16Z"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Center dot */}
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
    </svg>
  );
}
