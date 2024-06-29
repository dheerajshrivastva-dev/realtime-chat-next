"use client"

import { FC, useEffect } from 'react'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Button, { buttonVariants } from './ui/Button'
import { Icons } from './Icons'
import { usePathname } from 'next/navigation'

interface MobileLayoutProps {
  children: React.ReactNode
}

const MobileLayout: FC<MobileLayoutProps> = ({children}) => {
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname])
  return (
    <div className='fixed bg-gray-900 border-b border-gray-800 top-0 inset-x-0 py-2 px-4'>
      <div className='w-full flex justify-between items-center'>
        <Link href={'/dashboard'} className={buttonVariants({variant: "ghost"})}>
          <Icons.Logo className='h-6 w-auto text-pink-800' />
        </Link>
        <Button onClick={() => setOpen(true)} className='gap-4'>
          Menu <Menu className='h-6 w-6'/>
        </Button>
      </div>
      <Dialog className="relative z-10" open={open} onClose={setOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll-auto  shadow-xl">
                  {/* <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                  </div> */}
                  <div className="relative flex-1 ">{children}</div>
                </div>
                <TransitionChild>
                  <div className="absolute right-0 top-0 -mr-10 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default MobileLayout
