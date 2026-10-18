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
    async function carregarUsuario(): Promise<void> {
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
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
        <UsersHeader nomeUsuario={nomeUsuario} />
        <div className="flex flex-1 flex-col md:flex-row">
          <RecepcionistaSideBar />
          <main className="flex min-w-0 flex-1 flex-col bg-[#fbfcfa]">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </RecepcionistaMenuProvider>
  );
}

export default RecepcionistaLayout;
