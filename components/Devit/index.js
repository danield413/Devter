import Avatar from "../Avatar/Index"

const Devit = ({ avatar, username, message, id }) => {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
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
