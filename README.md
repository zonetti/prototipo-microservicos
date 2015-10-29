## Requisitos

* Possuir [Node.js](https://nodejs.org/en/) v4.0 ou superior instalado
* Possuir uma conta no serviço [CloudAMQP](https://www.cloudamqp.com)

## Como instalar

* Efetue o clone do repositório no diretório desejado: `git clone https://github.com/zonetti/prototipo-microservicos.git`
* Navegue com o terminal em cada uma das pastas abaixo e execute `npm install`:
  * `api`
  * `microservices/accounts`
  * `microservices/comments`
  * `microservices/posts`
  * `apps/blog`
  * `apps/forum`

**OBS:** Apesar das dependências entre os serviços serem semelhantes, a idéia é que cada serviço seja completamente independente podendo ser implantados inclusive em máquinas diferentes. Portanto é necessário instalar as dependências manualmente dentro de cada diretório.

* Acesse o painel de controle de sua conta no **CloudAMQP** e crie uma instância através do plano gratuito `Lemur`
* Com a instância criada, acesse a [página de instâncias](https://customer.cloudamqp.com/instance) e clique em `Details` na nova instância que foi criada
* Na página de detalhes, copie o valor do campo `URL` e cole na propriedade `amqp` dos seguintes arquivos:
  * `api/config.js`
  * `microservices/accounts/config.js`
  * `microservices/comments/config.js`
  * `microservices/posts/config.js`

Instalação concluída!

## Como utilizar

Inicie um terminal em cada um dos seguintes diretórios:

* `api`
* `microservices/accounts`
* `microservices/comments`
* `microservices/posts`
* `apps/blog`
* `apps/forum`

Em cada um dos terminais abertos, digite `npm start` para iniciar.

Se tudo correu bem, a aplicação do **Blog** estará disponível em [localhost:3002](http://localhost:3002) e o **Fórum** em [localhost:3001](http://localhost:3001).

Agora basta utilizar as aplicações:

* Crie uma conta
* Efetue login
* Cadastre publicações/tópicos
* Visualiza publicações/tópicos
* Cadastre comentários/respostas

Experimente fechar o processo de algum serviço para simular um serviço que não seja encontrado e inicie mais instâncias de um determinado serviço para verificar se as mensagens são balanceadas.

## Como monitorar

A partir da página de detalhes de sua instância no **CloudAMQP** clique no link `RabbitMQ management interface` para abrir o painel de monitoramento.