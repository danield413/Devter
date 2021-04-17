import Devit from "../../components/Devit"
import { firestore } from "../../firebase/admin"

const DevitPage = (props) => {
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export default DevitPage

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "HXAPhwfVk6djm4UpguOr" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }

      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}
