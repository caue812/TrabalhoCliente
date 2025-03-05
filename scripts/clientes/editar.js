const urlAPI = "https://public.franciscosensaulas.com";
const campoNome = document.getElementById('campoNome');
const campoTelefone = document.getElementById('campoTelefone');
const campoCredito = document.getElementById('campoCredito');


const mascaraCredito = {
    mask: "00000,00"
};
const maskCredito = IMask(campoCredito, mascaraCredito);


const mascaraTelefone = {
    mask: "(00) 00000-0000"
};
const maskTelefone = IMask(campoTelefone, mascaraTelefone);


const url = new URL(window.location.href);




const params = new URLSearchParams(url.search);




const idParaEditar = params.get("id");
async function consultarDadosClientePorId() {
    const urlParaConsultarCliente = `${urlAPI}/api/v1/trabalho/clientes/${idParaEditar}`;

    const resposta = await fetch(urlParaConsultarCliente);

    if (resposta.ok === false) {
        alert("Cliente não encontrado");
        window.location.href = "/clientes/index.html";
        return;
    }

    const dadosCliente = await resposta.json();


    campoNome.value = dadosCliente.nome;
    campoTelefone.value = dadosCliente.telefone;
    campoCredito.value = dadosCliente.credito;
}


async function editar(evento) {
    evento.preventDefault();

    let nome = campoNome.value;
    let telefone = campoTelefone.value;
    let credito = campoCredito.value;

   
    credito = credito.replace(',', '.');

    const dados = {
        nome: nome,
        telefone: telefone,
        credito: credito
    };

    const urlParaEditarCliente = `${urlAPI}/api/v1/empresa/trabalho/clientes/${idParaEditar}`;
    
    const resposta = await fetch(urlParaEditarCliente, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if (resposta.ok === false) {
        alert("Não foi possível alterar");
    } else {
        location.href = '/clientes/index.html';
    }
}


const botaoEditar = document.getElementById("btn-alterar");
botaoEditar.addEventListener("click", editar);


consultarDadosClientePorId();
