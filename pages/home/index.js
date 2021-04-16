import { useEffect, useState } from "react"
import { AppLayout } from "../../components/AppLayout"
import Devit from "../../components/Devit"
import { fetchLatestDevits } from "../../firebase/client"
import { useUser } from "../../hooks/useUser"

const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)

    return () => setTimeline([])
  }, [user])

  return (
    <div>
      <AppLayout>
        <header>
          <h2> Inicio</h2>
        </header>

        <section>
          {timeline.map(
            ({ userId, id, userName, avatar, content, createdAt }) => (
              <Devit
                key={id}
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                userName={userName}
                content={content}
                userId={userId}
              />
            )
          )}
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
          border-bottom: 1px solid #eee;
          width: 100%;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
        }

        h2 {
          font-size: 21px;
          font-weigh: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-bottom: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default HomePage
