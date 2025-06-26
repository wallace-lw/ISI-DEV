# Desafio DEV

## 🚀 Tecnologias

- **Frontend**: React (Vite)
- **Backend**: Node.js
- **Banco de Dados**: PostgreSQL (Docker)

## ⚙️ Configuração

### Frontend (React)

```bash
cd frontend
cp .env.example .env
# Configure VITE_API_URL no .env
npm install  # ou pnpm install
npm run dev  # desenvolvimento
npm run build # produção
npm run start # servidor de produção
```

### Backend (Node.js)

```bash
cd backend
cp .env.example .env
# Configure DATABASE_URL e PORT no .env
docker-compose up -d # Inicia o PostgreSQL
npm install  # ou pnpm install
npx prisma migrate deploy
npm run dev  # desenvolvimento
npm run build # produção
npm run start # servidor de produção
```

## 📦 Dependências do Docker

```sh
docker-compose up -d # para rodar o Postgres
```

## 🌐 Endpoints da API

### Produtos

Aqui está a estrutura de endpoints organizada em markdown com as novas rotas adicionadas:

### 🔄 Endpoints da API

#### **Produtos**

| Método | Rota                                  | Descrição                                      | Status Principais            |
|--------|---------------------------------------|------------------------------------------------|------------------------------|
| GET    | `/products`                           | Lista paginada com filtros avançados           | 200 OK                       |
| POST   | `/products`                           | Cria novo produto                              | 201 Created                  |
| GET    | `/products/{id}`                      | Obtém detalhes de um produto                   | 200 OK, 404 Not Found        |
| PATCH  | `/products/{id}`                      | Atualização parcial (JSON Patch)               | 200 OK, 400 Bad Request      |
|        |                                       |                                                | 404 Not Found, 412 Precondition Failed |
| DELETE | `/products/{id}`                      | Inativa produto (soft delete)                  | 204 No Content, 404 Not Found|
| POST   | `/products/{id}/restore`              | Restaura produto inativo                       | 200 OK, 404 Not Found        |
| POST   | `/products/{id}/discount/percent`     | Aplica desconto percentual                     | 200 OK, 400 Bad Request      |
|        |                                       |                                                | 409 Conflict, 422 Unprocessable Entity |
| POST   | `/products/{id}/discount/coupon`      | Aplica cupom promocional                       | 200 OK, 400 Bad Request      |
|        |                                       |                                                | 404 Not Found, 409 Conflict  |
|        |                                       |                                                | 422 Unprocessable Entity     |
| DELETE | `/products/{id}/discount`             | Remove desconto ativo                          | 204 No Content, 404 Not Found|

#### **Cupons**

| Método | Rota                  | Descrição                      | Status Principais            |
|--------|-----------------------|--------------------------------|------------------------------|
| GET    | `/coupons`            | Lista todos os cupons          | 200 OK                       |
| POST   | `/coupons`            | Cria novo cupom                | 201 Created                  |
| GET    | `/coupons/{code}`     | Obtém detalhes de um cupom     | 200 OK, 404 Not Found        |
| PATCH  | `/coupons/{code}`     | Atualiza cupom (exceto código) | 200 OK, 400 Bad Request      |
|        |                       |                                | 404 Not Found                |
| DELETE | `/coupons/{code}`     | Inativa cupom                  | 204 No Content, 404 Not Found|

## 💡 Exemplos de Uso

```bash
# Criar produto
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Café Premium",
  "description": "100% arábica",
  "stock": 250,
  "price": 2590
}'

# Aplicar desconto
curl -X POST "http://localhost:3000/coupons" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROMO20",
    "type": "PERCENT", // Em uppercase
    "value": 2000, // (20%)
    "oneShot": true,
    "validFrom": "2025-01-01T00:00:00Z",
    "validUntil": "2025-12-31T23:59:59Z",
    "maxUses": 100
  }'
```

## 📁 Estrutura de Pastas (Backend)

```
  src/
├── controllers/
│ ├── coupon/
│ └── product/
├── dtos/
├── mappers/
├── models/
├── repositories/
│ ├── coupon.repository.ts
│ ├── product.repository.ts
│ └── index.ts
├── services/
│ ├── coupon/
│ │ ├── create-coupon.service.ts
│ │ ├── delete-coupon.service.ts
│ │ ├── get-coupon.service.ts
│ │ ├── list-coupons.service.ts
│ │ └── update-coupon.service.ts
│ └── product/
│ ├── apply-coupon-discount.service.ts
│ ├── create-product.service.ts
│ ├── delete-product.service.ts
│ ├── get-product.service.ts
│ ├── list-products.service.ts
│ ├── remove-discount.service.ts
│ ├── restore-product.service.ts
│ └── update-product.service.ts
├── utils/
├── app.ts
├── index.ts
└── routes.ts
```


