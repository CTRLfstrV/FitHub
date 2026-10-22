import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import PersonalHeader from "../components/personal/personalHeader";
import PersonalSidebar from "../components/personal/personalSidebar";
import { PersonalMenuProvider } from "../contexts/PersonalMenuContext";
import { PersonalService } from "../services/Usuarios/PersonalService";

const personalService = new PersonalService();

function PersonalLayout() {
  const [nomeUsuario, setNomeUsuario] = useState("Carregando...");
  const navigate = useNavigate();

  useEffect(() => {
    let ativo = true;
    void (async () => {
      try {
        if (!(await personalService.verificaSessao())) {
          navigate("/login", { replace: true });
          return;
        }
        const nome = await personalService.nomeUsuario();
        if (ativo) setNomeUsuario(nome);
      } catch {
        navigate("/login", { replace: true });
      }
    })();
    return () => { ativo = false; };
  }, [navigate]);

  return (
    <PersonalMenuProvider>
      <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
        <div className="shrink-0"><PersonalHeader nomeUsuario={nomeUsuario} /></div>
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <PersonalSidebar />
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#fbfcfa]"><Outlet /></main>
        </div>
        <div className="shrink-0"><Footer /></div>
      </div>
    </PersonalMenuProvider>
  );
}

export default PersonalLayout;
