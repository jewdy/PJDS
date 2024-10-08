import Head from "next/head";
import Link from "next/link";
import { FaHtml5, FaGithub, FaTwitter, FaInstagram, FaEnvelope, FaLinkedin, FaDiscord, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";

// Function to truncate text to the first line
const truncateDescriptionToFirstLine = (metadescription) => {
  if (!metadescription) return '';
  const tempElement = document.createElement('div');
  tempElement.style.width = '100%';
  tempElement.style.visibility = 'hidden';
  tempElement.style.position = 'absolute';
  tempElement.style.whiteSpace = 'nowrap';
  tempElement.textContent = metadescription;

  document.body.appendChild(tempElement);
  const truncatedText = tempElement.textContent.split(' ').slice(0, 20).join(' ') + '...';
  document.body.removeChild(tempElement);

  return truncatedText;
};

function extractFirstImageUrl(markdownContent) {
  if (!markdownContent || typeof markdownContent !== 'string') {
    return null;
  }

  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const { alldata, loading } = useFetchData(`/api/getblog`);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    // Set current page from URL query parameter
    const pageNumber = parseInt(page, 10) || 1;
    setCurrentPage(pageNumber);
  }, [page]);

  // Sort blogs by date
  const sortedBlogs = alldata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Paginate sorted blogs
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`/?page=${pageNumber}`, undefined, { shallow: true });
  };

  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const allBlogs = sortedBlogs.length;
  const publishedBlogs = currentBlogs.filter(blog => blog.status === "publish");

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allBlogs / perPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <>
      <Head>
        <title>Prince's Blog Site</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info" data-aos="fade-right">
            <h1>Hi, I'm <span>Prince </span>&mdash;<br /> A Content Writer</h1>
            <h3>Specializes in Blog Writing and SEO Content Optimization</h3>
            <div className="flex gap-2">
              <Link href='/contact/contactme'><button>Contact Me</button></Link>
              <Link href='/about/about'><button>About Me</button></Link>
            </div>
          </div>
          <div className="rightheader_img" data-aos="zoom-in">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/coder2.png" alt="coder2" />
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div aria-live="assertive" role="alert" className="loader"></div>
                </div>
              ) : (
                publishedBlogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="blog" key={blog._id} data-aos="fade-up">
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" />
                        </Link>
                      </div>
                      <div className="bloginfo">
                      <div className="blogtags">
                          {blog.tags.map((tag, index) => (
                            <Link href={`/tag/${tag}`} key={index}>
                              <div className="blogtag">{tag}</div>
                            </Link>
                          ))}
                        </div>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>
                        </Link>
                        <p>{truncateDescriptionToFirstLine(blog.metadescription)}</p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img src="/img/coder2.png" alt="author" />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>Prince Joedy Delos Santos</h4>
                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className='blogpagination'>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
            </div>
          </div>
          
          <div className="rightblog_info">

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

              <div className="tags_sec mt-3">
                <h2>Tags</h2>
                <div className="tags_list" data-aos="fade-up">
                  <Link href="/tag/business">#business</Link>
                  <Link href='/tag/technology'>#technology</Link>
                  <Link href='/tag/security'>#security</Link>

                  <Link href='/tag/real-estate'>#real-estate</Link>
                  <Link href='/tag/property-management'>#property-management</Link>

                  <Link href='/tag/beauty'>#beauty</Link>
                  <Link href='/tag/cosmetics'>#cosmetics</Link>
                  <Link href='/tag/fashion'>#fashion</Link>
                  <Link href='/tag/style'>#style</Link>

                  <Link href='/tag/education'>#education</Link>
                  <Link href='/tag/learn'>#learn</Link>
                  <Link href='/tag/kids'>#kids</Link>

                  <Link href='/tag/health'>#health</Link>
                  <Link href='/tag/wellness'>#wellness</Link>
                  <Link href='/tag/healthy-living'>#healthylife</Link>

                  <Link href='/tag/automotive'>#automotive</Link>
                  <Link href='/tag/cars'>#cars</Link>

                  <Link href='/tag/fintech'>#fintech</Link>
                  <Link href='/tag/finance'>#finance</Link>

                  <Link href='/tag/cryptocurrency'>#cryptocurrency</Link>
                  <Link href='/tag/blockchain'>#blockchain</Link>
                  <Link href='/tag/bitcoin'>#bitcoin</Link>

                  <Link href='/tag/travel'>#travel</Link>
                  <Link href='/tag/vacation'>#vacation</Link>
                  <Link href='/tag/lifestyle'>#lifestyle</Link>

                  <Link href='/tag/pets'>#pets</Link>
                  <Link href='/tag/dogs'>#dogs</Link>
                  <Link href='/tag/cat'>#cat</Link>

                  <Link href='/tag/products'>#products</Link>
                  <Link href='/tag/ecommerce'>#ecommerce</Link>

                  <Link href='/tag/copies'>#copies</Link>
                  <Link href='/tag/email'>#email</Link>
                  <Link href='/tag/marketing'>#marketing</Link>

                  <Link href='/tag/personal'>#personal</Link>
                  <Link href='/tag/philosophy'>#philosophy</Link>
                  <Link href='/tag/life'>#life</Link>
                  <Link href='/tag/insights'>#insights</Link>
                </div>
              </div>

            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>Want to find out how I can solve problems specific to your business? Let's talk.</h4>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
