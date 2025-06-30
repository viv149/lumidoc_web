"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {

    const [scrollPostion, setScrollPosition] = useState(0);

    const pathName = usePathname();
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header style={{height: "100px"}}>
            <nav className="navbar fixed-top shadow-sm navbar-expand-lg bg-light text-dark" >
                <div className="container">
                    <Link href="/main/home" className="navbar-brand fw-bold" >
                        <Image
                            src="/assets/img/logo.png"
                            width={300}
                            height={70}
                            style={{
                                width: "100%",
                            }}
                            className="navbar-img"
                            alt='LumiDoc Solutions'
                            unoptimized
                        /> 
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                        {
                            NavigationLink.map(nav => (
                                <li key={`navlink-${nav.id}`} className="nav-item"><Link href={nav.pathname} className={`nav-link ${pathName === nav.pathname  ? "active" :  ''}`} >{nav.pageName}</Link></li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;


const NavigationLink = [
    {
        id: 1,
        pageName: "Home",
        pathname: "/main/home"
    },
    {
        id: 2,
        pageName: "About us",
        pathname: "/main/about"
    },
    {
        id: 3,
        pageName: "Products",
        pathname: "/main/product"
    },
    {
        id: 4,
        pageName: "Blog",
        pathname: "/main/blog"
    },
    {
        id: 5,
        pageName: "Contact",
        pathname: "/main/contact"
    },

]