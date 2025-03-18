const getMessages = async () => {
  const response = await fetch('https://chat.calicheoficial.lat/messages')
  return await response.json() 
}

const postMessage = async (message) => {
  const body = JSON.stringify(message)
  const response = await fetch(
    'https://chat.calicheoficial.lat/messages',
    {
      method: 'POST',
      body
    }
  )
  return await response.json() 
}

// Variable global para el área de mensajes
let messagesArea = null;

// Función para detectar URLs de imágenes en el texto
const detectImageLinks = (text) => {
  // Expresión regular para detectar URLs de imágenes comunes
  const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)(\?[^\s]*)?)/gi
  return text.match(imageRegex)
}

const drawMessages = async (container = document.body) => {
  // Limpiar el contenedor si ya existe contenido
  if (container.id === 'messages-area') {
    container.innerHTML = '';
  }
  
  // Crear un banner individual para el título
  const banner = document.createElement('div')
  banner.id = 'messages-banner'
  banner.style.backgroundColor = '#333'
  banner.style.color = 'white'
  banner.style.padding = '10px'
  banner.style.textAlign = 'center'
  banner.style.fontWeight = 'bold'
  banner.style.fontSize = '24px'
  banner.style.borderRadius = '8px 8px 0 0'
  banner.style.marginBottom = '10px'
  banner.append('Whatsapp choto')
  
  const messagesContainer = document.createElement('div')
  messagesContainer.id = 'messages-list-container'
  messagesContainer.style.overflowY = 'auto'
  messagesContainer.style.height = 'calc(100vh - 160px)'
  messagesContainer.style.padding = '10px'
  
  const ul = document.createElement('ul')
  ul.id = 'messages-list'
  
  // Estilo para el ul
  ul.style.listStyle = 'none'
  ul.style.padding = '0'
  ul.style.margin = '0'
  ul.style.display = 'flex'
  ul.style.flexDirection = 'column'
  ul.style.width = '100%'

  const messages = await getMessages() 

  messages.forEach((message) => {
    // Crear un div para contener el mensaje
    const messageDiv = document.createElement('section')
    messageDiv.className = 'message-container'
    
    // Crear un elemento para el usuario
    const user = document.createElement('span')
    user.append(`${message.user}: `)
    user.className = 'message-user'
    user.style.fontWeight = 'bold'
    
    // Crear un elemento para el texto
    const textContainer = document.createElement('div')
    textContainer.className = 'message-text-container'
    textContainer.style.wordWrap = 'break-word'
    textContainer.style.overflowWrap = 'break-word'
    textContainer.style.width = '100%'
    
    // Detectar enlaces de imágenes en el texto
    const imageLinks = detectImageLinks(message.text)
    
    // Crear el texto del mensaje
    const text = document.createElement('span')
    text.append(message.text)
    text.className = 'message-text'
    
    textContainer.appendChild(text)
    
    // Si hay enlaces de imágenes, crear previsualizaciones
    if (imageLinks && imageLinks.length > 0) {
      imageLinks.forEach(imageUrl => {
        // Crear un contenedor para la imagen
        const imageContainer = document.createElement('div')
        imageContainer.style.marginTop = '10px'
        imageContainer.style.width = '100%'
        imageContainer.style.maxWidth = '300px'
        
        // Crear la imagen
        const imgElement = document.createElement('img')
        imgElement.src = imageUrl
        imgElement.alt = 'Image preview'
        imgElement.style.maxWidth = '100%'
        imgElement.style.borderRadius = '8px'
        imgElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'
        
        // Manejar errores de carga de imagen
        imgElement.onerror = () => {
          imageContainer.remove()
        }
        
        // Añadir la imagen al contenedor
        imageContainer.appendChild(imgElement)
        
        // Añadir el contenedor de imagen al contenedor de texto
        textContainer.appendChild(imageContainer)
      })
    }

    messageDiv.style.padding = '10px'
    messageDiv.style.margin = '5px 0'
    messageDiv.style.borderRadius = '8px'
    messageDiv.style.maxWidth = '80%'
    messageDiv.style.width = 'fit-content'
    messageDiv.style.boxSizing = 'border-box'

    if(message.user === thisuser){
      messageDiv.style.marginLeft = 'auto'
      messageDiv.style.backgroundColor = '#4CAF50' // Verde para tus mensajes
      messageDiv.style.color = 'white'
    } else {
      messageDiv.style.marginRight = 'auto'
      messageDiv.style.backgroundColor = '#2196F3' // Azul para otros mensajes
      messageDiv.style.color = 'white'
    }

    // Añadir usuario y texto al div
    messageDiv.appendChild(user)
    messageDiv.appendChild(textContainer)
    
    // Crear un elemento li para colocar el mensaje
    const li = document.createElement('li')
    li.style.margin = '5px 0'
    li.style.display = 'flex'
    li.appendChild(messageDiv)
    
    // Añadir el li al ul
    ul.appendChild(li)
  })

  messagesContainer.appendChild(ul)

  // Añadir elementos al contenedor
  if (container.id === 'messages-area') {
    container.appendChild(banner)
    container.appendChild(messagesContainer)
  } else {
    // Crear un nuevo contenedor de mensajes
    const div = document.createElement('div')
    div.id = 'messages-area'
    div.style.backgroundColor = '#c4cbc3'
    div.style.display = 'flex'
    div.style.flexDirection = 'column'
    div.style.height = 'calc(100vh - 100px)'
    div.style.width = '100%'
    
    div.appendChild(banner)
    div.appendChild(messagesContainer)
    
    container.appendChild(div)
    
    // Guardar referencia al área de mensajes
    messagesArea = div
  }
  
  return messages.length
}

