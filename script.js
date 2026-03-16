// Substitua pela URL que o Google Apps Script gerou na "Implantação"
const URL_PLANILHA = "SUA_URL_DO_GOOGLE_SCRIPT_AQUI";

// 1. Lógica para Menores de Idade
function verificarMenor(idade) {
    const secaoResp = document.getElementById('secaoResponsavel');
    const camposResp = secaoResp.querySelectorAll('input');
    
    if (idade > 0 && idade < 18) {
        secaoResp.style.display = 'block';
        camposResp.forEach(input => input.required = true);
    } else {
        secaoResp.style.display = 'none';
        camposResp.forEach(input => input.required = false);
    }
}

// 2. Lógica para Sócios Gaviões
function toggleSocio(valor) {
    const campoNumSocio = document.getElementById('numSocio');
    if (valor === 'sim') {
        campoNumSocio.style.display = 'block';
        campoNumSocio.required = true;
    } else {
        campoNumSocio.style.display = 'none';
        campoNumSocio.required = false;
    }
}

// 3. Envio dos Dados e Validação de Vagas
document.getElementById('cadastroRitimao').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('btnEnviar');
    btn.disabled = true;
    btn.innerText = "Processando Matrícula...";

    // Captura os dados do formulário
    const dados = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        sexo: document.querySelector('input[name="sexo"]:checked')?.value || "Não informado",
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        instrumento: document.getElementById('instrumento').value,
        nivel: document.getElementById('nivel').value,
        socio: document.getElementById('isSocio').value,
        numSocio: document.getElementById('numSocio').value || "N/A",
        responsavel: document.getElementById('nomeResp').value || "N/A",
        obs: document.getElementById('obs').value
    };

    try {
        const response = await fetch(URL_PLANILHA, {
            method: 'POST',
            mode: 'no-cors', // Importante para o Google Script
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        // Como o 'no-cors' não permite ler o JSON de resposta perfeitamente, 
        // assumimos o sucesso se não houver erro de rede.
        alert("🚨 CADASTRO ENVIADO! \n\nA Ritimão agradece o interesse. Verifique sua planilha de controle.");
        document.getElementById('cadastroRitimao').reset();
        
    } catch (error) {
        console.error("Erro:", error);
        alert("Ops! Ocorreu um erro ao enviar. Tente novamente ou procure a diretoria.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Cadastrar na Ritimão";
    }
});