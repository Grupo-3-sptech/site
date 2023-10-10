import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.io.FileOutputStream
import java.net.URL
import java.nio.channels.Channels
import java.time.LocalDate
import java.time.LocalDateTime
import javax.swing.JOptionPane
import java.io.File

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

        var aPrimeiraVez: Boolean = ver()


        if (aPrimeiraVez == false) {
            sistema()
            memoria()
            processador()
            grupoDeDiscos()
            grupoDeServicos()
            grupoDeProcessos()
            Dispositivo()
            rede()
            janelas()
        } else {
            cadastroUsu()
        }


    }


    fun cadastroUsu() {
        var autorizacao: Boolean = false

        var id: Int = JOptionPane.showInputDialog("insira o ID dado pelo técnico de TI").toInt()
        var senha: String = JOptionPane.showInputDialog("insira sua senha")


        var usu = bdInter.queryForObject(
            """
    select fkHospital from Funcionarios
    where idFuncionarios = $id AND senha = '$senha'
    """,
            Int::class.java,

            )




        if (usu != null) {
            autorizacao = true
        }


        if (autorizacao == true) {
            JOptionPane.showMessageDialog(
                null,
                "arraste o get-pip.py para a pasta public execute o arquivo InstalarPython.bat como adimistrador em seguida o InstalarPip.bat ambos como adimistrador, a instalao já está começando"
            )
//vamos ter que pensar regra de negocio ou script para o pythn ser instalado "aqui"
            cad()
        } else {
            println("problema na autenticação")
        }
    }

    fun cad() {

        bdInter.execute(
            """
                INSERT INTO RoboCirurgiao (modelo, fabricacao, fkStatus, idProcess) 
VALUES ('Modelo A', '${looca.processador.fabricante}', 1, $id);
                
                """
        )
        println("parabéns robo cadastrado baixando agora a solução MEDCONNECT")



        solucao()
        all()
    }


    fun solucao() {

        val url = URL("https://bootstrap.pypa.io/get-pip.py")
        val nomeArquivoDoPip = "get-pip.py"
        downloadArq(url, nomeArquivoDoPip)
        println("Arquivo baixado com sucesso: $nomeArquivoDoPip")

        val nomeBash = "InstalarPip.bat"
        val arqBash = File(nomeBash)
        arqBash.writeText(
            "cd C:\\Users\\Public" +
                    "py get-pip.py"
        )


        val nomePy = "InstalarPip.bat"
        val arqPy = File(nomePy)
        arqPy.writeText(
            "from mysql.connector import connect\n" +
                    "import psutil\n" +
                    "import platform\n" +
                    "import time\n" +
                    "import mysql.connector\n" +
                    "from datetime import datetime\n" +
                    "\n" +
                    "def mysql_connection(host, user, passwd, database=None):\n" +
                    "    connection = connect(\n" +
                    "        host=host,\n" +
                    "        user=user,\n" +
                    "        passwd=passwd,\n" +
                    "        database=database\n" +
                    "    )\n" +
                    "    return connection\n" +
                    "\n" +
                    "connection = mysql_connection('localhost', 'root', 'suasenha', 'MedConnect')\n" +
                    "\n" +
                    "while True:\n" +
                    "    memoria = psutil.virtual_memory()[2]\n" +
                    "    cpu = psutil.cpu_percent(None)\n" +
                    "    disco = psutil.disk_usage('/')[3]\n" +
                    "    interval = 1\n" +
                    "    statusRede = 0\n" +
                    "    network_connections = psutil.net_connections()\n" +
                    "\n" +
                    "    network_active = any(conn.status == psutil.CONN_ESTABLISHED for conn in network_connections)\n" +
                    "\n" +
                    "    \n" +
                    "\n" +
                    "    print (\"\\nINFORMAÇÕES SOBRE A REDE: \")\n" +
                    "\n" +
                    "    if network_active:\n" +
                    "\n" +
                    "        print (\"A rede está ativa.\")\n" +
                    "        statusRede= 1\n" +
                    "    else:\n" +
                    "\n" +
                    "        print (\"A rede não está ativa.\")\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "    cursor = connection.cursor()\n" +
                    "\n" +
                    "\n" +
                    "    horarioAtual = datetime.now()\n" +
                    "    horarioFormatado = horarioAtual.strftime('%Y-%m-%d %H:%M:%S')\n" +
                    "    \n" +
                    "    ins = [cpu, memoria, disco, statusRede]\n" +
                    "    componentes = [1,2,3,4]\n" +
                    "    cursor = connection.cursor()\n" +
                    "    \n" +
                    "    for i in range(len(ins)):\n" +
                    "        \n" +
                    "        dado = ins[i]\n" +
                    "        \n" +
                    "        componente = componentes[i]\n" +
                    "\n" +
                    "    \n" +
                    "        query = \"INSERT INTO Registros (dado, fkRoboRegistro, fkComponente, HorarioDado) VALUES (%s, 1, %s, %s)\"\n" +
                    "\n" +
                    "    \n" +
                    "        cursor.execute(query, (dado, componente,horarioFormatado))\n" +
                    "\n" +
                    "\n" +
                    "        connection.commit()\n" +
                    "    print(\"\\nINFORMAÇÕES SOBRE PROCESSAMENTO: \")\n" +
                    "    print('Porcentagem utilizada do Processador: ',cpu,'\\nPorcentagem utilizada de memoria: ', memoria,'\\nPorcentagem do disco sendo utilizada:', disco,'\\nStatus da rede: ',statusRede)\n" +
                    "   \n" +
                    "    \n" +
                    "       \n" +
                    "\n" +
                    "\n" +
                    "    time.sleep(10)\n" +
                    "\n" +
                    "cursor.close()\n" +
                    "connection.close()\n" +
                    "    "
        )

        val nomeBash1 = "InstalarPython.bat"
        val arqBash1 = File(nomeBash1)
        arqBash1.writeText(
            // escreve um comando de script para instalar o py usando chocolatey
            "@\"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command \"iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))\" && SET \"PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin\"\n\n" +
                    "choco install python311 --params \"/C:\\Users\\Public\""
        )


    }


    fun downloadArq(url: URL, nomeArquivoDoPip: String) {
//funão de baixar arquivo da net
        url.openStream().use {
            Channels.newChannel(it).use { rbc ->
                FileOutputStream(nomeArquivoDoPip).use { fos -> //
                    fos.channel.transferFrom(rbc, 0, Long.MAX_VALUE) //
                }
            }
        }
    }


    fun ver(): Boolean {
        //função que verifica se a maquina já foi usada antes

        var idRobo = bdInter.queryForObject(
            """
    select idRobo from RoboCirurgiao
    where idProcess = '$id'
    """,
            Int::class.java,

            )

        if (idRobo == null) {
            return true
        } else {
            return false
        }


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
