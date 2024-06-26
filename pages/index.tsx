import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies'
import LoginPage from './login'
import SignoutPage from './signout'
import SignUpPage from './signup';
import { destroyCookie } from 'nookies';
import ProductsPage from './products';
import {useSession, signIn, signOut} from 'next-auth/react';
export default function Home() {

  const {data: session} = useSession()
  console.log(session)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [hideSignup, setHideSignup] = useState<boolean>(true)
  const [hideLogin, setHideLogin] = useState<boolean>(true)
  const [hideSignout, setHideSignout] = useState<boolean>(true)
  const [hideProducts, setHideProducts] = useState<boolean>(true)
  
  function toggleVisibility(e: any) {
    console.log(e.target)
    console.log(e.target.id)
    if(e.target.id === "login-link") {
      setHideSignup(true)
      setHideSignout(true)
      setHideLogin(false)
      setHideProducts(true)

    }
    if(e.target.id === "signup-link") {
      setHideLogin(true)
      setHideSignout(true)
      setHideSignup(false)
      setHideProducts(true)

    }
    if(e.target.id === "signout-link") {
      setHideLogin(true)
      setHideSignout(false)
      setHideSignup(true)
      setHideProducts(true)

    }
    if(e.target.id === "products-link") {
      setHideLogin(true)
      setHideSignout(true)
      setHideSignup(true)
      setHideProducts(false)
    }
    
    setIsHidden(!isHidden)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setUsername('')
    destroyCookie(null, 'authToken')
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies.authToken
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's information from the server using the token
      fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUsername(data.username));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>My Next.js Landing Page</title>
        <meta name="description" content="Welcome to my landing page!" />
      </Head>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a className="font-bold text-xl text-white" href="#">
              My Website
            </a>
            <ul className="flex">
              <li>
                <Link href="/">
                  <span className="px-4 py-2 hover:text-gray-200">Home</span>

                </Link>
              </li>
              <li>
                  <Link id="products-link" href="#products" onClick={toggleVisibility}>
                    <span id="products-link" className="px-4 py-2 hover:text-gray-200">Products</span>
                  </Link>
                </li>
              {isLoggedIn ? (
                <li>
                  <Link id="signout-link" href="#signout" onClick={toggleVisibility}>
                    <span id="signout-link" className="px-4 py-2 hover:text-gray-200">Signout</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                  <Link id="login-link" href="#login" onClick={toggleVisibility}>
  <span id="login-link" className="px-4 py-2 hover:text-gray-200">Login</span>
</Link>
                  </li>
                  <li>
                    <Link id="signup-link" href="#signup" onClick={toggleVisibility}>
                      <span id="signup-link" className="px-4 py-2 hover:text-gray-200">SignUp</span>
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://source.unsplash.com/random")' }}>
        <div className="flex items-center justify-center h-full w-full bg-gray-900bg-opacity-50">
          <div className="text-center text-white">
            { session ? "Hello Blake" : "" }
            {isLoggedIn ? (
              <>
              <p id="user-display-message">Welcome, user who is logged in.</p>
              {hideSignout ? "" : <SignoutPage /> }
              </>
            ) : (
              <>
                <Link href="/login">
                </Link>
                {hideLogin ? "" :<LoginPage/>}
                {hideSignup ? "" :<SignUpPage />}
                {hideProducts ? "" :<ProductsPage />}
                
              </>

            )}
            <h1 className="text-4xl font-bold mb-4">
              Welcome to My Website
            </h1>
            <p className="text-xl">
              Discover amazing features and services that we offer
            </p>
          </div>
        </div>
      </section>
      <section id="popular-items" className="mx-auto px-6 py-8">
  <h2 className="text-3xl font-bold mb-8">Popular Items</h2>
  
  <ProductsPage></ProductsPage>
</section>

      <section className="bg-gray-800 py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Subscribe to Our Newsletter
          </h2>
          <form className="flex justify-center">
            <input
              type="text"
              className="px-4 py-2 mr-2 w-1/2 rounded-l-md focus:outline-none"
              placeholder="Your email address"
            />
            <button className="px-8 py-2 bg-white text-gray-800 font-bold rounded-r-md focus:outline-none">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center">
            <div className="text-center">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-3"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-3"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-3"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 mx-3"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
