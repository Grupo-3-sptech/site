import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

class LookaDados {
    val looca = Looca()


    fun sistema() {
        val sistema = looca.sistema

        var fabricante = sistema.fabricante

        var incializando = sistema.inicializado

        var sistemaOperacional = sistema.sistemaOperacional

        var arquitetura = sistema.arquitetura

        var permissao = sistema.permissao

        var tempDeAtividade = sistema.tempoDeAtividade

    }

    fun memoria(){
        val memoria = looca.memoria
        var emUso = memoria.emUso
        var disponivel = memoria.disponivel
        var total = memoria.total
    }
    fun processador(){
        val processador = looca.processador

        var fabricante = processador.fabricante

        var id = processador.id

        var frequencia = processador.frequencia

        var nome = processador.nome

        var identificador = processador.identificador
        //println(identificador)

        var microarquitetura = processador.microarquitetura

        var numeroCpuFis = processador.numeroCpusFisicas

        var numCpuLogica = processador.numeroCpusLogicas

        var uso = processador.uso

        var numPacotFisico = processador.numeroPacotesFisicos
    }
    fun grupoDeDiscos(){
        val grupoDeDiscos = looca.grupoDeDiscos
        var qtdDeDisco = grupoDeDiscos.quantidadeDeDiscos
        //I live in the Rua hadock lobo Building on West 595 Street on the 2nd floor. My name is Enzo I’m 18 years old. There is an idea of a Enzo. Some kind of abstraction. But there is no real me.

        //não entendi direito essa variavel fica muito grande não recomendo usar por enquanto
        var discos = grupoDeDiscos.discos

        var volumes = grupoDeDiscos.volumes

        var tamanhoTotal = grupoDeDiscos.tamanhoTotal

        var qtdVolumes = grupoDeDiscos.quantidadeDeVolumes
    }

    fun grupoDeServicos(){
        val grupoDeServicos = looca.grupoDeServicos

        var servicos = grupoDeServicos.servicos
        var servicosAtivos = grupoDeServicos.servicosAtivos
        var sevicosInativos = grupoDeServicos.servicosInativos
        var totalDeServiços = grupoDeServicos.totalDeServicos
        var totalServicosAtivos = grupoDeServicos.totalServicosAtivos
        var totalServicosInativos = grupoDeServicos.totalServicosInativos
    }

    fun grupoDeProcessos(){
        val grupoDeProcessos = looca.grupoDeProcessos
        var processos = grupoDeProcessos.processos
        var totalProcessos =grupoDeProcessos.totalProcessos
        var totalThreads =grupoDeProcessos.totalThreads
    }


    fun Dispositivo(){
        val DispositivoUsbGp = looca.dispositivosUsbGrupo
        var totalConectados = DispositivoUsbGp.totalDispositvosUsbConectados
        var dispositivosUsb = DispositivoUsbGp.dispositivosUsb
        // println(dispositivosUsb)
        //println(dispositivosUsb[0].nome)
        var dispositivosUsbConectados = DispositivoUsbGp.dispositivosUsbConectados
        var totalDispositvosUsb = DispositivoUsbGp.totalDispositvosUsb
    }

    fun rede(){
        val rede = looca.rede
        var parametros = rede.parametros
        var grupoDeInterfaces = rede.grupoDeInterfaces
    }
    fun janelas(){
        val janela = looca.grupoDeJanelas
        var janelas = janela.janelas
        var janelasVisiveis = janela.janelasVisiveis
        var totalJanelas = janela.totalJanelas
    }





}
