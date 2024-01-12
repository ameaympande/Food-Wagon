import { Github, Instagram, Twitter } from 'lucide-react';
import React from 'react';

const cities = ["Pune", "Nagpur", "Yavatmal", "Nashik"];

const Footer = () => {
    return (
        <footer className="bg-text-secondary text-text-primary p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="top-cities">
                    <h4 className="text-lg font-semibold mb-4">Our Top Cities</h4>
                    <ul>
                        {
                            cities.map((city, index) => (
                                <li key={index}>{city}</li>
                            ))
                        }
                    </ul>
                </div>

                <div className="company">
                    <h4 className="text-lg font-semibold mb-4">Company</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Team</li>
                        <li>Careers</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div className="contact">
                    <h4 className="text-lg font-semibold mb-4">Contact</h4>
                    <ul>
                        <li>Help & Support</li>
                        <li>Partner with us</li>
                        <li>Ride with us</li>
                    </ul>
                </div>

                <div className="legal">
                    <h4 className="text-lg font-semibold mb-4">Legal</h4>
                    <ul>
                        <li>Terms & Conditions</li>
                        <li>Refund & Cancellation</li>
                        <li>Privacy Policy</li>

                    </ul>
                </div>
            </div>


            <div className="follow-us mt-8">
                <div className='flex '>

                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className='flex mt-1 ml-10'>
                        <a href="https://github.com/ameaympande" target="_blank" rel="noopener noreferrer">
                            <Github size={20} className="mr-5" />
                        </a>
                        <a href="https://instagram.com/ameyoryx/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} className="mr-5" />
                        </a>
                        <a href="https://twitter.com/ameyoryx/" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} className="mr-5" />
                        </a>
                    </div>
                </div>
                <form>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="p-2 border border-white rounded mr-2 text-text-secondary"
                    />
                    <button className="bg-secondary hover:bg-primary text-text-secondary font-bold  px-4 py-2 rounded">Subscribe</button>
                </form>
            </div>

            <div className=" mt-8 text-center">
                <p>All rights Reserved © Ameay P, 2024</p>
            </div>
        </footer>
    );
};

export default Footer;
