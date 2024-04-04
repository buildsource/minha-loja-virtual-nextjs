# Minha Loja Virtual 🛍️👕
Este é um projeto de uma loja virtual onde é possível visualizar e comprar camisetas disponíveis. O projeto foi desenvolvido utilizando Next.js para o frontend e uma API fake provida pelo JSON Server para simular o backend.

## Como funciona
A loja virtual exibe uma lista de camisetas disponíveis para compra, com informações como nome, preço, tamanhos disponíveis, cores disponíveis e uma imagem representativa. Os usuários podem filtrar as camisetas por nome, preço, tamanho e cor.

## Como executar o projeto
Instalação de Dependências: Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Em seguida, execute o seguinte comando para instalar as dependências do projeto:
```
npm install
```
**Iniciar o JSON Server:** O JSON Server é usado para fornecer uma API de backend simulada com os dados das camisetas. Execute o seguinte comando para iniciar o JSON Server:

```
npm run json-server
```
Isso iniciará o JSON Server na porta 3333 e servirá os dados do arquivo db.json.

Iniciar o Frontend: Após iniciar o JSON Server, execute o seguinte comando para iniciar o frontend da aplicação:
```
npm run dev
```
Isso iniciará o servidor de desenvolvimento do Next.js. Você poderá acessar a loja virtual em http://localhost:3000.

## Comandos Disponíveis
- npm run dev: Inicia o servidor de desenvolvimento do Next.js.
- npm run build: Compila o projeto para produção.
- npm run start: Inicia o servidor de produção do Next.js.
- npm run lint: Executa a verificação de linting no código.
- npm run json-server: Inicia o JSON Server para fornecer uma API de backend simulada.

## Tecnologias Utilizadas
- Next.js
- React.js
- JSON Server