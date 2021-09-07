document.addEventListener('DOMContentLoaded', criaBotoes)
// Optei por fazer de uma maneira diferente da do vídeo, para aprender
const fontSizes = ['0.5em', '1em', '1.5em',
'2em', '2.5em', '3em', '3.5em', '4em']
let size = 3
// Solução alternativa (do vídeo): h1.style.fontSize = `${size}px` (nesse caso seria necessário mudar o increment da var size) 
function increaseFontSize() {
    if (size < 7) {
        const h1 = document.querySelector('h1')
        size += 1
        h1.style.fontSize = fontSizes[size]
    }
}
function decreaseFontSize() {
    if (size > 0) {
        const h1 = document.querySelector('h1')
        size -= 1
        h1.style.fontSize = fontSizes[size]
    }
}
function criaBotoes() {
    criaBotao('#decrease', '#title', '-', 'buttons', decreaseFontSize)
    criaBotao('#increase', '#title', '+', 'buttons', increaseFontSize)
}
function criaBotao(buttonId, appendElementId, innerText, addClass, clickEvent) {
    const appendElement = document.querySelector(appendElementId)
    const button = document.createElement('button')
    appendElement.prepend(button)
    button.id = buttonId
    button.innerText = innerText
    button.classList.add(addClass)
    button.addEventListener('click', clickEvent)
}
