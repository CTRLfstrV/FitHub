import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SessaoInvalidaException } from "../../../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../../../services/RedirecionadorService";
import { PlanoService } from "../../../../services/financeiro/PlanoService";
import type { PlanoDetalhesResponseDTO } from "../../../../types/financeiro/plano/PlanoDetalhesResponseDTO";
import CabecalhoDetalhesPlano from "./CabecalhoDetalhesPlano";
import ListaContratosPlano from "./ListaContratosPlano";
import ResumoDetalhesPlano from "./ResumoDetalhesPlano";

const planoService = new PlanoService();

function DetalhesPlanoConteudo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idPlano = Number(id);
  const [plano, setPlano] = useState<PlanoDetalhesResponseDTO | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarPlano() {
      setCarregando(true);
      setMensagemErro(null);

      if (!Number.isInteger(idPlano) || idPlano <= 0) {
        setMensagemErro("O identificador do plano é inválido.");
        setCarregando(false);
        return;
      }

      try {
        const detalhes = await planoService.DetalhesPlano(idPlano);
        if (componenteAtivo) setPlano(detalhes);
      } catch (erro: unknown) {
        if (!componenteAtivo) return;

        if (erro instanceof SessaoInvalidaException) {
          new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
          return;
        }

        setMensagemErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os detalhes do plano.",
        );
      } finally {
        if (componenteAtivo) setCarregando(false);
      }
    }

    void carregarPlano();
    return () => {
      componenteAtivo = false;
    };
  }, [idPlano, navigate, tentativa]);

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        {carregando ? (
          <div aria-label="Carregando detalhes do plano" aria-busy="true">
            <div className="mb-6 h-12 w-44 animate-pulse rounded-full bg-[#edf2e9]" />
            <div className="fithub-card h-56 animate-pulse bg-[#f5f8f2]" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="fithub-card h-32 animate-pulse bg-[#f5f8f2]" />
              <div className="fithub-card h-32 animate-pulse bg-[#f5f8f2]" />
            </div>
          </div>
        ) : mensagemErro ? (
          <div
            role="alert"
            className="rounded-2xl border border-[#f0ded9] bg-[#fff9f7] px-5 py-8 text-center sm:px-8"
          >
            <h1 className="text-lg font-bold text-[#49332f]">
              Não foi possível carregar o plano
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#826c67]">
              {mensagemErro}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setTentativa((valor) => valor + 1)}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#245b37] px-5 text-sm font-bold text-white transition hover:bg-[#1e4d2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8052]"
              >
                Tentar novamente
              </button>
              <Link
                to="/recepcionista/planos"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#dcebd0] bg-white px-5 text-sm font-bold text-[#42642b] transition hover:bg-[#f3f9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                Voltar para planos
              </Link>
            </div>
          </div>
        ) : plano ? (
          <>
            <CabecalhoDetalhesPlano plano={plano} />
            <ResumoDetalhesPlano plano={plano} />
            <ListaContratosPlano plano={plano} />
          </>
        ) : null}
      </div>
    </section>
  );
}

export default DetalhesPlanoConteudo;
