import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../../services/RedirecionadorService";
import { PagamentoService } from "../../../services/financeiro/PagamentoService";
import type { DetalhesAlunoResponseDTO } from "../../../types/financeiro/DetalhesAlunoResponseDTO";

const pagamentoService = new PagamentoService();

function useDetalhesAluno(idAluno: number | null) {
  const navigate = useNavigate();
  const [detalhes, setDetalhes] =
    useState<DetalhesAlunoResponseDTO | null>(null);
  const [carregando, setCarregando] = useState(idAluno !== null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let componenteAtivo = true;

    if (idAluno === null) {
      setDetalhes(null);
      setCarregando(false);
      setMensagemErro("Identificador do aluno inválido.");
      return () => {
        componenteAtivo = false;
      };
    }

    const carregarDetalhes = async () => {
      setCarregando(true);
      setMensagemErro(null);
      setDetalhes(null);

      try {
        const resposta = await pagamentoService.DetalhesPagamentoAluno(idAluno);
        if (componenteAtivo) setDetalhes(resposta);
      } catch (erro) {
        if (!componenteAtivo) return;

        if (erro instanceof SessaoInvalidaException) {
          new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
          return;
        }

        setMensagemErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os detalhes do aluno.",
        );
      } finally {
        if (componenteAtivo) setCarregando(false);
      }
    };

    void carregarDetalhes();

    return () => {
      componenteAtivo = false;
    };
  }, [idAluno, tentativa, navigate]);

  return {
    detalhes,
    carregando,
    mensagemErro,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
  };
}

export default useDetalhesAluno;
