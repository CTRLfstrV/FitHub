using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;
using System;
using System.Collections.Generic;
using System.Globalization;
using PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Models.Entities.Financeiro
{
    public class Contrato
    {
        public int Id { get; private set; }
        public Aluno Aluno { get; private set; }
        public Plano Plano { get; private set; }

        public DateTime Inicio { get; private set; }
        public DateTime Termino { get; set; }
        public StatusContrato StatusContrato { get; set; }
        public decimal Valor { get; private set; }
        public int QuantidadeParcelas { get; private set; }
        public List<Pagamento> Pagamentos { get; set; }

        public Contrato()
        {
        }

        public Contrato(ContratoMatriculaResponseDTO contratoMatricula, Aluno aluno, Plano plano)
        {
            if (!DateTime.TryParse(contratoMatricula.Termino, CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTime terminoContrato))
                throw new DatasException("Data de nascimento inválida");
            Aluno = aluno;
            Plano = plano;
            Inicio = DateTime.Today;
            Termino = terminoContrato;
            StatusContrato = StatusContrato.PENDENTE;
            Valor = plano.Valor;
            QuantidadeParcelas = contratoMatricula.QuantidadeParcelas;
        }
    }
}