import com.github.britooo.looca.api.core.Looca
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate


fun main() {
    val dataSource = BasicDataSource()
    dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
    val serverName = "localhost"
    val mydatabase = "medconnect"
    dataSource.username = "root"
    //não esqueca de mudar aqui em baixo
    dataSource.password = "sua senha"
    dataSource.url = "jdbc:mysql://$serverName/$mydatabase"
    val bdInter = JdbcTemplate(dataSource)


    var fabricante = looca1()

    //insert só por poc
    bdInter.execute("""
        insert into statusRobo(nome) value
        ('${fabricante}')
        
        """)

}


    fun looca1(): String {

        val looca = Looca()

//informações do sistema
        val sistema = looca.sistema
        println("\r \n aqui começa os sistemas!!!")
        println(sistema)


//informações da memoria
        val memoria = looca.memoria
        println("\r \n aqui começa as memorias!!!")
        println(memoria)

//informações sobre o processador
        val processador = looca.processador
        println("\r \n aqui começa os processadores!!!")
        println(processador)

//informações sobre a temperatura no momento nn funfa
        val tempatura = looca.temperatura
        //println("\r \n aqui começa os processos!!!")
        //println(tempatura)

//informações sobre os discos
        val grupoDeDiscos = looca.grupoDeDiscos
        val discos = grupoDeDiscos.discos
        println("\r \n aqui começa os discos!!!")
        for (disco in discos) {
            println("\r \n UM DISCO ABAIXO")
            println(disco)
        }

//informações sobre serviços em execução
        val grupoDeServicos = looca.grupoDeServicos
        val servicos = grupoDeServicos.servicos
        for (servico in servicos) {
            println("\r \n aqui começa os serviços!!!")
            println(servico)
        }

//informações sobre os processos em execução
        val grupoDeProcessos = looca.grupoDeProcessos
        val processos = grupoDeProcessos.processos
        for (processo in processos) {
            println("\r \n aqui começa os processos!!!")
            println(processo)
        }

        var placeholder = ""
        return sistema.fabricante
    }

