import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/Primary-logo.svg";
import { useRecepcionistaMenu } from "../contexts/RecepcionistaMenuContext";
import { PessoaService } from "../services/usuarios/PessoaService";

type UsersHeaderProps = { nomeUsuario: string };

const pessoaService = new PessoaService();

function UsersHeader({ nomeUsuario }: UsersHeaderProps) {
  const { isOpen, toggleMenu } = useRecepcionistaMenu();
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleLogout = async () => {
    setSaindo(true);
    setMensagemErro("");

    try {
      await pessoaService.Logout();
      navigate("/login", { replace: true });
    } catch (erro: unknown) {
      if (erro instanceof TypeError) {
        setMensagemErro("Falha ao comunicar com o servidor");
      } else if (erro instanceof Error) {
        setMensagemErro(erro.message);
      } else {
        setMensagemErro("Não foi possível realizar o logout");
      }
    } finally {
      setSaindo(false);
    }
  };

  return (
    <header className="relative z-10 border-b border-black/10 bg-green-700 font-sans">
      <div className="mx-auto flex min-h-[82px] max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-[22px] md:px-10">
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-md p-1 text-white md:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="recepcionista-sidebar-menu"
          onClick={toggleMenu}
        >
          <span className="flex w-6 flex-col gap-1" aria-hidden="true">
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
          </span>
        </button>
        <Link
          to="/home"
          className="inline-flex shrink-0 items-center"
          aria-label="FitHub, página inicial"
        >
          <img className="block h-auto w-28 md:w-32" src={logo} alt="FitHub" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-center text-center leading-tight text-white">
          <span className="block text-xs leading-4 text-white/75 sm:text-sm">Olá,</span>
          <strong className="block truncate text-base font-bold leading-6 sm:text-lg">
            {nomeUsuario}
          </strong>
        </div>

        <button
          type="button"
          className="ml-auto cursor-pointer inline-flex w-auto shrink-0 items-center justify-center gap-2 rounded-lg border border-white bg-white px-3 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-sm md:px-[17px] md:py-3 md:text-base"
          onClick={handleLogout}
          disabled={saindo}
        >
          <span>{saindo ? "Saindo..." : "Sair"}</span>
          <span className="text-lg leading-none" aria-hidden="true">
            ⇥
          </span>
        </button>
      </div>
      {mensagemErro && (
        <p
          className="mx-auto max-w-[1240px] px-4 pb-2 text-right text-sm text-white"
          role="alert"
        >
          {mensagemErro}
        </p>
      )}
    </header>
  );
}

export default UsersHeader;
