# Encontree 
 
O Encontree é um projeto open source utilizado inicalmente como parte do Trabalho de Conclusão de Curso (TCC) do curso de Sistemas de Informação das Faculdades Integradas de Cacoal - UNESC.

## Executando o projeto

Para iniciar a API, a interface web e os bancos de dados basta executar:
obs.: Necessita que o docker e docker-compose estejam instalados na máquina.
```sh
docker-compose up -d --build
```
Ele irá baixar todas as dependencias, fazer a build da aplicação e subir seus respectivos containers.

Após o fim das instalações, basta acessar o endereço `http://localhost` no seu navegador.


### mobile

Para a execução do aplicativo mobile no android é necessário que o Java JDK e o Android SDK estejam instalados, além de um emulador ou dispositivo devidamente configurado.

Para iniciar a aplicação:
acesse a pasta `mobile` e execute o seguinte comando para baixar as dependencias
```sh
npm install
```

Após a instalação das dependencias, caso esteja no IOS acesse a pasta `ios` e execute o seguinte comando para instalar as dependencias nativas do IOS:
obs.: Necessita que o cocoapods esteja instalador na máquina.
```sh
pod install
```

Por fim, basta executar os seguintes comandos para iniciar a aplicação no IOS ou no Android:
```sh
#ios
npm run ios

#android
npm run android
```