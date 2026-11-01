import type { DetalhesPlanoResponseDTO } from "../../../../types/financeiro/DetalhesPlanoResponseDTO";
import CabecalhoDetalhesPlano from "./CabecalhoDetalhesPlano";
import ListaContratosPlano from "./ListaContratosPlano";
import ResumoDetalhesPlano from "./ResumoDetalhesPlano";

const planoDemonstracao: DetalhesPlanoResponseDTO = {
  nome: "Mensal",
  valor: 150,
  contratos: [
    {
      incio: "2026-10-01T00:00:00",
      termino: "2026-10-31T00:00:00",
      aluno: { nome: "Ana Souza", email: "ana@fithub.test" },
    },
    {
      incio: "2026-10-16T00:00:00",
      termino: "2026-11-15T00:00:00",
      aluno: { nome: "Lucas Almeida", email: "lucas@fithub.test" },
    },
    {
      incio: "2026-09-20T00:00:00",
      termino: "2026-11-19T00:00:00",
      aluno: { nome: "Aluno Teste", email: "alunoteste@email.com" },
    },
    {
      incio: "2026-10-24T00:00:00",
      termino: "2027-10-24T00:00:00",
      aluno: { nome: "Aluno Teste", email: "aluno.teste.2026@example.com" },
    },
    {
      incio: "2026-10-29T00:00:00",
      termino: "2026-11-29T00:00:00",
      aluno: { nome: "Miguel", email: "miguel@email.com" },
    },
  ],
};

function DetalhesPlanoConteudo() {
  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoDetalhesPlano plano={planoDemonstracao} />
        <ResumoDetalhesPlano plano={planoDemonstracao} />
        <ListaContratosPlano contratos={planoDemonstracao.contratos} />
      </div>
    </section>
  );
}

export default DetalhesPlanoConteudo;
