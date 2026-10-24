using System;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class PlanoInvalidoException : ApplicationException
    {
        public PlanoInvalidoException()
        {
        }

        public PlanoInvalidoException(string message) : base(message)
        {
        }
    }
}