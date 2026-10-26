import type { ReactNode } from "react";
import type { CorIndicador } from "./Indicador";
import Icon from "./Icon";
import Indicador from "./Indicador";

interface IndicadoresGerenciamentoAlunosProps {
  quantidadeContratosAtivos: number | null;
  erroContratos: boolean;
  quantidadeContratosPendentes: number | null;
  erroContratosPendentes: boolean;
  carregando: boolean;
  pendentes: number;
  atrasados: number;
}

function IndicadoresGerenciamentoAlunos({
  quantidadeContratosAtivos,
  erroContratos,
  quantidadeContratosPendentes,
  erroContratosPendentes,
  carregando,
  pendentes,
  atrasados,
}: IndicadoresGerenciamentoAlunosProps) {
  const indicadores: {
    titulo: string;
    valor: string | number;
    legenda: string;
    cor: CorIndicador;
    icone: ReactNode;
  }[] = [
    {
      titulo: "Contratos ativos",
      valor: quantidadeContratosAtivos ?? (erroContratos ? "—" : "..."),
      legenda: erroContratos
        ? "Não foi possível atualizar este dado"
        : "Contratos vigentes na unidade",
      cor: "green",
      icone: <Icon nome="alunos" className="h-6 w-6" />,
    },
    {
      titulo: "Contratos pendentes",
      valor:
        quantidadeContratosPendentes ??
        (erroContratosPendentes ? "—" : "..."),
      legenda: erroContratosPendentes
        ? "Não foi possível atualizar este dado"
        : "Aguardando regularização",
      cor: "amber",
      icone: <Icon nome="calendario" className="h-5 w-5" />,
    },
    {
      titulo: "Pagamentos pendentes",
      valor: carregando ? "..." : pendentes,
      legenda: "Aguardando confirmação",
      cor: "amber",
      icone: <Icon nome="calendario" className="h-5 w-5" />,
    },
    {
      titulo: "Pagamentos em atraso",
      valor: carregando ? "..." : atrasados,
      legenda: "Precisam de acompanhamento",
      cor: "rose",
      icone: <Icon nome="calendario" className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {indicadores.map((item) => (
        <Indicador key={item.titulo} {...item} />
      ))}
    </div>
  );
}

export default IndicadoresGerenciamentoAlunos;
