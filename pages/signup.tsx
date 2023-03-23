import { useState } from 'react'
import { useRouter } from 'next/router'

interface SignUpData {
    name: string
    email: string
    password: string
  }

  export default function SignUpPage() {
    const [signUpData, setSignUpData] = useState<SignUpData>({
      name: '',
      email: '',
      password: '',
    })
    const router = useRouter()
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
  
      // Send a POST request to the `/api/signup` endpoint with the sign up data
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      })
  
      if (res.ok) {
        router.push('/login')
      } else {
        const { error } = await res.json()
        alert(error)
      }
    }
  
    return (
      <form className="blur-background login-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input className="form-input"
            type="text"
            value={signUpData.name}
            onChange={(event) =>
              setSignUpData({ ...signUpData, name: event.target.value })
            }
          />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input className="form-input"
            type="email"
            value={signUpData.email}
            onChange={(event) =>
              setSignUpData({ ...signUpData, email: event.target.value })
            }
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input className="form-input"
            type="password"
            value={signUpData.password}
            onChange={(event) =>
              setSignUpData({ ...signUpData, password: event.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
    )
  }
  