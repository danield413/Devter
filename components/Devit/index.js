import { useTimeAgo } from "../../hooks/useTimeAgo"
import Avatar from "../Avatar/Index"

const Devit = ({
  avatar,
  userName,
  content,
  id,
  userId,
  createdAt,
  imageURL,
}) => {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - {timeago}</span>
          </header>
          <p>{content}</p>
          {imageURL && <img src={imageURL} alt="Devit Image" />}
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        span {
          font-size: 14px;
          color: gray;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }

        img {
          margin-top: 10px;
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Devit
