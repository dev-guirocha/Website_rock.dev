# Website Rock .dev

Este é o repositório do site institucional da **Rock .dev Technology**, um estúdio de desenvolvimento focado em "Soluções Sólidas. Código Ousado.".

O frontend é estático, multi-página e totalmente responsivo, construído com HTML, CSS e JavaScript puros. A interface foi atualizada para uma direção mais comercial, com linguagem visual clara e foco em conversão.

![Logo da Rock .dev](images/ROCK_DEV_LOGO.png)

## 📖 Estrutura do Site

O site é dividido nas seguintes seções principais:

* **Home (`index.html`):** Apresentação principal com a filosofia do estúdio e um projeto em destaque (MedControl).
* **Sobre (`sobre.html`):** Detalhes sobre a fundação, filosofia (Solidez e Inovação) e o fundador, Guilherme Rocha.
* **Serviços (`servicos.html`):** Descrição dos serviços oferecidos, como Arquitetura de Sistemas, Aplicações Web & Mobile e Consultoria.
* **Projetos (`projetos.html`):** Galeria de projetos concluídos (MedControl, FlowDesk, Marmitas da Ka, Deutsch Flashcard, Panda Loterias) com links para estudos de caso detalhados.
* **Insights (`insights.html`):** Seção de blog com artigos técnicos sobre arquitetura, segurança e UI/UX.
  * **Artigos detalhados:** `artigo-detalhe.html`, `artigo-seguranca-api.html`, `artigo-design-atomico.html`
* **Contato (`contato.html`):** Formulário de contato e informações diretas.

## ✨ Funcionalidades Principais

* **Design Totalmente Responsivo:** Utiliza Flexbox e Grid Layout para adaptação em desktops, tablets e mobile.
* **Menu "Hamburguer" Funcional:** Criado com JavaScript puro para navegação mobile (`script.js`).
* **Foco em Acessibilidade:** Uso de HTML semântico, `skip-link` para pular a navegação e atributos `aria`.
* **Visual Comercial Responsivo:** Tema claro, tipografia moderna e componentes reutilizáveis para desktop e mobile.
* **Formulário com integração de API:** Frontend preparado para envio para backend próprio em `/api/contact`.
* **SEO Técnico Base:** Canonical, Open Graph, Twitter Cards, JSON-LD, `robots.txt` e `sitemap.xml`.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero, sem frameworks CSS ou JS, para demonstrar um forte domínio das tecnologias web fundamentais.

* **HTML5 Semântico**
* **CSS3 Moderno**
    * Flexbox e Grid Layout
    * Variáveis CSS
    * Animações e Transições
* **JavaScript (ES6+)**
    * Manipulação do DOM (ex: menu mobile)
* **Font Awesome** (Para ícones)

## 🚀 Como Executar o Frontend

Como o frontend é estático, não há necessidade de instalação de dependências.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/dev-guirocha/website_rock.dev.git](https://github.com/dev-guirocha/website_rock.dev.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd website_rock.dev
    ```
3.  **Abra o arquivo `index.html`** diretamente no seu navegador de preferência.

    > **Dica:** Para uma melhor experiência de desenvolvimento, recomendo usar a extensão **Live Server** no Visual Studio Code.

## 🔌 Backend Próprio de Contato

O repositório inclui um backend Node.js em `backend/` para envio de e-mails do formulário.

1. **Acesse a pasta do backend:**
   ```bash
   cd backend
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Crie o arquivo `.env` a partir de `.env.example` e configure SMTP.**
4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

Por padrão, o backend sobe em `http://localhost:8787` e expõe:
* `GET /health`
* `POST /api/contact`

## 🌐 Deploy em Produção (Frontend + Backend no mesmo domínio)

Para manter o formulário funcionando com `data-endpoint="/api/contact"`, o ideal é servir frontend e backend no mesmo domínio usando reverse proxy.

Arquivos de referência no repositório:
* `deploy/nginx-site.conf`
* `deploy/Caddyfile`

### Fluxo recomendado

1. **Publicar frontend estático** em um diretório (exemplo: `/var/www/website_rock.dev`).
2. **Executar backend** em `127.0.0.1:8787` (exemplo com PM2/Systemd).
3. **Configurar proxy** para encaminhar:
   * `/api/*` -> `127.0.0.1:8787`
   * `/health` -> `127.0.0.1:8787/health`
4. **Configurar `.env` do backend** com domínio e SMTP válidos.

### Variáveis essenciais em produção

```env
PORT=8787
FRONTEND_ORIGIN=https://squadrockdev.com.br
SMTP_HOST=...
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
CONTACT_FROM=\"Rock .dev Site <no-reply@squadrockdev.com.br>\"
CONTACT_TO=guirocha@squadrockdev.com.br
```

## 🔎 SEO e Indexação

Arquivos incluídos:
* `robots.txt`
* `sitemap.xml`

As páginas principais já possuem:
* `rel=\"canonical\"`
* Open Graph (`og:*`)
* Twitter Card
* JSON-LD (`WebSite`, `WebPage` e `Article`, conforme a página)

---

Desenvolvido por **Guilherme Rocha** para a **Rock .dev Technology**.
