using System;

namespace PorjetoBackend_FITHUB.Exceptions
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