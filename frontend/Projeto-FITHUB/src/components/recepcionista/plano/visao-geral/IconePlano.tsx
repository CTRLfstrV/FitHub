type IconePlanoProps = {
  className?: string;
};

function IconePlano({ className = "h-5 w-5" }: IconePlanoProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M9 9.5h22a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-13a4 4 0 0 1 4-4Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M5.5 16h29" stroke="#9ccc7d" strokeWidth="2" />
      <path d="M10 22h9m-9 4h6" stroke="#4e8244" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="28" cy="25" r="2.5" fill="#79ad59" />
    </svg>
  );
}

export default IconePlano;
