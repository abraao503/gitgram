<h1 align="center">
   Gitgram
</h1>

<p align="center">
  <a href="#space_invader-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#versão-web">Versão WEB</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-arquitetura-rest">Arquitetura REST</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-rodar-a-aplicação">Como rodar a aplicação</a>
   
</p>
<br><br>

## :space_invader: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Sqlite3](https://sqlitebrowser.org/)
- [JWT](https://jwt.io/)

## :computer: Sobre o projeto

O Gitgram é uma plataforma onde usuários podem divulgar seus repositórios e interagir com outros usuário da comunidade.

## Versão WEB

<img src="https://user-images.githubusercontent.com/51488383/83665989-3de22980-a59a-11ea-9133-d38360b66a5e.png" width="440"><span style="padding-left:2px"></span>
<img src="https://user-images.githubusercontent.com/51488383/83666005-45093780-a59a-11ea-968c-783fd31701de.png" width="440">
<span style="padding-left:2px"></span>
<img src="https://user-images.githubusercontent.com/51488383/83665993-40dd1a00-a59a-11ea-9b77-4f2bb44fe111.png" width="440"><span style="padding-left:2px"></span>
<img src="https://user-images.githubusercontent.com/51488383/83665999-433f7400-a59a-11ea-9fd5-53f27f0ea02b.png" width="440">
<span style="padding-left:2px"></span>
<img src="https://user-images.githubusercontent.com/51488383/83666001-4470a100-a59a-11ea-95f8-84c57a5fd47f.png" width="440">
<span style="padding-left:2px"></span>

## :rocket: Arquitetura REST

A documentação pode ser encontrada [aqui](https://app.swaggerhub.com/apis-docs/abraao503/gitgram/1.0.0)


## :information_source: Como rodar a aplicação

### Pré-requesitos
Você vai precisar instalar [Git](https://git-scm.com), [Node.js](https://nodejs.org/) v12.16.1 (ou versão posterior). 

### Ferramentas opcionais
Uma opção ao instalador de pacotes, padrão, do Node [Yarn](https://yarnpkg.com/).

### Backend
Clone o repositório. 
```bash
git clone https://github.com/abraao503/gitgram.git

```

Instale as dependências utilizando o NPM.
```bash
# navegue para a pasta do backend
cd gitgram/backend

#instale as dependências
npm install

```

Instale as dependências utilizando o Yarn. 
```bash
# navegue para a pasta do backend
cd gitgram/backend

#instale as dependências
yarn install

```

Configure as migrations e rode o projeto utilizando o NPM.
```bash
#rode os arquivos de migrations
npx knex migrate:latest

#rode o backend
npm start

```

Configure as migrations e rode o projeto utilizando o Yarn.
```bash
#rode os arquivos de migrations
yarn knex migrate:latest

#rode o backend
yarn start

```

### Frontend
Instale as dependências e rode o frontend utilizando o NPM. 
```bash
# navegue a pasta do frontend (estando pasta raiz do projeto)
cd frontend

#instale as dependências
npm install

#rode o backend
npm start
```

Instale as dependências e rode o frontend utilizando o Yarn. 
```bash
# navegue a pasta do frontend (estando pasta raiz do projeto)
cd frontend

#instale as dependências
yarn install

#rode o backend
yarn start
```

