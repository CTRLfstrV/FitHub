import CabecalhoGerenciamentoAlunos from "./CabecalhoGerenciamentoAlunos";
import IndicadoresGerenciamentoAlunos from "./IndicadoresGerenciamentoAlunos";
import ListaPagamentos from "./ListaPagamentos";
import useGerenciamentoAlunos from "./useGerenciamentoAlunos";

function GerenciamentoAlunosConteudo() {
  const gerenciamento = useGerenciamentoAlunos();

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoGerenciamentoAlunos />

        <IndicadoresGerenciamentoAlunos
          quantidadeContratosAtivos={gerenciamento.quantidadeContratosAtivos}
          erroContratos={gerenciamento.erroContratos}
          carregando={gerenciamento.carregando}
          pendentes={gerenciamento.resumo.pendentes}
          atrasados={gerenciamento.resumo.atrasados}
        />

        <ListaPagamentos
          carregando={gerenciamento.carregando}
          mensagemErro={gerenciamento.mensagemErro}
          estadoVazio={gerenciamento.estadoVazio}
          total={gerenciamento.resumo.total}
          quantidadeContratosAtivos={gerenciamento.quantidadeContratosAtivos}
          filtros={gerenciamento.filtros}
          filtroStatus={gerenciamento.filtroStatus}
          onFiltroStatusChange={gerenciamento.setFiltroStatus}
          busca={gerenciamento.busca}
          onBuscaChange={gerenciamento.setBusca}
          pagamentos={gerenciamento.pagamentosFiltrados}
          onTentarNovamente={() => gerenciamento.setTentativa((valor) => valor + 1)}
        />
      </div>
    </section>
  );
}

export default GerenciamentoAlunosConteudo;
