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

const drawMessages = async () => {
  const div = document.createElement('div')
  const h1 = document.createElement('h1')
  h1.append('Messages')
  h1.style.textAlign = 'center'
  const ul = document.createElement('ul')

  const messages = await getMessages() 

  messages.forEach((message) => {
    const li = document.createElement('li')
    
    const user = document.createElement('span')
    user.append(`${message.user}: `)

    const text = document.createElement('span')
    text.append(message.text)

    li.append(user)
    li.append(text)

    ul.append(li)
  })

  div.append(h1)
  div.append(ul)

  document.body.append(div)
}

const drawInput = async () => {
  const divify = document.createElement('div')
  const textarea = document.createElement('textarea')
  const button = document.createElement('button')
  button.append('SEND')
  button.onclick = () => {
    console.log('onclick')
    const message = {
      text: textarea.value,
      user: 'dennis'
    }
    postMessage(message)
  }

  divify.append(textarea)
  divify.append(button)

  document.body.append(divify)
} 

const main = async () => {
  await drawMessages()
  await drawInput()
}

main()
