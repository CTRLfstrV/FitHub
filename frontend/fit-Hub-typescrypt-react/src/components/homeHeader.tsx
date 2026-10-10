import { Link, NavLink } from "react-router-dom";
import logo from "../../img/Primary-logo.svg";

function HomeHeader() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `hidden text-base text-white/90 transition hover:text-white md:block ${isActive ? "font-bold text-white" : ""}`;

  return (
    <header className="relative z-10 border-b border-black/10 bg-green-600">
      <div className="mx-auto flex min-h-[82px] max-w-[1240px] items-center justify-between px-[22px] md:px-10">
        <Link to="/home" className="inline-flex items-center" aria-label="FitHub, página inicial">
          <img className="block h-auto w-28 md:w-32" src={logo} alt="FitHub" />
        </Link>
        <nav className="flex items-center gap-4 md:gap-9" aria-label="Navegação principal">
          <NavLink to="/home" className={navClass}>Início</NavLink>
          <a className="hidden text-base text-white/90 transition hover:text-white md:block" href="/home#beneficios">Benefícios</a>
          <Link className="rounded-lg border border-white bg-white px-3 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 md:px-[17px] md:py-3 md:text-base" to="/login">
            Fazer login <span className="ml-2">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
