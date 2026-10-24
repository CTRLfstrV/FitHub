using System;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class CepInvalidoException : ApplicationException
    {
        public CepInvalidoException()
        {
        }

        public CepInvalidoException(string message) : base(message)
        {
        }
    }
}