import { useEffect, useState } from "react"
import { AppLayout } from "../../components/AppLayout"
import Devit from "../../components/Devit"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <div>
      <AppLayout>
        <header>
          <h2> Inicio</h2>
        </header>

        <section>
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              key={id}
              username={username}
              avatar={avatar}
              message={message}
              id={id}
            />
          ))}
        </section>

        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          position: sticky;
          height: 49px;
          top: 0;
          border-bottom: 1px solid #ccc;
          width: 100%;
        }

        section {
          padding-top: 49px;
        }

        h2 {
          font-size: 21px;
          font-weigh: 800;
        }

        nav {
          bottom: 0;
          border-bottom: 1px solid #ccc;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default HomePage
