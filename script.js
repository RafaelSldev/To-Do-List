const button = document.querySelector('.btn-add-tarefa')
const input = document.querySelector('.entrada-tarefa')
const listaCompleta = document.querySelector('.lista')

let listaDeTarefas = []

function addTarefa() {
    if (!input.value) {
        alert('Ops! Digite alguma tarefa')
    } else {
        listaDeTarefas.push({
            tarefa: input.value,
            concluida: false
        })

    }
    input.value = ''
    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLinha = ''
    listaDeTarefas.forEach((item, posicao) => {
        novaLinha += `
        <li class="tarefas ${item.concluida && "done"}">
            <img src="/images/verifica.png" alt="checado" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="/images/lixo.png" alt="lixo" onclick="deletarTarefa(${posicao})">
        </li>`
    })

    listaCompleta.innerHTML = novaLinha

    localStorage.setItem('lista', JSON.stringify(listaDeTarefas))
}

function concluirTarefa(posicao) {
    listaDeTarefas[posicao].concluida = !listaDeTarefas[posicao].concluida
    mostrarTarefas()

}

function deletarTarefa(posicao) {
    listaDeTarefas.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        listaDeTarefas = JSON.parse(tarefasDoLocalStorage)
    }


    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', addTarefa)
