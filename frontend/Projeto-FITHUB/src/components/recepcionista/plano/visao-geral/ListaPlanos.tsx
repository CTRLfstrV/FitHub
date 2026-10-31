import type { PlanoResponseDTO } from "../../../../types/financeiro/PlanoResponseDTO";
import CardPlano from "./CardPlano";

type ListaPlanosProps = {
  planos: PlanoResponseDTO[];
};

function ListaPlanos({ planos }: ListaPlanosProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
      {planos.map((plano) => (
        <CardPlano key={plano.id} plano={plano} />
      ))}
    </div>
  );
}

export default ListaPlanos;
