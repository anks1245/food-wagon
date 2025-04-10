const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 border-b border-gray-700 pb-6">
                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">About us</a></li>
                            <li><a href="#" className="hover:text-white">Team</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Contact</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Help & Support</a></li>
                            <li><a href="#" className="hover:text-white">Partner with us</a></li>
                            <li><a href="#" className="hover:text-white">Ride with us</a></li>
                        </ul>
                    </div>
                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Refund & Cancellation</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Social Media & Subscription */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-6">
                    {/* Social Media */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-white font-semibold">FOLLOW US</span>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                        <input 
                            type="email" 
                            placeholder="Enter Your email" 
                            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none text-white w-full sm:w-64"
                        />
                        <button className="bg-yellow-500 px-5 py-2 rounded text-black font-semibold hover:bg-yellow-400 w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>All rights reserved © <span className="font-bold">Your Company, 2021</span></p>
                    <p className="flex items-center">
                        Made with <span className="text-yellow-500 mx-1">❤️</span> by <a href="#" className="font-semibold hover:text-white">ThemeWagon</a>
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer;