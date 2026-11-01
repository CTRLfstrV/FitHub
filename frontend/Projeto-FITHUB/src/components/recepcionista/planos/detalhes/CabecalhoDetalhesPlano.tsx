import { Link } from "react-router-dom";
import type { PlanoDetalhesResponseDTO } from "../../../../types/financeiro/plano/PlanoDetalhesResponseDTO";
import IconePlano from "../../plano/visao-geral/IconePlano";

function CabecalhoDetalhesPlano({ plano }: { plano: PlanoDetalhesResponseDTO }) {
  return (
    <>
      <nav aria-label="Navegação estrutural" className="mb-5">
        <Link
          to="/recepcionista/planos"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dcebd0] bg-white px-4 py-2 text-sm font-semibold text-[#42642b] shadow-sm transition hover:-translate-x-0.5 hover:bg-[#f3f9ed] hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
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
          Voltar para planos
        </Link>
      </nav>

      <header className="relative isolate mb-6 flex flex-col justify-between gap-5 overflow-hidden rounded-[1.75rem] border border-[#d5e8c4] bg-gradient-to-br from-[#e9f5dc] via-[#f8fcf4] to-white p-5 shadow-[0_14px_36px_rgba(65,104,32,0.09)] sm:mb-8 sm:flex-row sm:items-center sm:p-7 lg:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-14 -top-24 h-64 w-64 rounded-full bg-[#d9efc4]/70 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-1/3 h-44 w-44 rounded-full border-[24px] border-white/50"
        />

        <div className="relative z-10 flex min-w-0 flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4e8c3] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-green-800 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Detalhes do plano
          </span>
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-[#2f7b36] to-[#7eaf45] text-white shadow-lg shadow-green-900/15 ring-4 ring-white/80 sm:h-[82px] sm:w-[82px]">
              <IconePlano className="h-11 w-11 sm:h-14 sm:w-14" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
              <h1 className="block w-full break-words text-2xl font-extrabold leading-[1.15] tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
                {plano.nome}
              </h1>
              <p className="mt-1 text-sm leading-6 text-[#66705e] sm:text-base">
                Dados do plano e contratos vinculados.
              </p>
            </div>
          </div>
        </div>

        <span className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-[#dce7d7] bg-white/90 px-4 py-2.5 text-sm font-bold text-[#4b6750] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#79ad59]" />
          {plano.contratos.length} {plano.contratos.length === 1 ? "contrato" : "contratos"}
        </span>
      </header>
    </>
  );
}

export default CabecalhoDetalhesPlano;
