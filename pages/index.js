import { useEffect, useState } from "react"
import Head from "next/head"
import { AppLayout } from "../components/AppLayout"
import Button from "../components/Button"
import GitHub from "../components/Icons/GitHub"
import { colors } from "../styles/theme"

import Avatar from "../components/Avatar/Index"
import { loginWithGitHub, onAuthStateChanged } from "../firebase/client"
import Logo from "../components/Icons/Logo"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged((user) => setUser(user))
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👩‍💻👨‍💻
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill={colors.white} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  text={user.username}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  )
}
