import Link from "next/link";

export default function Footer() {
    return <>
        <div className="footer">
            <div className="container flex flex-sb flex-wrap flex-left">
                <div className="footer_logo" data-aos="fade-right">
                    <h2>PJDSBLOGS</h2>
                    <h4>&copy; 2024 ALL Rights Reserved.</h4>
                    {/* <h3>Coded By <span>@vbmcoder</span></h3> */}
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Quick Links</h3>
                    <ul>
                        {/* <li><Link href='/'>Advertise with us</Link></li> */}
                        <li><Link href='/about/about'>About Us</Link></li>
                        <li><Link href='/contact/contactme'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-up">
                    <h3>Legal Stuff Links</h3>
                    <ul>
                        <li><Link href='/'>Privacy Notice</Link></li>
                        <li><Link href='/'>Cookie Policy</Link></li>
                        <li><Link href='/'>Terms Of Use</Link></li>
                    </ul>
                </div>
                <div className="q_links" data-aos="fade-left">
                    <h3>Social Media</h3>
                    <ul>
                        <li><a href="mailto:pjoedesantos@gmail.com">Gmail</a></li>
                        <li><a href="https://wa.me/+639120286598?text=Hello%20Prince!%20I%20found%20you%20via%20your%20website." 
                            aria-label="WhatsApp" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            WhatsApp
                            </a>
                        </li> 
                        <li>
                            <a href="https://t.me/Joejooo" 
                            aria-label="Telegram" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            Telegram
                            </a>
                        </li>
                        <li>
                        <a href="https://www.linkedin.com/in/prince-joedy-delos-santos-313a32254" 
                            aria-label="LinkedIn" 
                            target="_blank" 
                            rel="noopener noreferrer">LinkedIn
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}