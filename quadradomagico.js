let ordem = 0;
let matriz = [];
let somaNumeros = 0;

document.addEventListener('DOMContentLoaded', () => {
    ordemQuadrado();
});

// insere um input que muda a ordem do quadrado
function ordemQuadrado() {
    const div = document.querySelector('.page-content');
    const texto = document.createElement('p');
    div.append(texto);
    texto.innerText = 'Qual a ordem do Quadrado Mágico?';
    const input = document.createElement('input');
    div.append(input);
    input.classList.add('botaoReiniciar');
    input.addEventListener('change', () => {
        ordem = parseInt(input.value);
        texto.remove();
        input.remove();
        insereTabela();
    })
}

function insereTabela() {
    // atualiza a matriz do quadrado
    matriz = Array(ordem);
    for (let i=0; i<matriz.length; i++) {
        matriz[i] = Array(ordem);
    };
    somaNumeros = ((1+(ordem**2))*ordem) / 2;

    const tabela = document.createElement('table');
    tabela.id = 'quadradomagico';
    document.querySelector('div').append(tabela);
    for (let i=0; i<ordem; i++) {
        const linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j<ordem; j++) {
            const celula = document.createElement('td');
            linha.append(celula);
            celula.id = `lin${i}col${j}`;
            insereInput(celula);
        }
    }
}

function getLinhaColuna(celula) {
    const [linha,coluna] = celula.id.split('col');
    return [linha.split('lin')[1], coluna];
}

function insereInput(celula) {
    const input = document.createElement('input');
    celula.append(input);
    input.addEventListener('change', () => {
        const valor = parseInt(input.value);
        const [linha, coluna] = getLinhaColuna(celula);
        matriz[linha][coluna] = valor;
        const quadradoCompleto = verificaMatriz();
        if (quadradoCompleto) {
            document.querySelector('#quadradomagico').classList.add('vitoria');
            document.querySelectorAll('input').forEach(input => {
                input.readOnly = true;
            });
            mensagemVitoria();
            criaBotaoReiniciar();
        }
    });
}

function mensagemVitoria() {
    const text = document.createElement('p');
    const div = document.querySelector('.page-content');
    div.append(text);
    text.id = 'victoryMsg';
    text.innerText = 'Você acaba de ganhar um Iphone da mais nova geração!!! clique no botão abaixo para resgatá-lo :D';
}

function criaBotaoReiniciar() {
    const botao = document.createElement('button');
    const div = document.querySelector('.page-content');
    div.append(botao);
    botao.innerText = 'Restart';
    botao.classList.add('botaoReiniciar');
    botao.addEventListener('click', () => {
        botao.remove();
        document.querySelector('#victoryMsg').remove()
        document.querySelector('#quadradomagico').remove()
        ordemQuadrado();
    });
}

function verificaMatriz() {
    const numerosRepetidos = verificaNumerosRepetidos();
    const numerosForaDosLimites = verificaNumerosForaDosLimites();
    const todasSomaOK = verificaSomas();
    return !numerosRepetidos && !numerosForaDosLimites && todasSomaOK;
}

function verificaSomas() {
    const diagonalPrincpalOK = verificaSomaDiagonalPrincipal();
    const diagonalSegundariaOK = verificaSomaDiagonalSecundaria();
    const todasLinhasOK = verificaSomaLinhas();
    const todasColunasOK = verificaSomaColunas();
    return diagonalPrincpalOK && diagonalSegundariaOK && todasLinhasOK && todasColunasOK;
}

function verificaSomaColunas() {
    let todasColunasOK = true;
    for (let j=0; j<ordem; j++) {
        todasColunasOK &= verificaSomaColuna(j);
    }
    return todasColunasOK;
}

function verificaSomaLinhas() {
    let todasLinhasOK = true;
    for (let i=0; i<ordem; i++) {
        todasLinhasOK &= verificaSomaLinha(i);
    }
    return todasLinhasOK;
}

function celulaVazia(celula) {
    const [i,j] = celula;
    return matriz[i][j] == null;
}

function somaValores(total, celula) {
    const [i,j] = celula;
    return total + matriz[i][j];
}

function verificaSomaCelulas(celulas, classe) {
    if (celulas.some(celulaVazia)) return false;
    const soma = celulas.reduce(somaValores, 0);
    if (soma != somaNumeros) {
        acaoClasseCelulas(atribuiClasseCelula, classe, celulas);
        return false;
    } else {
        acaoClasseCelulas(removeClasseCelula, classe, celulas);
    }
    return true;
}

function acaoClasseCelulas(acao, classe, celulas) {
    celulas.map(celula => {
        const [i,j] = celula;
        acao(classe, i, j);
    });
}

function verificaSomaColuna(j) {
    let celulas = [];
    for (let i=0; i<ordem; i++) {
        celulas[i] = [i,j];
    }
    return verificaSomaCelulas(celulas, "somaerradacoluna");
}

function verificaSomaLinha(j) {
    let celulas = [];
    for (let i=0; i<ordem; i++) {
        celulas[i] = [j,i];
    }
    return verificaSomaCelulas(celulas, "somaerradalinha");
}

function verificaSomaDiagonalSecundaria() {
    let celulas = [];
    for (let i=0; i<ordem; i++) {
        celulas[i] = [i,ordem-i-1];
    }
    return verificaSomaCelulas(celulas, "somaerradadiagonalsecundaria");
}

function verificaSomaDiagonalPrincipal() {
    let celulas = [];
    for (let i=0; i<ordem; i++) {
        celulas[i] = [i,i];
    }
    return verificaSomaCelulas(celulas, "somaerradadiagonalprincipal");
}

function verificaNumerosForaDosLimites() {
    const minimo = 1;
    const maximo = ordem**2;
    let numerosForaDosLimites = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
                numerosForaDosLimites = true;
                atribuiClasseCelula('foradoslimites', i, j);
            } else {
                removeClasseCelula('foradoslimites', i, j);
            }
        }
    }
    return numerosForaDosLimites;
}

function verificaNumerosRepetidos() {
    const numeros = Array(ordem**2).fill(0);
    let numerosRepetidos = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor)) {
                numeros[valor-1]++;
            }
        }
    }
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor) && numeros[valor-1] > 1) {
                numerosRepetidos = true;
                atribuiClasseCelula('numerosrepetidos', i, j);
            } else {
                removeClasseCelula('numerosrepetidos', i, j);
            }
        }
    }
    return numerosRepetidos;
}

function atribuiClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.add(classe);
}

function removeClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.remove(classe);
}