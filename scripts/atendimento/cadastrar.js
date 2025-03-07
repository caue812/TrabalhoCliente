const urlAPI = "https://public.franciscosensaulas.com/api/v1/trabalho/atendimentos";

async function criarAtendimento(evento) {
    evento.preventDefault();

    const cliente = document.getElementById("campoCliente").value;  
    const tipoAtendimento = document.getElementById("campoTipoAtendimento").value;
    const descricao = document.getElementById("campoDescricao").value || ""; 
    const atendente = document.getElementById("campoAtendente").value;
    const duracao = document.getElementById("campoDuracao").value;
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
            window.location.href = "/index.html";
        } else {
            alert("Erro ao criar atendimento.");
        }
    } catch (erro) {
        console.error("Erro ao criar atendimento:", erro);
    }
}

document.getElementById("formAtendimento").addEventListener("submit", criarAtendimento);
