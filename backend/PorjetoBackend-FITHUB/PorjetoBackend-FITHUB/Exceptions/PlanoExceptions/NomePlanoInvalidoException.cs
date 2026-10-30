using System;

namespace PorjetoBackend_FITHUB.Exceptions.PlanoExceptions
{
    public class NomePlanoInvalidoException : ApplicationException
    {
        public NomePlanoInvalidoException()
        {
        }

        public NomePlanoInvalidoException(String message) : base(message)
        {
        }
    }
}