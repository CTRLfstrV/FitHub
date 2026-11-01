import { useEffect, useState } from "react";
import { PlanoService } from "../../../../services/financeiro/PlanoService";
import type { PlanoCadastroDTO } from "../../../../types/financeiro/plano/PlanoCadastroDTO";
import type { PlanoResponseDTO } from "../../../../types/financeiro/plano/PlanoResponseDTO";

const planoService = new PlanoService();

function useVisaoGeralPlanos() {
  const [planos, setPlanos] = useState<PlanoResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  async function cadastrarPlano(plano: PlanoCadastroDTO) {
    await planoService.CadastrarPlano(plano);
    const planosAtualizados = await planoService.ListarPlanos();
    setPlanos(planosAtualizados);
    setMensagemErro(null);
  }

  useEffect(() => {
    let componenteAtivo = true;

    const carregarPlanos = async () => {
      try {
        const planosCarregados = await planoService.ListarPlanos();
        if (componenteAtivo) setPlanos(planosCarregados);
      } catch {
        if (!componenteAtivo) return;

        setMensagemErro("Verifique sua conexão e tente novamente.");
      } finally {
        if (componenteAtivo) setCarregando(false);
      }
    };

    void carregarPlanos();

    return () => {
      componenteAtivo = false;
    };
  }, []);

  return { planos, carregando, mensagemErro, cadastrarPlano };
}

export default useVisaoGeralPlanos;
