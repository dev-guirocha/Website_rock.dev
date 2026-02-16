const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 8787);
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || '*')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
    console.warn('Variaveis SMTP/CONTACT_TO nao definidas. O endpoint de contato ira responder com erro ate configurar o .env.');
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.use(helmet());
app.set('trust proxy', 1);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }

        if (FRONTEND_ORIGINS.includes('*') || FRONTEND_ORIGINS.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Origem nao permitida por CORS.'));
    }
}));
app.use(express.json({ limit: '1mb' }));

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Muitas tentativas. Tente novamente em alguns minutos.'
    }
});

app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    const {
        name,
        email,
        company,
        service,
        budget,
        timeline,
        message,
        website,
        consent
    } = req.body || {};

    const sanitized = {
        name: typeof name === 'string' ? name.trim() : '',
        email: typeof email === 'string' ? email.trim() : '',
        company: typeof company === 'string' ? company.trim() : '',
        service: typeof service === 'string' ? service.trim() : '',
        budget: typeof budget === 'string' ? budget.trim() : '',
        timeline: typeof timeline === 'string' ? timeline.trim() : '',
        message: typeof message === 'string' ? message.trim() : '',
        website: typeof website === 'string' ? website.trim() : '',
        consent: consent === true || consent === 'true' || consent === 'on'
    };

    // Honeypot para reduzir spam automático.
    if (sanitized.website.length > 0) {
        return res.status(200).json({ message: 'Contato enviado com sucesso.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitized.name || !sanitized.email || !sanitized.service || !sanitized.message) {
        return res.status(400).json({ message: 'Todos os campos sao obrigatorios.' });
    }

    if (!emailRegex.test(sanitized.email)) {
        return res.status(400).json({ message: 'Informe um e-mail valido.' });
    }

    if (sanitized.message.length < 20) {
        return res.status(400).json({ message: 'A mensagem deve ter pelo menos 20 caracteres.' });
    }

    if (!sanitized.consent) {
        return res.status(400).json({ message: 'Confirme o consentimento para envio dos dados.' });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
        return res.status(500).json({ message: 'Servidor de e-mail nao configurado.' });
    }

    try {
        const from = process.env.CONTACT_FROM || 'Site Rock .dev <no-reply@rock.dev>';
        await transporter.sendMail({
            from,
            to: process.env.CONTACT_TO,
            replyTo: `${sanitized.name} <${sanitized.email}>`,
            subject: `[Site Rock .dev] Novo contato - ${sanitized.service}`,
            text: [
                'Novo contato recebido pelo site.',
                '',
                `Nome: ${sanitized.name}`,
                `E-mail: ${sanitized.email}`,
                `Empresa: ${sanitized.company || 'Nao informado'}`,
                `Servico: ${sanitized.service}`,
                `Faixa de investimento: ${sanitized.budget || 'Nao informado'}`,
                `Prazo desejado: ${sanitized.timeline || 'Nao informado'}`,
                '',
                'Mensagem:',
                sanitized.message
            ].join('\n')
        });

        return res.status(200).json({ message: 'Contato enviado com sucesso.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de contato:', error);
        return res.status(500).json({ message: 'Nao foi possivel enviar agora. Tente novamente.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend de contato ativo em http://localhost:${PORT}`);
});
