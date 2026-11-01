import type { ContratoProximoVencimentoResponseDTO } from "../../../types/financeiro/ContratoProximoVencimentoResponseDTO";
import IconeCalendario from "./IconeCalendario";

interface CartoesContratosProximoVencimentoProps {
  contratos: ContratoProximoVencimentoResponseDTO[] | null | undefined;
}

function CartoesContratosProximoVencimento({
  contratos,
}: CartoesContratosProximoVencimentoProps) {
  return (
    <div className="grid gap-3 p-3 sm:hidden">
      {contratos?.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-[#747c70]">
          Nenhum contrato próximo do vencimento.
        </p>
      ) : (
        contratos?.map((contrato) => (
          <article key={contrato.id} className="fithub-card space-y-3 p-4">
            <div>
              <h3 className="text-sm font-semibold text-[#20251e]">
                {contrato.nomeAluno}
              </h3>
              <p className="mt-1 text-xs text-[#747c70]">
                {contrato.nomePlano}
              </p>
            </div>
            <p className="flex items-center gap-2 text-xs font-medium text-[#535b4e]">
              <IconeCalendario />
              Término em{" "}
              {new Date(contrato.dataTermino).toLocaleDateString("pt-br")}
            </p>
          </article>
        ))
      )}
    </div>
  );
}

export default CartoesContratosProximoVencimento;
