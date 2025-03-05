let urlAPI = "https://public.franciscosensaulas.com"
async function consultarClientes() {
    const urlClientes = `${urlAPI}/api/v1/trabalho/clientes/`;
    const tabelaClientes = document.getElementById("tabela-clientes")


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

        tbody.innerHTML = "";

        clientes.forEach(cliente => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.credito}</td>
                <td>
                    <button class="botao-apagar" data-id="${cliente.id}" data-nome="${cliente.nome}">
                        Apagar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        atribuirCliqueBotoesApagar();

    } catch (erro) {
        console.error("Erro ao fazer a requisição:", erro);
    }
}

consultarClientes()