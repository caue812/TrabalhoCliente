const urlAPI = "https://public.franciscosensaulas.com";
const campoNome = document.getElementById('campoNome');
const campoTelefone = document.getElementById('campoTelefone');
const campoCredito = document.getElementById('campoCredito');

// Mascaras para os campos de telefone e crédito
const mascaraCredito = {
    mask: "00000,00"
};
const maskCredito = IMask(campoCredito, mascaraCredito);

const mascaraTelefone = {
    mask: "(00) 00000-0000"
};
const maskTelefone = IMask(campoTelefone, mascaraTelefone);

// Pegando o ID do cliente da URL
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

// Função para consultar os dados do cliente
async function consultarDadosClientePorId() {
    const urlParaConsultarCliente = `${urlAPI}/api/v1/trabalho/clientes/${idParaEditar}`;

    const resposta = await fetch(urlParaConsultarCliente);

    if (resposta.ok === false) {
        alert("Cliente não encontrado");
        window.location.href = "/clientes/index.html";
        return;
    }

    const dadosCliente = await resposta.json();
    
    // Preenche os campos com os dados do cliente
    campoNome.value = dadosCliente.nome;
    campoTelefone.value = dadosCliente.telefone;
    campoCredito.value = dadosCliente.credito;
}

// Função para editar o cliente
async function editar(evento) {
    evento.preventDefault();

    let nome = campoNome.value;
    let telefone = campoTelefone.value;
    let credito = campoCredito.value;

    // Converte o crédito para o formato correto para envio
    credito = credito.replace(',', '.');

    const dados = {
        nome: nome,
        telefone: telefone,
        credito: credito
    };

    // URL de edição do cliente
    const urlParaEditarCliente = `${urlAPI}/api/v1/trabalho/clientes/${idParaEditar}`;
    
    const resposta = await fetch(urlParaEditarCliente, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if (resposta.ok === false) {
        alert("Não foi possível alterar");
    } else {
        alert("Cliente alterado com sucesso!");
        // Redireciona de volta para a lista de clientes
        location.href = '/clientes/index.html';
    }
}

// Escuta o clique no botão de alterar (salvar)
const botaoEditar = document.getElementById("btn-alterar");
botaoEditar.addEventListener("click", editar);

// Chama a função para preencher os dados do cliente quando a página for carregada
consultarDadosClientePorId();
