import Link from "next/link"

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-between mx-auto" style={{width:"min(80rem,100%)"}}>
        <div className="flex flex-row">
            <Link href="/">
               <img 
                    className="w-44 object-contain cusor-pointer"
                    src="https://links.papareact.com/yvf" 
                    alt="medium logo" 
                />
            </Link>
            <div className="hidden md:inline-flex items-center space-x-8 mx-8">
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className="px-4 py-1 rounded-full text-white bg-green-600">Follow</h3>
            </div>
        </div>
        <div className="flex items-center space-x-5">
            <h3 className="text-green-600">Sign In</h3>
            <h3 className="px-4 py-1 rounded-full text-green-600 border-green-600 border">Get Started</h3>
        </div>
    </header>
  )
}

export default Header