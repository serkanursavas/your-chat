import React from 'react'
import '../App.css'
import { Button, Input } from 'antd'

import userProfile from '../assets/user.svg'
import dots3 from '../assets/dots3.svg'
import phone from '../assets/phone.svg'
import video from '../assets/video.svg'

const Home = () => {
  return (
    <div className="w-[75vw] h-[75vh] overflow-hidden rounded-md window-shadow flex flex-col relative">
      <header className="flex w-full">
        <div className="box-border flex items-center justify-between w-2/6 p-2 bg-primary">
          <div className="font-semibold">Your Chat</div>
          <div className="flex items-center gap-2">
            <img
              className="w-10"
              src={userProfile}
              alt=""
            />
            <p>John</p>
            <Button
              size="small"
              className="!text-xs !bg-secondary hover:!text-white !rounded-none !border-none"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="box-border flex items-center justify-between w-4/6 px-5 py-2 bg-secondary">
          <div className="text-lg ">Serkan</div>
          <div className="flex gap-3">
            <img
              src={video}
              className="w-6"
            />
            <img
              src={phone}
              className="w-6"
            />
            <img
              src={dots3}
              className="w-5"
            />
          </div>
        </div>
      </header>
      <div className="flex w-full overflow-hidden">
        <aside className="box-border w-2/6 space-y-2 overflow-x-hidden bg-secondary">
          <Input
            className="custom-input !shadow-none !bg-transparent hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
            placeholder="Find a user"
          />

          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Kim</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Kim</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Kim</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Serkan</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Serkan</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Serkan</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Serkan</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
          <div className="flex w-full gap-2 p-2 hover:bg-primary">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="rounded-full w-14"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg font-semibold leading-5 ">Serkan</span>
              <span className="block text-sm leading-4 opacity-40">Hello</span>
            </div>
          </div>
        </aside>
        <main className="box-border w-4/6 h-full bg-beige"></main>
      </div>
    </div>
  )
}
export default Home
