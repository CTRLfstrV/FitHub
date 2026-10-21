import { Link } from "react-router-dom";

function CabecalhoDetalhesAluno({ nomeAluno }: { nomeAluno: string }) {
  const iniciais = nomeAluno
    .split(" ")
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <nav aria-label="Navegação estrutural" className="mb-5">
        <Link
          to="/recepcionista/gerenciamento-alunos"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[#64705b] transition-colors hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
            <path d="M9 12h12" />
          </svg>
          Voltar para gerenciamento de alunos
        </Link>
      </nav>

      <header className="mb-6 flex flex-col justify-between gap-5 sm:mb-8 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-col items-start gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4e8c3] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-green-800 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Detalhes do aluno
          </span>
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e8f5d9] text-xl font-bold text-green-800 ring-1 ring-inset ring-[#d4e8c3] sm:h-[76px] sm:w-[76px] sm:text-2xl"
            >
              {iniciais}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
                {nomeAluno}
              </h1>
              <p className="mt-1 text-sm leading-6 text-[#66705e] sm:text-base">
                Informações do contrato e acompanhamento dos pagamentos.
              </p>
            </div>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cfe4bd] bg-[#f3f9ed] px-3.5 py-2 text-sm font-semibold text-[#437524]">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          Contrato ativo
        </span>
      </header>
    </>
  );
}

export default CabecalhoDetalhesAluno;