## 🚀 Tecnologias Utilizadas (Backend)

### 🟦 Node.js + TypeScript
Node.js é o ambiente de execução JavaScript do lado do servidor, e TypeScript adiciona tipagem estática para maior segurança e escalabilidade.

**Por que usar?**
- Performance e escalabilidade com o modelo assíncrono do Node
- Melhor organização e manutenção de código com TypeScript
- Rico ecossistema de bibliotecas NPM

---

### ⚡ Fastify
Framework web moderno e extremamente rápido para construção de APIs Node.js, focado em performance, tipagem e extensibilidade.

**Por que usar?**
- Mais rápido que Express em benchmarks
- Suporte completo a TypeScript
- Validação de schemas embutida (usando `zod`, `ajv`, etc)
- Sistema de plugins robusto e leve

---

### 💾 Prisma ORM
ORM (Object Relational Mapper) moderno para trabalhar com bancos de dados SQL de forma segura e tipada.

**Por que usar?**
- Schema centralizado (`schema.prisma`) para gerenciar modelos de dados
- Geração automática de tipos com base no banco de dados
- Queries otimizadas e seguras com IntelliSense

---

### 🧪 Zod (se estiver usando)
Biblioteca de validação de dados, ideal para validar entradas em rotas HTTP e DTOs.

**Por que usar?**
- Validação e parsing de dados com segurança de tipos
- Integração direta com Fastify e TypeScript
- Facilita validação de body, query params e headers

---

### 🎯 Biome (substituto do ESLint + Prettier)
Ferramenta moderna de linting e formatação de código, desenvolvida para ser rápida e eficaz.

**Por que usar?**
- Tudo em um: lint, format e fix
- Rápido e eficiente (escrito em Rust)
- Substitui ESLint, Prettier e parte do TypeScript CLI
- Configuração simples e moderna

---

### 📦 Outros utilitários comuns
- **Dotenv**: para gerenciamento de variáveis de ambiente.
- **HTTP status helpers**: como `http-errors` ou utilitários próprios.


## 💡 Estrutura de Pasta (FRONTEND)
```
src/
├── assets/
├── components/
├── hooks/
│   ├── helpers/
│   ├── mutations/
│   └── queries/
├── lib/
├── pages/
├── routes/
├── services/
│   ├── coupons/
│   └── products/
├── stores/
├── utils/
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
````

## 🛠️ Tecnologias Utilizadas - (Frontend)

### 🌀 Tailwind CSS
Uma biblioteca de utilitários para estilização que permite criar layouts modernos e responsivos diretamente nas classes do HTML/JSX, sem a necessidade de escrever CSS manualmente.

**Por que usar?**
- Estilização rápida e consistente
- Evita criação excessiva de classes CSS
- Totalmente personalizável com tema e design system
- Ideal para prototipagem e produção

---

### 🧩 ShadCN UI
Uma coleção de componentes construídos com Radix UI e estilizados com Tailwind, prontos para uso em interfaces acessíveis e elegantes.

**Por que usar?**
- Componentes acessíveis e prontos para produção
- Integração nativa com Tailwind
- Alta customização visual
- Segue boas práticas de design moderno

---

### 🔁 React Query
Uma biblioteca para gerenciamento de estado assíncrono, especialmente útil para **fetching**, **caching** e **sincronização de dados de API**.

**Por que usar?**
- Facilita o consumo de APIs REST
- Cache automático e revalidação de dados
- Suporte para controle de loading, erro e refetch
- Integração com Suspense e DevTools

---

### 📡 Axios
Cliente HTTP baseado em Promises, usado para fazer chamadas à API de forma simples e organizada.

**Por que usar?**
- Sintaxe simples e clara (`axios.get`, `axios.post`, etc)
- Suporte a interceptadores, tratamento de erros e cabeçalhos
- Boa integração com React Query para fetchers
- Facilita o uso de instâncias com `baseURL` e `headers` globais



## 🛠️ Scripts com pnpm


```bash
# Frontend
pnpm install
pnpm run dev

# Backend
pnpm install
pnpm run dev
```
