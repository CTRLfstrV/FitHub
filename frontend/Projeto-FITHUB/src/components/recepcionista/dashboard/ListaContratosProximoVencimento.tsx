import type { ContratoProximoVencimentoResponseDTO } from "../../../types/financeiro/ContratoProximoVencimentoResponseDTO";
import CartoesContratosProximoVencimento from "./CartoesContratosProximoVencimento";
import TabelaContratosProximoVencimento from "./TabelaContratosProximoVencimento";

interface ListaContratosProximoVencimentoProps {
  contratos: ContratoProximoVencimentoResponseDTO[] | null | undefined;
}

function ListaContratosProximoVencimento({
  contratos,
}: ListaContratosProximoVencimentoProps) {
  return (
    <section className="fithub-card mt-6 overflow-hidden sm:mt-8">
      <div className="flex flex-col gap-1 border-b border-[#e7ebe3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div>
          <h2 className="text-base font-semibold text-[#20251e] sm:text-lg">
            Alunos com contrato próximo à expiração
          </h2>
          <p className="mt-1 text-xs text-[#81897d] sm:text-sm">
            Acompanhe os próximos vencimentos
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4f8ef] px-3 py-1.5 text-xs font-medium text-[#59634f] sm:mt-0">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          Próximos vencimentos
        </span>
      </div>

      <TabelaContratosProximoVencimento contratos={contratos} />
      <CartoesContratosProximoVencimento contratos={contratos} />
    </section>
  );
}

export default ListaContratosProximoVencimento;
