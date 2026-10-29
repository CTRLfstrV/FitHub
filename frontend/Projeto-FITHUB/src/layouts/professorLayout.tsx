import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import UsersHeader from "../components/usersHeader";
import {
  RecepcionistaMenuProvider,
  useRecepcionistaMenu,
} from "../contexts/RecepcionistaMenuContext";
import { PessoaService } from "../services/usuarios/PessoaService";

const pessoaService = new PessoaService();

function ProfessorLayout() {
  return (
    <RecepcionistaMenuProvider>
      <ProfessorLayoutConteudo />
    </RecepcionistaMenuProvider>
  );
}

function ProfessorMenu() {
  const { isOpen, toggleMenu } = useRecepcionistaMenu();

  return (
    <aside className="absolute left-0 top-[82px] z-20 w-[min(85vw,320px)] font-mono shadow-lg md:static md:h-full md:min-h-0 md:w-[278px] md:shrink-0 md:bg-[#e8f5d9] md:shadow-none">
      <div
        id="recepcionista-sidebar-menu"
        className={`${isOpen ? "flex" : "hidden"} flex-col justify-between gap-2 border-b border-[#c8e6a8] bg-[#e8f5d9] px-3 py-2 text-[#20251e] md:flex md:h-full md:min-h-0 md:gap-5 md:border-b-0 md:border-r md:px-5 md:py-6`}
      >
        <div className="min-w-0">
          <h2 className="mb-3 hidden text-center text-2xl font-bold tracking-wide text-green-800 md:mb-5 md:block md:text-left md:text-3xl">
            Menu
          </h2>
          <nav aria-label="Menu do professor" className="flex w-full flex-col gap-1 md:gap-2">
            <Link
              to="/professor/dashboard"
              aria-current="page"
              onClick={() => {
                if (isOpen) toggleMenu();
              }}
              className="rounded-lg bg-green-600 px-3 py-2 text-left text-base font-semibold text-white sm:text-lg"
            >
              Início
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}

function ProfessorLayoutConteudo() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("Carregando...");
  const [acessoConfirmado, setAcessoConfirmado] = useState(false);

  useEffect(() => {
    let ativo = true;

    const verificarAcesso = async () => {
      try {
        const tipoPessoa = await pessoaService.TipoPessoaSessao();
        if (!ativo) return;

        if (tipoPessoa !== 1) {
          navigate(tipoPessoa === 0 ? "/recepcionista/dashboard" : "/login", {
            replace: true,
          });
          return;
        }

        setAcessoConfirmado(true);
        try {
          const nome = await pessoaService.NomeUsuario();
          if (ativo) setNomeUsuario(nome);
        } catch {
          if (ativo) setNomeUsuario("Professor");
        }
      } catch {
        if (ativo) navigate("/login", { replace: true });
      }
    };

    void verificarAcesso();
    return () => {
      ativo = false;
    };
  }, [navigate]);

  if (!acessoConfirmado) {
    return (
      <div
        className="grid min-h-dvh place-items-center bg-[#fbfcfa] px-4 text-sm text-[#66705e]"
        role="status"
      >
        Verificando acesso...
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <div className="shrink-0">
        <UsersHeader nomeUsuario={nomeUsuario} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <ProfessorMenu />
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#fbfcfa]">
          <Outlet />
        </main>
      </div>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default ProfessorLayout;
