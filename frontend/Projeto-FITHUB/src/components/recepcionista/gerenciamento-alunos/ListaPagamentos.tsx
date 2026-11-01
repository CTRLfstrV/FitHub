import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import CabecalhoListaPagamentos from "./CabecalhoListaPagamentos";
import EstadoListaPagamentos from "./EstadoListaPagamentos";
import RodapeListaPagamentos from "./RodapeListaPagamentos";
import TabelaPagamentos from "./TabelaPagamentos";
import type { FiltroPagamento, FiltroStatus } from "./tipos";

interface ListaPagamentosProps {
  carregando: boolean;
  mensagemErro: string | null;
  estadoVazio: string;
  total: number;
  quantidadeContratosAtivos: number | null;
  filtros: FiltroPagamento[];
  filtroStatus: FiltroStatus;
  onFiltroStatusChange: (filtro: FiltroStatus) => void;
  busca: string;
  onBuscaChange: (busca: string) => void;
  pagamentos: PagamentoResponseDTO[];
  onTentarNovamente: () => void;
}

function ListaPagamentos({
  carregando,
  mensagemErro,
  estadoVazio,
  total,
  quantidadeContratosAtivos,
  filtros,
  filtroStatus,
  onFiltroStatusChange,
  busca,
  onBuscaChange,
  pagamentos,
  onTentarNovamente,
}: ListaPagamentosProps) {
  const mostrarEstado = carregando || mensagemErro !== null || pagamentos.length === 0;

  return (
    <section
      id="gerenciar-pagamentos"
      tabIndex={-1}
      aria-label="Lista de pagamentos dos alunos"
      className="fithub-card mt-6 scroll-mt-6 overflow-hidden focus:outline-none sm:mt-8"
    >
      <CabecalhoListaPagamentos
        carregando={carregando}
        total={total}
        quantidadeContratosAtivos={quantidadeContratosAtivos}
        filtros={filtros}
        filtroStatus={filtroStatus}
        onFiltroStatusChange={onFiltroStatusChange}
        busca={busca}
        onBuscaChange={onBuscaChange}
      />

      {mostrarEstado ? (
        <EstadoListaPagamentos
          carregando={carregando}
          mensagemErro={mensagemErro}
          estadoVazio={estadoVazio}
          onTentarNovamente={onTentarNovamente}
        />
      ) : (
        <TabelaPagamentos pagamentos={pagamentos} />
      )}

      <RodapeListaPagamentos
        carregando={carregando}
        mensagemErro={mensagemErro}
        quantidadeExibida={pagamentos.length}
        total={total}
      />
    </section>
  );
}

export default ListaPagamentos;

