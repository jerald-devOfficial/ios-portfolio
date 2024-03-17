'use client'

import Layout from '@/components/layouts'
import { GMailIcon } from '@/components/svg-icons'
import { IContact } from '@/models/Contact'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR, { Fetcher } from 'swr'
import Image from 'next/image'
import { formatDate, getInitials, hoursAgo } from '@/utils'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

const Mails = () => {
  const { status } = useSession()
  const router = useRouter()

  const [selectedMail, setSelectedMail] = useState<IContact | null>(null)

  const fetcher: Fetcher<IContact[], string> = (url) =>
    fetch(url).then((res) => res.json())

  const { data, error, isLoading, mutate } = useSWR('/api/contact', fetcher)

  if (status === 'unauthenticated') {
    router.push('/')
  }

  const handleMailClick = async (mailId: string) => {
    // Mark the mail as selected
    if (data && data.length > 0) {
      const mailFind = data.find((mail) => mail._id === mailId)
      if (mailFind) {
        setSelectedMail(mailFind)

        if (!mailFind.read) {
          // PATCH request to mark the mail as read
          try {
            await fetch(`/api/contact/${mailId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ read: true })
            })

            mutate()
          } catch (error) {
            console.error('Error marking mail as read:', error)
            // Handle error, e.g., show error message to user
          }
        }
      }
    }
  }

  const handleMarkAsUnread = async (mailId: string) => {
    try {
      const mailFind = data?.find((mail) => mail._id === mailId)
      if (mailFind) {
        setSelectedMail(mailFind)
        if (mailFind.read) {
          await fetch(`/api/contact/${mailId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ unread: true })
          })
          // Call mutate to update the data after making changes
          mutate()
        }
      }
    } catch (error) {
      console.error('Error marking mail as unread:', error)
      // Handle error, e.g., show error message to user
    }
  }

  const handleDeleteMail = async (mailId: string) => {
    try {
      // Send a DELETE request to remove the mail
      await fetch(`/api/contact/${mailId}`, {
        method: 'DELETE'
      })
      // After successfully deleting the mail, you can reset the selected mail state
      setSelectedMail(null)
      // You may also want to refresh the mail list after deleting a mail, you can use mutate() here if necessary
      mutate()
    } catch (error) {
      console.error('Error deleting mail:', error)
      // Handle error, e.g., show error message to user
    }
  }

  return (
    <Layout>
      <div className='w-[1000px] flex rounded-xl shadow-xl flex-grow mt-16 mb-14 overflow-hidden h-full'>
        <div className='rounded-l-[inherit] bg-[#F5F5F5] opacity-[97%] h-[inherit] w-[300px] relative sidebar overflow-hidden shadow-inner flex flex-col'>
          <div className='border-b border-[#3C3C43]/36 border-solid px-4 pt-5 pb-3 flex gap-x-4 items-center hover:bg-[#F5F5F5]'>
            <GMailIcon className='h-[60px w-[60px]' />
            <div className='flex flex-col'>
              <h1 className='font-normal text-base text-black'>Inbox</h1>
              <h3 className='font-normal text-xs text-[#3C3C43]/60 tracking-tight'>
                Read emails from visitors
              </h3>
            </div>
          </div>
          {isLoading && (
            <div className='bg-white px-4 py-2'>
              <h3 className='text-sm font-medium'>Fetching data...</h3>
            </div>
          )}
          {error && (
            <div className='bg-white px-4 py-2'>
              <h3 className='text-sm font-medium text-red-600'>
                Error: {error}
              </h3>
            </div>
          )}
          {data && data?.length > 0 && (
            <div className='bg-white py-2 gap-y-2 relative w-full'>
              {data.map((mail, index) => (
                <>
                  <button
                    key={mail._id}
                    className='flex px-4 gap-x-2 cursor-pointer py-2 w-full relative overflow-hidden'
                    onClick={() => handleMailClick(mail._id)}
                  >
                    <div className='block'>
                      <div className='h-[50px] w-[50px] rounded-full relative'>
                        <Image
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='rounded-full object-cover object-center'
                          src={`https://placehold.co/50x50/${
                            mail.avatarColor
                          }/png?text=${getInitials(mail.fullName)}`}
                          alt={mail.fullName}
                          fill
                        />
                      </div>
                    </div>

                    <div className='flex flex-col items-start overflow-hidden relative w-full'>
                      <div className='flex justify-between items-center w-full gap-x-2'>
                        <h3
                          className={`text-sm truncate ${
                            mail.read ? 'font-normal' : 'font-bold'
                          }`}
                        >
                          {mail.fullName}
                        </h3>
                        <span
                          className={`text-xs ${
                            mail.read ? 'font-normal' : 'font-bold'
                          } text-nowrap`}
                        >
                          {formatDate(mail.createdAt)}
                        </span>
                      </div>
                      <h3
                        className={`text-sm ${
                          mail.read ? 'font-normal' : 'font-medium'
                        } text-left truncate w-full`}
                      >
                        {mail.subject}
                      </h3>
                      <h5 className='text-xs font-normal truncate w-full'>
                        {mail.message}
                      </h5>
                    </div>
                  </button>
                  {data.length > 1 && index < data.length - 1 && <hr />}
                </>
              ))}
            </div>
          )}
        </div>
        <div className='flex flex-col bg-white/95 flex-1 h-[inherit] panel overflow-hidden relative rounded-r-[inherit]'>
          <div
            className={`border-b border-[#3C3C43]/36 border-solid px-4 pt-2.5 pb-3 flex gap-x-4 h-[92px] flex-col justify-end`}
          >
            {selectedMail && (
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold'>{selectedMail.subject}</h2>

                <div className='flex gap-x-4 items-center'>
                  {selectedMail.read && (
                    <button
                      onClick={() => handleMarkAsUnread(selectedMail?._id)}
                      className='block font-medium text-base text-blue-600'
                    >
                      Mark as Unread
                    </button>
                  )}
                  <button onClick={() => handleDeleteMail(selectedMail?._id)}>
                    <TrashIcon className='h-5 w-5 text-blue-600 stroke-2' />
                  </button>
                </div>
              </div>
            )}
          </div>

          {selectedMail ? (
            <div className='flex flex-col gap-x-10 w-full h-auto p-4'>
              <div className='flex justify-between'>
                <div className='flex gap-x-4'>
                  <div className='block'>
                    <div className='h-[50px] w-[50px] rounded-full relative'>
                      <Image
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='rounded-full object-cover object-center'
                        src={`https://placehold.co/50x50/${
                          selectedMail.avatarColor
                        }/png?text=${getInitials(selectedMail.fullName)}`}
                        alt={selectedMail.fullName}
                        fill
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-x-4'>
                      <h3 className='font-bold text-base text-black'>
                        {selectedMail.fullName}
                      </h3>
                      <span className='font-normal text-sm text-gray-600'>
                        {`<${selectedMail.email}>`}
                      </span>
                    </div>
                    <span className='text-gray-600 text-sm font-normal'>
                      to Jerald
                    </span>
                  </div>
                </div>
                <div className='flex gap-x-1'>
                  <span className='text-sm font-normal text-gray-600 tracking-tighter'>
                    {formatDate(selectedMail.createdAt)}{' '}
                    {`(${hoursAgo(selectedMail.createdAt)} hour${
                      hoursAgo(selectedMail.createdAt) !== 1 ? 's' : ''
                    } ago)`}{' '}
                  </span>
                </div>
              </div>
              <div className='pt-10 px-16'>
                <p className='text-gray-800 text-xl font-medium'>
                  {selectedMail.message}
                </p>
              </div>
            </div>
          ) : (
            <div className='flex items-center flex-col justify-center gap-y-2 flex-grow'>
              <h4 className='text-base font-medium text-slate-600'>
                Nothing to see here.
              </h4>
              <p className='text-xs font-normal text-slate-500'>
                Please select one of the emails.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Mails
