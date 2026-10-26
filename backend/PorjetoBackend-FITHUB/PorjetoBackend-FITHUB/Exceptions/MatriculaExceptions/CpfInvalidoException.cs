using System;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class CpfInvalidoException : ApplicationException
    {
        public CpfInvalidoException()
        {
        }

        public CpfInvalidoException(string message) : base(message)
        {
        }
    }
}