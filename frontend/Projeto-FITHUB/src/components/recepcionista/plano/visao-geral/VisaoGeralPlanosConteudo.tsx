import { useState } from "react";
import ModalCadastroPlano from "../cadastro/ModalCadastroPlano";
import CabecalhoVisaoGeralPlanos from "./CabecalhoVisaoGeralPlanos";
import EstadoListaPlanos from "./EstadoListaPlanos";
import ListaPlanos from "./ListaPlanos";
import useVisaoGeralPlanos from "./useVisaoGeralPlanos";

function VisaoGeralPlanosConteudo() {
  const { planos, carregando, mensagemErro, cadastrarPlano } =
    useVisaoGeralPlanos();
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const mostrarEstado = carregando || Boolean(mensagemErro) || planos.length === 0;

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoVisaoGeralPlanos
          onAdicionarPlano={() => setModalCadastroAberto(true)}
        />

        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#252b21] sm:text-xl">
              Planos cadastrados
            </h2>
            <p className="mt-1 text-sm text-[#788270]">
              Consulte os valores e as informações de cada plano.
            </p>
          </div>
          {!carregando && !mensagemErro && planos.length > 0 && (
            <span className="shrink-0 rounded-full border border-[#dcebd0] bg-[#f3f9ed] px-3 py-1 text-xs font-bold text-[#426b32] sm:text-sm">
              {planos.length} {planos.length === 1 ? "plano" : "planos"}
            </span>
          )}
        </div>

        {mostrarEstado ? (
          <EstadoListaPlanos
            carregando={carregando}
            mensagemErro={mensagemErro}
            vazio={planos.length === 0 && !mensagemErro}
          />
        ) : (
          <ListaPlanos planos={planos} />
        )}
      </div>
      {modalCadastroAberto && (
        <ModalCadastroPlano
          onFechar={() => setModalCadastroAberto(false)}
          onSalvar={cadastrarPlano}
        />
      )}
    </section>
  );
}

export default VisaoGeralPlanosConteudo;
