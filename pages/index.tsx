import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import {sanityClient,urlFor} from "../sanity.js"
// import custom built components
import Header from "../components/Header"
import Banner from "../components/Banner"
// import types 
import {PostType} from "../typings"

 type HomeProps={
  posts:PostType[];
}


const Home: NextPage<HomeProps> = ({posts}:HomeProps) => {
  return (
    <div className="flex min-h-screen flex-col max-w-7xl mx-auto" >
      <Head>
        <title>Medium Clone Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
     <Banner/>
     {/* posts section */}
     <section 
     className='
     p-2 grid grid-cols-1 gap-3 
     sm:grid-cols-2 
     lg:grid-cols-3 
     md:gap-6 md:p-6
     '>
      {
        posts.map(post=>(
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border-2 rounded-xl  overflow-hidden group cursor-pointer'>
              <img 
                className='
                w-full h-60 object-cover 
                group-hover:scale-105
                transition-transform duration-200 ease-in-out
                '
                src={
                  urlFor(post.mainImage).url()!
                } 
                alt="post image"
              />
              <div className='flex items-center justify-between p-4 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>
                <img 
                  className='w-12 h-12 object-cover rounded-full'
                  src={
                    urlFor(post.author.image).url()!
                  } 
                  alt="post image"
                />
              </div>
            </div>
          </Link>
        ))
      }
     </section>
    </div>
  )
}

export default Home

export const getServerSideProps=async ()=>{
  const query=`*[_type == "post"]{
    _id,
    title,
    author ->{
      name,
      image
     },
     description,
     mainImage,
     slug
  }`;
  const posts=await sanityClient.fetch(query);
  return{
    props:{
      posts
    }
  }
}