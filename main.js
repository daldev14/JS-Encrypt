const btnEncriptar = document.querySelector('#btn-encriptar')
const btnDesencriptar = document.querySelector('#btn-desencriptar')
const btnCopy = document.querySelector('#btn-copy')
const inputMessage = document.querySelector('#input-message')
const mainInfo = document.querySelector('.main__info')
const mainEncrypted = document.querySelector('.main__encrypted')
const messageParagraph = document.querySelector('.message__paragraph')
const letterToEncript = ['ai', 'enter', 'imes', 'ober', 'ufat']
const EncriptToLetter = ['a', 'e', 'i', 'o', 'u']

function encrypt() {
  let str = inputMessage.value.toLowerCase()

  if (str === '') return alert('Debe de ingresar un mensaje')

  let newStr = ''

  for (let letter of str) {
    switch (letter) {
      case 'a':
        newStr += letterToEncript[0]
        break
      case 'e':
        newStr += letterToEncript[1]
        break
      case 'i':
        newStr += letterToEncript[2]
        break
      case 'o':
        newStr += letterToEncript[3]
        break
      case 'u':
        newStr += letterToEncript[4]
        break
      default:
        newStr += letter
    }
  }
  console.log(newStr)
  messageParagraph.textContent = newStr
  mainInfo.classList.add('hidden')
  mainEncrypted.classList.remove('hidden')
}

function desencrypt() {
  let str = inputMessage.value.toLowerCase()
  if (str === '') return alert('Debe de ingresar un mensaje')
  for (let i = 0; i < 5; i++) {
    str = str.replaceAll(letterToEncript[i], EncriptToLetter[i])
  }

  console.log(str)
  messageParagraph.textContent = str
  mainInfo.classList.add('hidden')
  mainEncrypted.classList.remove('hidden')
}

function copyText() {
  let text = messageParagraph.textContent
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copiado')
    })
}

inputMessage.addEventListener('keyup', (e) => {
  if (e.target.value === '') {
    mainInfo.classList.remove('hidden')
    mainEncrypted.classList.add('hidden')
  }
})

btnEncriptar.onclick = encrypt
btnDesencriptar.onclick = desencrypt
btnCopy.onclick = copyText