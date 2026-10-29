import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../exceptions/SessaoInvalidaException";
import { AgendamentoProfessorService } from "../services/usuarios/AgendamentoProfessorService";
import type { AgendamentoProfessorResponseDTO } from "../types/usuarios/AgendamentoProfessorResponseDTO";

const agendamentoService = new AgendamentoProfessorService();
const agendamentosDemonstracao: AgendamentoProfessorResponseDTO[] = [
  {
    idAgendamento: 2,
    nomeAluno: "Pedro Santos",
    inicio: "2026-10-19T09:00:00",
    termino: "2026-10-19T10:00:00",
    status: "Agendado",
  },
];

function ProfessorInicioPage() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState<AgendamentoProfessorResponseDTO[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");
  const [dadosDemonstracao, setDadosDemonstracao] = useState(false);
  const [notificacoesLidas, setNotificacoesLidas] = useState<number[]>([]);
  const [notificacoesDispensadas, setNotificacoesDispensadas] = useState<number[]>([]);
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<AgendamentoProfessorResponseDTO | null>(null);

  useEffect(() => {
    let ativo = true;
    const carregarAgendamentos = async () => {
      try {
        const dados = await agendamentoService.TreinosMarcados();
        if (ativo) {
          setAgendamentos(dados.length > 0 ? dados : agendamentosDemonstracao);
          setDadosDemonstracao(dados.length === 0);
        }
      } catch (erro) {
        if (!ativo) return;
        if (erro instanceof SessaoInvalidaException) {
          navigate("/login", { replace: true });
          return;
        }
        setAgendamentos(agendamentosDemonstracao);
        setDadosDemonstracao(true);
        setMensagemErro(
          `${erro instanceof Error ? erro.message : "Não foi possível carregar os treinos marcados."} Exibindo exemplos do script SQL.`,
        );
      } finally {
        if (ativo) setCarregando(false);
      }
    };
    void carregarAgendamentos();
    return () => {
      ativo = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!agendamentoSelecionado) return;
    const fecharAoPressionarEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAgendamentoSelecionado(null);
    };
    window.addEventListener("keydown", fecharAoPressionarEscape);
    return () => window.removeEventListener("keydown", fecharAoPressionarEscape);
  }, [agendamentoSelecionado]);

  const formatarData = (valor: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(new Date(valor));

  const formatarHora = (valor: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(valor));

  const notificacoes = dadosDemonstracao
    ? []
    : agendamentos.filter(
        (agendamento) => !notificacoesDispensadas.includes(agendamento.idAgendamento),
      );
  const notificacoesNaoLidas = notificacoes.filter(
    (agendamento) => !notificacoesLidas.includes(agendamento.idAgendamento),
  );


  return (
    <section className="min-w-0 flex-1 px-3 py-4 min-[360px]:px-4 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto grid w-full max-w-[1160px] gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4 sm:space-y-5">
        <header className="relative min-w-0 overflow-hidden rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#e8f5d9] px-4 py-5 shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4bd] bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-green-800">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Painel do professor
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
              Olá, professor!
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#66705e] sm:text-base">
              Acompanhe seus próximos atendimentos e organize sua rotina com os alunos.
            </p>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[34px] border-green-700/[0.06] sm:block" />
        </header>

        <section
          aria-labelledby="notificacoes-professor-titulo"
          className="overflow-hidden rounded-2xl border border-[#dcebd0] bg-white shadow-[0_8px_28px_rgba(65,104,32,0.06)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8eee2] bg-[#f7faf4] px-4 py-4 sm:px-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-green-800">Central de avisos</p>
              <h2 id="notificacoes-professor-titulo" className="mt-1 text-lg font-bold text-[#20251e]">Notificações</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#e8f5d9] px-2.5 py-1 text-xs font-bold text-green-800" aria-label={`${notificacoesNaoLidas.length} notificações não lidas`}>
                {notificacoesNaoLidas.length} não lidas
              </span>
              {notificacoesNaoLidas.length > 0 && (
                <button
                  type="button"
                  onClick={() => setNotificacoesLidas((atuais) => [...new Set([...atuais, ...notificacoesNaoLidas.map((item) => item.idAgendamento)])])}
                  className="rounded-lg px-2 py-2 text-xs font-bold text-green-800 hover:bg-[#edf6e5] focus-visible:outline-2 focus-visible:outline-green-700"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
          </div>

          {notificacoes.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[#66705e] sm:px-5" role="status">
              {carregando
                ? "Carregando notificações..."
                : dadosDemonstracao
                ? "As notificações aparecem aqui quando a agenda carregar dados reais."
                : "Você não tem notificações no momento."}
            </p>
          ) : (
            <ul className="divide-y divide-[#edf0e9]">
              {notificacoes.map((agendamento) => {
                const lida = notificacoesLidas.includes(agendamento.idAgendamento);
                return (
                  <li key={agendamento.idAgendamento} className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${lida ? "bg-white" : "bg-[#fbfdf8]"}`}>
                    <div className="flex min-w-0 items-start gap-3">
                      <span aria-hidden="true" className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${lida ? "bg-[#c9d1c1]" : "bg-green-600"}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#20251e]">Treino marcado</p>
                        <p className="mt-1 text-sm text-[#66705e]">
                          {agendamento.nomeAluno} tem um treino em {formatarData(agendamento.inicio)} às {formatarHora(agendamento.inicio)}.
                        </p>
                        <p className="mt-1 text-xs text-[#81897d]">{lida ? "Lida" : "Não lida"}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pl-5 sm:pl-0">
                      {!lida && (
                        <button
                          type="button"
                          onClick={() => setNotificacoesLidas((atuais) => [...atuais, agendamento.idAgendamento])}
                          className="rounded-lg px-2.5 py-2 text-xs font-bold text-green-800 hover:bg-[#edf6e5] focus-visible:outline-2 focus-visible:outline-green-700"
                        >
                          Marcar como lida
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setNotificacoesDispensadas((atuais) => [...atuais, agendamento.idAgendamento])}
                        className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#66705e] hover:bg-[#f1f3ee] focus-visible:outline-2 focus-visible:outline-green-700"
                        aria-label={`Dispensar notificação de ${agendamento.nomeAluno}`}
                      >
                        Dispensar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        </div>

        <aside className="flex min-h-[420px] min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dcebd0] bg-white shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:min-h-[460px] lg:min-h-[560px]">
          <div className="flex items-start justify-between gap-3 border-b border-[#e8eee2] bg-[#f7faf4] px-4 py-4 sm:items-center sm:px-5 sm:py-5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-green-800">Agenda</p>
              <h2 className="mt-1 text-lg font-bold text-[#20251e]">Treinos marcados</h2>
              {dadosDemonstracao && (
                <p className="mt-1 text-xs text-[#737f69]">Exemplos do banco de demonstração</p>
              )}
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f5d9] text-green-800" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h6" />
              </svg>
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
            {carregando ? (
              <p className="rounded-xl bg-[#f7faf4] px-4 py-5 text-sm text-[#66705e]" role="status">
                Carregando os treinos...
              </p>
            ) : (
              <>
                {mensagemErro && (
                  <p className="mb-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800" role="status">
                    {mensagemErro}
                  </p>
                )}
                <ul className="space-y-3">
                  {agendamentos.map((agendamento) => (
                    <li key={agendamento.idAgendamento} className="rounded-xl border border-[#e4ebde] p-3 sm:p-4">
                      <p className="truncate text-sm font-bold text-[#20251e]">{agendamento.nomeAluno}</p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#66705e]">
                        <span>{formatarData(agendamento.inicio)}</span>
                        <span className="whitespace-nowrap rounded-full bg-[#edf6e5] px-2.5 py-1 font-semibold text-green-800">
                          {formatarHora(agendamento.inicio)}–{formatarHora(agendamento.termino)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${agendamento.status === "Agendado" ? "bg-[#edf6e5] text-green-800" : "bg-[#f1f2ef] text-[#687064]"}`}>
                          {agendamento.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAgendamentoSelecionado(agendamento)}
                          className="min-h-9 rounded-lg px-3 py-2 text-xs font-bold text-green-800 transition hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                        >
                          Ver mais
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
      {agendamentoSelecionado && (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#17200f]/45 p-3 sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAgendamentoSelecionado(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalhes-agendamento-titulo"
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dcebd0] bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-green-800">Detalhes do treino</p>
                <h2 id="detalhes-agendamento-titulo" className="mt-1 text-xl font-bold text-[#20251e]">
                  {agendamentoSelecionado.nomeAluno}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setAgendamentoSelecionado(null)}
                aria-label="Fechar detalhes do aluno"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl text-[#66705e] hover:bg-[#f2f5ef] focus-visible:outline-2 focus-visible:outline-green-700"
              >
                ×
              </button>
            </div>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#737f69]">Data</dt>
                <dd className="mt-1 text-sm font-semibold text-[#30372d]">{formatarData(agendamentoSelecionado.inicio)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#737f69]">Horário</dt>
                <dd className="mt-1 text-sm font-semibold text-[#30372d]">
                  {formatarHora(agendamentoSelecionado.inicio)}–{formatarHora(agendamentoSelecionado.termino)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#737f69]">Status</dt>
                <dd className="mt-1 text-sm font-semibold text-[#30372d]">{agendamentoSelecionado.status}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </section>
  );
}

export default ProfessorInicioPage;
