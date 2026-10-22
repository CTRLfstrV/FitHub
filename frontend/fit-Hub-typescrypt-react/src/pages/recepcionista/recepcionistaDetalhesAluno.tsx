import { useParams } from "react-router-dom";
import DetalhesAlunoConteudo from "../../components/recepcionista/detalhes-aluno/DetalhesAlunoConteudo";

function RecepcionistaDetalhesAluno() {
  const { id } = useParams();
  const idAluno = id === undefined ? Number.NaN : Number(id);
  const idAlunoValido = Number.isSafeInteger(idAluno) && idAluno >= 0;

  return <DetalhesAlunoConteudo idAluno={idAlunoValido ? idAluno : null} />;
}

export default RecepcionistaDetalhesAluno;
