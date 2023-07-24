# Quick Task

Este projeto é uma aplicação de gerenciamento de tarefas chamada "Quick Task". O sistema possui recursos de login, CRUD completo (Create, Read, Update, Delete) para tarefas e utiliza mock web services (MSW) para as rotas. Foi desenvolvido com Vue 2, TypeScript, Vuetify para os componentes e CSS para customizações.

## Funcionalidades

- Autenticação de usuários com login e logout.
- Visualização da lista de tarefas.
- Adição de novas tarefas.
- Edição de tarefas existentes.
- Remoção de tarefas.
- Marcação de tarefas como concluídas.
- Filtragem de tarefas por status (concluídas ou pendentes).

## Configuração Recomendada do IDE

Para uma experiência de desenvolvimento ideal, recomendamos usar o Visual Studio Code ([VSCode](https://code.visualstudio.com/)) com suporte para TypeScript e Vue.js. Além disso, você pode instalar as seguintes extensões:

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur): Oferece suporte ao Vue.js com recursos avançados de edição e linting.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Para garantir a conformidade com as regras de estilo e boas práticas de código.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Para manter a formatação do código consistente.

## Instalação

Para iniciar o projeto, siga os passos abaixo:

1. Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.
2. Clone este repositório em sua máquina local:

```sh
git clone https://github.com/seu_usuario/quick-task.git
```

3. Acesse o diretório do projeto:
```sh
cd quick-task
```

3. Instale as dependências do projeto:
```sh
npm install
```

## Configuração do MSW (Mock Service Worker)

O "Quick Task" utiliza o MSW para simular as rotas de API para testes e desenvolvimento. As configurações do MSW podem ser encontradas no diretório **src/mocks.** Certifique-se de ajustar as respostas mock conforme necessário para simular o comportamento esperado.

## Executando o Projeto

Após concluir a instalação e configurar o MSW, você pode iniciar o servidor de desenvolvimento:
```sh
npm run serve
```
Acesse a aplicação em seu navegador através do endereço **http://localhost:8080/.**

## Contribuição

Contribuições são sempre bem-vindas! Se você deseja contribuir com o projeto, sinta-se à vontade para criar um pull request.
