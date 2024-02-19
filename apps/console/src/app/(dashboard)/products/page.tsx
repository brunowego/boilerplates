'use client'

import { type JSX, useState, useEffect } from 'react'

export default function ProductsPage(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([])

  const connectToStream = () => {
    const eventSource = new EventSource('/api/stream')

    eventSource.addEventListener('message', (event) => {
      const tmp = JSON.parse(event.data)
      setMessages((prev) => [...prev, tmp])
    })

    eventSource.addEventListener('error', () => {
      eventSource.close()

      setTimeout(connectToStream, 1)
    })

    eventSource.onerror = () => {
      setTimeout(connectToStream, 1)
    }

    return eventSource
  }

  useEffect(() => {
    const eventSource = connectToStream()

    return () => {
      eventSource.close()
    }
  })

  return (
    <ul>
      <li>
        {messages.map((message, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a temporary solution
          <li key={index}>{message}</li>
        ))}
      </li>
    </ul>
  )
}
