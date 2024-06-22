import AddFriendButton from '@/app/components/AddFriendButton'
import DashboardSkeleton from '@/app/components/ui/skeletons'
import { FC, Suspense } from 'react'


const page: FC = async () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <main>
        <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
        <AddFriendButton />
      </main>
    </Suspense>
  )
}

export default page
