import { useRecepcionistaMenu } from "../../contexts/RecepcionistaMenuContext";
import { NavLink, useLocation } from "react-router-dom";

function RecepcionistaSideBar() {
  const { isOpen } = useRecepcionistaMenu();
  const { pathname } = useLocation();
  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:text-lg md:py-2 md:text-lg ${
      isActive
        ? "bg-green-800 font-semibold text-white shadow-sm"
        : "text-[#20251e]/85 hover:bg-[#d7eac5] hover:text-green-900 focus-visible:bg-[#d7eac5] focus-visible:text-green-900"
    }`;

  return (
    <aside className="absolute left-0 top-[82px] z-20 w-[min(85vw,320px)] font-sans shadow-lg md:static md:h-full md:min-h-0 md:w-[278px] md:shrink-0 md:bg-fithub-brand-soft md:shadow-none">
      <div
        id="recepcionista-sidebar-menu"
        className={`${isOpen ? "flex" : "hidden"} flex-col justify-between gap-2 border-b border-[#c8e6a8] bg-fithub-brand-soft px-3 py-2 text-fithub-ink md:flex md:h-full md:min-h-0 md:gap-5 md:border-b-0 md:border-r md:px-5 md:py-6`}
      >
        <div className="min-w-0">
          <h2 className="mb-3 hidden text-center text-2xl font-bold tracking-wide text-green-800 md:mb-5 md:block md:text-left md:text-3xl">
            Menu
          </h2>

          <nav
            aria-label="Menu da recepcionista"
            className="flex w-full min-w-0 flex-col items-stretch justify-start gap-1 overflow-visible md:gap-2"
          >
            <NavLink
              to="/recepcionista/dashboard"
              end
              className={itemClass}
            >
              Início
            </NavLink>
            <NavLink
              to="/recepcionista/gerenciamento-alunos"
              className={({ isActive }) =>
                itemClass({
                  isActive:
                    isActive || pathname.startsWith("/recepcionista/detalhes-aluno/"),
                })
              }
            >
              Gerenciar alunos
            </NavLink>
            <NavLink
              to="/recepcionista/matricular-aluno"
              className={itemClass}
            >
              Matricular alunos
            </NavLink>
            <NavLink
              to="/recepcionista/planos"
              className={itemClass}
            >
              Planos
            </NavLink>
            <NavLink
              to="/recepcionista/configuracoes"
              className={itemClass}
            >
              Configurações
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default RecepcionistaSideBar;
