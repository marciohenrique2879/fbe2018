# FE-2018 - Fundamentos de Programação Front-End

## Membros do grupo

* Danillo Guimarães - *Identificador do indivíduo*
* Artur Santos - *Comunicações eletrônicas do indivíduo + Vínculo do indivíduo + Suporte*
* Márcio Henrique Morales - *Endereço do indivíduo*
* Diego Barbosa - *Dados demográficos adicionais*
* Daniel Leonardo: *Nome do indivíduo*

## Áreas de desenvolvimento 

### Identificador do indivíduo
Importante desenvolver os 4 tipos de identificação:
* Sem documento de identificação
* Com certidão
* Carteira de trabalho
* Título de eleitor
```
No arquivo JSON não está definido quando o paciente nâo tem documento de identificação
```

***Tamanho:*** 6

### Nome do indivíduo
Na modelagem do JSON faltou:
* Preferido: se o nome é preferido ou não
* Representação: se for um nome japonês, você precisa escrever com o alfabeto disponível
* Uso: representa o contexto de uso do nome
* Indicador: indica uma situação peculiar referente ao uso do nome

***Tamanho:*** 10

### Dados demográficos adicionais
A parte dos dados demográficos tem bastante informações a ser inseridas e os códigos do modelo de referência devem ser seguidos na implementação

***Tamanho:*** 9

### Endereço do indivíduo
Há muita informação a ser inserida e os códigos do modelo de referência devem ser seguidos na implementação

***Tamanho:*** 6

### Comunicações eletrônicas do indivíduo
Há pouca informação a ser cadastrada e sem grande complexidade

***Tamanho:*** 1

### Vínculo do indivíduo
Há pouca informação a ser cadastrada e sem grande complexidade

***Tamanho:*** 1


**Referências**
* [Api lista cidades](https://pt.stackoverflow.com/questions/76640/existe-alguma-api-que-liste-estados-e-cidades)
* [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)

**Instalação**
``` bash
1. npm install // Instala dependencias
##Executar passo 2 OU 3
2. npm run start // Realiza o build no modo debug (não realiza minificação do arquivo javascript)
3. npm run build // Realiza o build no modo produção (realiza minificação do arquivo javascript)

```

**Aviso**
* Para iniciarem o trabalho, criem sua própria branch. 
``` bash
git clone https://github.com/danilloguimaraes/fe-2018.git
cd fe-2018

# Executar somente o comando com teu nome
git checkout -b arthur
git checkout -b danillo
git checkout -b marcio
git checkout -b diego
git checkout -b daniel

git push origin [seu nome]:[seu nome] 
ex.: git push origin danillo:danillo
```
