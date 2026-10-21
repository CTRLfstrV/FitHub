export type Icone = "busca" | "alunos" | "calendario" | "email";

function Icon({
  nome,
  className = "h-5 w-5",
}: {
  nome: Icone;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {nome === "busca" ? (
        <>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </>
      ) : null}
      {nome === "alunos" ? (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
        </>
      ) : null}
      {nome === "calendario" ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </>
      ) : null}
      {nome === "email" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      ) : null}
    </svg>
  );
}

export default Icon;
