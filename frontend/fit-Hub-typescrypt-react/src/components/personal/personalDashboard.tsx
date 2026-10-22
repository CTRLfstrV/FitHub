function PersonalDashboard() {
  return (
    <section className="min-h-full px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-[#598c1c]">Área do personal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#20251e] sm:text-4xl">Bem-vindo ao seu espaço de trabalho</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#687064]">Acompanhe sua rotina e organize o atendimento dos seus alunos. As ferramentas de treinos e agenda poderão ser acessadas por aqui.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-[#e2e7de] bg-white p-6 shadow-sm">
            <span className="text-2xl" aria-hidden="true">📋</span>
            <h2 className="mt-4 text-xl font-bold text-[#20251e]">Treinos</h2>
            <p className="mt-2 leading-6 text-[#687064]">A área de criação e acompanhamento de treinos estará disponível em breve.</p>
          </article>
          <article className="rounded-2xl border border-[#e2e7de] bg-white p-6 shadow-sm">
            <span className="text-2xl" aria-hidden="true">🗓️</span>
            <h2 className="mt-4 text-xl font-bold text-[#20251e]">Agenda</h2>
            <p className="mt-2 leading-6 text-[#687064]">Acompanhe seus agendamentos em um só lugar assim que a agenda for integrada.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default PersonalDashboard;
