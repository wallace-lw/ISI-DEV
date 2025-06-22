### 1. Produtos

#### Listar produtos (com paginação e filtros)
```bash
curl -X GET "http://localhost:3000/products?page=1&limit=5&search=produto&min_price=10&max_price=100&has_discount=true"
```

#### Criar produto
```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Teste",
    "description": "Descrição do produto",
    "stock": 100,
    "price": 50.99
  }'
```

#### Obter produto por ID
```bash
curl -X GET "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000"
```

#### Atualizar produto
```bash
curl -X PATCH "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Nome",
    "stock": 50
  }'
```

#### Excluir produto (soft delete)
```bash
curl -X DELETE "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000"
```

### 2. Cupons

#### Listar cupons
```bash
curl -X GET "http://localhost:3000/coupons"
```

#### Criar cupom
```bash
curl -X POST "http://localhost:3000/coupons" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROMO20",
    "type": "percent",
    "value": 20.0,
    "one_shot": true,
    "valid_from": "2025-01-01T00:00:00Z",
    "valid_until": "2025-12-31T23:59:59Z",
    "max_uses": 100
  }'
```

#### Obter cupom por código
```bash
curl -X GET "http://localhost:3000/coupons/PROMO20"
```

### 3. Descontos

#### Aplicar desconto percentual
```bash
curl -X POST "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000/discount/percent" \
  -H "Content-Type: application/json" \
  -d '{
    "percent": 10.0
  }'
```

#### Aplicar desconto por cupom
```bash
curl -X POST "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000/discount/coupon" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROMO20"
  }'
```

#### Remover desconto
```bash
curl -X DELETE "http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000/discount"
```

### Exemplos de Respostas

**Listagem de produtos (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "produto teste",
      "description": "Descrição exemplo",
      "stock": 50,
      "price": 45.89,
      "original_price": 50.99,
      "created_at": "2025-06-20T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total_items": 1,
    "total_pages": 1
  }
}
```

**Erro de validação (400 Bad Request):**
```json
{
  "status": 400,
  "message": "Validation error: value: Must be between 0.01 and 1000000.00"
}
```

**Conflito de desconto (409 Conflict):**
```json
{
  "status": 409,
  "message": "Conflict: Product already has a discount"
}
```

### Dicas de Uso:

1. **Substitua os UUIDs** pelos IDs reais retornados nas operações de criação
2. **Formato de datas**: Use ISO 8601 (`YYYY-MM-DDTHH:MM:SSZ`)
3. **Valores monetários**: Sempre com 2 casas decimais
4. **Para autenticação** (quando implementada):
```bash
-H "Authorization: Bearer <token>"
```

### Testando Cenários de Erro:

**Cupom inválido (404):**
```bash
curl -X POST "http://localhost:3000/products/550e8400-e29b-41d4-a716-446655440000/discount/coupon" \
  -H "Content-Type: application/json" \
  -d '{"code": "INVALIDO"}'
```

**Preço final inválido (422):**
```bash
curl -X POST "http://localhost:3000/products/550e8400-e29b-41d4-a716-446655440000/discount/coupon" \
  -H "Content-Type: application/json" \
  -d '{"code": "DESCONTO90"}'  # Cupom de 90% em produto barato
```

Estes comandos cobrem todos os endpoints principais da API e os principais cenários de uso. Para testar completamente, recomendo executar na seguinte ordem:

1. Criar produto
2. Criar cupom
3. Aplicar desconto
4. Listar produtos com filtro
5. Remover desconto
6. Excluir produto
