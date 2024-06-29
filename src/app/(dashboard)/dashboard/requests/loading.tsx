import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface loadingProps {
  
}

const loading: FC<loadingProps> = ({}) => {
  return (
    <>
    <div className='md:hidden w-full flex flex-col gap-3'>
      <SkeletonTheme baseColor='rgb(17 24 39)' highlightColor='rgb(31 41 55)' >
        <Skeleton  className='mb-4' height={30} width={300} />  
        <Skeleton className='mb-4' height={10} width={100} />  
        <Skeleton className='mb-4' height={30} width={300} />  
      </SkeletonTheme>
    </div>
    <div className='hidden w-full md:flex flex-col gap-3'>
      <SkeletonTheme baseColor='rgb(17 24 39)' highlightColor='rgb(31 41 55)' >
        <Skeleton  className='mb-4' height={60} width={500} />  
        <Skeleton className='mb-4' height={20} width={150} />  
        <Skeleton className='mb-4' height={50} width={400} />  
      </SkeletonTheme>
    </div>
    </>
  )
}

export default loading
