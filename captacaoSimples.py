from mysql.connector import connect
import psutil
import platform
import time

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    return connection
connection = mysql_connection('localhost', 'pedro', 'pedro0610', 'MedConnect')

while True:
    memoria = psutil.virtual_memory()[2]
    cpu = psutil.cpu_percent(None)
    print('Porcentagem processaodr:',cpu,'Porcentagem Memoria RAM:',  memoria,)
    


    time.sleep(10)
