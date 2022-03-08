import React from "react";
import ReactTooltip from "react-tooltip";
const SidebarLink = ({ Icon, text, active }) => {
  return (
    <div
      className={`flex  items-center text-[#d9d9d9] justify-center xl:justify-start xl:text-xl space-x-3 hoverAnimation ${
        active && "font-bold"
      }`}
    >
      <Icon
        className='h-7 text-white'
        data-tip={text}
        data-class='xl:!hidden'
        data-place="right"
        data-type="info"
        data-effect="solid"
      />
      <span className='hidden xl:inline'>{text}</span>
      <ReactTooltip />
    </div>
  );
};

export default SidebarLink;
