// import Logout from '@/app/components/log-out'
import { auth } from '@/auth'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  // const session = await auth()
  // console.log(session)
  return (
    <div>
      <p>Logged in success fully</p>
      {/* <Logout /> */}
    </div>
  )
}

export default page
