import { ChatEngine } from 'react-chat-engine'

export const Home = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const publicKey = import.meta.env.VITE_PUBLIC_KEY

  return (
    <ChatEngine
      projectID={publicKey}
      userName={username}
      userSecret={password}
      // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
    />
  )
}
