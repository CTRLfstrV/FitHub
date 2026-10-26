export class SessaoInvalidaException extends Error{
    constructor(){
        super("Sessão invalida");

        this.name = "SessaoInvalidaException";
    }
}