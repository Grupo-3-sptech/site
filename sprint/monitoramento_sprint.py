import psutil
import time
memoria = psutil.virtual_memory()[2]
cpu = psutil.disk_usage('/')[3]
bateria = psutil.sensors_battery()[1]
pNucleos =  psutil.cpu_percent(interval=1, percpu=True)


while(True):
    print("Memoria: ",memoria)
    print
    print("\n")
    print( "Porcentagem de consumo do processador: ",cpu)
    print("\n")
    print("Porcentagem de bateria existente: ",bateria)
    print("\n")
    print("Porcentagem dos nucleos",pNucleos)
    print("\n")
    time.sleep(10);



