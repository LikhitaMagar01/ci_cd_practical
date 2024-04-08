
import { FiMoon } from 'react-icons/fi'
import { BiSun } from 'react-icons/bi'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PackageOpen } from 'lucide-react'
import UserAccountnav from './UserAccountnav'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
          <div className='container flex items-center justify-between'>
            <Link href="/">
              <PackageOpen size={24} />
            </Link>
            {session?.user ? (
              <UserAccountnav />
            ) : (<Link href='/sign-in' className={buttonVariants()}>Sign In</Link>)}
           
          </div>
          
          {/* TODO make mode toggle using shadcn */}
          {/* {theme === "dark" ? 
          ( <BiSun size={25} cursor="pointer" onClick={(()=> setTheme("light"))} />)
          : 
          (<FiMoon size={25} cursor="pointer" onClick={(()=> setTheme("dark"))} />)
          } */}
        </div>
    )
}

export default Navbar