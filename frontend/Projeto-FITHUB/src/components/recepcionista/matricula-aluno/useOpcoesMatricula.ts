import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../../exceptions/SessaoInvalidaException";
import { PagamentoService } from "../../../services/financeiro/PagamentoService";
import { PlanoService } from "../../../services/financeiro/PlanoService";
import { RedirecionadorService } from "../../../services/RedirecionadorService";
import { PessoaService } from "../../../services/usuarios/PessoaService";
import type { FormaPagamentoResponseDTO } from "../../../types/financeiro/FormaPagamentoResponseDTO";
import type { PlanoResponseDTO } from "../../../types/financeiro/plano/PlanoResponseDTO";
import type { SexoPessoaResponseDTO } from "../../../types/usuarios/SexoPessoaResponseDTO";

const planoService = new PlanoService();
const pessoaService = new PessoaService();
const pagamentoService = new PagamentoService();

function useOpcoesMatricula() {
  const navigate = useNavigate();
  const [planos, setPlanos] = useState<PlanoResponseDTO[]>([]);
  const [sexos, setSexos] = useState<SexoPessoaResponseDTO[]>([]);
  const [formasPagamento, setFormasPagamento] = useState<
    FormaPagamentoResponseDTO[]
  >([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let componenteAtivo = true;

    const carregarOpcoes = async () => {
      setCarregando(true);
      setMensagemErro(null);

      const [resultadoPlanos, resultadoSexos, resultadoFormas] =
        await Promise.allSettled([
          planoService.ListarPlanos(),
          pessoaService.ListarSexos(),
          pagamentoService.ListarFormasPagamento(),
        ]);

      if (!componenteAtivo) return;

      const resultados = [resultadoPlanos, resultadoSexos, resultadoFormas];
      if (
        resultados.some(
          (resultado) =>
            resultado.status === "rejected" &&
            resultado.reason instanceof SessaoInvalidaException,
        )
      ) {
        new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
        return;
      }

      const servicosComErro: string[] = [];

      if (resultadoPlanos.status === "fulfilled")
        setPlanos(resultadoPlanos.value);
      else servicosComErro.push("planos");

      if (resultadoSexos.status === "fulfilled")
        setSexos(resultadoSexos.value);
      else servicosComErro.push("sexos");

      if (resultadoFormas.status === "fulfilled")
        setFormasPagamento(resultadoFormas.value);
      else servicosComErro.push("formas de pagamento");

      if (servicosComErro.length > 0) {
        setMensagemErro(
          `Não foi possível carregar: ${servicosComErro.join(", ")}. Tente novamente.`,
        );
      }

      setCarregando(false);
    };

    void carregarOpcoes();

    return () => {
      componenteAtivo = false;
    };
  }, [tentativa, navigate]);

  return {
    planos,
    sexos,
    formasPagamento,
    carregando,
    mensagemErro,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
  };
}

export default useOpcoesMatricula;
