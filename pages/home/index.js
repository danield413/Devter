import { useEffect, useState } from "react"
import Devit from "../../components/Devit"
import { fetchLatestDevits } from "../../firebase/client"
import { useUser } from "../../hooks/useUser"
import Link from "next/link"
import Create from "../../components/Icons/Create"
import Home from "../../components/Icons/Home"
import Search from "../../components/Icons/Search"
import { colors } from "../../styles/theme"
import Head from "next/head"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)

    return () => setTimeline([])
  }, [user])

  return (
    <div>
      <Head>
        <title>Inicio | Devter</title>
      </Head>
      <header>
        <h2> Inicio</h2>
      </header>

      <section>
        {timeline.map(
          ({ userId, id, userName, avatar, content, createdAt, imageURL }) => (
            <Devit
              key={id}
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              userName={userName}
              content={content}
              userId={userId}
              imageURL={imageURL}
            />
          )
        )}
      </section>

      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          position: sticky;
          height: 49px;
          top: 0;
          border-bottom: 1px solid #eee;
          width: 100%;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
        }

        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weigh: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          position: sticky;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          width: 100%;
          display: flex;
        }

        nav a {
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
          align-items: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </div>
  )
}

export default HomePage
