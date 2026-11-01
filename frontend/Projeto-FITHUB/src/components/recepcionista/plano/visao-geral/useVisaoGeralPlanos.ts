import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../../../services/RedirecionadorService";
import { PlanoService } from "../../../../services/financeiro/PlanoService";
import type { PlanoCadastroDTO } from "../../../../types/financeiro/plano/PlanoCadastroDTO";
import type { PlanoResponseDTO } from "../../../../types/financeiro/plano/PlanoResponseDTO";

const planoService = new PlanoService();

type AvisoPlanos = {
  tipo: "sucesso" | "erro";
  mensagem: string;
};

function useVisaoGeralPlanos() {
  const navigate = useNavigate();
  const [planos, setPlanos] = useState<PlanoResponseDTO[]>([]);
  const [quantidadePlanos, setQuantidadePlanos] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [mutacaoEmAndamento, setMutacaoEmAndamento] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<AvisoPlanos | null>(null);
  const [tentativa, setTentativa] = useState(0);

  const carregarDados = useCallback(async (exibirCarregamento = true): Promise<boolean> => {
    if (exibirCarregamento) setCarregando(true);
    setMensagemErro(null);

    const [resultadoPlanos, resultadoQuantidade] = await Promise.allSettled([
      planoService.ListarPlanos(),
      planoService.QuantidadePlano(),
    ]);

    const sessaoInvalida = [resultadoPlanos, resultadoQuantidade].some(
      (resultado) =>
        resultado.status === "rejected" &&
        resultado.reason instanceof SessaoInvalidaException,
    );

    if (sessaoInvalida) {
      new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
      setCarregando(false);
      return false;
    }

    if (resultadoPlanos.status === "fulfilled") {
      setPlanos(resultadoPlanos.value);
      setMensagemErro(null);
    } else {
      setMensagemErro("Verifique sua conexão e tente novamente.");
    }

    if (resultadoQuantidade.status === "fulfilled") {
      setQuantidadePlanos(resultadoQuantidade.value);
    } else if (resultadoPlanos.status === "fulfilled") {
      setQuantidadePlanos(resultadoPlanos.value.length);
    }

    setCarregando(false);
    return resultadoPlanos.status === "fulfilled";
  }, [navigate]);

  async function executarMutacao(
    operacao: () => Promise<string>,
    mensagemSucesso: string,
  ) {
    setMutacaoEmAndamento(true);
    setAviso(null);

    try {
      await operacao();
      const listaAtualizada = await carregarDados(false);
      setAviso({
        tipo: listaAtualizada ? "sucesso" : "erro",
        mensagem: listaAtualizada
          ? mensagemSucesso
          : "A alteração foi salva, mas não foi possível atualizar a lista. Tente recarregar a página.",
      });
    } catch (erro: unknown) {
      if (erro instanceof SessaoInvalidaException) {
        new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
      } else {
        setAviso({
          tipo: "erro",
          mensagem:
            erro instanceof Error
              ? erro.message
              : "Não foi possível concluir a operação. Tente novamente.",
        });
      }
      throw erro;
    } finally {
      setMutacaoEmAndamento(false);
    }
  }

  async function cadastrarPlano(plano: PlanoCadastroDTO) {
    await executarMutacao(
      () => planoService.CadastrarPlano(plano),
      "Plano cadastrado com sucesso.",
    );
  }

  async function editarPlano(idPlano: number, plano: PlanoCadastroDTO) {
    await executarMutacao(
      () => planoService.EdicaoPlano(idPlano, plano),
      "Plano atualizado com sucesso.",
    );
  }

  async function excluirPlano(idPlano: number) {
    await executarMutacao(
      () => planoService.DeletarPlano(idPlano),
      "Plano excluído com sucesso.",
    );
  }

  useEffect(() => {
    void carregarDados();
  }, [carregarDados, tentativa]);

  return {
    planos,
    quantidadePlanos,
    carregando,
    mutacaoEmAndamento,
    mensagemErro,
    aviso,
    cadastrarPlano,
    editarPlano,
    excluirPlano,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
    limparAviso: () => setAviso(null),
  };
}

export default useVisaoGeralPlanos;
