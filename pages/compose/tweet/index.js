import { useState } from "react"
import { AppLayout } from "../../../components/AppLayout"
import Button from "../../../components/Button"
import { useUser } from "../../../hooks/useUser"

import { addDevit } from "../../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const ComposeTweet = () => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const user = useUser()
  const router = useRouter()

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
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué está pasando?"
            onChange={handleChange}
          ></textarea>
          <div>
            <Button type="submit" disabled={isButtonDisabled}>
              Devitear
            </Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          width: 100%;
          min-height: 200px;
          border: 0;
          font-size: 21px;
          resize: none;
          padding: 15px;
          outline: none;
        }
      `}</style>
    </>
  )
}

export default ComposeTweet
