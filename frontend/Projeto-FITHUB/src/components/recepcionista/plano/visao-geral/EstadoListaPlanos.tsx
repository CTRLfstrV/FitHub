type EstadoListaPlanosProps = {
  carregando: boolean;
  mensagemErro: string | null;
  vazio: boolean;
};

function EstadoListaPlanos({
  carregando,
  mensagemErro,
  vazio,
}: EstadoListaPlanosProps) {
  if (carregando) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6" aria-label="Carregando planos" aria-busy="true">
        {[0, 1, 2].map((item) => (
          <div key={item} className="fithub-card min-h-[304px] animate-pulse p-4 sm:p-5">
            <div className="h-12 w-12 rounded-2xl bg-[#edf2e9]" />
            <div className="mt-6 h-5 w-2/3 rounded bg-[#edf2e9]" />
            <div className="mt-3 h-4 w-1/3 rounded bg-[#f1f4ee]" />
            <div className="mt-5 h-9 w-1/2 rounded bg-[#edf2e9]" />
            <div className="mt-8 h-10 rounded-xl bg-[#f1f4ee]" />
          </div>
        ))}
      </div>
    );
  }

  if (mensagemErro) {
    return (
      <div role="alert" className="rounded-2xl border border-[#f0ded9] bg-[#fff9f7] px-5 py-8 text-center sm:px-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcece8] text-[#9b5144]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5m0 4h.01" />
          </svg>
        </span>
        <h2 className="mt-4 text-base font-bold text-[#49332f]">Não foi possível carregar os planos</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#826c67]">{mensagemErro}</p>
      </div>
    );
  }

  if (vazio) {
    return (
      <div className="rounded-2xl border border-dashed border-[#cfddc5] bg-white px-5 py-10 text-center sm:px-8 sm:py-14">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f7e9] text-green-800 ring-1 ring-inset ring-[#e0ecd6]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
            <path d="M4 9h16M8 15h3M15.5 14.5h.01" />
          </svg>
        </span>
        <h2 className="mt-4 text-base font-bold text-[#30382c]">Nenhum plano cadastrado</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#788270]">Os planos cadastrados aparecerão aqui para consulta.</p>
      </div>
    );
  }

  return null;
}

export default EstadoListaPlanos;
