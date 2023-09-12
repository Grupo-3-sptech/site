#from mysql.connector import connect
import psutil
import platform
import time

#def mysql_connection(host, user, passwd, database=None):
 #   connection = connect(
  #      host=host,
   #     user=user,
    #    passwd=passwd,
     #   database=database
    #)
    #return connection
#   connection = mysql_connection('localhost', 'pedro', 'pedro0610', 'MedConnect')


while True:
     disco = psutil.disk_usage('/')[3]*10
     print('Porcetagem Disco:',  disco)
     time.sleep(60)
