import { useState } from "react";

function RecepcionistaSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full font-mono md:min-h-[calc(100vh-82px)] md:w-[278px] md:shrink-0">
      <button
        type="button"
        className="flex w-full items-center gap-3 border-b border-[#c8e6a8] bg-[#e8f5d9] px-4 py-3 text-left text-base font-semibold text-green-900 md:hidden"
        aria-expanded={isOpen}
        aria-controls="recepcionista-sidebar-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="flex w-6 flex-col gap-1" aria-hidden="true">
          <span className="h-0.5 w-6 rounded bg-green-800" />
          <span className="h-0.5 w-6 rounded bg-green-800" />
          <span className="h-0.5 w-6 rounded bg-green-800" />
        </span>
        <span>Menu</span>
      </button>

      <div
        id="recepcionista-sidebar-menu"
        className={`${isOpen ? "flex" : "hidden"} flex-col justify-between gap-2 border-b border-[#c8e6a8] bg-[#e8f5d9] px-3 py-2 text-[#20251e] md:flex md:min-h-[calc(100vh-82px)] md:gap-5 md:border-b-0 md:border-r md:px-5 md:py-6`}
      >
        <div className="min-w-0">
          <h2 className="mb-3 hidden text-center text-2xl font-bold tracking-wide text-green-800 md:mb-5 md:block md:text-left md:text-3xl">
            Menu
          </h2>

          <nav
            aria-label="Menu da recepcionista"
            className="flex w-max min-w-full justify-center gap-1 overflow-x-auto md:w-full md:min-w-0 md:flex-col md:items-stretch md:justify-start md:gap-2 md:overflow-visible"
          >
            <button className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-center text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-left md:text-lg">
              Início
            </button>
            <button className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-center text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-left md:text-lg">
              Gerenciar alunos
            </button>
            <button className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-center text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-left md:text-lg">
              Matricular aluno
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default RecepcionistaSideBar;
