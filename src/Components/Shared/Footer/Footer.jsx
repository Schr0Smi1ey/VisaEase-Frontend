import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="bg-gray-100 p-10">
      <div className="container mx-auto">
        {/* Branding */}
        <div data-aos="fade-down" className="text-center">
          <h3 className="flex justify-center items-center gap-3 font-bold text-3xl mb-3">
            Visa<span className="text-primary">Ease</span>
          </h3>
          <p className="font-medium text-base text-gray-600">
            Simplifying the visa application process with smart and efficient
            solutions.
          </p>
        </div>

        {/* Divider */}
        <div data-aos="fade-down" className="divider my-5"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-600">
          {/* Column 1: Navigation */}
          <div data-aos="fade-up" className="flex flex-col gap-2">
            <h2 className="mb-3 font-bold text-xl text-black">Navigation</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/home">
              Home
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/all-visas"
            >
              All Visas
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/add-visa"
            >
              Add Visa
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/my-visas"
            >
              My Visas
            </Link>
          </div>

          {/* Column 2: Company */}
          <div data-aos="fade-up" className="flex flex-col gap-2">
            <h2 className="mb-3 font-bold text-xl text-black">Company</h2>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/careers"
            >
              Careers
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Column 3: Resources */}
          <div data-aos="fade-up" className="flex flex-col gap-2">
            <h2 className="mb-3 font-bold text-xl text-black">Resources</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/faq">
              FAQs
            </Link>
            <Link className="hover:text-primary hover:font-semibold" to="/blog">
              Blog
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/support"
            >
              Support Center
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/guides"
            >
              Visa Guides
            </Link>
          </div>

          {/* Column 4: Follow Us */}
          <div data-aos="fade-up" className="flex flex-col gap-2">
            <h2 className="mb-3 font-bold text-xl text-black">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-600 hover:text-primary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-600 hover:text-primary"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-600 hover:text-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-600 hover:text-primary"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <p className="text-center text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} VisaEase. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
