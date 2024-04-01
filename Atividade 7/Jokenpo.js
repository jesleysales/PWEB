
function determinarVencedor(escolhaUsuario, escolhaComputador) {
    if (escolhaUsuario === escolhaComputador) {
        return "Empatou";
    } else if (
        (escolhaUsuario === "pedra" && escolhaComputador === "tesoura") ||
        (escolhaUsuario === "tesoura" && escolhaComputador === "papel") ||
        (escolhaUsuario === "papel" && escolhaComputador === "pedra")
    ) {
        return "Você venceu!";
    } else {
        return "Computador venceu!";
    }
}

function escolhaComputador() {
    const rand = Math.random();

    if (rand < 0.33) {
        return "pedra";
    } else if (rand < 0.66) {
        return "papel";
    } else {
        return "tesoura";
    }
}


function escolhaUsuario() {
    const escolha = prompt("pedra, papel ou tesoura?").toLowerCase();
    if (escolha !== "pedra" && escolha !== "papel" && escolha !== "tesoura") {
        alert("Escolha inválida. Escolha pedra, papel ou tesoura.");
        return null;
    }
    return escolha;
}

function iniciarJogo() {
    const botaoJogar = document.getElementById('jogarBtn');
    botaoJogar.addEventListener('click', function() {
        const escolhaDoUsuario = escolhaUsuario();
        if (!escolhaDoUsuario) return;

        const escolhaComp = escolhaComputador();
        const resultado = determinarVencedor(escolhaDoUsuario, escolhaComp);
        alert(`Você escolheu: ${escolhaDoUsuario}\nO computador escolheu: ${escolhaComp}\n${resultado}`);
    });
}


document.addEventListener('DOMContentLoaded', iniciarJogo);
