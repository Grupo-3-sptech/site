import java.util.Scanner

fun main() {
    val Pessoa = Cadastro()
    var i = -3
    while(i < 0){
        var scanner = Scanner(System.`in`)
        println("\r\nTentativas restantes: ${i * (-1)}")
        println("Insira seu email")
        Pessoa.email = scanner.next()
        println("Insira sua senha")
        Pessoa.senha = scanner.next()
        if(Pessoa.email == "adm@hospital.com" && Pessoa.senha == "12345"){
            println(Pessoa.logar())
            break
            }
        else{
            println(Pessoa.negar())
            i += 1
        }
        if(i >= 0){
        println(Pessoa.finalizar())
        }
    }
}