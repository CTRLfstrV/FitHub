using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;
using System;
using System.Globalization;
using System.Linq;
using PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions;
using PorjetoBackend_FITHUB.Exceptions;
using System.Text.RegularExpressions;
using PorjetoBackend_FITHUB.Helpers;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public abstract class Pessoa
    {
        public int Id { get; private set; }
        public string Nome { get; set; }

        private string _senha;
        public string Senha
        {
            get { return _senha; }
            set
            {
                VerificaSenha(value);
                _senha = PasswordHelper.GerarHash(value);
            }
        }
        
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; private set; }
        public string Cep { get; set; }
        public int NumeroCasa { get; set; }
        public string Telefone { get; set; }
        public string TelefoneEmergencia { get; set; }
        public SexoPessoa Sexo { get; private set; }
        public TipoPessoa TipoPessoa { get; private set; }
        public string Email { get; set; }

        public Pessoa()
        {
        }

        public Pessoa(PessoaLoginDTO usuarioLogin)
        {
            Cpf = usuarioLogin.Cpf;
            Senha = usuarioLogin.Senha;
        }

        public Pessoa(AlunoMatriculaResponseDTO alunoMatricula)
        {
            if (!DateTime.TryParse(alunoMatricula.DataNascimento, CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTime dataNascimento))
                throw new DataNascimentoException("Data de nascimento inválida");
            VerificaCpf(alunoMatricula.Cpf);
            VerificaCep(alunoMatricula.Cep);
            VerificaSenha(alunoMatricula.Senha);
            VerificaDataNascimento(dataNascimento);
            VerificaNumeroCelular(alunoMatricula.Telefone);
            Nome = alunoMatricula.Nome;
            Senha = PasswordHelper.GerarHash(alunoMatricula.Senha);
            Cpf = alunoMatricula.Cpf;
            DataNascimento = dataNascimento;
            Cep = alunoMatricula.Cep;
            NumeroCasa = alunoMatricula.NumeroCasa;
            Telefone = alunoMatricula.Telefone;
            TelefoneEmergencia = alunoMatricula.TelefoneEmergencia;
            Sexo = alunoMatricula.Sexo;
            TipoPessoa = TipoPessoa.ALUNO;
            Email = alunoMatricula.Email;
        }

        #region Verificação do cpf

        private void VerificaCpf(string cpf)
        {
            if (cpf.Length != 11 || !cpf.All(char.IsDigit))
                throw new CpfInvalidoException("CPF invalido");

            bool digitosIguais = cpf.All(caracter => caracter == cpf[0]);

            if (digitosIguais) throw new CpfInvalidoException("CPF invalido");
            VerificaDigitosCpf(cpf);
        }

        private void VerificaDigitosCpf(string cpf)
        {
            VerificaPrimeiroDigitoCpf(cpf);
            VerificaSegundoDigitoCpf(cpf);
        }

        private void VerificaPrimeiroDigitoCpf(string cpf)
        {
            int somaCaracteresCpf = 0;

            for (int i = 0; i < 9; i++)
            {
                int caracter = int.Parse(cpf[i].ToString());
                somaCaracteresCpf += caracter * (10 - i);
            }

            int restoDivisao = somaCaracteresCpf % 11;
            if (restoDivisao < 2)
            {
                if (int.Parse(cpf[9].ToString()) != 0)
                    throw new CpfInvalidoException("CPF invalido");
            }
            else
            {
                if (11 - restoDivisao != int.Parse(cpf[9].ToString()))
                    throw new CpfInvalidoException("CPF invalido");
            }
        }

        private void VerificaSegundoDigitoCpf(string cpf)
        {
            int somaCaracteresCpf = 0;

            for (int i = 0; i < 10; i++)
            {
                int caracter = int.Parse(cpf[i].ToString());
                somaCaracteresCpf += caracter * (11 - i);
            }

            int restoDivisao = somaCaracteresCpf % 11;
            if (restoDivisao < 2)
            {
                if (int.Parse(cpf[10].ToString()) != 0)
                    throw new CpfInvalidoException("CPF invalido");
            }
            else
            {
                if (11 - restoDivisao != int.Parse(cpf[10].ToString()))
                    throw new CpfInvalidoException("CPF invalido");
            }
        }

        #endregion

        #region Verificação email

        public void VerificaEmail(string email)
        {
            string padrao = @"^[^@\s]+@[^@\s]+\.[^@\s]{2,}$";
            if (string.IsNullOrWhiteSpace(email) || !Regex.IsMatch(email, padrao))
                throw new EmailInvalidoException("Email invalido");
        }

        #endregion

        #region Verificação Cep

        private void VerificaCep(string cep)
        {
            if (cep.Length != 8 || string.IsNullOrWhiteSpace(cep))
                throw new CepInvalidoException("CEP invalido");
        }

        #endregion

        #region Verificacao Senha

        private void VerificaSenha(string senha)
        {
            string padrao = @"^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$";

            if (string.IsNullOrWhiteSpace(senha) || !Regex.IsMatch(senha, padrao) || senha.Length < 8)
                throw new SenhaInvalidaException("Senha Inválida");
        }

        #endregion

        #region Verificação Data de Nascimento

        private void VerificaDataNascimento(DateTime dataNascimento)
        {
            if (dataNascimento == DateTime.MinValue || dataNascimento == DateTime.MaxValue ||
                dataNascimento.Date >= DateTime.Today)
                throw new DataNascimentoException("Data Nascimento invalido");
        }

        #endregion

        #region Verificação numero de celular

        private void VerificaNumeroCelular(string numeroCelular)
        {
            string padrao = @"^\(?\d{2}\)?\s?9\d{4}-?\d{4}$";

            if (string.IsNullOrWhiteSpace(numeroCelular) ||
                !Regex.IsMatch(numeroCelular, padrao))
            {
                throw new NumeroCelularException("Celular inválido");
            }
        }

        #endregion
    }
}