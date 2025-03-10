const urlAPI = "https://public.franciscosensaulas.com/api/v1/trabalho/atendimentos";

const params = new URLSearchParams(window.location.search);
const idAtendimento = params.get("id");

async function carregarAtendimento() {
    try {
        const resposta = await fetch(`${urlAPI}/${idAtendimento}`);
        const atendimento = await resposta.json();

        document.getElementById("campoCliente").value = atendimento.cliente;
        document.getElementById("campoTipoAtendimento").value = atendimento.tipoAtendimento;
        document.getElementById("campoDescricao").value = atendimento.descricao || "";
        document.getElementById("campoAtendente").value = atendimento.atendente;
        document.getElementById("campoDuracao").value = atendimento.duracaoMinutos;
    } catch (erro) {
        console.error("Erro ao carregar atendimento:", erro);
    }
}

async function editarAtendimento(evento) {
    evento.preventDefault();

    const cliente = document.getElementById("campoCliente").value;
    const tipoAtendimento = document.getElementById("campoTipoAtendimento").value;
    const descricao = document.getElementById("campoDescricao").value || "";
    const atendente = document.getElementById("campoAtendente").value;
    const duracao = document.getElementById("campoDuracao").value;

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
        const resposta = await fetch(`${urlAPI}/${idAtendimento}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert("Atendimento atualizado com sucesso!");
            window.location.href = "/atendimento/index.html"; 
        } else {
            alert("Erro ao atualizar atendimento.");
        }
    } catch (erro) {
        console.error("Erro ao atualizar atendimento:", erro);
    }
}

function validarDuracao() {
    const campoDuracao = document.getElementById("campoDuracao");
    if (campoDuracao.value > 1440) {
        campoDuracao.value = 1440;
    }
}

document.getElementById("form-editar-atendimento").addEventListener("submit", editarAtendimento);


carregarAtendimento();
