import { Link } from "react-router-dom";
import logo from "../../../img/Primary-logo.svg";
import { usePersonalMenu } from "../../contexts/PersonalMenuContext";

function PersonalHeader({ nomeUsuario }: { nomeUsuario: string }) {
  const { isOpen, toggleMenu } = usePersonalMenu();
  return (
    <header className="relative z-10 border-b border-black/10 bg-green-600 font-mono">
      <div className="mx-auto flex min-h-[82px] max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-[22px] md:px-10">
        <button type="button" className="inline-flex shrink-0 items-center justify-center rounded-md p-1 text-white md:hidden" aria-label={isOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isOpen} aria-controls="personal-sidebar-menu" onClick={toggleMenu}>
          <span className="flex w-6 flex-col gap-1" aria-hidden="true"><span className="h-0.5 w-6 rounded bg-white" /><span className="h-0.5 w-6 rounded bg-white" /><span className="h-0.5 w-6 rounded bg-white" /></span>
        </button>
        <Link to="/home" className="inline-flex shrink-0 items-center" aria-label="FitHub, página inicial"><img className="block h-auto w-28 md:w-32" src={logo} alt="FitHub" /></Link>
        <div className="min-w-0 flex-1 text-center text-white"><span className="block text-white/75">Olá,</span><strong className="block truncate font-bold">{nomeUsuario}</strong></div>
        <Link to="/login" className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-lg border border-white bg-white px-3 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50">Sair <span aria-hidden="true">⇥</span></Link>
      </div>
    </header>
  );
}

export default PersonalHeader;
