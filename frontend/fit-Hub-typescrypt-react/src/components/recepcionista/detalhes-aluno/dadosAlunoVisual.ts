import type { ContratoAlunoDetalhe } from "./tipos";

// Dados estáticos para validar o layout enquanto a integração com a API não é feita.
const dadosAlunoVisual: ContratoAlunoDetalhe = {
  nomeAluno: "Ana Souza",
  nomePlano: "Mensal",
  dataInicioContrato: "2026-10-01T00:00:00",
  dataTerminoContrato: "2026-10-31T00:00:00",
  valorContrato: 120,
  pagamentos: [
    {
      id: 1,
      numeroParcela: 1,
      valorParcela: 120,
      vencimentoParcela: "2026-10-01T00:00:00",
      dataPagamento: "2026-10-01T00:00:00",
      statusPagamento: 1,
    },
  ],
};

export default dadosAlunoVisual;
