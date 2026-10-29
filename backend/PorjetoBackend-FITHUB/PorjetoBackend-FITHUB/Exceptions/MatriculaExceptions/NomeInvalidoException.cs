using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class NomeInvalidoException : ApplicationException
    {
        public NomeInvalidoException()
        {
        }

        public NomeInvalidoException(string message) : base(message)
        {
        }
    }
}
