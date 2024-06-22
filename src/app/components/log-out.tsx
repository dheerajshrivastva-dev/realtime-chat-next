
"use client"
import { ButtonHTMLAttributes, FC, useState } from 'react'
import Button from "@/app/components/ui/Button"
import Loader from '@/app/components/ui/LoaderIos'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LogoutButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const Logout: FC<LogoutButtonsProps> = ({...props}) => {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
  return (

    <Button {...props}
      variant='ghost'
      onClick={async () => {
        try {
          setIsSigningOut(true)
          await signOut();
          router.push("/login")
        } catch (e) {
          console.error("There was a problem signing out", e)
        } finally {
          console.debug("F run ")
          setIsSigningOut(false)
          
        }
      }}
    >
      {isSigningOut ? <Loader className="mr-2 h-4 w-4" isLoading /> : <LogOut className='w-4 h-4'/>}
    </Button>
  )
}

export default Logout
    