import CabecalhoMatriculaAluno from "./CabecalhoMatriculaAluno";
import FormularioMatriculaAluno from "./FormularioMatriculaAluno";

function MatriculaAlunoConteudo() {
  return (
    <section className="min-w-0 flex-1 px-4 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoMatriculaAluno />
        <FormularioMatriculaAluno />
      </div>
    </section>
  );
}

export default MatriculaAlunoConteudo;