const drawInput = async () => {
  const divify = document.createElement('div')
  divify.style.position = 'fixed'
  divify.style.bottom = '0'
  divify.style.left = '0'
  divify.style.width = '100%'
  divify.style.padding = '10px'
  divify.style.backgroundColor = '#f0f0f0'
  divify.style.display = 'flex'
  divify.style.justifyContent = 'space-between'
  divify.style.boxSizing = 'border-box'
  
  // Crear un contenedor para el textarea y el contador
  const inputContainer = document.createElement('div')
  inputContainer.style.flex = '1'
  inputContainer.style.marginRight = '10px'
  inputContainer.style.position = 'relative'
  
  // Crear el textarea con límite de 140 caracteres
  const textarea = document.createElement('textarea')
  textarea.maxLength = 140
  textarea.style.width = '100%'
  textarea.style.padding = '5px'
  textarea.style.borderRadius = '4px'
  textarea.style.border = '1px solid #ccc'
  textarea.style.boxSizing = 'border-box'
  
  // Crear contador de caracteres
  const charCounter = document.createElement('div')
  charCounter.style.position = 'absolute'
  charCounter.style.bottom = '5px'
  charCounter.style.right = '10px'
  charCounter.style.fontSize = '12px'
  charCounter.style.color = '#666'
  charCounter.textContent = '0/140'
  
  // Actualizar contador al escribir
  textarea.addEventListener('input', () => {
    const count = textarea.value.length
    charCounter.textContent = `${count}/140`
    
    // Cambiar color si se acerca al límite
    if (count > 120) {
      charCounter.style.color = 'orange'
    } else if (count > 130) {
      charCounter.style.color = 'red'
    } else {
      charCounter.style.color = '#666'
    }
  })
  
  // Añadir textarea y contador al contenedor
  inputContainer.appendChild(textarea)
  inputContainer.appendChild(charCounter)
  
  const button = document.createElement('button')
  button.append('SEND')
  button.style.padding = '10px 20px'
  button.style.backgroundColor = '#4CAF50'
  button.style.color = 'white'
  button.style.border = 'none'
  button.style.borderRadius = '4px'
  button.style.cursor = 'pointer'
  
  button.onclick = async () => {
    if (textarea.value.trim() === '') return
    
    // Verificar que el mensaje no exceda los 140 caracteres
    if (textarea.value.length > 140) {
      textarea.value = textarea.value.substring(0, 140)
    }
    
    const message = {
      text: textarea.value,
      user: thisuser
    }
    await postMessage(message)
    textarea.value = ''
    charCounter.textContent = '0/140' 
    charCounter.style.color = '#666'
    
    // Refrescar mensajes tras enviar
    if (messagesArea) {
      const messagesContainer = messagesArea.querySelector('#messages-list-container')
      const isScrolledToBottom = messagesContainer.scrollHeight - messagesContainer.clientHeight <= messagesContainer.scrollTop + 1
      
      await drawMessages(messagesArea)
      
      // Preservar posición de desplazamiento
      const updatedMessagesContainer = messagesArea.querySelector('#messages-list-container')
      if (isScrolledToBottom) {
        updatedMessagesContainer.scrollTop = updatedMessagesContainer.scrollHeight
      }
    }
  }

  
  textarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      button.click()
    }
  })

  divify.appendChild(inputContainer)
  divify.appendChild(button)

  document.body.appendChild(divify)
} 

const setupAutoRefresh = (refreshInterval = 5000) => {
  let lastMessageCount = 0
  
  const refreshMessages = async () => {
    const messages = await getMessages()
    
    
    if (messages.length !== lastMessageCount) {
      // Actualizar mensajes
      lastMessageCount = await drawMessages(messagesArea)
      
      
      const messagesContainer = messagesArea.querySelector('#messages-list-container')
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }
  
  
  setInterval(refreshMessages, refreshInterval)
}

const thisuser = 'dijan'
const main = async () => {
  await drawMessages()
  await drawInput()
  
  
  if (messagesArea) {
    const messagesContainer = messagesArea.querySelector('#messages-list-container')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  
  setupAutoRefresh(5000) 
}

main()