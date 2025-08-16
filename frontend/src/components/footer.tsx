import { Link } from "@tanstack/react-router"
function Footer() {
    return (
        <footer className="text-white flex w-full justify-between items-center p-5">
            <h1 className='text-7xl mb-[3rem] mt-[10rem] text-center w-full font-bold '> <span className='bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent'> Footer</span>  Section</h1>


        </footer>
        // <footer className="bg-black/10 backdrop-blur-lg border-t border-white/10 text-white px-6 py-12 mt-20">
        //     <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        //         {/* Brand + Description */}
        //         <div>
        //             <h2 className="text-2xl font-semibold text-violet-400">Chronoverse</h2>
        //             <p className="mt-2 text-sm text-gray-300">
        //                 Where Time Meets Art. Discover limited-edition mechanical masterpieces that redefine timekeeping.
        //                 <br />
        //                 Every Chronoverse watch tells a story – of engineering brilliance, timeless design, and cosmic inspiration.
        //             </p>
        //         </div>

        //         {/* Quick Links */}
        //         <div>
        //             <h3 className="text-xl font-medium text-violet-300 mb-2">Explore</h3>
        //             <ul className="space-y-1 text-sm text-gray-400">
        //                 <li><Link to="/" className="hover:text-white">Home</Link></li>
        //                 <li><Link to="/about" className="hover:text-white">About</Link></li>
        //                 <li><Link to="/collection" className="hover:text-white">Collection</Link></li>
        //                 <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
        //             </ul>
        //         </div>

        //         {/* Contact / Newsletter */}
        //         <div>
        //             <h3 className="text-xl font-medium text-violet-300 mb-2">Stay Connected</h3>
        //             <p className="text-sm text-gray-400 mb-4">
        //                 Join our newsletter for exclusive updates and early access to releases.
        //             </p>
        //             <form className="flex items-center gap-2">
        //                 <input
        //                     type="email"
        //                     placeholder="Your email"
        //                     className="px-3 py-2 rounded-md bg-white/10 text-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-1 focus:ring-violet-500"
        //                 />
        //                 <button
        //                     type="submit"
        //                     className="bg-violet-600 hover:bg-violet-700 transition text-white text-sm px-4 py-2 rounded-md"
        //                 >
        //                     Subscribe
        //                 </button>
        //             </form>
        //         </div>
        //     </div>

        //     {/* Bottom bar */}
        //     <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        //         © {new Date().getFullYear()} Chronoverse. All rights reserved.
        //     </div>
        // </footer>
    )
}

export default Footer