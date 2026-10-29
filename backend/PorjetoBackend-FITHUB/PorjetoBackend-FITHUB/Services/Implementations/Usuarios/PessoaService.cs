using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Helpers;
using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Implementations.Usuarios
{
    public class PessoaService : IPessoaService
    {
        private readonly FitHubDbContext _fitHub;

        public PessoaService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public async Task<PessoaDadosResponse> RetornaDadosPessoa(int idPessoa)
        {
            PessoaDadosResponse dadosPessoa = await _fitHub.TbPessoa.Where(p => p.Id == idPessoa)
                .Select(p => new PessoaDadosResponse(p))
                .FirstOrDefaultAsync<PessoaDadosResponse>();

            if (dadosPessoa == null)
                throw new PessoaNaoEncontradaException("Não foi possível pegar os dados dessa pessoa");

            return dadosPessoa;
        }

        public async Task AlterarDados(int idPessoa, AlteracaoDadosResponseDTO alteracaoDados)
        {
            Pessoa pessoa = await _fitHub.TbPessoa.FirstOrDefaultAsync<Pessoa>(p => p.Id == idPessoa);
            if (pessoa == null)
                throw new PessoaNaoEncontradaException("Não foi possível encontrar esse usuário");

            pessoa.Nome = alteracaoDados.NovoNome;
            pessoa.Email = alteracaoDados.NovoEmail;
            pessoa.Telefone = alteracaoDados.NovoTelefone;
            
            await _fitHub.SaveChangesAsync();
        }

        public async Task AlterarSenha(int idPessoa, AlteracaoSenhaDTO alteracaoSenha)
        {
            Pessoa pessoa = await _fitHub.TbPessoa.FirstOrDefaultAsync<Pessoa>(p => p.Id == idPessoa);
            if (!PasswordHelper.VerificarHash(alteracaoSenha.Antiga, pessoa.Senha))
                throw new SenhaInvalidaException("A senha digitada não é compátivel com a senha antiga");

            pessoa.Senha = alteracaoSenha.Nova;
            await _fitHub.SaveChangesAsync();
        }
    }
}