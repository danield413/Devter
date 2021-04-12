import Head from 'next/head'
import Link from 'next/link'
import { AppLayout } from '../components/AppLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <h1>Home</h1>
        <Link href="/timeline">
          <a>Timeline</a>
        </Link>
      </AppLayout>
    </>
  )
}
