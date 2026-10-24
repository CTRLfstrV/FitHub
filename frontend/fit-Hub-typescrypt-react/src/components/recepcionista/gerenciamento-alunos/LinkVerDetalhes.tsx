import { Link } from "react-router-dom";

function LinkVerDetalhes({ idAlunoPagamento }: { idAlunoPagamento: number }) {
  return (
    <Link
      to={`/recepcionista/detalhes-aluno/${idAlunoPagamento}`}
      aria-label={`Ver detalhes do pagamento de ${idAlunoPagamento}`}
      title={`Ver detalhes do aluno ${idAlunoPagamento}`}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#59634f] transition-colors hover:bg-[#f2f8ec] hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
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
