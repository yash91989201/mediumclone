import type { NextPage } from 'next'
import Head from 'next/head'

// import custom built components
import Header from "../components/Header"

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Medium Clone Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
     
    </div>
  )
}

export default Home
