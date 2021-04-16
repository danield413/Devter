import Avatar from "../Avatar/Index"

const Devit = ({ avatar, userName, content, id, userId, createdAt }) => {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>{createdAt}</span>
          </header>
          <p>{content}</p>
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

        p {
          margin: 0;
          line-height: 1.3125;
        }
      `}</style>
    </>
  )
}

export default Devit
