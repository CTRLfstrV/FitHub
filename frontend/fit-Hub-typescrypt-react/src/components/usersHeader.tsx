import { Link } from "react-router-dom";
import logo from "../../img/Primary-logo.svg";
import { useRecepcionistaMenu } from "../contexts/RecepcionistaMenuContext";

function UsersHeader() {
  const { isOpen, toggleMenu } = useRecepcionistaMenu();
  return (
    <header className="relative z-10 border-b border-black/10 bg-green-600 font-mono">
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

        <div className="min-w-0 flex-1 text-center text-[20px] leading-tight text-white sm:text-sm">
          <span className="block text-white/75 text-[20px]">Olá,</span>
          <strong className="block truncate font-bold text-[20px]">Nome do usuário</strong>
        </div>

        <button
          type="button"
          className="ml-auto cursor-pointer inline-flex w-auto shrink-0 items-center justify-center gap-2 rounded-lg border border-white bg-white px-3 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-sm md:px-[17px] md:py-3 md:text-base"
        >
          <span className="text-[20px]">Sair</span>
          <span className="text-lg leading-none" aria-hidden="true">
            ⇥
          </span>
        </button>
      </div>
    </header>
  );
}

export default UsersHeader;
