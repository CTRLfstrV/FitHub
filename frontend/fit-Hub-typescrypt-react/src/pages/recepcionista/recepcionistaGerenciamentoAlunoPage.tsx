import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { PagamentoResponseDTO } from "../../types/financeiro/PagamentoResponseDTO";
import { PagamentoService } from "../../services/financeiro/PagamentoService";
import { ContratoService } from "../../services/financeiro/ContratoService";

const pagamentoService = new PagamentoService();
const contratoService = new ContratoService();

type FiltroStatus = "todos" | "pendente" | "pago" | "atrasado";
type Icone = "busca" | "alunos" | "calendario" | "email";

const codigoStatus: Record<Exclude<FiltroStatus, "todos">, number> = {
  pendente: 0,
  pago: 1,
  atrasado: 2,
};

const statusPagamento: Record<
  number,
  { nome: string; classe: string; ponto: string }
> = {
  0: {
    nome: "Pendente",
    classe: "bg-amber-50 text-amber-700 ring-amber-200",
    ponto: "bg-amber-500",
  },
  1: {
    nome: "Pago",
    classe: "bg-[#edf7e5] text-[#437524] ring-[#d7ebc8]",
    ponto: "bg-green-600",
  },
  2: {
    nome: "Em atraso",
    classe: "bg-rose-50 text-rose-700 ring-rose-200",
    ponto: "bg-rose-500",
  },
};

const coresIndicador = {
  green: {
    faixa: "bg-green-600",
    icone: "bg-[#edf7e5] text-green-800 ring-[#d7ebc8]",
  },
  amber: {
    faixa: "bg-amber-400",
    icone: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  rose: {
    faixa: "bg-rose-400",
    icone: "bg-rose-50 text-rose-700 ring-rose-200",
  },
};

function Icon({
  nome,
  className = "h-5 w-5",
}: {
  nome: Icone;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {nome === "busca" ? (
        <>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </>
      ) : null}
      {nome === "alunos" ? (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
        </>
      ) : null}
      {nome === "calendario" ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </>
      ) : null}
      {nome === "email" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      ) : null}
    </svg>
  );
}

function getStatus(status: number) {
  return (
    statusPagamento[status] ?? {
      nome: "Indefinido",
      classe: "bg-slate-50 text-slate-600 ring-slate-200",
      ponto: "bg-slate-400",
    }
  );
}

function formatarData(data: string) {
  const valor = new Date(data);
  return Number.isNaN(valor.getTime())
    ? "Data não informada"
    : new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(valor);
}

function iniciais(nome: string) {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0] ?? "")
    .join("")
    .toLocaleUpperCase("pt-BR");
}

function normalizarTexto(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function Indicador({
  titulo,
  valor,
  legenda,
  cor,
  icone,
}: {
  titulo: string;
  valor: string | number;
  legenda: string;
  cor: keyof typeof coresIndicador;
  icone: ReactNode;
}) {
  const cores = coresIndicador[cor];
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
      <div className={`absolute inset-x-0 top-0 h-1 ${cores.faixa}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#66705e]">{titulo}</p>
          <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
            {valor}
          </p>
          <p className="mt-3 text-sm text-[#81897d] sm:text-xs">{legenda}</p>
        </div>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${cores.icone}`}
          aria-hidden="true"
        >
          {icone}
        </span>
      </div>
    </article>
  );
}

function Pessoa({
  nome,
  email,
  compacto = false,
}: {
  nome: string;
  email: string;
  compacto?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#e8f5d9] font-bold text-green-800 ${compacto ? "h-11 w-11 text-sm" : "h-10 w-10 text-xs"}`}
      >
        {iniciais(nome)}
      </span>
      <span className="min-w-0">
        <span
          className={`block font-semibold text-[#20251e] ${compacto ? "truncate text-sm" : "text-sm"}`}
        >
          {nome}
        </span>
        <span className={`mt-0.5 block truncate text-[#81897d] ${compacto ? "text-sm" : "text-xs"}`}>
          {email}
        </span>
      </span>
    </div>
  );
}

