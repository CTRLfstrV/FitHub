import { Outlet, useNavigate } from "react-router-dom";
import UsersHeader from "../components/usersHeader";
import Footer from "../components/footer";
import RecepcionistaSideBar from "../components/recepcionistaSideBar";
import { RecepcionistaMenuProvider } from "../contexts/RecepcionistaMenuContext";
import { RedirecionadorService } from "../services/RedirecionadorService";
import { SessaoService } from "../services/usuarios/SessaoService";
import { useEffect, useState } from "react";

const sessaoService: SessaoService = new SessaoService();

function RecepcionistaLayout() {
  const [nomeUsuario, setNomeUsuario] = useState<string>("Carregando...");
  const navigate = useNavigate();
  useEffect(() => {
    const carregarUsuario = async () => {
      const redirecionadorService: RedirecionadorService =
        new RedirecionadorService(sessaoService);
      redirecionadorService.RedirecionaPorSessao(navigate);

      try {
        const nome = await sessaoService.NomeUsuario();
        setNomeUsuario(nome);
      } catch (erro) {
        if (erro instanceof Error) {
          setNomeUsuario(erro.message);
        }
      }
    }
    void carregarUsuario();
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
            <Outlet />
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
