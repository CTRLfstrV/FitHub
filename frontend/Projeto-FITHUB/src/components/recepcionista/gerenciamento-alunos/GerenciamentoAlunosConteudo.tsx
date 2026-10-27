import type { MouseEvent } from "react";
import CabecalhoGerenciamentoAlunos from "./CabecalhoGerenciamentoAlunos";
import IndicadoresGerenciamentoAlunos from "./IndicadoresGerenciamentoAlunos";
import ListaContratosPendentes from "./ListaContratosPendentes";
import ListaPagamentos from "./ListaPagamentos";
import useGerenciamentoAlunos from "./useGerenciamentoAlunos";

function GerenciamentoAlunosConteudo() {
  const gerenciamento = useGerenciamentoAlunos();

  function rolarParaSecao(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const destino = document.getElementById(event.currentTarget.hash.slice(1));
    if (!destino) return;

    event.preventDefault();

    const hash = `#${destino.id}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }

    destino.focus({ preventScroll: true });
    destino.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoGerenciamentoAlunos />

        <nav
          aria-label="Atalhos do gerenciamento de alunos"
          className="sticky top-0 z-30 mt-3 mb-6 flex w-fit max-w-full flex-nowrap items-center gap-2 overflow-x-auto rounded-xl border border-[#dcebd0] bg-white/95 p-2 shadow-md backdrop-blur sm:mt-4 sm:mb-8"
        >
          <a
            href="#ativar-contratos"
            onClick={rolarParaSecao}
            className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-[#d5e6c8] bg-white px-3 py-2 text-[0.8125rem] font-semibold text-[#42642b] shadow-sm transition-colors hover:bg-[#f3f9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:px-4 sm:text-sm"
          >
            Ativar contratos
          </a>
          <a
            href="#gerenciar-pagamentos"
            onClick={rolarParaSecao}
            className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-[#d5e6c8] bg-white px-3 py-2 text-[0.8125rem] font-semibold text-[#42642b] shadow-sm transition-colors hover:bg-[#f3f9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:px-4 sm:text-sm"
          >
            Gerenciar pagamentos
          </a>
        </nav>

        <IndicadoresGerenciamentoAlunos
          quantidadeContratosAtivos={gerenciamento.quantidadeContratosAtivos}
          erroContratos={gerenciamento.erroContratos}
          quantidadeContratosPendentes={
            gerenciamento.quantidadeContratosPendentes
          }
          erroContratosPendentes={gerenciamento.erroContratosPendentes}
          carregando={gerenciamento.carregando}
          pendentes={gerenciamento.resumo.pendentes}
          atrasados={gerenciamento.resumo.atrasados}
        />

        <ListaContratosPendentes
          carregando={gerenciamento.carregando}
          mensagemErro={gerenciamento.mensagemErroContratosPendentes}
          contratos={gerenciamento.listaContratosPendentes}
          onAtivarContrato={gerenciamento.ativarContrato}
          onTentarNovamente={() => gerenciamento.setTentativa((valor) => valor + 1)}
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
