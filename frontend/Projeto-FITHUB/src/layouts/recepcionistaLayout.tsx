import { Outlet, useNavigate } from "react-router-dom";
import UsersHeader from "../components/usersHeader";
import Footer from "../components/footer";
import RecepcionistaSideBar from "../components/recepcionista/recepcionistaSideBar";
import { RecepcionistaMenuProvider } from "../contexts/RecepcionistaMenuContext";
import { RedirecionadorService } from "../services/RedirecionadorService";
import { PessoaService } from "../services/usuarios/PessoaService";
import { useEffect, useState } from "react";
import { SessaoInvalidaException } from "../exceptions/SessaoInvalidaException";

const pessoaService: PessoaService = new PessoaService();

function RecepcionistaLayout() {
  const [nomeUsuario, setNomeUsuario] = useState<string>("Carregando...");
  const navigate = useNavigate();
  useEffect(() => {
    let componenteAtivo = true;

    const carregarUsuario = async () => {
      const redirecionadorService: RedirecionadorService =
        new RedirecionadorService(pessoaService);
      redirecionadorService.RedirecionaPorSessao(navigate);

      try {
        const dados = await pessoaService.DadosPessoais();
        if (!componenteAtivo) return;

        if (typeof dados === "string") {
          setNomeUsuario(dados || "Nome não encontrado");
          return;
        }

        setNomeUsuario(dados.nome);
      } catch (erro) {
        if (!componenteAtivo) return;

        if (erro instanceof SessaoInvalidaException) {
          new RedirecionadorService().RedirecionaPorCaminho(
            "/login",
            navigate,
          );
          return;
        }

        if (erro instanceof Error) {
          setNomeUsuario(erro.message);
        }
      }
    };
    void carregarUsuario();

    return () => {
      componenteAtivo = false;
    };
  }, [navigate]);
  return (
    <RecepcionistaMenuProvider>
      <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
        <div className="shrink-0">
          <UsersHeader nomeUsuario={nomeUsuario} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <RecepcionistaSideBar />
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#fbfcfa]">
            <Outlet context={{ atualizarNomeUsuario: setNomeUsuario }} />
          </main>
        </div>
        <div className="shrink-0">
          <Footer />
        </div>
      </div>
    </RecepcionistaMenuProvider>
  );
}

export default RecepcionistaLayout;
