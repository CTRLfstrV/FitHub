import { useEffect, useState } from "react";
import { PlanoService } from "../../../../services/financeiro/PlanoService";
import type { PlanoResponseDTO } from "../../../../types/financeiro/PlanoResponseDTO";

const planoService = new PlanoService();

function useVisaoGeralPlanos() {
  const [planos, setPlanos] = useState<PlanoResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

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

  return { planos, carregando, mensagemErro };
}

export default useVisaoGeralPlanos;
