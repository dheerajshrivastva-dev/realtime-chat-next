"use client"
import { FC, useState } from 'react'
import Button from '@/app/components/ui/Button'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { addFriendValidator } from '@/app/lib/validations/add-friend';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddFriendButtonProps {
  
}

type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),

  })

  const addFriend = async (email:string) => {
    setLoading(true)
    try {
      const validatedEmail = addFriendValidator.parse({email})
      await axios.post('/api/friends/add', {
        email: validatedEmail.email,
      })
      setShowSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', {message: error.message})
        return
      }
      if (error instanceof AxiosError) {
        setError('email', {message: error.response?.data?.message})
        return
      }
      setError('email', { message: 'Something went wrong'})
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  }
  return (
    <form
      className='max-w-sm'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor='email'
        className='block text-sm font-medium leading-6 text-white'
      >
        Add friend by E-mail
      </label>
      <div className='mt-2 flex gap-4'>
        <input
          {...register('email')}
          type="text"
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
          placeholder='you@example.com'
        />
        <Button isLoading={loading}>Add</Button>
      </div>
      <p className='mt-1 text-sm text-red-600 '>{formState.errors?.email?.message}</p>
      {showSuccess ? (
        <p className='mt-1 test-sm text-green-500'>Friend request sent!</p>
      ) : null}
    </form>
  )
}

export default AddFriendButton
