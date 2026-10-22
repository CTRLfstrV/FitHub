function EstadoDetalhesAluno({
  carregando,
  mensagemErro,
  permiteNovaTentativa,
  onTentarNovamente,
}: {
  carregando: boolean;
  mensagemErro: string | null;
  permiteNovaTentativa: boolean;
  onTentarNovamente: () => void;
}) {
  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        {carregando ? (
          <div
            role="status"
            aria-live="polite"
            className="animate-pulse space-y-6"
          >
            <span className="sr-only">Carregando detalhes do aluno</span>
            <div className="h-5 w-56 rounded bg-[#e8eee2]" />
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#e8eee2] sm:h-[76px] sm:w-[76px]" />
              <div className="space-y-3">
                <div className="h-4 w-36 rounded bg-[#e8eee2]" />
                <div className="h-8 w-52 rounded bg-[#e8eee2]" />
                <div className="h-4 w-72 max-w-[70vw] rounded bg-[#e8eee2]" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="h-32 rounded-2xl bg-[#e8eee2]" />
              <div className="h-32 rounded-2xl bg-[#e8eee2]" />
              <div className="h-32 rounded-2xl bg-[#e8eee2]" />
            </div>
            <div className="h-64 rounded-2xl bg-[#e8eee2]" />
          </div>
        ) : (
          <div
            role="alert"
            className="rounded-2xl border border-[#eadfca] bg-white p-6 shadow-[0_8px_24px_rgba(34,44,27,0.035)] sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v4m0 4h.01" />
                <path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-bold text-[#20251e]">
              Não foi possível abrir os detalhes
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#66705e]">
              {mensagemErro ?? "Ocorreu um erro ao carregar os dados do aluno."}
            </p>
            {permiteNovaTentativa && (
              <button
                type="button"
                onClick={onTentarNovamente}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default EstadoDetalhesAluno;
