# tcc-sensor
Este repositório descreve a parte do sensor do repositorio tcc-gsmart.
O sensor é um Raspberry Pi Model 3B com Kali Linux que detecta pessoas através de smartphones e redes sem fio pelo protocolo tshark.
O objetivo é a partir da detecção gerar um arquivo formato .csv pque será enviado através de cURL para um servidor onde os dados
serão processados em dados estatísticos, como o tráfego de pessoas.

## Tecnologias e ferramentas utilizadas
* Tshark
* cURL
* Raspberry Pi
* Modo Monitor
* Kali Linux

### Configuração do RPi
1 - Instale o Kali Linux operacional do RPi num cartão microSD;

* [Video para tutorial para instalação do Kali](https://www.youtube.com/watch?v=844JPtMIZTM&t)
* [Download do Kali Linux para RPi](https://www.kali.org/downloads/)

2- Coloque o microSD no RPi e ligue-o;

3- Depois de carregado, realize os passos do tópico a seguir.

### Configurando o Kali Linux
1- Mude a senha de root com "passwd";

2- Crie um usuário "adduser nomeusuario";

3- Crie um diretorio para o projeto "mkdir nomediretorio"

4- Dê permissão aos usuários/owners/groups para escrever, ler e executar nessa
pasta "chmod 777 mod";

* [Comandos de permissões](https://www.wired.com/2010/02/modify_user_permissions/)

* [Permissões](http://www.yolinux.com/TUTORIALS/LinuxTutorialManagingGroups.html)

5- Mude do root para o usuario criado "su nomeusuario";

6- Conecte o RPi numa rede;

7- Procure atualizações a serem feitas "apt-get update";

8- Instale as atualizações "apt-get upgrade";

9 - Depois que a etapa anterior acabou, reinicie o RPi;


### Instalando pacotes
1- Instale o Tshark --> "apt-get install tshark";

2- Instale o net-tools --> "apt-get install net-tools";

3- Instale o gedit (não obrigatório) --> "apt-get install gedit"

### Configuração de Inicialização
O Kali Linux possui tela para login e inicialização muito lenta, então é necessário configurá-lo para facilitar a execução dos scripts e tempo de detecção.
