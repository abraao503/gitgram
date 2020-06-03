<h1 align="center">
   GitGram
</h1>

## :space_invader: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [sqlite3](https://sqlitebrowser.org/)

## :computer: Sobre o Projeto

O GitGram é uma plataforma onde usuários podem divulgar seus repositórios e interagir com outros usuário da comunidade.

## Versão WEB

--telas

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

