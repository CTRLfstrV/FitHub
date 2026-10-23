using System;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class DataNascimentoException : ApplicationException
    {
        public DataNascimentoException()
        {
        }

        public DataNascimentoException(string message) : base(message)
        {
        }
    }
}