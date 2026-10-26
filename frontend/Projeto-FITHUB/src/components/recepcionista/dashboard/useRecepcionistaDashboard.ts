import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../../services/RedirecionadorService";
import { ContratoService } from "../../../services/financeiro/ContratoService";
import { AlunoService } from "../../../services/usuarios/AlunoService";
import type { ContratoProximoVencimentoResponseDTO } from "../../../types/financeiro/ContratoProximoVencimentoResponseDTO";

const alunoService = new AlunoService();
const contratoService = new ContratoService();

function useRecepcionistaDashboard() {
  const navigate = useNavigate();
  const [mensagemErro, setMensagemErro] = useState<string>("...");
  const [quantidadeAlunos, setQuantidadeAlunos] = useState<number | null>();
  const [quantidadeContratosAtivos, setQuantidadeContratosAtivos] =
    useState<number | null>();
  const [quantidadeAlunosAtivos, setQuantidadeAlunosAtivos] =
    useState<number | null>();
  const [alunosContratoProximoFim, setAlunosContratoProximoFim] = useState<
    ContratoProximoVencimentoResponseDTO[] | null
  >();

  useEffect(() => {
    const tratarErro = (erro: unknown) => {
      if (erro instanceof SessaoInvalidaException) {
        new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
      } else if (erro instanceof Error) {
        setMensagemErro(erro.message);
      }
    };

    const carregarDados = async () => {
      try {
        const quantidade = await alunoService.QuantidadeAlunos();
        setQuantidadeAlunos(quantidade);
      } catch (erro) {
        tratarErro(erro);
      }

      try {
        const quantidade = await contratoService.ContratosAtivos();
        setQuantidadeContratosAtivos(quantidade);
      } catch (erro) {
        tratarErro(erro);
      }

      try {
        const quantidade = await alunoService.QuantidadeAlunosAtivos();
        setQuantidadeAlunosAtivos(quantidade);
      } catch (erro) {
        tratarErro(erro);
      }

      try {
        const contratos = await contratoService.ContratosProximosVencimento();
        setAlunosContratoProximoFim(contratos);
      } catch (erro) {
        tratarErro(erro);
      }
    };

    void carregarDados();
  }, [navigate]);

  return {
    mensagemErro,
    quantidadeAlunos,
    quantidadeContratosAtivos,
    quantidadeAlunosAtivos,
    alunosContratoProximoFim,
  };
}

export default useRecepcionistaDashboard;
