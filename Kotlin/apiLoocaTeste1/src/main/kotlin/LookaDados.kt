import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDate
import java.time.LocalDateTime

class LookaDados {
    val looca = Looca()
    val bdInter: JdbcTemplate
    var id = Looca().processador.id

    init {
        val dataSource = BasicDataSource()
        dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
        val serverName = "localhost"
        val mydatabase = "medconnect"
        dataSource.username = "root"
        dataSource.password = "enzo123"
        dataSource.url = "jdbc:mysql://$serverName/$mydatabase"
        bdInter = JdbcTemplate(dataSource)
    }

    fun all() {
        sistema()
        memoria()
        processador()
        grupoDeDiscos()
        grupoDeServicos()
        grupoDeProcessos()
        Dispositivo()
        rede()
        janelas()
    }


    fun sistema() {
        val sistema = looca.sistema

        println(sistema)

        var fabricante = sistema.fabricante


        var incializando = sistema.inicializado

        var sistemaOperacional = sistema.sistemaOperacional

        var arquitetura = sistema.arquitetura

        var permissao = sistema.permissao

        var tempDeAtividade = sistema.tempoDeAtividade


    }

    fun memoria() {
        val memoria = looca.memoria

        var emUso = memoria.emUso

        var disponivel = memoria.disponivel

        var total = memoria.total
    }

    fun processador() {

        var processador = looca.processador

        var fabricante = processador.fabricante


        var frequencia = processador.frequencia

        var nome = processador.nome


        var identificador = processador.identificador
        println("ids abaixo")
        println(id)
        println("ids acima")

        var microarquitetura = processador.microarquitetura

        var numeroCpuFis = processador.numeroCpusFisicas

        var numCpuLogica = processador.numeroCpusLogicas

        var uso = processador.uso

        var numPacotFisico = processador.numeroPacotesFisicos

        bdInter.execute(
            """
       
       INSERT INTO Registros (fkRoboRegistro, HorarioDado, dado, fkComponente) 
VALUES 
  (1, '${LocalDateTime.now()}', ${uso}, 1);
       
         """
        )
    }

    fun grupoDeDiscos() {
        val grupoDeDiscos = looca.grupoDeDiscos


        var qtdDeDisco = grupoDeDiscos.quantidadeDeDiscos
        //I live in the Rua hadock lobo Building on West 595 Street on the 2nd floor. My name is Enzo I’m 18 years old. There is an idea of a Enzo. Some kind of abstraction. But there is no real me.

        var discos = grupoDeDiscos.discos

        var volumes = grupoDeDiscos.volumes

        var tamanhoTotal = grupoDeDiscos.tamanhoTotal

        var qtdVolumes = grupoDeDiscos.quantidadeDeVolumes

        var nome = discos[0].nome

        var serial = discos[0].serial
    }

    fun grupoDeServicos() {
        val grupoDeServicos = looca.grupoDeServicos
        var servicos = grupoDeServicos.servicos
        var nome = servicos[0].nome
        var estado = servicos[0].estado
        var pid = servicos[0].pid
        var servicosAtivos = grupoDeServicos.servicosAtivos
        var sevicosInativos = grupoDeServicos.servicosInativos
        var totalDeServiços = grupoDeServicos.totalDeServicos
        var totalServicosAtivos = grupoDeServicos.totalServicosAtivos
        var totalServicosInativos = grupoDeServicos.totalServicosInativos
    }

    fun grupoDeProcessos() {
        val grupoDeProcessos = looca.grupoDeProcessos
        var processos = grupoDeProcessos.processos
        var totalProcessos = grupoDeProcessos.totalProcessos
        var totalThreads = grupoDeProcessos.totalThreads
    }


    fun Dispositivo() {
        val DispositivoUsbGp = looca.dispositivosUsbGrupo
        var totalConectados = DispositivoUsbGp.totalDispositvosUsbConectados
        var dispositivosUsb = DispositivoUsbGp.dispositivosUsb
        var dispositivosUsbConectados = DispositivoUsbGp.dispositivosUsbConectados
        var totalDispositvosUsb = DispositivoUsbGp.totalDispositvosUsb
    }

    fun rede() {
        val rede = looca.rede
        println(rede)
        var parametros = rede.parametros
        var grupoDeInterfaces = rede.grupoDeInterfaces
    }

    fun janelas() {
        val janela = looca.grupoDeJanelas
        var janelas = janela.janelas
        var janelasVisiveis = janela.janelasVisiveis
        var totalJanelas = janela.totalJanelas
    }


}
