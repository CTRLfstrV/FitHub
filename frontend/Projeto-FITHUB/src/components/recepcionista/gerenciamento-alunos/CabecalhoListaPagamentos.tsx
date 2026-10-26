import FiltrosPagamento from "./FiltrosPagamento";
import type { FiltroPagamento, FiltroStatus } from "./tipos";

interface CabecalhoListaPagamentosProps {
  carregando: boolean;
  total: number;
  quantidadeContratosAtivos: number | null;
  filtros: FiltroPagamento[];
  filtroStatus: FiltroStatus;
  onFiltroStatusChange: (filtro: FiltroStatus) => void;
  busca: string;
  onBuscaChange: (busca: string) => void;
}

function CabecalhoListaPagamentos({
  carregando,
  total,
  quantidadeContratosAtivos,
  filtros,
  filtroStatus,
  onFiltroStatusChange,
  busca,
  onBuscaChange,
}: CabecalhoListaPagamentosProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#e7ebe3] bg-gradient-to-r from-[#fbfdf8] to-white p-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#20251e] sm:text-lg">
            Gerencie os pagamentos dos alunos com contrato ativo
          </h2>
          <p className="mt-1 text-sm text-[#81897d]">
            {carregando
              ? "Buscando registros..."
              : `${total} ${total === 1 ? "parcela" : "parcelas"} em contratos ativos`}
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4f8ef] px-3 py-1.5 text-sm font-medium text-[#59634f] sm:mt-0 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          {quantidadeContratosAtivos ?? "—"} contratos ativos
        </span>
      </div>

      <FiltrosPagamento
        busca={busca}
        onBuscaChange={onBuscaChange}
        filtroStatus={filtroStatus}
        onFiltroStatusChange={onFiltroStatusChange}
        filtros={filtros}
      />
    </div>
  );
}

export default CabecalhoListaPagamentos;
