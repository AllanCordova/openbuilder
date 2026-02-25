# Open Builder

## Sobre

O **Open Builder** resolve o das plataformas low-code e no-code tradicionais: o *vendor lock-in* (aprisionamento tecnológico).

Nossa plataforma permite que você construa projetos, páginas e seções de forma visual usando um **Canvas intuitivo**, mas com um diferencial matador: nós geramos e expomos o código final em **React**. Você pode construir visualmente para ganhar velocidade e, quando precisar de regras de negócio hiper-complexas, basta exportar o código limpo, componentizado e tipado para qualquer desenvolvedor dar manutenção.

## Principais Funcionalidades

*  **Construtor Visual (Canvas):** Interface drag-and-drop/click-to-add para montagem de telas.
*  **Preview em Tempo Real:** Veja exatamente como sua aplicação vai ficar antes de salvar.
*  **Exportação de Código (No Lock-in):** Exporte a página criada em código React totalmente limpo e pronto para produção.
*  **Sistema de Autenticação:** Login e Registro seguros (JWT/Cookies) com rotas protegidas.
*  **Gestão de Projetos e Seções:** Dashboard completo para gerenciar múltiplos projetos e suas respectivas páginas.
*  **Validação de Ponta a Ponta:** Schemas de validação estritos protegendo tanto a interface quanto o banco de dados.

## Tecnologias

O projeto foi construído utilizando o que há de mais moderno no ecossistema web:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados & ORM:** [Prisma](https://www.prisma.io/) (PostgreSQL)
- **Validação:** [Zod](https://zod.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **CI/CD:** GitHub Actions

## Como Executar

Siga os passos abaixo para rodar o projeto localmente na sua máquina.

### Pré-requisitos

* Node.js
* Banco de dados PostgreSQL 

### Passos da Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/open-builder.git](https://github.com/SEU_USUARIO/open-builder.git)
    cd open-builder
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Copie o arquivo `.env.example` para `.env` e preencha com as suas credenciais.
    ```bash
    cp .env.example .env
    ```

4.  **Configure o Banco de Dados (Prisma):**
    ```bash
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    ```
    
5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto rodando.

## Arquitetura

O projeto utiliza um padrão de **Clean Architecture** adaptado para as Server Actions do Next.js:

* `app/`: Contém o roteamento da aplicação (App Router) e as páginas UI.
* `components/`: Componentes React reutilizáveis, separados por contexto (`ui`, `auth`, `build`, `project`).
* `actions/`: Server Actions que atuam como Controllers. São protegidas por um Wrapper que valida autenticação e inputs.
* `service/`: Regras de negócio puras e comunicação direta com o banco de dados (Prisma).
* `schemas/`: Validações feitas com Zod para garantir integridade de dados no Front e Back-end.
* `hooks/`: Custom hooks para encapsular o Data Fetching e manipulação de estado do lado do cliente.

## Como Contribuir

O **Open Builder** é um projeto de código aberto e toda contribuição é muito bem-vinda! Sejam correções de bugs, novas bibliotecas de componentes para o Canvas ou melhorias na documentação.

Para contribuir, siga nosso padrão:

1.  Faça um **Fork** do projeto.
2.  Crie uma **branch** para a sua feature (`git checkout -b feat/minha-feature-incrivel`).
3.  Adote os **Conventional Commits** para suas mensagens de commit (ex: `feat: add new button component to library`).
4.  Faça o **commit** das suas alterações (`git commit -m 'feat: minha feature incrivel'`).
5.  Faça o **push** para a branch (`git push origin feat/minha-feature-incrivel`).
6.  Abra um **Pull Request** utilizando nosso template padrão.

## Licença

Este projeto está licenciado sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
