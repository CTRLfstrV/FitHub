import type { PlanoResponseDTO } from "../../../../types/financeiro/plano/PlanoResponseDTO";
import CardPlano from "./CardPlano";

type ListaPlanosProps = {
  planos: PlanoResponseDTO[];
  onEditar: (plano: PlanoResponseDTO) => void;
  onExcluir: (plano: PlanoResponseDTO) => void;
  desabilitado?: boolean;
};

function ListaPlanos({
  planos,
  onEditar,
  onExcluir,
  desabilitado,
}: ListaPlanosProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
      {planos.map((plano) => (
        <CardPlano
          key={plano.id}
          plano={plano}
          onEditar={onEditar}
          onExcluir={onExcluir}
          desabilitado={desabilitado}
        />
      ))}
    </div>
  );
}

export default ListaPlanos;
