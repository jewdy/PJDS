import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

export default function Blog({
    _id,
    title: existingTitle,
    slug: existingSlug,
    description: existingDescription,
    metadescription: existingMetaDescription,
    blogcategory: existingBlogcategory,
    tags: existingTags,
    status: existingStatus,
    createdAt: existingCreatedAt // New prop for creation date
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [metadescription, setMetaDescription] = useState(existingMetaDescription || '');
    const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');
    const [createdAt, setCreatedAt] = useState(existingCreatedAt ? new Date(existingCreatedAt).toISOString().substring(0, 16) : ''); // New state for creation date

    async function createProduct(ev) {
        ev.preventDefault();
        const data = { title, slug, description, metadescription, blogcategory, tags, status, createdAt };

        if (_id) {
            await axios.put('/api/blogs', { ...data, _id });
            toast.success('Data Updated!');
        } else {
            await axios.post('/api/blogs', data);
            toast.success('Product Created!');
        }

        setRedirect(true);
    }

    if (redirect) {
        router.push('/draft');
        return null;
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');
        setSlug(newSlug);
    };

    return <>
        <form onSubmit={createProduct} className='addWebsiteform'>
            {/* blog title */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Enter small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>

            {/* blog slug url */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="slug">Slug</label>
                <input type="text" id='slug' placeholder='Enter slug title'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            {/* meta description */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="metadescription">Meta Description</label>
                <input type="text" id='metadescription' placeholder='Enter meta description'
                    value={metadescription}
                    onChange={ev => setMetaDescription(ev.target.value)}
                />
            </div>

            {/* blog category */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="catergory">Select Category (ctrl + leftclick for multiple select)</label>
                <select onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, option => option.value))} name="catergory" id="catergory" multiple value={blogcategory} >
                    <option value="business-tech-security">Business, Technology and Security</option>
                    <option value="real-estate-management">Real Estate & Property Management</option>
                    <option value="fashion-beauty-cosmetics">Fashion, Beauty & Cosmetics</option>
                    <option value="education">Education</option>
                    <option value="kids">Kids</option>
                    <option value="health-and-lifestyle">Health & Lifestyle</option>
                    <option value="automotive">Automotive</option>
                    <option value="fintech">Fintech</option>
                    <option value="travel">Travel</option>
                    <option value="pets">Pets</option>
                    <option value="products">Products & Descriptions</option>
                    <option value="copies">Copies</option>
                    <option value="personal-pieces">Personal Pieces</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => (
                    <span key={category}>{category}</span>
                ))}</p>
            </div>

            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">Blog Content</label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }}
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code >{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                Copy code
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return <code {...props}>{children}</code>;
                                }
                            },
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            {/* tags */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                    <option value="technology">Technology</option>
                    <option value="security">Security</option>

                    <option value="real-estate">Real Estate</option>
                    <option value="property-management">Property Management</option>

                    <option value="beauty">Beauty</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="fashion">Fashion</option>
                    <option value="style">Style</option>

                    <option value="education">Education</option>
                    <option value="learn">Learn</option>
                    <option value="kids">Kids</option>

                    <option value="health">Health</option>
                    <option value="wellness">Wellness</option>
                    <option value="healthy-living">Healthy living</option>

                    <option value="automotive">Automotive</option>
                    <option value="cars">Cars</option>

                    <option value="fintech">Fintech</option>
                    <option value="finance">Finance</option>
                    <option value="cryptocurrency">Cryptocurrency</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="bitcoin">Bitcoin</option>

                    <option value="travel">Travel</option>
                    <option value="vacation">Vacation</option>
                    <option value="lifestyle">Lifestyle</option>

                    <option value="pets">Pets</option>
                    <option value="dogs">Dogs</option>
                    <option value="cat">Cat</option>

                    <option value="products">Products</option>
                    <option value="ecommerce">E-commerce</option>

                    <option value="copies">Copies</option>
                    <option value="email">Email</option>
                    <option value="marketing">Marketing</option>
                    
                    <option value="personal">Personal Pieces</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="life">Life</option>
                    <option value="insights">Insights</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingTags && existingTags.length > 0 && (
                    <span>{existingTags}</span>
                )}</p>
            </div>

             {/* creation date */}
             <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="createdAt">Creation Date</label>
                <input 
                    type="datetime-local" 
                    id='createdAt' 
                    placeholder='Enter creation date' 
                    value={createdAt}
                    onChange={ev => setCreatedAt(ev.target.value)}
                />
            </div>

            {/* blog status */}
            <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">Status</label>
                <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div>

            <div className='w-100 mb-2'>
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE BLOG</button>
            </div>
        </form>
    </>
}
