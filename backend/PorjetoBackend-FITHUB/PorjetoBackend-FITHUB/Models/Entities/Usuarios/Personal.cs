using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public class Personal: Pessoa
    {
        public DateTime DataAdmissao { get;private set; }
        public DateTime? DataDemissao { get; set; }
        public Personal() { }
    }
}
