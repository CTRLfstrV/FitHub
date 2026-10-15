using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;
using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Financeiro
{
    public class Contrato
    {
        public int Id { get;private set; }
        public Aluno Aluno { get;private set; }
        public Plano Plano { get;private set; }

        public DateTime Inicio { get;private set; }
        public DateTime Termino { get; set; }
        public StatusContrato StatusContrato { get; set; }
        public int QuantidadeParcelas { get; set; }

        public Contrato() { }
    }
}
