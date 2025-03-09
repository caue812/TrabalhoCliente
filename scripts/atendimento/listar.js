const urlAPI = "https://public.franciscosensaulas.com/api/v1/trabalho/atendimentos";
async function consultarAtendimentos() {
    try {
        const resposta = await fetch(urlAPI);
        if (!resposta.ok) {
            Swal.fire('Erro!', 'Erro ao consultar atendimentos', 'error');
            return;
        }

        const atendimentos = await resposta.json();
        const tbody = document.querySelector("#tabela-atendimentos tbody");

       
        tbody.innerHTML = '';

       
        atendimentos.sort((a, b) => a.id - b.id); 

       
        atendimentos.forEach((atendimento, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td> <!-- Exibe o ID sequencial na tabela -->
                <td>${atendimento.cliente}</td>
                <td>${atendimento.tipoAtendimento}</td>
                <td>${atendimento.atendente}</td>
                <td>${atendimento.duracaoMinutos}</td>
                <td>
                    <a href="/atendimento/editar_atendimento.html?id=${atendimento.id}" class="btn btn-warning">
                        <i class="fas fa-edit"></i> Editar
                    </a>
                    <button class="btn btn-danger" onclick="excluirAtendimento(${atendimento.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    } catch (erro) {
        console.error("Erro ao carregar atendimentos:", erro);
        Swal.fire('Erro!', 'Ocorreu um erro ao carregar os atendimentos', 'error');
    }
}


async function excluirAtendimento(id) {
    try {
    
        const resposta = await fetch(`${urlAPI}/${id}`);
        const atendimento = await resposta.json();

       
        const confirmarExclusao = await Swal.fire({
            title: `Tem certeza que deseja excluir o atendimento de ${atendimento.cliente}?`,
            text: "Esta ação não pode ser desfeita.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (!confirmarExclusao.isConfirmed) return;

       
        const respostaExclusao = await fetch(`${urlAPI}/${id}`, {
            method: 'DELETE'
        });

        if (respostaExclusao.ok) {
            Swal.fire(
                'Excluído!',
                'O atendimento foi excluído com sucesso.',
                'success'
            );
            consultarAtendimentos(); 
        } else {
            Swal.fire(
                'Erro!',
                'Ocorreu um erro ao excluir o atendimento.',
                'error'
            );
        }
    } catch (erro) {
        console.error("Erro ao excluir atendimento:", erro);
        Swal.fire('Erro!', 'Ocorreu um erro ao tentar excluir o atendimento', 'error');
    }
}


document.getElementById("consultar-atendimentos").addEventListener("click", consultarAtendimentos);

consultarAtendimentos();
