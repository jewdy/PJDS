import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";

export default function Header() {

    const [searchopen, setSearchopen] = useState(false);

    const openSearch = () => {
        setSearchopen(!searchopen);
    };

    const closeSearch = () => {
        setSearchopen(false);
    };


    // aside on off
    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }
    const handleLinkClick = () => {
        setAside(false); // Close the aside menu
    };


    // darkMode on off
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Apply dark mode styles when darkMode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode status
    };



    const { alldata, loading } = useFetchData(`/api/getblog`);

    // Filtering publish blogs
    const publishedblogs = alldata.filter(ab => ab.status === "publish")

    const [searchQuery, setSearchQuery] = useState('');
    // Filtering based on search query
    const filteredBlogs = searchQuery.trim() === '' ? publishedblogs : publishedblogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

const truncateDescription = (metadescription, maxLength = 100) => {
    if (!metadescription) {
        return ''; // or you can return a default string or value
    }

    if (metadescription.length > maxLength) {
        return metadescription.substring(0, maxLength) + '...';
    }
    return metadescription;
};



    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>PJDSBLOGS</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp />
                    <input onClick={openSearch} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Discover news, articles and more" />
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href='/about/about'>About Me</Link></li>
                        <li><Link href='/contact/contactme'>Contact Me</Link></li>
                        <li><Link href="/gallery/gallery">Gallery</Link></li>
                    </ul>
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />}</button>
                        <button onClick={openSearch}><IoSearch /></button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>

            </div>
            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearchSharp />
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>
                <div className="search_data text-center">
                    {loading ? (
                        <div className="wh-100 flex flex-center mt-2 pb-5">
                            <div aria-live="assertive" role="alert" className="loader"></div>
                        </div>
                    ) : (
                        <>
                            {searchQuery ? (
                                filteredBlogs.slice(0, 3).map((blog) => (
                                    <Link href={`/blog/${blog.slug}`} onClick={closeSearch} key={blog._id}>
                                        <div className="blog">
                                            <div className="bloginfo">
                                                <h3>{blog.title}</h3>
                                                <p>{truncateDescription(blog.metadescription, 100)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div>No Search Result</div>
                            )}
                        </>
                    )}
                </div>
                <div className="exit_search" onClick={closeSearch}>
                    <div><FaXmark /></div>
                    <h4>ESC</h4>
                </div>
            </div>
            <div className={aside ? "navlist_mobile open scrollable-content" : "navlist_mobile scrollable-content"}>
            <div className="navlist_m_title flex flex-sb">
                <h1>PJDSBLOGS</h1>
                <button onClick={asideClose}><FaXmark /></button>
            </div>
            <hr />
            <h3 className="mt-3">Main Menu</h3>
            <ul onClick={handleLinkClick}>
                <li><Link href="/">Home</Link></li>
                <li><Link href='/about/about'>About Me</Link></li>
                <li><Link href='/contact/contactme'>Contact Me</Link></li>
                <li><Link href="/gallery/gallery">Gallery</Link></li>
            </ul>
            <hr />
            <h3 className="mt-3">Categories</h3>
            <ul onClick={handleLinkClick}>
                <li><Link href="/topics/business-tech-security">Business, Technology and Security</Link></li>
                <li><Link href="/topics/real-estate-management">Real Estate & Property Management</Link></li>
                <li><Link href="/topics/fashion-beauty-cosmetics">Fashion, Beauty & Cosmetics</Link></li>
                <li><Link href="/topics/education">Education</Link></li>
                <li><Link href="/topics/kids">Kids</Link></li>
                <li><Link href="/topics/health-and-lifestyle">Health & Lifestyle</Link></li>
                <li><Link href="/topics/automotive">Automotive</Link></li>
                <li><Link href="/topics/fintech">Fintech</Link></li>
                <li><Link href="/topics/travel">Travel</Link></li>
                <li><Link href="/topics/pets">Pets</Link></li>
                <li><Link href="/topics/products">Products</Link></li>
                <li><Link href="/topics/copies">Copies</Link></li>
                <li><Link href="/topics/personal-pieces">Personal Pieces</Link></li>
            </ul>
            </div>

        </div>
    </>
}