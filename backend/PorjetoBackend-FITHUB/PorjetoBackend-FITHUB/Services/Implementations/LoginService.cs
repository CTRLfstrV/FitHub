using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Helpers;
using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces;
using System.Linq;

namespace PorjetoBackend_FITHUB.Services.Implementations
{
    public class LoginService : ILoginService
    {
        private readonly FitHubDbContext _fitHub;

        public LoginService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public PessoaResponseLoginDTO Login(PessoaLoginDTO usuario)
        {
            Pessoa pessoa = _fitHub.TbPessoa.FirstOrDefault(p => p.Cpf == usuario.Cpf);
            if (pessoa == null)
                throw new PessoaNaoEncontradaException("Não existe nenhum usuário cadastrado com esse CPF");
            if (!PasswordHelper.VerificarHash(usuario.Senha, pessoa.Senha))
                throw new SenhaInvalidaException("A senha digitada está incorreta");

            return new (pessoa);
        }
    }
}
