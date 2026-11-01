import type { DetalhesAlunoResponseDTO } from "../../../types/financeiro/DetalhesAlunoResponseDTO";

function formatarDataCompleta(valor: string | null) {
  if (valor === null || valor.trim() === "") return "Em espera";

  const data = new Date(valor);
  return Number.isNaN(data.getTime())
    ? "Data não informada"
    : new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(data);
}

function InformacoesContratoAluno({
  contrato,
}: {
  contrato: DetalhesAlunoResponseDTO;
}) {
  return (
    <section className="fithub-card p-4 sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-800">
            Contrato
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#20251e] sm:text-xl">
            Informações do contrato
          </h2>
        </div>
        <span className="hidden rounded-lg bg-[#f3f9ed] px-3 py-2 text-xs font-semibold text-[#557a3a] sm:inline-flex">
          {contrato.nomePlano}
        </span>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 sm:gap-x-8">
        <div className="rounded-2xl bg-[#f6f8f4] p-4 ring-1 ring-inset ring-[#edf0ea]">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">
            Início do contrato
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-[#343b2e] sm:text-base">
            {formatarDataCompleta(contrato.dataInicioContrato)}
          </dd>
        </div>
        <div className="rounded-2xl bg-[#f6f8f4] p-4 ring-1 ring-inset ring-[#edf0ea]">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">
            Término do contrato
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-[#343b2e] sm:text-base">
            {formatarDataCompleta(contrato.dataTerminoContrato)}
          </dd>
        </div>
        <div className="rounded-2xl bg-[#f6f8f4] p-4 ring-1 ring-inset ring-[#edf0ea] sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">
            Valor contratado
          </dt>
          <dd className="mt-1.5 text-sm font-semibold text-[#343b2e] sm:text-base">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(contrato.valorContrato)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default InformacoesContratoAluno;
