import Link from "next/link";
import { AppLayout } from "../../components/AppLayout";

const Timeline = ({ username }) => {
  return (
    <>
      <AppLayout>
        <h1>timeline of {username}</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
      </AppLayout>

      {/* <style jsx>{`
                h1 {
                    font-size: 20px;
                    color: red;
                }
            `}</style> */}
    </>
  );
};

export default Timeline;

Timeline.getInitialProps = () => {
  return fetch("http://localhost:3000/api/hello")
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const { username } = response;
      return { username };
    });
};
