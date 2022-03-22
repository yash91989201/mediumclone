
const Banner = () => {
  return (
    <div className="p-8 flex items-center  justify-between bg-yellow-400 border-black border-y xl:border-none xl:border-0 font-serif" >
        <div className="space-y-5">
            <h1 className="text-4xl line-height leading-relaxed " style={{width:"min(20rem,100%)"}}>
                <span className="underline">Medium</span>
                <span> is a place to write, read, and connect</span>
            </h1>
            <p  style={{width:"min(40rem,100%)"}}>
                It's easy and free to post your thinking on any topic 
                and connect with millions of readers
            </p>
        </div>
        <h1 className="hidden md:block font-bold" style={{fontSize:"clamp(8rem,14vw,24rem)"}}>M</h1>
    </div>
  )
}

export default Banner