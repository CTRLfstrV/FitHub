import { useState } from "react";
import type { PlanoResponseDTO } from "../../../../types/financeiro/plano/PlanoResponseDTO";
import ModalCadastroPlano from "../cadastro/ModalCadastroPlano";
import CabecalhoVisaoGeralPlanos from "./CabecalhoVisaoGeralPlanos";
import EstadoListaPlanos from "./EstadoListaPlanos";
import ListaPlanos from "./ListaPlanos";
import useVisaoGeralPlanos from "./useVisaoGeralPlanos";

function VisaoGeralPlanosConteudo() {
  const {
    planos,
    quantidadePlanos,
    carregando,
    mutacaoEmAndamento,
    mensagemErro,
    aviso,
    cadastrarPlano,
    editarPlano,
    excluirPlano,
    tentarNovamente,
    limparAviso,
  } = useVisaoGeralPlanos();
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [planoEmEdicao, setPlanoEmEdicao] = useState<PlanoResponseDTO | undefined>();
  const mostrarEstado = carregando || Boolean(mensagemErro) || planos.length === 0;
  const totalPlanos = quantidadePlanos ?? planos.length;

  function abrirCadastro() {
    setPlanoEmEdicao(undefined);
    setModalCadastroAberto(true);
  }

  function fecharModal() {
    setModalCadastroAberto(false);
    setPlanoEmEdicao(undefined);
  }

  async function salvarPlano(dados: { nome: string; valor: number }) {
    if (planoEmEdicao) {
      await editarPlano(planoEmEdicao.id, dados);
      return;
    }

    await cadastrarPlano(dados);
  }

  function confirmarExclusao(plano: PlanoResponseDTO) {
    const confirmou = window.confirm(
      `Deseja excluir o plano "${plano.nome}"? Esta ação não pode ser desfeita.`,
    );
    if (!confirmou) return;

    void excluirPlano(plano.id).catch(() => undefined);
  }

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoVisaoGeralPlanos onAdicionarPlano={abrirCadastro} />

        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#252b21] sm:text-xl">
              Planos cadastrados
            </h2>
            <p className="mt-1 text-sm text-[#788270]">
              Consulte os valores e as informações de cada plano.
            </p>
          </div>
          {!carregando && !mensagemErro && (
            <span className="shrink-0 rounded-full border border-[#dcebd0] bg-[#f3f9ed] px-3 py-1 text-xs font-bold text-[#426b32] sm:text-sm">
              {totalPlanos} {totalPlanos === 1 ? "plano" : "planos"}
            </span>
          )}
        </div>

        {aviso && (
          <div
            role={aviso.tipo === "erro" ? "alert" : "status"}
            className={`mb-5 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
              aviso.tipo === "sucesso"
                ? "border-[#d5e8c4] bg-[#f3f9ed] text-[#356b3e]"
                : "border-[#f0ded9] bg-[#fff9f7] text-[#8b493e]"
            }`}
          >
            <span>{aviso.mensagem}</span>
            <button
              type="button"
              onClick={limparAviso}
              aria-label="Fechar mensagem"
              className="shrink-0 font-bold opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}

        {mostrarEstado ? (
          <EstadoListaPlanos
            carregando={carregando}
            mensagemErro={mensagemErro}
            vazio={planos.length === 0 && !mensagemErro}
            onTentarNovamente={tentarNovamente}
          />
        ) : (
          <ListaPlanos
            planos={planos}
            onEditar={(plano) => {
              setPlanoEmEdicao(plano);
              setModalCadastroAberto(true);
            }}
            onExcluir={confirmarExclusao}
            desabilitado={mutacaoEmAndamento}
          />
        )}
      </div>
      {modalCadastroAberto && (
        <ModalCadastroPlano
          onFechar={fecharModal}
          onSalvar={salvarPlano}
          plano={planoEmEdicao}
        />
      )}
    </section>
  );
}

export default VisaoGeralPlanosConteudo;
