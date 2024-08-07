# 💬 Tech Challenge - Microsserviço de Produção

## ✳️ Sobre
O **Tech Challenge** é um projeto de um sistema de autoatendimento de fast food, que é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem precisar interagir com um atendente.

Neste repositório está contido o **Microsserviço de Produção**, o qual consiste em uma API que será acessada pelos funcionários do restaurante para receber, visualizar e atualizar o status dos pedidos.

---

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io)
- [k8s](https://kubernetes.io/pt-br/)
- [AWS DynamoDB](https://aws.amazon.com/pt/dynamodb/)
- [AWS SQS](https://aws.amazon.com/pt/sqs/)
---

## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone https://github.com/FIAP-SOAT-G19/production-microservice.git
  ````
---

## 🏠 Adicionando variáveis de ambiente (.env)
Existe o arquivo `.env.example` com todas as variáveis utilizadas para rodar o sistema. Faça uma cópia desse arquivo e renomeie a cópia para `.env` antes de executar o comando para iniciar a aplicação.
---

## Arquitetura do projeto
![Arquitetura do Projeto](./assets/images/arch-ms.png)

## 🧪 Testes:
- Evidência cobertura de testes unitários
![Image](./assets/images/test-coverage.png)
  ```bash
  npm run test:coverage
  ```

- Evidência teste BDD
![Image](./assets/images/bdd-production.png)
  ```bash
  npm run test:bdd
  ```
---

## ▶️ Executando o projeto
- Execute os seguintes comandos:
  ```bash
    kubectl apply -f k8s/api-production-deployment.yaml
    kubectl apply -f k8s/metrics.yaml
  ```

- O Backend iniciará em [http://localhost:3000](http://localhost:3000)

---

## 🧩 Swagger
É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api-docs) e simular os endpoints

---


## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
  - Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:
  - feat: introduz uma nova funcionalidade à base de código;
  - fix: correção de um bug na base de código;
  - build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
  - chore: atualização de ferramentas, configurações e bibliotecas
  - ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Alterações na documentação
  - style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
  - refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
  - perf: Um mundança no código que melhora a performance
  - test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:
  ```bash
  git commit -m "feat(#300): creating auth service"
  git commit -m "fix(#30): correcting product type"
  git commit -m "style(lint): removing some lint warnings"
  git commit -m "docs(readme): removing deploy section from readme"
  ```
---
