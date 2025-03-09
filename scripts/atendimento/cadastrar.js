const urlAPI = "https://public.franciscosensaulas.com/api/v1/trabalho/atendimentos";


async function criarAtendimento(evento) {
    evento.preventDefault();

    const cliente = document.getElementById("campoCliente").value;
    const tipoAtendimento = document.getElementById("campoTipoAtendimento").value;
    const descricao = document.getElementById("campoDescricao").value || ""; 
    const atendente = document.getElementById("campoAtendente").value;
    let duracao = document.getElementById("campoDuracao").value;

    
    if (duracao > 1440) {
        alert("A duração não pode ser superior a 1440 minutos (24 horas).");
        return; 
    }

    const dados = {
        cliente: cliente,
        tipoAtendimento: tipoAtendimento,
        descricao: descricao,
        atendente: atendente,
        duracaoMinutos: duracao
    };

    try {
        const resposta = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert("Atendimento criado com sucesso!");
            window.location.href = "/atendimento/index.html"; 
        } else {
            alert("Erro ao criar atendimento.");
        }
    } catch (erro) {
        console.error("Erro ao criar atendimento:", erro);
    }
}


function validarDuracao() {
    const campoDuracao = document.getElementById("campoDuracao");
    if (campoDuracao.value > 1440) {
        campoDuracao.value = 1440; 
    }
}


document.getElementById("formAtendimento").addEventListener("submit", criarAtendimento);
