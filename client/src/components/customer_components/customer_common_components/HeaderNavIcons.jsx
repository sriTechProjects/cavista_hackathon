import React from "react";

const HeaderNavIcons = ({ icon, item, indicator, indicatorValue }) => {
  return (
    <a className="flex flex-col relative items-center gap-1 text-secondary-txt hover:text-primary transition-all ease-linear cursor-pointer">
      {icon}
      <p className="font-medium text-[0.9rem]">{item}</p>
      {indicator && (
        <span
          id="indictor"
          className="absolute -top-3 right-1 rounded-full bg-primary h-5 w-5 flex justify-center items-center text-white font-bold text-sm"
        >
          {indicatorValue}
        </span>
      )}
    </a>
  );
};

export default HeaderNavIcons;
