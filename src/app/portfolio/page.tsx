'use client'

import Layout from '@/components/layouts'
import { GitHubMiniIcon } from '@/components/svg-icons'
import {
  education,
  projects,
  sideIcons,
  skills,
  workExperiences
} from '@/constants'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useState } from 'react'

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  return (
    <Layout>
      <div className='w-[1000px] flex rounded-xl shadow-xl flex-grow mt-16 mb-14 overflow-hidden h-full'>
        <div className='rounded-l-[inherit] bg-[#F5F5F5] opacity-[97%] h-[inherit] w-[300px] relative sidebar overflow-hidden shadow-inner flex flex-col'>
          <div className='border-b border-[#3C3C43]/36 border-solid px-4 pt-5 pb-3 flex gap-x-4 items-center hover:bg-[#F5F5F5]'>
            <Image
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              src={'/images/portfolio-thumbnail.png'}
              height={60}
              width={60}
              alt='Portfolio Thumbnail'
            />
            <div className='flex flex-col'>
              <h1 className='font-normal text-base text-black'>Portfolio</h1>
              <h3 className='font-normal text-xs text-[#3C3C43]/60 tracking-tight'>
                Get to know about Jerald here.
              </h3>
            </div>
          </div>
          <div className='mt-14 mx-4 pl-4 rounded-xl bg-white'>
            {sideIcons.map((item, index) => (
              <button
                key={item.title}
                className={`flex justify-between py-3.5 pr-3 items-center w-full group ${
                  index < sideIcons.length - 1
                    ? 'border-b border-[#3C3C43]/36 border-solid'
                    : ''
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <h4
                  className={`text-base ${
                    activeCategory === index
                      ? 'text-blue-600 font-medium group-hover:text-blue-400'
                      : 'font-normal text-black group-hover:text-gray-500'
                  }`}
                >
                  {item.title}
                </h4>
                <item.icon
                  className={`${
                    activeCategory === index
                      ? 'text-blue-600 group-hover:text-blue-400'
                      : 'text-black group-hover:text-gray-500'
                  } h-4 w-4 stroke-2`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col bg-white/95 flex-1 h-[inherit] panel overflow-hidden relative rounded-r-[inherit]'>
          <div
            className={`border-b border-[#3C3C43]/36 border-solid px-4 pt-2.5 pb-3 flex gap-x-4 h-[92px] flex-col justify-between items-center ${
              activeCategory !== null ? 'shadow' : ''
            }`}
          >
            <div className='flex gap-1'>
              {sideIcons.map((_, i) => (
                <button
                  className={`h-1.5 w-1.5 rounded-full ${
                    activeCategory === i ? 'bg-gray-500' : 'bg-gray-400'
                  }`}
                  key={_.title}
                  onClick={() => setActiveCategory(i)}
                />
              ))}
            </div>
            {activeCategory != null && (
              <div className='flex items-center justify-between h-11 w-full '>
                <div className='flex gap-x-1 w-12 justify-between'>
                  <ChevronLeftIcon
                    className={`text-blue-600 hover:text-blue-800 h-5 w-5 cursor-pointer ${
                      activeCategory > 0 ? '' : 'hidden'
                    }`}
                    onClick={() => setActiveCategory(activeCategory - 1)}
                  />
                  <ChevronRightIcon
                    className={`text-blue-600 hover:text-blue-800 h-5 w-5 cursor-pointer ${
                      activeCategory < sideIcons.length - 1 ? '' : 'hidden'
                    }`}
                    onClick={() => setActiveCategory(activeCategory + 1)}
                  />
                </div>
                <h2 className='font-semibold text-lg text-black'>
                  {sideIcons[activeCategory].title}
                </h2>
                <div className='flex w-12 justify-end'>
                  <XMarkIcon
                    className='text-blue-600 h-5 w-5 hover:text-blue-800'
                    onClick={() => setActiveCategory(null)}
                  />
                </div>
              </div>
            )}
          </div>
          {activeCategory !== null ? (
            <div className='flex flex-col flex-grow py-10 px-12 gap-y-10 relative overflow-y-auto h-full'>
              {activeCategory === 0 &&
                skills.map((item) => (
                  <div key={item.url} className='flex gap-x-10 w-full h-auto'>
                    <div className='relative'>
                      {item.url ? (
                        <a
                          href={`https://${item.url}`}
                          className='h-auto w-24 block'
                        >
                          <Image
                            src={item.img}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='rounded-2xl'
                            width={1}
                            height={1}
                            style={{
                              height: 'auto',
                              width: '100%'
                            }}
                            alt={item.title}
                          />
                        </a>
                      ) : (
                        <div className='h-auto w-24 block'>
                          <Image
                            src={item.img}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='rounded-2xl'
                            width={1}
                            height={1}
                            style={{
                              height: 'auto',
                              width: '100%'
                            }}
                            alt={item.title}
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      <h3 className='text-base font-semibold text-black'>
                        {item.title}
                      </h3>
                      <div className='flex flex-col gap-y-1'>
                        <p className='text-base font-medium text-black'>
                          {item.desc}
                        </p>
                        {item.url && (
                          <div className='block relative'>
                            <a
                              href={`https://${item.url}`}
                              className='text-sm font-normal no-underline hover:underline text-violet-600 inline-flex items-center gap-x-2'
                            >
                              <LinkIcon height={16} />
                              {item.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {activeCategory === 1 &&
                projects.map((item) => (
                  <div key={item.title} className='flex gap-x-10 w-full h-auto'>
                    <div className='relative'>
                      {item.url ? (
                        <a
                          href={`https://${item.url}`}
                          className='h-auto w-52 block'
                        >
                          <Image
                            src={item.img}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='rounded-lg shadow-xl'
                            width={1}
                            height={1}
                            style={{
                              height: 'auto',
                              width: '100%'
                            }}
                            alt={item.title}
                          />
                        </a>
                      ) : (
                        <div className='h-auto w-24 block'>
                          <Image
                            src={item.img}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='rounded-lg shadow-xl'
                            width={1}
                            height={1}
                            style={{
                              height: 'auto',
                              width: '100%'
                            }}
                            alt={item.title}
                          />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      <h3 className='text-base font-semibold text-black'>
                        {item.title}
                      </h3>
                      <div className='flex flex-col gap-y-1'>
                        <p className='text-base font-medium text-black'>
                          {item.desc}
                        </p>
                        {item.url && (
                          <div className='block relative'>
                            <a
                              href={`https://${item.url}`}
                              className='text-sm font-normal no-underline hover:underline text-violet-600 inline-flex items-center gap-x-2'
                            >
                              <LinkIcon height={16} />
                              {item.url}
                            </a>
                          </div>
                        )}

                        {item.github && (
                          <div className='block relative'>
                            <a
                              href={item.github}
                              className='text-sm font-normal no-underline hover:underline text-violet-600 inline-flex items-end gap-x-2'
                            >
                              <GitHubMiniIcon className='h-6 w-6' />
                              <span>GitHub</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {activeCategory === 2 &&
                workExperiences.map((item) => (
                  <div
                    key={item.company}
                    className='flex gap-x-10 w-full h-auto'
                  >
                    <div className='relative'>
                      <div className='h-auto w-24 block'>
                        <Image
                          src={item.logo}
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='rounded-2xl'
                          width={1}
                          height={1}
                          style={{
                            height: 'auto',
                            width: '100%'
                          }}
                          alt={item.company}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      <div className='flex flex-col'>
                        <h3 className='text-base font-semibold text-black'>
                          {item.company}
                        </h3>
                        <h5 className='text-xs font-normal text-gray-600'>
                          {item.startDate} -{' '}
                          {item.isPresent ? 'Present' : item.endDate}
                        </h5>
                      </div>
                      {item.projects.map((project) => (
                        <div
                          key={project.name}
                          className='flex flex-col gap-y-2'
                        >
                          <h3 className='text-sm font-medium text-black'>
                            {project.title}
                          </h3>
                          <ul className='flex flex-col gap-y-1 list-disc'>
                            {project.desc.map((desc: string, i: number) => (
                              <li
                                key={i}
                                className='text-sm font-normal text-gray-800'
                              >
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {activeCategory === 3 &&
                education.certificates.map((certificate) => (
                  <div
                    key={certificate.title}
                    className='flex gap-x-10 w-full h-auto'
                  >
                    <div className='relative'>
                      <a
                        href={`https://ude.my/${certificate.credentialID}`}
                        className='h-auto w-52 block'
                      >
                        <Image
                          src={`/images/education/${certificate.credentialID}.jpg`}
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          className='rounded-lg shadow-xl'
                          width={1}
                          height={1}
                          style={{
                            height: 'auto',
                            width: '100%'
                          }}
                          alt={certificate.title}
                        />
                      </a>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      <h3 className='text-base font-semibold text-black'>
                        {certificate.title}
                      </h3>
                      <div className='block relative'>
                        <a
                          href={`https://ude.my/${certificate.credentialID}`}
                          className='text-sm font-normal no-underline hover:underline text-violet-600 inline-flex items-center gap-x-2'
                        >
                          <LinkIcon height={16} />
                          {certificate.credentialID}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className='flex items-center flex-col justify-center gap-y-2 flex-grow'>
              <h4 className='text-base font-medium text-slate-600'>
                Nothing to see here.
              </h4>
              <p className='text-xs font-normal text-slate-500'>
                Please select one of the sidebar categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Portfolio
