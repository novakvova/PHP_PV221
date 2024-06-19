import React from 'react'
import { useNavigate } from 'react-router-dom'
type HeaderProps = {
    title: string,
}
const PageHeader: React.FC<HeaderProps> = ({ title }: HeaderProps) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white shadow">
            <div className=" max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className='flex items-center justify-between w-[50%]'>
                    <svg onClick={()=>navigate(-1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className=" text-green-600 cursor-pointer size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-600">{title}</h1>
                </div>
            </div>
        </div>
    )
}

export default PageHeader