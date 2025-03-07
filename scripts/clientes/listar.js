let urlAPI = "https://public.franciscosensaulas.com"

async function consultarClientes() {
    const urlClientes = `${urlAPI}/api/v1/trabalho/clientes/`;
    const tabelaClientes = document.getElementById("tabela-clientes");

    try {
        const resposta = await fetch(urlClientes);

        if (!resposta.ok) {
            console.error("Erro ao consultar clientes: " + resposta.statusText);
            return;
        }

        const clientes = await resposta.json();

        if (!Array.isArray(clientes)) {
            console.error("A resposta não é um array de clientes.");
            return;
        }

        let tbody = tabelaClientes.querySelector("tbody");
        tbody.innerHTML = ""; 

        clientes.forEach(cliente => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.credito}</td>
        <td>
                    <button class="btn btn-warning botao-editar" data-id="${cliente.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-danger botao-apagar" data-id="${cliente.id}" data-nome="${cliente.nome}"><i class="fas fa-trash"></i> Apagar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        atribuirCliqueBotoesApagar();
        atribuirCliqueBotaoEditar();

    } catch (erro) {
        console.error("Erro ao fazer a requisição:", erro);
    }
}

async function apagarCliente(id, nome) {
    const confirmar = confirm(`Você tem certeza que deseja excluir o cliente ${nome}?`);

    if (confirmar) {
        try {
            const urlParaApagarCliente = `${urlAPI}/api/v1/trabalho/clientes/${id}`;
            const resposta = await fetch(urlParaApagarCliente, {
                method: "DELETE",
            });

            if (resposta.ok) {
                alert("Cliente deletado com sucesso!");
                consultarClientes();
            } else {
                alert("Erro ao deletar o cliente.");
            }
        } catch (erro) {
            console.error("Erro ao tentar apagar o cliente:", erro);
            alert("Erro ao tentar apagar o cliente.");
        }
    }
}


function atribuirCliqueBotaoEditar() {
    const botoesEditar = document.querySelectorAll(".botao-editar");
    botoesEditar.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const id = evento.target.closest("button").dataset.id;
            window.location.href = `/clientes/editar.html?id=${id}`;
        });
    });
}

function atribuirCliqueBotoesApagar() {
    const botoesApagar = document.querySelectorAll(".botao-apagar");
    botoesApagar.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const id = evento.target.closest("button").dataset.id;
            const nome = evento.target.closest("button").dataset.nome;
            apagarCliente(id, nome);
        });
    });
}

consultarClientes(); leturlAPI = "https://public.franciscosensaulas.com"

async function consultarClientes() {
    const urlClientes = `${urlAPI}/api/v1/trabalho/clientes/`;
    const tabelaClientes = document.getElementById("tabela-clientes");

    try {
        const resposta = await fetch(urlClientes);

        if (!resposta.ok) {
            console.error("Erro ao consultar clientes: " + resposta.statusText);
            return;
        }

        const clientes = await resposta.json();

        if (!Array.isArray(clientes)) {
            console.error("A resposta não é um array de clientes.");
            return;
        }

        let tbody = tabelaClientes.querySelector("tbody");
        tbody.innerHTML = ""; 

        clientes.forEach(cliente => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.credito}</td>
                <td>
                    <button class="btn btn-warning botao-editar" data-id="${cliente.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-danger botao-apagar" data-id="${cliente.id}" data-nome="${cliente.nome}"><i class="fas fa-trash"></i> Apagar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        atribuirCliqueBotoesApagar();
        atribuirCliqueBotaoEditar();

    } catch (erro) {
        console.error("Erro ao fazer a requisição:", erro);
    }
}

async function apagarCliente(id, nome) {
    const confirmar = confirm(`Você tem certeza que deseja excluir o cliente ${nome}?`);

    if (confirmar) {
        try {
            const urlParaApagarCliente = `${urlAPI}/api/v1/trabalho/clientes/${id}`;
            const resposta = await fetch(urlParaApagarCliente, {
                method: "DELETE",
            });

            if (resposta.ok) {
                alert("Cliente deletado com sucesso!");
                consultarClientes();
            } else {
                alert("Erro ao deletar o cliente.");
            }
        } catch (erro) {
            console.error("Erro ao tentar apagar o cliente:", erro);
            alert("Erro ao tentar apagar o cliente.");
        }
    }
}


function atribuirCliqueBotaoEditar() {
    const botoesEditar = document.querySelectorAll(".botao-editar");
    botoesEditar.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const id = evento.target.closest("button").dataset.id;
            window.location.href = `/clientes/editar.html?id=${id}`;
        });
    });
}

function atribuirCliqueBotoesApagar() {
    const botoesApagar = document.querySelectorAll(".botao-apagar");
    botoesApagar.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const id = evento.target.closest("button").dataset.id;
            const nome = evento.target.closest("button").dataset.nome;
            apagarCliente(id, nome);
        });
    });
}

consultarClientes(); 