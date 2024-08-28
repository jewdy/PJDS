import { BsTags } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineUser } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Head from "next/head";
import { FiDatabase } from "react-icons/fi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";
import { FaArrowLeft, FaDiscord, FaEnvelope, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa"; // Import the back arrow icon

export default function blogPage() {

    const router = useRouter();
    const { slug } = router.query;
    const [blog, setBlog] = useState(['']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) { // Check if slug exists
            axios.get(`/api/getblog?slug=${slug}`).then(res => {
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching blog:", error);
            });
        }
    }, [slug]);

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000); // 3000 milliseconds = 3 seconds
        };

        if (inline) {
            return <code>{children}</code>;
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }} onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            );
        }
    };

    const calculateReadingTime = (description) => {
        const wordsPerMinute = 200;
        const words = description.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    return <>
        <Head>
            <title>
                {!blog ? 'Loading...' :
                    blog && blog[0] && blog[0].slug ?
                        blog[0].slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                        : 'Loading...'
                }
            </title>
        </Head>

        <div className="slugpage">
            <div className="container">
            <button onClick={() => router.back()} className="back-button">
                <FaArrowLeft /> Back
            </button> {/* Add the Back Button */}

                <div className="topslug_titles" data-aos="fade-right">
                    <h1 className="slugtitle">{loading ? <div> loading...</div> : blog && blog[0]?.title}</h1>
                    <h5>By <span>Prince Joedy Delos Santos</span>・ Published in <span> {loading ? <div> loading...</div> : blog && blog[0]?.blogcategory} </span> ・ {blog && new Date(blog[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        <span>・ {loading ? <div>loading...</div> : blog && calculateReadingTime(blog[0]?.description)}</span>
                    </h5>
                </div>

                {/* blog data section */}
                <div className="flex flex-sb flex-left pb-5 flex-wrap">
                    <div className="leftblog_data_markdown" data-aos="fade-up">
                        {loading ? <>
                            <div className='wh-100 flex flex-center mt-3'>
                                <div aria-live="assertive" role="alert" class="loader"></div>
                            </div>
                        </> : <>
                            <div className="w-100 blogcontent" >
                                {/* content */}

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {blog[0].description}
                                </ReactMarkdown>
                            </div>
                        </>}
                    </div>
                    <div className="rightslug_data">
                        <div className="slug_profile_info">
                            <div className="slugprofile_sec">
                                <div className="profile_imgbg"></div>
                                <div className="slug_profile_img">
                                    <div className="image_bg_top0"></div>
                                    <div className="image_bg_top1"></div>
                                    <img src="/img/coder2.png" alt="coder2" />
                                </div>
                            </div>
                            <h3>Prince Joedy Delos Santos</h3>
                            <h4>Content Writer</h4>
                            <div className="social_talks flex flex-center gap-1 mt-2">
                            <div className="st_icon" data-aos="fade-up">
                                <a href="mailto:pjoedesantos@gmail.com"><FaEnvelope /></a>
                              </div>
                              <div className="st_icon" data-aos="fade-up">
                              <a href="https://wa.me/+639120286598?text=Hello%20Prince!%20I%20found%20you%20via%20your%20website." 
                              aria-label="WhatsApp" 
                              target="_blank" 
                              rel="noopener noreferrer">
                              <FaWhatsapp/>
                              </a>
                              </div>
                              <div className="st_icon" data-aos="fade-up">
                              <a href="https://t.me/Joejooo" 
                              aria-label="Telegram" 
                              target="_blank" 
                              rel="noopener noreferrer">
                              <FaTelegram/>
                              </a>
                              </div>
                              <div className="st_icon" data-aos="fade-up">
                              <a href="https://www.linkedin.com/in/prince-joedy-delos-santos-313a32254" 
                              aria-label="LinkedIn" 
                              target="_blank" 
                              rel="noopener noreferrer">
                              <FaLinkedin/>
                              </a>
                              </div>
                            </div>
                        </div>

              {/* Topics with icons */}
              <div className="topics_sec">
                <h2>Categories</h2>
                <div className="topics_list">
                  <Link href='/topics/business-tech-security' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Business, Technology & Security */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L3 6v6c0 5.5 3.5 10.4 9 12.7C18.5 22.4 22 17.5 22 12V6l-9-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3>Business, Technology & Security</h3>
                    </div>
                  </Link>
                  <Link href='/topics/real-estate-management'>
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Real Estate & Property Management */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Real Estate & Property Management</h3>
                    </div>
                  </Link>
                  <Link href='/topics/fashion-beauty-cosmetics' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Fashion, Beauty & Cosmetics */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 20a6 6 0 0 0 0-12 6 6 0 0 0 0 12zM3 12c0 5 9 10 9 10s9-5 9-10S12 2 12 2 3 7 3 12z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Fashion, Beauty & Cosmetics</h3>
                    </div>
                  </Link>
                  <Link href='/topics/education' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Education */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 10v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10l-8 4.5L3 10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M3 10l8 4.5L19 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Education</h3>
                    </div>
                  </Link>
                  <Link href='/topics/kids' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Kids */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M12 12v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M10 18h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Kids</h3>
                    </div>
                  </Link>
                  <Link href='/topics/health-and-lifestyle' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Health & Lifestyle */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 10c0 4 4 8 9 8s9-4 9-8-4-8-9-8S3 6 3 10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M12 12v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M10 16h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Health & Lifestyle</h3>
                    </div>
                  </Link>
                  <Link href='/topics/automotive' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Automotive */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 12c0 1.1.9 2 2 2h2v-4H6a2 2 0 0 0-2 2zM14 8h-4v4h4V8zm4 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H1V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8h-1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Automotive</h3>
                    </div>
                  </Link>
                  <Link href='/topics/fintech' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Line Graph */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 13l4 4 4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path d="M3 6h18M3 10h18M3 14h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Fintech</h3>
                    </div>
                  </Link>
                  <Link href='/topics/travel' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Travel */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 12l9-9 9 9m-9-9v18m0-18l9 9M3 21h18M3 12h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Travel</h3>
                    </div>
                  </Link>
                  <Link href='/topics/pets' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Pets */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 12c-2.2 0-4 1.8-4 4v6h16v-6c0-2.2-1.8-4-4-4H6zm12 6H6v-2h12v2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Pets</h3>
                    </div>
                  </Link>
                  <Link href='/topics/products' data-aos="fade-up">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        {/* Products */}
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 7h16v11H4V7zm0-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm1 2v11h14V7H5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3>Products</h3>
                    </div>
                  </Link>
                    <Link href='/topics/copies' data-aos="fade-up">
                      <div className="topics">
                        <div className="flex flex-center topics_svg">
                          {/* Copywriting */}
                          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2L22 10L12 20L4 12L14 2Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path d="M14 2L12 10L20 10L14 2Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <h3>Copies</h3>
                      </div>
                    </Link>
                    <Link href='/topics/personal-pieces' data-aos="fade-up">
                      <div className="topics">
                        <div className="flex flex-center topics_svg">
                          {/* Personal Pieces */}
                          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3v1M12 20v1M4.22 4.22l.707.707M18.364 18.364l.707.707M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 6a6 6 0 1 1 0 12A6 6 0 0 1 12 6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <h3>Personal Pieces</h3>
                      </div>
                    </Link>
                  </div>
                </div>
                      </div>
                </div>
            </div>
        </div>
    </>
}





