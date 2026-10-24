using System;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class NumeroCelularException : ApplicationException
    {
        public NumeroCelularException()
        {
        }

        public NumeroCelularException(string message) : base(message)
        {
        }
    }
}