using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public class Aluno : Pessoa
    {
        public bool Status { get; set; }
        public Aluno() { }

        public Aluno(AlunoMatriculaResponseDTO alunoMatricula) : base(alunoMatricula)
        {
            Status = false;
        }
    }
}
