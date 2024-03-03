import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <>
      <h2 className="text-[30px] font-bold md:text-[50px] leading-[140%] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{title}</h2>
      {subtitle && <p className="font-normal text-[20px] leading-[140%] mt-2">{subtitle}</p>}
    </>
  )
}

export default Header