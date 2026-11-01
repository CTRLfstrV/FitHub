import type { PlanoDetalhesResponseDTO } from "../../../../types/financeiro/plano/PlanoDetalhesResponseDTO";

function formatarData(valor: string) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(valor);
  if (!partes) return "Data não informada";

  const [, ano, mes, dia] = partes;
  const data = new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia)));

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(data);
}

function obterIniciais(nome: string) {
  return nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

function ListaContratosPlano({ plano }: { plano: PlanoDetalhesResponseDTO }) {
  const contratos = plano.contratos ?? [];

  return (
    <section className="fithub-card mt-6 overflow-hidden sm:mt-8">
      <div className="flex flex-col justify-between gap-3 border-b border-[#e5eddc] bg-gradient-to-r from-[#f3f9ed] via-white to-white px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-800">
            Alunos
          </p>
          <h2 className="mt-1 text-lg font-extrabold text-[#20251e] sm:text-xl">
            Contratos vinculados
          </h2>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-[#f3f9ed] px-3 py-1.5 text-xs font-semibold text-[#557a3a]">
          {contratos.length} {contratos.length === 1 ? "contrato" : "contratos"}
        </span>
      </div>

      {contratos.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-[#66705e] sm:px-6">
          Nenhum contrato vinculado a este plano.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#fbfcfa] text-xs uppercase tracking-wide text-[#788270]">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-semibold">Aluno</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">E-mail</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Início</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Término</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e9]">
                {contratos.map((contrato) => (
                  <tr
                    key={contrato.id}
                    className="text-[#424a3d] transition-colors hover:bg-[#f7fbf3]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5e9] text-sm font-bold text-[#3f7846] ring-1 ring-inset ring-[#dce9d5]">
                          {obterIniciais(contrato.aluno.nome)}
                        </span>
                        <span className="font-semibold text-[#343b2e]">
                          {contrato.aluno.nome}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#66705e]">{contrato.aluno.email}</td>
                    <td className="px-4 py-4">{formatarData(contrato.inicio)}</td>
                    <td className="px-4 py-4">{formatarData(contrato.termino)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#edf0e9] md:hidden">
            {contratos.map((contrato) => (
              <article
                key={contrato.id}
                className="space-y-4 px-5 py-5 transition-colors hover:bg-[#fbfdf8]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf5e9] text-sm font-bold text-[#3f7846] ring-1 ring-inset ring-[#dce9d5]">
                    {obterIniciais(contrato.aluno.nome)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#343b2e]">
                      {contrato.aluno.nome}
                    </p>
                    <p className="truncate text-xs text-[#788270]">
                      {contrato.aluno.email}
                    </p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-[#edf0e9] pt-3">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">
                      Início
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#424a3d]">
                      {formatarData(contrato.inicio)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">
                      Término
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#424a3d]">
                      {formatarData(contrato.termino)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ListaContratosPlano;
