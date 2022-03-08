import React from "react";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { HomeIcon } from "@heroicons/react/solid";
import {useSession,signOut} from 'next-auth/react'

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";
const Sidebar = () => {
  const {data:session}=useSession()
  
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
      <div className='flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hoverAnimation'>
        <Image src='https://rb.gy/ogau5a' width={30} height={30} />
      </div>
      <div className='text-white space-y-2.5 mt-2 mb-2.5 xl:ml-24'>
        <SidebarLink text='Home' Icon={HomeIcon} active />
        <SidebarLink text='Explore' Icon={HashtagIcon} />
        <SidebarLink text='Notification' Icon={BellIcon} />
        <SidebarLink text='Messages' Icon={InboxIcon} />
        <SidebarLink text='Bookmarks' Icon={BookmarkIcon} />
        <SidebarLink text='Lists' Icon={ClipboardListIcon} />
        <SidebarLink text='Profile' Icon={UserIcon} />
        <SidebarLink text='More' Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className='text-white hidden xl:inline ml-auto bg-[#1d9bf0] rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]'>
        Tweet
      </button>
      <div className='text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto' onClick={signOut}>
        <img
          data-tip='Sign Out'
          data-class='xl:!hidden'
          data-place='right'
          data-type='info'
          data-effect='solid'
          src={session?.user?.image}
          alt=''
          className='w-10 h-10 rounded-full object-cover xl:mr-2.5'
        />
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>{session?.user?.name}</h4>
          <p className='text-[#6e767d]'>@{session?.user?.tag}</p>
          <ReactTooltip />
        </div>
        <DotsHorizontalIcon className='h-5 hidden xl:inline ml-10' />
      </div>
    </div>
  );
};

export default Sidebar;
