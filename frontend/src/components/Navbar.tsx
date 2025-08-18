import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();


return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl bg-[#B3EBf2]"
    style={{height: `52px`}}>
        <div className = "container mx-auto flex justify-between items-center h-full px-4">
            <div className="flex items-center gap-4 md:gap-6">
                <div className="">
                    <Link to="/" className="text-xl flex items-center text-primary-700 font-bol">
                        TEXT<span className="text-[#85D1DB] text-xl font-bold">IFY</span>
                    </Link>
                    
                </div>

            </div>
            <div className="flex items-center gap-4">
                <button className="text-[#1a1a1a] border border-[#050706] text-sm font-semibold hover:text-[#C9FDF2] bg-transparent rounded-full px-4 py-1" 
                    onClick={() => navigate("/login")}
            >
                    Login
                </button>
                <button className="shadow-2xl text-[#C9FDF2] text-sm font-semibold hover:text-[#C9FDF2] rounded-full bg-black px-4 py-1"
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </button>

            </div>

        </div>


    </div>
) 
}
export default Navbar