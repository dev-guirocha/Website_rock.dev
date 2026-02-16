# Deploy (Produção)

Este diretório contém exemplos de configuração para servir o frontend estático e o backend de contato no mesmo domínio.

## Opções

- `nginx-site.conf`: exemplo de vhost Nginx com TLS e reverse proxy.
- `Caddyfile`: exemplo equivalente para Caddy.

## Pré-requisitos

1. Frontend publicado em um diretório local (ex.: `/var/www/website_rock.dev`).
2. Backend Node ativo em `127.0.0.1:8787`.
3. Variáveis SMTP e `FRONTEND_ORIGIN` configuradas no backend.

## Rotas esperadas

- Frontend: `/`, `/sobre.html`, `/servicos.html`, etc.
- API: `/api/contact`
- Healthcheck: `/health`

## Observação

O formulário em `contato.html` usa `data-endpoint="/api/contact"`. Para funcionar em produção, o proxy reverso precisa encaminhar essa rota para o backend.
