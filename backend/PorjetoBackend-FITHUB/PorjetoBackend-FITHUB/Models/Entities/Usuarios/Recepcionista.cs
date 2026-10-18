using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public class Recepcionista : Pessoa
    {
        public DateTime DataAdmissao { get; private set; }
        public DateTime? DataDemissao { get; private set; }
        public Recepcionista() { }
    }
}
