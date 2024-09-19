// components/Profile.js
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaFacebookMessenger, FaDiscord, FaCommentDots, FaShoppingCart, FaFeatherAlt, FaKeyboard, FaFileAlt, FaQuoteRight, FaEnvelope, FaWhatsapp, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaSearch, FaPenNib, FaTags, FaTasks, FaCopy, FaRocket } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-image" data-aos="zoom-in">
        <img src="/img/1st.png" alt="coder2"/>
        </div>

        <div classname= "forda-transition" data-aos="fade-up">
        <div className="personal-info">
            <ul className="info-list">
                <h2 className="info-value">Prince Joedy Delos Santos</h2>
                <li className="age">
                <span className="placeholder"><strong>Age:</strong></span>
                <span className="info-value">22 Years</span>
                </li>
                <li className="location">
                <span className="placeholder"><strong>Location:</strong></span>
                <span className="info-value">Batangas, Philippines</span>
                </li>
                <li className="experience">
                <span className="placeholder"><strong>Experience:</strong></span>
                <span className="info-value">3 Years</span>
                </li>
                <li className="degree">
                <span className="placeholder"><strong>Degree:</strong></span>
                <span className="info-value">Computer Science</span>
                </li>
                <li className="email">
                <span className="placeholder"><strong>E-mail:</strong></span>
                <span className="info-value">pjoedesantos@gmail.com</span>
                </li>
                <li className="phone">
                <span className="placeholder"><strong>Phone:</strong></span>
                <span className="info-value">+639120286598</span>
                </li>
                <li className="website">
                <span className="placeholder"><strong>Website:</strong></span>
                // <span className="info-value"><a href="http://example.com">example.com</a></span>
                </li>
            </ul>
        </div>

        <div className="attachments">
          <h3>ATTACHMENTS</h3>
          <ul>
            // <li><a href="https://drive.google.com/file/d/1pUG8YQ7XlSZinJYLMoAKvU_u5sOZyKIW/view?usp=sharing" target="_blank">Resume</a></li>
          </ul>
        </div>
        
        <div className="social-profiles">
          <h3>SOCIAL PROFILES</h3>
          <ul>
            <li><a href="mailto:pjoedesantos@gmail.com"><FaEnvelope/></a></li>
            <li><a href="https://wa.me/+639120286598?text=Hello%20Prince!%20I%20found%20you%20via%20your%20website." 
            aria-label="WhatsApp" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaWhatsapp/>
            </a></li> 
            <li><a href="https://t.me/Joejooo" 
            aria-label="Telegram" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaTelegram/>
            </a></li>
            <li><a href="https://www.linkedin.com/in/prince-joedy-delos-santos-313a32254" 
            aria-label="LinkedIn" 
            target="_blank" 
            rel="noopener noreferrer">
            <FaLinkedin/>
            </a></li>
          </ul>
        </div>

        {/* <div className="contact-form">
          <h3>Contact Me</h3>
          <form>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div> */}
        </div>

      </aside>
      <main className="main-content">
        <section className="about-me" data-aos="fade-up">
          <h2>ABOUT ME</h2>

          <p>
          I’m a computer science graduate with a passion for writing. I’ve spent over three years as a campus journalist, now I specialize in producing content that connects with people.  <br /><br />
            
          Over the last three years of SEO writing, I’ve been able to provide my clients with the quality of work that hooks their target audience and drives results that align with their goals. <br /><br />
            
          I handle everything from researching topics and analyzing keywords to writing compelling articles and blogs that drive engagement.   <br /><br />

          Outside of writing, I'm a nature enjoyer who loves hiking and camping with friends. Of course, I love animals as much as I love the greens. My pets convinced me to include them in this bio, their names are Roxie (my cat) and Gus (my dog). Someday, I dream of traveling and experiencing different cultures around the world.
          </p>

        </section>
        <section className="services" data-aos="fade-right">
          <h2>SERVICES</h2>
          <ul>
            <li>
              <FaSearch className="service-icon" />
              <span>SEO Content Writing</span>
            </li>
            <li>
              <FaPenNib className="service-icon" />
              <span>Blog Writing</span>
            </li>
            <li>
              <FaTags className="service-icon" />
              <span>Product Descriptions</span>
            </li>
            <li>
            <FaFileAlt className="service-icon" />
              <span>Copywriting</span>
            </li>
            <li>
            <FaQuoteRight className="service-icon" />
              <span>Captions</span>
            </li>
            <li>
              <FaShoppingCart className="service-icon" />
              <span>E-commerce</span>
            </li>
          </ul>
        </section>

        <section className="skills" data-aos="fade-right">
          <h2>SKILLS</h2>
          <div className="skill-bar">
            <span className="skill-name"><span className="plus-icon">+</span> SEO</span>
            <div className="bar">
              <div className="fill" style={{ width: '98%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span className="skill-name"><span className="plus-icon">+</span> RESEARCH</span>
            <div className="bar">
              <div className="fill" style={{ width: '97%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span className="skill-name"><span className="plus-icon">+</span> PLANNING</span>
            <div className="bar">
              <div className="fill" style={{ width: '93%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span className="skill-name"><span className="plus-icon">+</span> ACCURACY</span>
            <div className="bar">
              <div className="fill" style={{ width: '96%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <span className="skill-name"><span className="plus-icon">+</span> PROOFREADING</span>
            <div className="bar">
              <div className="fill" style={{ width: '93%' }}></div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
