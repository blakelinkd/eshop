import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

export default function SignoutPage() {
  const router = useRouter()

  const handleSignout = () => {
    // Remove the session cookie
    destroyCookie(null, 'authToken')

    // Redirect to the login page
    router.push('/')
  }

  return (
    <>
    <div className="blur-background">
      <h1>Are you sure you want to sign out?</h1>
    </div>
    <form onSubmit={handleSignout}>
      <button>Sign out</button>
    </form>
    </>
  )
}
