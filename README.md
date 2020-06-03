<h1 align="center">
   GitGram
</h1>

## :space_invader: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Sqlite3](https://sqlitebrowser.org/)

## :computer: Sobre o Projeto

O GitGram é uma plataforma onde usuários podem divulgar seus repositórios e interagir com outros usuário da comunidade.

## Versão WEB

![Screenshot_2020-06-03_02-09-06](https://user-images.githubusercontent.com/51488383/83665989-3de22980-a59a-11ea-9133-d38360b66a5e.png)
![Screenshot from 2020-06-03 02-08-47](https://user-images.githubusercontent.com/51488383/83666005-45093780-a59a-11ea-968c-783fd31701de.png)
![Screenshot from 2020-06-03 02-06-32](https://user-images.githubusercontent.com/51488383/83665993-40dd1a00-a59a-11ea-9b77-4f2bb44fe111.png)
![Screenshot from 2020-06-03 02-07-42](https://user-images.githubusercontent.com/51488383/83665999-433f7400-a59a-11ea-9fd5-53f27f0ea02b.png)
![Screenshot from 2020-06-03 02-08-14](https://user-images.githubusercontent.com/51488383/83666001-4470a100-a59a-11ea-95f8-84c57a5fd47f.png)

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

