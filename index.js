document.addEventListener('DOMContentLoaded', () => {
  const BTN_ENCRYPT = document.querySelector('#btn-encrypt')
  const BTN_DECRYPT = document.querySelector('#btn-decrypt')
  const BTN_COPY = document.querySelector('#btn-copy')
  const BTN_PASTE = document.querySelector('#btn-paste')
  const INPUT_MESSAGE = document.querySelector('#input-message')
  const MAIN_INFO = document.querySelector('.main__info')
  const MAIN_ENCRYPTED = document.querySelector('.main__encrypted')
  const MESSAGE_ENCRYPT = document.querySelector('.main__message--encrypted')
  const MAIN_TOOLTIP = document.querySelector('.main__tooltip')

  const letterToEncript = ['ai', 'enter', 'imes', 'ober', 'ufat']
  const LETTERS = ['a', 'e', 'i', 'o', 'u']
  const REGEX = /[A-Záéíóúàèìòù]/g

  const sUsrAg = navigator.userAgent

  if (sUsrAg.indexOf('Firefox') > -1) {
    BTN_PASTE.classList.add('hidden')
  }

  if (sUsrAg.indexOf('EdgA') > -1) {
    document.querySelector('.emoji-heart').style.fontFamily = 'Segoe UI Symbol'
  }

  function validateMessage (str) {
    return str.match(REGEX) === null
  }

  BTN_ENCRYPT.addEventListener('click', (evt) => {
    const str = INPUT_MESSAGE.value.toLowerCase()

    if (str === '') return alert('Debe de ingresar un mensaje')
    if (!validateMessage(str)) return alert('Sin mayúsculas ni acentos')
    let newStr = ''

    // str = str.replaceAll(LETTERS[1], letterToEncript[1])
    //   .replaceAll(LETTERS[2], letterToEncript[2])
    //   .replaceAll(LETTERS[0], letterToEncript[0])
    //   .replaceAll(LETTERS[3], letterToEncript[3])
    //   .replaceAll(LETTERS[4], letterToEncript[4])

    for (const letter of str) {
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

    MESSAGE_ENCRYPT.textContent = newStr
    MAIN_INFO.classList.add('hidden')
    MAIN_ENCRYPTED.classList.remove('hidden')
  })

  BTN_DECRYPT.addEventListener('click', (evt) => {
    let str = INPUT_MESSAGE.value.toLowerCase()
    if (str === '') return alert('Debe de ingresar un mensaje')
    if (!validateMessage(str)) return alert('Sin mayúsculas ni acentos')

    for (let i = 0; i < 5; i++) {
      str = str.replaceAll(letterToEncript[i], LETTERS[i])
    }

    MESSAGE_ENCRYPT.textContent = str
    MAIN_INFO.classList.add('hidden')
    MAIN_ENCRYPTED.classList.remove('hidden')
  })

  BTN_COPY.addEventListener('click', async (evt) => {
    try {
      const text = MESSAGE_ENCRYPT.textContent
      await navigator.clipboard.writeText(text)
      MAIN_TOOLTIP.classList.remove('hidden')
      setTimeout(() => {
        MAIN_TOOLTIP.classList.add('hidden')
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  })

  BTN_PASTE.addEventListener('click', async (evt) => {
    try {
      const text = await navigator.clipboard.readText()
      INPUT_MESSAGE.value = text
    } catch (error) {
      console.log(error)
    }
  })

  INPUT_MESSAGE.addEventListener('keyup', (evt) => {
    if (evt.target.value !== '') return

    MAIN_INFO.classList.remove('hidden')
    MAIN_ENCRYPTED.classList.add('hidden')
  })

  INPUT_MESSAGE.addEventListener('input', (evt) => {
    INPUT_MESSAGE.value = evt.target.value.toLowerCase()
  })
})
