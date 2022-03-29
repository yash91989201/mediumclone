import { useState } from "react";
import { GetStaticProps } from "next"
import { sanityClient,urlFor } from "../../sanity"
import {useForm ,SubmitHandler} from "react-hook-form";

// import custom build components
import Header from "../../components/Header"
// imoprt types
import { PostType } from "../../typings"
import PortableText from "react-portable-text"
// import icons

interface Props{
    post:PostType
}

interface FormProps{
    _id:string;
    name:string;
    email:string;
    comment:string;
}

const Post = ({post}:Props) => {
    const [formSubmitted,setFormSubmitted]=useState(false);
    const {register,handleSubmit,formState:{errors}}=useForm<FormProps>();
    const onSubmit:SubmitHandler<FormProps> =async (data)=>{
        fetch("/api/createComment",{
            method:"POST",
            body:JSON.stringify(data)
        })
        .then(()=>setFormSubmitted(true))
        .catch(err=>console.log(err.type))
    }
  return (
    <main>
        <Header />
        <img className="w-full h-80 object-cover"  src={urlFor(post.mainImage).url( )!} alt="" />
        <article className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl my-6">{post.title}</h1>
            <h2 className="my-4 text-xl font-light text-gray-500">{post.description}</h2>
            <div className="flex items-center">
                <img className="w-12 h-12 mr-4 rounded-full object-cover"  src={urlFor(post.author.image).url()!} alt="" />
                <p className="font-light text-sm">Blog Post by <span className="text-green-600">{post.author.name}</span>  - Published at {new Date(post._createdAt).toLocaleString()}</p>
            </div>
            <div className="my-10 leading-relaxed">
                <PortableText
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post.body}
                serializers={{
                    h1:(props:any)=>(
                        <h1 className="text-2xl font-bold my-5" {...props}/>
                    ),
                    h2:(props:any)=>(
                        <h2 className="text-xl font-bold my-5" {...props}/>
                    ),
                    li:({children}:any)=>(
                        <li className="ml-4 list-disc" >{children}</li>
                    ),
                    link:({href,children}:any)=>( 
                        <a href={href}  className="text-blue-500 hover:underline" >{children}</a>
                    ),
                }}
                />
            </div>
        </article>
        <hr  className="max-w-2xl my-5 mx-auto border-yellow-500 border-2"/>
        {/* comment form */}
        {
            formSubmitted ?
            <div className="max-w-2xl p-8 mx-auto bg-yellow-500 text-white" >
                <h2 className="py-2 text-2xl font-bold">
                    Thank your for your awesome comment !!!
                </h2>
                <p>
                    Once your comment is approved it will show below
                </p>
            </div>
            :
            <form className="flex flex-col mb-10 p-5 mx-auto max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below</h4>
            <hr className="py-3 mt-2" />
            <input 
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
            />
            <label htmlFor="" className="mb-5 " >
                <span className="text-gray-700" >Name</span>
                <input 
                {...register("name",{required:true})}
                className="shadow border rounded p-3 form-input mt-1 block w-full
                 focus:outline-none focus:ring-yellow-500  focus:ring-1"   placeholder="John Appleseed" type="text" />
            </label>
            <label htmlFor="" className="mb-5 " >
                <span className="text-gray-700" >Email</span>
                <input
                {...register("email",{required:true})}
                 className="shadow border rounded p-3 form-input mt-1 block w-full 
                focus:outline-none focus:ring-yellow-500 focus:ring-1"   placeholder="John Appleseed" type="email" />
            </label>
            <label htmlFor="" className="mb-5 " >
                <span className="text-gray-700" >Comment</span>
                <textarea 
                {...register("comment",{required:true})}
                className="shadow border rounded py-2 px-3 form-textarea  mt-1 block w-full
                 focus:outline-none focus:ring-yellow-500 focus:ring-1"  placeholder="John Appleseed" rows={8} />
            </label>
            {/* erros will return when validation fails */}
            <div className="flex flex-col py-5">
            {errors.name && <p className="text-red-500"> - Name feild is required </p>}
            {errors.email && <p className="text-red-500"> - Email feild is required </p>}
            {errors.comment && <p className="text-red-500"> - Comment feild is required </p>}
            </div>
            <input  
            className="
            px-4 py-2 rounded
            bg-yellow-500 
            hover:bg-yellow-400 focus:shadow-outline 
            focus:outline-none text-white font-bold
            cursor-pointer
            " 
            type="submit" value="Submit" 
            />
        </form>
        }
        {/* comments */}
        <div className="max-w-2xl mx-auto p-12 m-12 shadow-yellow-500 shadow">
            <h3 className="text-4xl" >Comments</h3>
            <hr className="my-6"/>
            {
                post.comments.map((comment)=>(
                    <div 
                        key={comment._id}
                        className="bg-gray-100 p-6 my-2 rounded-md flex "
                    >
                        <p><span className="text-yellow-500">{comment.name}</span>:{comment.comment}</p>
                    </div>
                ))
            }
        </div>
    </main>
  )
}

export default Post

export const getStaticPaths=async ()=>{

    const query=`*[_type == "post"]{
            _id,
            slug {
                current
            }
        }`;
    const posts=await sanityClient.fetch(query);
    const paths=posts.map((post:PostType)=>({
        params:{
            slug:post.slug.current
        }
    }))
    return {
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps:GetStaticProps=async({params})=>{
    const query=`
    *[_type == "post" && slug.current == $slug] [0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        'comments':*[_type == "comment" && post._ref == ^._id && approved == true],
            description,
            mainImage,
            slug,
            body
        
    }`;
    const post=await sanityClient.fetch(query,{
        slug:params?.slug,
    })
    if(!post) return {notFound:true}
    return{
        props:{
            post,
        },
        revalidate:60
    }

}