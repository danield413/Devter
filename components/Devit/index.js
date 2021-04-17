import { useTimeAgo } from "../../hooks/useTimeAgo"
import Avatar from "../Avatar/Index"
import Link from "next/link"
import { useRouter } from "next/router"

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
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push("/status/[id]", `/status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time title={timeago}>{timeago}</time>
              </a>
            </Link>
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

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        div {
          padding-right: 10px;
        }

        time {
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

        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default Devit
