import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (res.ok) {
      router.push('/')
      location.reload()
    } else {
      const { error } = await res.json()
      alert(error)
    }
  }

  return (
    <form  className="blur-background login-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Email:
        <input data-testid="email-input" className="form-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Password:
        <input data-testid="password-input" className="form-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button id="login-button" type="submit">Log in</button>
    </form>
  )
}
