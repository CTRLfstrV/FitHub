import Icon from "./Icon";
import type { FiltroPagamento, FiltroStatus } from "./tipos";

interface FiltrosPagamentoProps {
  busca: string;
  onBuscaChange: (busca: string) => void;
  filtroStatus: FiltroStatus;
  onFiltroStatusChange: (filtro: FiltroStatus) => void;
  filtros: FiltroPagamento[];
}

function FiltrosPagamento({
  busca,
  onBuscaChange,
  filtroStatus,
  onFiltroStatusChange,
  filtros,
}: FiltrosPagamentoProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div
        className="flex min-w-0 gap-2 overflow-x-auto pb-1 md:flex-1"
        role="group"
        aria-label="Filtrar pagamentos por status"
      >
        {filtros.map((filtro) => {
          const selecionado = filtroStatus === filtro.id;
          return (
            <button
              key={filtro.id}
              type="button"
              aria-pressed={selecionado}
              onClick={() => onFiltroStatusChange(filtro.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${selecionado ? "border-green-700 bg-green-700 text-white" : "border-[#dfe5da] bg-white text-[#59634f] hover:bg-[#f4f8ef]"}`}
            >
              {filtro.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs ${selecionado ? "bg-white/20 text-white" : "bg-[#f1f4ed] text-[#66705e]"}`}
              >
                {filtro.quantidade}
              </span>
            </button>
          );
        })}
      </div>
      <label className="flex h-12 w-full shrink-0 items-center gap-3 rounded-lg border border-[#dfe5da] bg-[#fbfcfa] px-4 transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/15 md:w-[340px]">
        <Icon nome="busca" className="h-5 w-5 shrink-0 text-[#747c70]" />
        <input
          type="search"
          aria-label="Buscar alunos ou pagamentos"
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
          placeholder="Buscar por nome, e-mail ou plano"
          className="h-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm leading-normal text-[#20251e] outline-none placeholder:text-[#92998e] focus:ring-0"
        />
      </label>
    </div>
  );
}

export default FiltrosPagamento;
