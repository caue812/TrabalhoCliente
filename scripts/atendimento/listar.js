

const urlAPI = "https://public.franciscosensaulas.com/api/v1/trabalho/atendimentos";

async function listarAtendimentos() {
    const tabelaAtendimentos = document.getElementById("tabela-atendimentos").getElementsByTagName("tbody")[0];
    tabelaAtendimentos.innerHTML = ''; // Limpar a tabela antes de adicionar novos atendimentos

    try {
        const resposta = await fetch(urlAPI);
        if (!resposta.ok) {
            console.error("Erro ao obter os atendimentos");
            return;
        }

        const atendimentos = await resposta.json();

        atendimentos.forEach(atendimento => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${atendimento.id}</td>
                <td>${atendimento.cliente}</td>
                <td>${atendimento.tipoAtendimento}</td>
                <td>${atendimento.atendente}</td>
                <td>${atendimento.duracaoMinutos}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarAtendimento(${atendimento.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deletarAtendimento(${atendimento.id})">Excluir</button>
                </td>
            `;
            tabelaAtendimentos.appendChild(tr);
        });
    } catch (erro) {
        console.error("Erro ao carregar os atendimentos:", erro);
    }
}

async function editarAtendimento(id) {
    window.location.href = `/atendimentos/editar_atendimento.html?id=${id}`;
}

async function deletarAtendimento(id) {
    const confirmar = await Swal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!'
    });

    if (confirmar.isConfirmed) {
        try {
            const resposta = await fetch(`${urlAPI}/${id}`, {
                method: 'DELETE',
            });

            if (resposta.ok) {
                Swal.fire(
                    'Deletado!',
                    'O atendimento foi excluído com sucesso.',
                    'success'
                );
                listarAtendimentos(); // Recarregar a lista
            } else {
                Swal.fire(
                    'Erro!',
                    'Não foi possível excluir o atendimento.',
                    'error'
                );
            }
        } catch (erro) {
            console.error("Erro ao excluir atendimento:", erro);
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao tentar excluir o atendimento.',
                'error'
            );
        }
    }
}

listarAtendimentos(); // Carregar a lista ao carregar a página
