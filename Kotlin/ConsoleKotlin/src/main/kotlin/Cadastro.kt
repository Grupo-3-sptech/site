class Cadastro {
    var email:String = ""
    var senha:String = ""

    fun logar():String{
        return "Parabéns, agora você está logado!"
    }
    fun negar():String{
        return "Não foi possível seu acesso, tente novamente!"
    }
    fun finalizar():String{
        return "\r\nVocê excedeu o numero de tentativas \r\nTente novamente mais tarde"
    }
}