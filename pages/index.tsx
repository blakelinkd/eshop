import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies'
import LoginPage from './login'
import SignoutPage from './signout'
import SignUpPage from './signup';
import { destroyCookie } from 'nookies';
export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isHidden, setIsHidden] = useState<boolean>(true);

  function toggleVisibility() {
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
  console.log('logged in?: ' + isLoggedIn)
  console.log(username)

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
              {isLoggedIn ? (
                <li>
                  <Link href="#signout" onClick={toggleVisibility}>
                    <span className="px-4 py-2 hover:text-gray-200">Signout</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="#login" onClick={toggleVisibility}>
                      <span className="px-4 py-2 hover:text-gray-200">Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#signup" onClick={toggleVisibility}>
                      <span className="px-4 py-2 hover:text-gray-200">SignUp</span>
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
            {isLoggedIn ? (
              <>
              <p>Welcome, user who is logged in.</p>
              <SignoutPage />
              </>
            ) : (
              <>
                <Link href="/login">
                </Link>
                {isHidden ? "" :<LoginPage/>}
                {isHidden ? "" :<SignUpPage />}
                
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
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-8">Popular Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://source.unsplash.com/random/200x200"
              alt="Product Image"
              className="w-full mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Product 1</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://source.unsplash.com/random/200x201"
              alt="Product Image"
              className="w-full mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Product 2</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://source.unsplash.com/random/200x202"
              alt="Product Image"
              className="w-full mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Product 3</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <img
              src="https://source.unsplash.com/random/200x203"
              alt="Product Image"
              className="w-full mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Product 4</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
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
