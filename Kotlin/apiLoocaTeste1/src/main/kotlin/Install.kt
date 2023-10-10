import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.io.File
import java.io.FileOutputStream
import java.net.URL
import java.nio.channels.Channels
import javax.swing.JOptionPane

fun main() {

    val bdInter: JdbcTemplate
    val dataSource = BasicDataSource()
    dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
    val serverName = "localhost"
    val mydatabase = "medconnect"
    dataSource.username = "root"
    dataSource.password = "sua senha"
    dataSource.url = "jdbc:mysql://$serverName/$mydatabase"
    bdInter = JdbcTemplate(dataSource)

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




    if(usu != null){
        autorizacao = true
    }


    if(autorizacao == true){
        JOptionPane.showMessageDialog(null, "arraste o get-pip.py para a pasta public execute o arquivo InstalarPython.bat como adimistrador em seguida o InstalarPip.bat ambos como adimistrador, a instalao já está começando")
//vamos ter que pensar regra de negocio ou script para o pythn ser instalado "aqui"
        sol()
    }
    else{
        println("problema na autenticação")
    }
}



fun sol(){
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
                "choco install python311 --params \"/C:\\Users\\Public\"")


}

fun downloadArq(url: URL, nomeArquivoDoPip: String) {
    url.openStream().use {
        Channels.newChannel(it).use { rbc ->
            FileOutputStream(nomeArquivoDoPip).use { fos -> //
                fos.channel.transferFrom(rbc, 0, Long.MAX_VALUE) //
            }
        }
    }
}

