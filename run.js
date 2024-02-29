const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const {
    exec
} = require('child_process');

async function runCypressTests() {
    return new Promise((resolve, reject) => {
        exec('cypress run --headless --browser chrome', (error, stdout, stderr) => {
            if (error) {
                reject(`Erro ao executar os testes Cypress: ${error}`);
            } else {
                resolve('Testes Cypress executados com sucesso.');
            }
        });
    });
}

async function convertToPDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:C:/Users/user/Downloads/testflow-goawake-api/mochawesome-report/mochawesome.html', {
        waitUntil: 'networkidle0'
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.pdf({
        path: './mochawesome-report/mochawesome.html',
        format: 'A4'
    });
    await browser.close();
}

async function sendEmail() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pedromorinel@hotmail.com',
            pass: 'PedroCM101.'
        }
    });

    const mailOptions = {
        from: 'pedromorinel@hotmail.com',
        to: 'pedro.morinel@crearesistemas.com.br',
        subject: 'GoAwake API - Relatório de Testes',
        text: 'Segue anexo com os testes realizados.',
        attachments: [{
            filename: 'relatorio.pdf',
            path: './mochawesome-report/relatorio.pdf',
        }]
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(`Erro ao enviar e-mail: ${error}`);
            } else {
                resolve(`E-mail enviado: ${info.response}`);
            }
        });
    });
}

runCypressTests()
    .then(() => {
        console.log('Testes Cypress executados com sucesso.');
        return convertToPDF();
    })
    .then(() => {
        console.log('PDF gerado com sucesso.');
        return sendEmail();
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });