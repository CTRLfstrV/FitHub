using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;
using System;
using System.Collections.Generic;
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
            Aluno = aluno;
            Plano = plano;
            Inicio = DateTime.Today;
            Termino = contratoMatricula.Termino;
            StatusContrato = StatusContrato.PENDENTE;
            Valor = plano.Valor;
            QuantidadeParcelas = contratoMatricula.QuantidadeParcelas;
        }
    }
}