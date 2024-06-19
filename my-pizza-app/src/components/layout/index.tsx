import React from 'react'
import Footer from './footer'
import Content from './content'
import Header from './header'

const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

export default Layout