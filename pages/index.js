import { useEffect } from "react"
import Head from "next/head"
import { AppLayout } from "../components/AppLayout"
import Button from "../components/Button"
import GitHub from "../components/Icons/GitHub"
import { colors } from "../styles/theme"

import { loginWithGitHub } from "../firebase/client"
import Logo from "../components/Icons/Logo"

import { useRouter } from "next/router"
import { USER_STATES, useUser } from "../hooks/useUser"

export default function Home() {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} fill={colors.white} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && (
              <img src="/spinner.gif" alt="loading" />
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
