import { useEffect, useState } from "react"
import { AppLayout } from "../../../components/AppLayout"
import Button from "../../../components/Button"
import { useUser } from "../../../hooks/useUser"

import { addDevit, uploadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "../../../components/Avatar/Index"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

const ComposeTweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgUrl, setImageURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("on complete")
        task.snapshot.ref.getDownloadURL().then((imgUrl) => {
          setImageURL(imgUrl)
        })
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.userName,
      imageURL: imgUrl,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    console.log(e.dataTransfer.files[0])
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  // if (!user) return <h1>Cargando...</h1>

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit | Devter</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="¿Qué está pasando?"
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></textarea>
            {imgUrl && (
              <section className="remove-img">
                <button onClick={() => setImageURL(null)}>X</button>
                <img src={imgUrl} alt="Tu imagen" />
              </section>
            )}
            <div>
              <Button type="submit" disabled={isButtonDisabled}>
                Devitear
              </Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        .avatar-container {
          padding-top: 10px;
          padding-left: 10px;padding
        }

        .form-container {
          display: flex;
          align-items: start;
        }

        .remove-img {
          position: relative;
        }

        button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          height: 32px;
          width: 32px;
          color: white;
          font-size: 20px;
        }

        form {
          padding: 10px;
        }

        textarea {
          border: ${
            drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"
          };
          width: 100%;
          min-height: 200px;
          font-size: 21px;
          resize: none;
          padding: 15px;
          outline: none;
          transition: 0.2s ease;
        }

        img {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default ComposeTweet
