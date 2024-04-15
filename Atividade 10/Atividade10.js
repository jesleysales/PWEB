// Função para retornar o maior número entre três números
function mostrarMaiorNumero() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const num3 = parseFloat(document.getElementById('num3').value);
    const maior = Math.max(num1, num2, num3);
    document.getElementById('maiorNumeroOutput').innerHTML = `O maior número é: ${maior}`;
}

// Função para retornar três números em ordem crescente
function mostrarNumerosOrdenados() {
    const num4 = parseFloat(document.getElementById('num4').value);
    const num5 = parseFloat(document.getElementById('num5').value);
    const num6 = parseFloat(document.getElementById('num6').value);
    const ordenados = [num4, num5, num6].sort((a, b) => a - b);
    document.getElementById('numerosOrdenadosOutput').innerHTML = `Números ordenados: ${ordenados}`;
}

// Função para verificar se uma string é um palíndromo
function verificarPalindromo() {
    const palavra = document.getElementById('palavra').value.toUpperCase().replace(/[^A-Z]/g, '');
    const palindromo = palavra === palavra.split('').reverse().join('');
    const mensagem = palindromo ? 'É um palíndromo' : 'Não é um palíndromo';
    document.getElementById('palindromoOutput').innerHTML = mensagem;
}

// Função para verificar se três valores formam um triângulo e qual é o tipo de triângulo
function mostrarTipoTriangulo() {
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);
    let tipo = '';
    
    if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
        if (lado1 === lado2 && lado2 === lado3) {
            tipo = 'Tipo de triângulo: Equilátero';
        } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
            tipo = 'Tipo de triângulo: Isósceles';
        } else {
            tipo = 'Tipo de triângulo: Escaleno';
        }
    } else {
        tipo = 'Não forma um triângulo';
    }
    
    document.getElementById('tipoTrianguloOutput').innerHTML = `${tipo}`;
}
