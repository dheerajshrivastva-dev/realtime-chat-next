"use client"
import { FC, useState } from 'react'
import { Icons } from '../components/Icons';
import Button, { buttonVariants } from '../components/ui/Button';
import { signIn } from 'next-auth/react';
import GoogleIcon from '../components/ui/googleIcon';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

interface pageProps {
  
}

const Login: FC<pageProps> = ({}) => {
  const [loading, setIsLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      signIn("google", {callbackUrl: "/dashboard"})
    } catch (e) {
      console.error("Problem in sign in", e)
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className='flex justify-center py-12 px-4 sm:px-6 lg:px-8'>
       
        <div className='w-full flex flex-col items-center max-w-md space-y-8 relative'>
          <div className='absolute top-0 left-0'>
            <Link href={"/"} className={buttonVariants({variant: "ghost"})}>
              <MoveLeft className='h-4 w-4' />
            </Link>
          </div>
          <div className='flex flex-col items-center gap-8'>
            <Icons.Logo className='h-10 w-auto text-pink-600'/>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>Sign in to your account</h2>
          </div>
          <Button className='bg-gray-50 text-black w-full hover:bg-white hover:text-gray-950 ' isLoading={loading} onClick={handleSignIn}>
            {loading ? null : <GoogleIcon className='w-4 h-4 mr-2' />}
            Signin with Google
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login;
