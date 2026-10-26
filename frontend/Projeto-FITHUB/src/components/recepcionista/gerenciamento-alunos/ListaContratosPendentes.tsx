import type { ContratoPendenteResponseDTO } from "../../../types/financeiro/ContratoPendenteResponseDTO";
import TabelaContratosPendentes from "./TabelaContratosPendentes";

interface ListaContratosPendentesProps {
  carregando: boolean;
  mensagemErro: string | null;
  contratos: ContratoPendenteResponseDTO[] | null;
  onTentarNovamente: () => void;
}

function ListaContratosPendentes({
  carregando,
  mensagemErro,
  contratos,
  onTentarNovamente,
}: ListaContratosPendentesProps) {
  const quantidade = contratos?.length ?? 0;

  return (
    <section
      id="ativar-contratos"
      tabIndex={-1}
      aria-labelledby="titulo-contratos-pendentes"
      className="mt-6 scroll-mt-6 overflow-hidden rounded-2xl border border-[#dfe5da] bg-white shadow-[0_8px_28px_rgba(32,37,30,0.05)] focus:outline-none sm:mt-8"
    >
      <div className="flex flex-col gap-1 border-b border-[#e7ebe3] bg-gradient-to-r from-[#fbfdf8] to-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div>
          <h2
            id="titulo-contratos-pendentes"
            className="text-base font-semibold text-[#20251e] sm:text-lg"
          >
            Contratos pendentes de ativação
          </h2>
          <p className="mt-1 text-sm text-[#81897d]" aria-live="polite">
            {carregando
              ? "Buscando contratos..."
              : `${quantidade} ${quantidade === 1 ? "contrato pendente" : "contratos pendentes"}`}
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 sm:mt-0 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Aguardando ativação
        </span>
      </div>

      {carregando ? (
        <div className="flex min-h-44 flex-col items-center justify-center gap-3 px-5 py-10 text-center">
          <span
            className="h-7 w-7 animate-spin rounded-full border-2 border-[#dcebd0] border-t-green-700"
            role="status"
            aria-label="Carregando contratos pendentes"
          />
          <p className="text-sm text-[#747c70]">Carregando contratos...</p>
        </div>
      ) : mensagemErro ? (
        <div className="flex min-h-44 flex-col items-center justify-center gap-3 px-5 py-10 text-center">
          <p className="max-w-lg text-sm text-rose-700" role="alert">
            {mensagemErro}
          </p>
          <button
            type="button"
            onClick={onTentarNovamente}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Tentar novamente
          </button>
        </div>
      ) : quantidade === 0 ? (
        <p className="flex min-h-44 items-center justify-center px-5 py-10 text-center text-sm text-[#747c70]" role="status">
          Nenhum contrato pendente de ativação.
        </p>
      ) : (
        <TabelaContratosPendentes contratos={contratos ?? []} />
      )}

      <div className="flex flex-col gap-2 border-t border-[#e7ebe3] bg-[#fbfcfa] px-4 py-3 text-sm text-[#747c70] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs">
        <span>
          Exibindo {carregando || mensagemErro ? 0 : quantidade} de {quantidade} contratos
        </span>
        <span>Contratos aguardando ativação</span>
      </div>
    </section>
  );
}

export default ListaContratosPendentes;
