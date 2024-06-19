import React from 'react'
import { Outlet } from 'react-router-dom'

const Content: React.FC = () => {
    return (
        <div className='min-h-[93vh] pt-[7vh]'>
            <Outlet />
        </div>

    )
}

export default Content