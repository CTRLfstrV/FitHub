import { Link } from "react-router-dom";

function LinkVerDetalhes({
  idAluno,
  nomeAluno,
}: {
  idAluno: number;
  nomeAluno: string;
}) {
  return (
    <Link
      to={`/recepcionista/detalhes-aluno/${idAluno}`}
      aria-label={`Ver detalhes do aluno ${nomeAluno}`}
      title={`Ver detalhes do aluno ${nomeAluno}`}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dcebd0] bg-[#f3f8ed] text-green-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    </Link>
  );
}

export default LinkVerDetalhes;
