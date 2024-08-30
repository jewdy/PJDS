import Head from "next/head";
import { IoHome } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Home() {
  // login first
  const { data: session, status } = useSession();

  const router = useRouter();
  // Check if there's no active session and redirect to login page
  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className='flex flex-col flex-center wh_100'>
        <Loading />
        <h1 className='mt-1'>Loading...</h1>
      </div>
    );
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [blogsData, setBlogsData] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  // if login then show this data
  if (session) {
    return (
      <>
        <Head>
          <title>Blog Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="dashboard">
          {/* title dashboard */}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>Blogs <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span><span>Dashboard</span>
            </div>
          </div>
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Categories</h2>
              <span>{[
                  "business-tech-security",
                  "real-estate-management",
                  "fashion-beauty-cosmetics",
                  "education",
                  "kids",
                  "health-and-lifestyle",
                  "automotive",
                  "fintech",
                  "travel",
                  "pets",
                  "products",
                  "copies",
                  "personal-pieces"
                ].length}</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>{[
                  "business",
                  "technology",
                  "security",
                  "real-estate",
                  "property-management",
                  "beauty",
                  "cosmetics",
                  "fashion",
                  "style",
                  "education",
                  "learn",
                  "kids",
                  "health",
                  "wellness",
                  "healthy-living",
                  "automotive",
                  "cars",
                  "finance",
                  "cryptocurrency",
                  "blockchain",
                  "bitcoin",
                  "vacation",
                  "lifestyle",
                  "dogs",
                  "cat",
                  "ecommerce",
                  "copies",
                  "email",
                  "marketing",
                  "philosophy",
                  "life",
                  "insights"
                ].length}</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Draft Blogs</h2>
              <span>{blogsData.filter(dat => dat.status === "draft").length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{blogsData.filter(dat => dat.status === "publish").length} / 365 <br /> <span>Total Published</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table data-aos="fade-up">
                  <thead>
                    <tr>
                      <td>Categories</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Business, Technology & Security</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("business-tech-security")).length}</td>
                    </tr>
                    <tr>
                      <td>Real Estate & Property Management</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("real-estate-management")).length}</td>
                    </tr>
                    <tr>
                      <td>Fashion, Beauty & Cosmetics</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("fashion-beauty-cosmetics")).length}</td>
                    </tr>
                    <tr>
                      <td>Education</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("education")).length}</td>
                    </tr>
                    <tr>
                      <td>Kids</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("kids")).length}</td>
                    </tr>
                    <tr>
                      <td>Health & Lifestyle</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("health-and-lifestyle")).length}</td>
                    </tr>
                    <tr>
                      <td>Automotive</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("automotive")).length}</td>
                    </tr>
                    <tr>
                      <td>Fintech</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("fintech")).length}</td>
                    </tr>
                    <tr>
                      <td>Travel</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("travel")).length}</td>
                    </tr>
                    <tr>
                      <td>Pets</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("pets")).length}</td>
                    </tr>
                    <tr>
                      <td>Products & Descriptions</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("products")).length}</td>
                    </tr>
                    <tr>
                      <td>Copies</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("copies")).length}</td>
                    </tr>
                    <tr>
                      <td>Personal Pieces</td>
                      <td>{blogsData.filter(dat => dat.blogcategory.includes("personal-pieces")).length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
