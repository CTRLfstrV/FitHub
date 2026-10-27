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
          className="sticky top-0 z-10 mt-3 mb-6 flex w-fit max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#dcebd0] bg-gradient-to-r from-[#f3f9ed]/95 via-white/95 to-[#f7fbf3]/95 p-2 shadow-[0_10px_28px_rgba(49,83,34,0.12)] backdrop-blur-md sm:mt-4 sm:mb-8 sm:gap-2"
        >
          <a
            href="#ativar-contratos"
            onClick={rolarParaSecao}
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-[#e1ecd8] bg-white px-2 py-2 text-[0.8125rem] font-bold text-[#365b2b] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#b9d7a3] hover:bg-[#fbfdf8] hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:gap-2.5 sm:px-3 sm:text-sm"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#e5f3d7] to-[#f3f9ed] text-green-800 ring-1 ring-inset ring-[#d8e9cb] transition-colors group-hover:from-green-700 group-hover:to-[#4e8e39] group-hover:text-white group-hover:ring-green-700 sm:h-8 sm:w-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 3.5h7l4 4V20H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
                <path d="M14 3.5V8h4M8.5 14l2.2 2.2 4.8-5" />
              </svg>
            </span>
            <span className="whitespace-nowrap">Ativar contratos</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-0.5 hidden h-4 w-4 shrink-0 text-[#91a584] transition group-hover:translate-y-0.5 group-hover:text-green-700 sm:block"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </a>
          <a
            href="#gerenciar-pagamentos"
            onClick={rolarParaSecao}
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-[#e1ecd8] bg-white px-2 py-2 text-[0.8125rem] font-bold text-[#365b2b] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#b9d7a3] hover:bg-[#fbfdf8] hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:gap-2.5 sm:px-3 sm:text-sm"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#e5f3d7] to-[#f3f9ed] text-green-800 ring-1 ring-inset ring-[#d8e9cb] transition-colors group-hover:from-green-700 group-hover:to-[#4e8e39] group-hover:text-white group-hover:ring-green-700 sm:h-8 sm:w-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M3 10h18M7 15h3" />
              </svg>
            </span>
            <span className="whitespace-nowrap">Gerenciar pagamentos</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-0.5 hidden h-4 w-4 shrink-0 text-[#91a584] transition group-hover:translate-y-0.5 group-hover:text-green-700 sm:block"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
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
