'use client'
import { ClerkProvider, SignIn, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm a chat assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (!message.trim()) return;  
  
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <ClerkProvider>
    <SignedOut>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <SignIn routing="hash" /> 
      </Box>
    </SignedOut>
    <SignedIn>
    <Box display="flex" alignItems="right" justifyContent="right">
      <header>
        <UserButton showName />
      </header>
    </Box>
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
    </SignedIn>
    </ClerkProvider>
  )
}
