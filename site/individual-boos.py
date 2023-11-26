import sys
from mysql.connector import connect
import numpy as np
import mysql.connector
from scipy import stats
import pymssql

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection

idRobo = sys.argv[1]
nomeComponente = sys.argv[2]
limite_linhas = int(sys.argv[3])

sqlserver_connection = pymssql.connect(server='52.7.105.138', database='medconnect', user='sa', password='medconnect123');

server_cursor = sqlserver_connection.cursor()

querySqlServer = f"""WITH LinhasComponentes AS (
        SELECT
          r.idRegistro,
          r.dado,
          c.nome AS nomeComponente,
          ROW_NUMBER() OVER (PARTITION BY c.nome ORDER BY r.dado DESC) AS linha_num
        FROM Registros r
        JOIN componentes c ON r.fkComponente = c.idComponentes
        JOIN cirurgia cr ON cr.fkRoboCirurgia = r.fkRoboRegistro
        WHERE r.fkRoboRegistro = {idRobo}
        AND c.nome = '{nomeComponente}'
      )
      SELECT
        idRegistro,
        dado,
        nomeComponente
      FROM LinhasComponentes WHERE linha_num <= {limite_linhas}
      ORDER BY dado;"""

server_cursor.execute(querySqlServer)
result = server_cursor.fetchall()

if len(result) <= 1:
    print("Erro: Menos de dois dados retornados do banco de dados. A regressão linear requer pelo menos dois pontos.")
else:
    dados = np.array([row[1] for row in result])
    horarios = np.arange(1, len(dados) + 1)

    solucao = stats.linregress(horarios, dados)

    a_coef_angular, b_coef_linear = solucao.slope, solucao.intercept

    formatted_a = format(a_coef_angular, '.2f')
    formatted_b = format(b_coef_linear, '.2f')

    coeficientes_formatados = {
        'CoeficienteAngular': formatted_a,
        'Interceptacao': formatted_b
    }

    print(coeficientes_formatados)
    sqlserver_connection.commit()


server_cursor.close()
sqlserver_connection.close()
