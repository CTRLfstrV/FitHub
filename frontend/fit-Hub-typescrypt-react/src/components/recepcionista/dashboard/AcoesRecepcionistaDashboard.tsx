import { Link } from "react-router-dom";

function AcoesRecepcionistaDashboard() {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-end">
      <button
        type="button"
        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-800 shadow-sm transition-colors hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM19 8v6M16 11h6" />
        </svg>
        Matricular alunos
      </button>
      <Link
        to="/recepcionista/gerenciamento-alunos"
        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-700 bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-green-800 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
      >
        Gerenciar alunos
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}

export default AcoesRecepcionistaDashboard;
