import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

// Function to extract the first image URL from markdown content
function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== 'string') {
        return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

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

export default function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6);
    const [blog, setBlog] = useState([]);
    const router = useRouter();
    const { category } = router.query;

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!category) {
                setLoading(false);
                return; // Exit early if no category is provided
            }

            try {
                const res = await axios.get(`/api/getblog?blogcategory=${category}`);
                const alldata = res.data;

                const sortedBlogs = alldata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBlog(sortedBlogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [category]);

    useEffect(() => {
        const page = parseInt(router.query.page) || 1;
        setCurrentPage(page);
    }, [router.query.page]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/topics/${category}?page=${pageNumber}`, undefined, { shallow: true });
    };

    if (loading) {
        return (
            <div className="wh-100 flex flex-center mt-2 pb-5">
                <div aria-live="assertive" role="alert" className="loader"></div>
            </div>
        );
    }

    if (!category || blog.length === 0) {
        return <div>No blogs available for this category.</div>;
    }

    const publishedblogs = blog.filter(ab => ab.status === 'publish');

    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlogs = publishedblogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const alldata = publishedblogs.length;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(alldata / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="blogpage">
            <div className="category_slug">
                <div className="container">
                <button onClick={() => router.back()} className="back-button">
                    <FaArrowLeft /> Back
                </button> {/* Add the Back Button */}
                    <div className="category_title">
                        <div className="flex gap-1" data-aos="fade-right">
                            <h1>{category}</h1>
                            <span>{publishedblogs.length}</span>
                        </div>
                        <p data-aos="fade-left">Get to know more about my contents for this category and see how it can impact your interests.</p>
                    </div>
                    <div className="category_blogs mt-3">
                        {currentBlogs.map((item) => {
                            const firstImageUrl = extractFirstImageUrl(item.description);
                            return (
                            <div className="cate_blog" key={item._id} data-aos="fade-up">
                                <Link href={`/blog/${item.slug}`}>
                                    <img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" />
                                </Link>
                                <div className="bloginfo mt-2">
                                    <div className="blogtags">
                                        {item.tags.map((tag, index) => (
                                            <Link href={`/tag/${tag}`} key={index}>
                                                <div className="blogtag">{tag}</div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href={`/blog/${item.slug}`}>
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <p>{truncateDescriptionToFirstLine(item.metadescription)}</p>
                                    <div className="blogauthor flex gap-1">
                                        <div className="blogaimg">
                                            <img src="/img/coder2.png" alt="author" />
                                        </div>
                                        <div className="flex flex-col flex-left gap-05">
                                            <h4>Prince Joedy</h4>
                                            <span>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
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
            </div>
        </div>
    );
}