function BadgeStatus({ status, compacto = false }: { status: number; compacto?: boolean }) {
  const detalhe = getStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 font-semibold leading-none ring-1 ring-inset ${compacto ? "text-sm" : "text-xs"} ${detalhe.classe}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${detalhe.ponto}`} />
      {detalhe.nome}
    </span>
  );
}

function Vencimento({ data }: { data: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#535b4e]">
      <Icon nome="calendario" className="h-4 w-4" />
      {formatarData(data)}
    </span>
  );
}

function Contato({
  nome,
  email,
  compacto = false,
}: {
  nome: string;
  email: string;
  compacto?: boolean;
}) {
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Enviar e-mail para ${nome}`}
      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 py-2 font-semibold text-green-800 transition-colors focus-visible:outline-2 focus-visible:outline-green-700 ${compacto ? "border border-[#dfe5da] text-sm hover:bg-[#f2f8ec]" : "text-xs hover:bg-[#edf7e5]"}`}
    >
      <Icon nome="email" className="h-4 w-4" />
      {compacto ? "Contatar" : "Enviar e-mail"}
    </a>
  );
}

function LinhaPagamento({ pagamento }: { pagamento: PagamentoResponseDTO }) {
  return (
    <tr className="transition-colors hover:bg-[#fbfcfa]">
      <td className="px-5 py-4">
        <Pessoa nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
      <td className="px-4 py-4 text-[#424a3d]">{pagamento.nomePlano}</td>
      <td className="px-4 py-4">
        <Vencimento data={pagamento.vencimentoParcela} />
      </td>
      <td className="px-4 py-4">
        <BadgeStatus status={pagamento.statusPagamento} />
      </td>
      <td className="px-4 py-4 text-right">
        <Contato nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
    </tr>
  );
}

function CartaoPagamento({ pagamento }: { pagamento: PagamentoResponseDTO }) {
  return (
    <article className="space-y-4 px-4 py-4">
      <Pessoa
        nome={pagamento.nomeAluno}
        email={pagamento.emailAluno}
        compacto
      />
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-[#edf0e9] pt-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
            Plano
          </p>
          <p className="mt-1 text-sm font-medium text-[#424a3d]">
            {pagamento.nomePlano}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
            Pagamento
          </p>
          <div className="mt-1">
            <BadgeStatus status={pagamento.statusPagamento} compacto />
          </div>
        </div>
        <div className="col-span-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
              Vencimento
            </p>
            <p className="mt-1 text-sm font-medium">
              <Vencimento data={pagamento.vencimentoParcela} />
            </p>
          </div>
          <Contato
            nome={pagamento.nomeAluno}
            email={pagamento.emailAluno}
            compacto
          />
        </div>
      </div>
    </article>
  );
}

function RecepcionistaGerenciamentoAlunoPage() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [quantidadeContratosAtivos, setQuantidadeContratosAtivos] = useState<
    number | null
  >(null);
  const [listaPagamentos, setListaPagamentos] = useState<
    PagamentoResponseDTO[] | null
  >(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [erroContratos, setErroContratos] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let componenteAtivo = true;
    const carregarDados = async () => {
      setCarregando(true);
      setMensagemErro(null);
      setErroContratos(false);

      const [contratos, pagamentos] = await Promise.allSettled([
        contratoService.ContratosAtivos(),
        pagamentoService.ListarPagamentos(),
      ]);
      if (!componenteAtivo) return;

      if (contratos.status === "fulfilled")
        setQuantidadeContratosAtivos(contratos.value);
      else setErroContratos(true);

      if (pagamentos.status === "fulfilled")
        setListaPagamentos(pagamentos.value);
      else
        setMensagemErro(
          "Não foi possível carregar os pagamentos. Tente novamente.",
        );

      setCarregando(false);
    };

    void carregarDados();
    return () => {
      componenteAtivo = false;
    };
  }, [tentativa]);

  const resumo = useMemo(() => {
    const pagamentos = listaPagamentos ?? [];
    return {
      total: pagamentos.length,
      pendentes: pagamentos.filter((p) => p.statusPagamento === 0).length,
      pagos: pagamentos.filter((p) => p.statusPagamento === 1).length,
      atrasados: pagamentos.filter((p) => p.statusPagamento === 2).length,
    };
  }, [listaPagamentos]);

  const pagamentosFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim());
    return (listaPagamentos ?? []).filter((pagamento) => {
      const statusCorresponde =
        filtroStatus === "todos" ||
        pagamento.statusPagamento === codigoStatus[filtroStatus];
      const dados = normalizarTexto(
        [
          pagamento.nomeAluno,
          pagamento.emailAluno,
          pagamento.nomePlano,
          getStatus(pagamento.statusPagamento).nome,
        ].join(" "),
      );
      return statusCorresponde && dados.includes(termo);
    });
  }, [busca, filtroStatus, listaPagamentos]);

  const filtros: { id: FiltroStatus; label: string; quantidade: number }[] = [
    { id: "todos", label: "Todos", quantidade: resumo.total },
    { id: "pendente", label: "Pendentes", quantidade: resumo.pendentes },
    { id: "pago", label: "Pagos", quantidade: resumo.pagos },
    { id: "atrasado", label: "Em atraso", quantidade: resumo.atrasados },
  ];
  const indicadores = [
    {
      titulo: "Contratos ativos",
      valor: quantidadeContratosAtivos ?? (erroContratos ? "—" : "..."),
      legenda: erroContratos
        ? "Não foi possível atualizar este dado"
        : "Contratos vigentes na unidade",
      cor: "green" as const,
      icone: <Icon nome="alunos" className="h-6 w-6" />,
    },
    {
      titulo: "Pagamentos pendentes",
      valor: carregando ? "..." : resumo.pendentes,
      legenda: "Aguardando confirmação",
      cor: "amber" as const,
      icone: <Icon nome="calendario" className="h-5 w-5" />,
    },
    {
      titulo: "Pagamentos em atraso",
      valor: carregando ? "..." : resumo.atrasados,
      legenda: "Precisam de acompanhamento",
      cor: "rose" as const,
      icone: <Icon nome="calendario" className="h-5 w-5" />,
    },
  ];

  const estadoVazio = carregando
    ? "Carregando pagamentos..."
    : mensagemErro
      ? mensagemErro
      : resumo.total === 0
        ? "Nenhum pagamento encontrado para contratos ativos."
        : `Nenhum resultado para os filtros selecionados${busca.trim() ? ` e a busca “${busca.trim()}”` : ""}.`;

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <header className="relative mb-6 overflow-hidden rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#e8f5d9] px-5 py-6 shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:mb-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4bd] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-800 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Painel da recepção
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
              Gerenciamento de alunos
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#66705e] sm:text-base">
              Consulte os alunos e acompanhe os pagamentos dos contratos ativos.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[34px] border-green-700/[0.06] sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-green-800/[0.12] lg:block"
          >
            <Icon nome="alunos" className="h-28 w-28" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {indicadores.map((item) => (
            <Indicador key={item.titulo} {...item} />
          ))}
        </div>

        <section
          aria-label="Lista de pagamentos dos alunos"
          className="mt-6 overflow-hidden rounded-2xl border border-[#dfe5da] bg-white shadow-[0_8px_28px_rgba(32,37,30,0.05)] sm:mt-8"
        >
          <div className="flex flex-col gap-4 border-b border-[#e7ebe3] p-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#20251e] sm:text-lg">
                  Alunos e pagamentos
                </h2>
                <p className="mt-1 text-sm text-[#81897d]">
                  {carregando
                    ? "Buscando registros..."
                    : `${resumo.total} ${resumo.total === 1 ? "parcela" : "parcelas"} em contratos ativos`}
                </p>
              </div>
              <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4f8ef] px-3 py-1.5 text-sm font-medium text-[#59634f] sm:mt-0 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                {quantidadeContratosAtivos ?? "—"} contratos ativos
              </span>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div
                className="flex min-w-0 gap-2 overflow-x-auto pb-1 md:flex-1"
                role="group"
                aria-label="Filtrar pagamentos por status"
              >
                {filtros.map((filtro) => {
                  const selecionado = filtroStatus === filtro.id;
                  return (
                    <button
                      key={filtro.id}
                      type="button"
                      aria-pressed={selecionado}
                      onClick={() => setFiltroStatus(filtro.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${selecionado ? "border-green-700 bg-green-700 text-white" : "border-[#dfe5da] bg-white text-[#59634f] hover:bg-[#f4f8ef]"}`}
                    >
                      {filtro.label}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs ${selecionado ? "bg-white/20 text-white" : "bg-[#f1f4ed] text-[#66705e]"}`}
                      >
                        {filtro.quantidade}
                      </span>
                    </button>
                  );
                })}
              </div>
              <label className="flex h-12 w-full shrink-0 items-center gap-3 rounded-lg border border-[#dfe5da] bg-[#fbfcfa] px-4 transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/15 md:w-[340px]">
                <Icon nome="busca" className="h-5 w-5 shrink-0 text-[#747c70]" />
                <input
                  type="search"
                  aria-label="Buscar alunos ou pagamentos"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Buscar por nome, e-mail ou plano"
                  className="h-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm leading-normal text-[#20251e] outline-none placeholder:text-[#92998e] focus:ring-0"
                />
              </label>
            </div>
          </div>

          {carregando || mensagemErro || pagamentosFiltrados.length === 0 ? (
            <div className="flex min-h-44 flex-col items-center justify-center gap-3 px-5 py-10 text-center">
              {carregando && (
                <span
                  className="h-7 w-7 animate-spin rounded-full border-2 border-[#dcebd0] border-t-green-700"
                  role="status"
                  aria-label="Carregando pagamentos"
                />
              )}
              <p
                className={`max-w-lg text-sm ${mensagemErro ? "text-rose-700" : "text-[#747c70]"}`}
                role={mensagemErro ? "alert" : "status"}
              >
                {estadoVazio}
              </p>
              {mensagemErro && (
                <button
                  type="button"
                  onClick={() => setTentativa((valor) => valor + 1)}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  Tentar novamente
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-[#f7f9f4] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66705e] sm:text-xs">
                    <tr>
                      <th scope="col" className="px-5 py-3.5">
                        Aluno
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Plano
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Vencimento
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Status do pagamento
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-right">
                        Contato
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf0e9] text-[#343a31]">
                    {pagamentosFiltrados.map((pagamento) => (
                      <LinhaPagamento
                        key={pagamento.id}
                        pagamento={pagamento}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="divide-y divide-[#edf0e9] md:hidden">
                {pagamentosFiltrados.map((pagamento) => (
                  <CartaoPagamento key={pagamento.id} pagamento={pagamento} />
                ))}
              </div>
            </>
          )}

          <div className="flex flex-col gap-2 border-t border-[#e7ebe3] bg-[#fbfcfa] px-4 py-3 text-sm text-[#747c70] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs">
            <span>
              Exibindo{" "}
              {carregando || mensagemErro ? 0 : pagamentosFiltrados.length} de{" "}
              {resumo.total} parcelas
            </span>
            <span>Dados dos contratos ativos</span>
          </div>
        </section>
      </div>
    </section>
  );
}

export default RecepcionistaGerenciamentoAlunoPage;
