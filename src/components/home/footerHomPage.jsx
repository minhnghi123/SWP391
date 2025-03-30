import React, { memo, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FooterHomePage = memo(() => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    const socialLinks = useMemo(() => [
        { icon: faFacebookF, name: 'facebook' ,route: 'https://www.facebook.com/profile.php?id=100062481308372' },
        { icon: faTwitter, name: 'twitter' ,route: 'https://x.com/TrTrn38529375' },
        { icon: faInstagram, name: 'instagram' ,route: 'https://www.instagram.com/chi_123kaiz/' },
        { icon: faLinkedin, name: 'linkedin' ,route: '#' }
    ], []);

    const quickLinks = useMemo(() => ['Home', 'About Us', 'Services', 'Contact'], []);

    const services = useMemo(() => [
        'Vaccination Tracking',
        'Health Records',
        'Appointment Scheduling',
        'Expert Consultation'
    ], []);

    const footerLinks = useMemo(() => [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' }
    ], []);

    return (
        <footer className="bg-gray-900 text-white" id='contact'>
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Company Info */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 md:w-10 h-8 md:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                                <span className="text-xl md:text-2xl font-bold text-white">H</span>
                            </div>
                            <span className="text-lg md:text-xl font-bold">
                                Health<span className="text-blue-400">Blue</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm">
                            Providing comprehensive vaccination tracking and healthcare management solutions for families.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-3 md:space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.route}
                                    className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={social.icon} className="text-white text-base md:text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Quick Links</h3>
                        <ul className="space-y-3 md:space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link}`}
                                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs md:text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Our Services</h3>
                        <ul className="space-y-3 md:space-y-4">
                            {services.map((service) => (
                                <li key={service}>
                                    <a
                                        href={`#${service}`}
                                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs md:text-sm"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Contact Us</h3>
                        <ul className="space-y-3 md:space-y-4 text-gray-400">
                            <li className="flex items-start space-x-2 md:space-x-3">
                                <svg className="w-5 md:w-6 h-5 md:h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-xs md:text-sm">Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam </span>
                            </li>
                            <li className="flex items-center space-x-2 md:space-x-3">
                                <svg className="w-5 md:w-6 h-5 md:h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs md:text-sm">ttei8191@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-2 md:space-x-3">
                                <svg className="w-5 md:w-6 h-5 md:h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-xs md:text-sm">0966506438</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-xs md:text-sm">
                            ©{currentYear} HealthBlue. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                            {footerLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 hover:text-blue-400 text-xs md:text-sm transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default FooterHomePage;