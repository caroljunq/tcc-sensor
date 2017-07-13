# tcc-sensor
Este repositório descreve a parte do sensor do repositorio tcc-gsmart. 
O sensor é um Raspberry Pi Model 3B com Kali Linux que detecta pessoas através de smartphones e redes sem fio pelo protocolo tshark.
O objetivo é a partir da detecção gerar um arquivo formato .csv pque será enviado através de cURL para um servidor onde os dados
serão processados em dados estatísticos, como o tráfego de pessoas.

## Tecnologias e ferramentas utilizadas
Tshark
cURL
Raspberry Pi
Modo Monitor
Kali Linux

## Configuração do RPi
1- Instale o sistema operacional do RPi num cartão microSD. 
