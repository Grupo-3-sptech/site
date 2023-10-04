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
    dataSource.password = "enzo123"
    dataSource.url = "jdbc:mysql://$serverName/$mydatabase"
    val bdInter = JdbcTemplate(dataSource)



    var looka1 = LookaDados()
    looka1.sistema()
    looka1.memoria()
    looka1.processador()
    looka1.grupoDeDiscos()
    looka1.grupoDeServicos()
    looka1.grupoDeProcessos()
    looka1.Dispositivo()
    looka1.rede()
    looka1.janelas()

    //bdInter.execute("""
        //insert into statusRobo(nome) value
        //('${fabricante}')
      //  """)
}