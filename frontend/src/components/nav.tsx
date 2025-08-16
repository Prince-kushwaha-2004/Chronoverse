import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { postLogoutMutation } from "@/services/api/@tanstack/react-query.gen";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
function Nav({ role }) {
    const router = useRouter();
    const logoutMutation = useMutation(postLogoutMutation());
    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = () => {
        logoutMutation.mutate(
            {},
            {
                onSuccess: (data) => {
                    toast.success("User Logout Successfull!!")
                    router.navigate({ to: "/login" });
                },
                onError: (error) => {
                    console.log(error.message)
                    toast.error(error?.response?.data["error"]);

                }
            }
        );
    };

    return (
        <nav className="text-white w-full  py-4 bg-transparent backdrop-blur-md  relative z-50 px-[1rem] sm:px-[2rem] 2xl:px-[10rem]">
            <div className="flex justify-between items-center">

                <div className="logo w-0">
                    <Link to="/" className="text-2xl md:text-3xl lg:text-4xl cursor-pointer text-neutral-200">
                        CHRONOVERSE
                    </Link>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className={`w-7 h-7 transition-all duration-300 ${menuOpen ? "rotate-90" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-9 w-0">
                    <div className="menue flex gap-9">
                        {role === "user" && (
                            <>
                                <Link to="/" hash="products" className="hover:text-violet-400 text-lg transition-all">
                                    Products
                                </Link>
                                <Link to="/carts" className="hover:text-violet-400 text-lg transition-all">
                                    Carts
                                </Link>
                                {/* <Link to="/" className="hover:text-violet-400 text-lg transition-all">
                                    Orders
                                </Link> */}
                            </>
                        )}
                        {role === "admin" && (
                            <>
                                <Link to="/admin" className="hover:text-violet-400 text-lg transition-all">
                                    Products
                                </Link>
                                <Link to="/admin/orders" className="hover:text-violet-400 text-lg transition-all">
                                    Orders
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-9">
                    <div className="buttons">
                        {role === "user" && (
                            <Link
                                to="/login"
                                className="px-[1.7rem] p-2 rounded-3xl bg-[#583b9b3f] cursor-pointer text-white hover:text-violet-400 text-lg"
                            >
                                Login
                            </Link>
                        )}
                        {role === "admin" && (


                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <span
                                        className="px-[1.7rem] p-2 rounded-3xl bg-[#583b9b3f] cursor-pointer text-white hover:text-violet-400 text-lg"
                                    >
                                        Logout
                                    </span>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Do you want to Logout
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                        <AlertDialogAction disabled={logoutMutation.isPending} onClick={handleLogout} className="cursor-pointer">Logout</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>

            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-4 transition-all duration-300">
                    {role === "user" && (
                        <>
                            <Link to="/" hash="products" className="hover:text-violet-400 text-lg transition-all">
                                Products
                            </Link>
                            <Link to="/carts" className="hover:text-violet-400 text-lg transition-all">
                                Carts
                            </Link>
                            <Link to="/" className="hover:text-violet-400 text-lg transition-all">
                                Orders
                            </Link>
                            <Link
                                to="/login"
                                className="px-[1.7rem] p-2 rounded-3xl bg-[#583b9b3f] cursor-pointer text-white hover:text-violet-400 text-lg text-center"
                            >
                                Login
                            </Link>
                        </>
                    )}
                    {role === "admin" && (
                        <>
                            <Link to="/admin" className="hover:text-violet-400 text-lg transition-all">
                                Products
                            </Link>
                            <Link to="/admin/orders" className="hover:text-violet-400 text-lg transition-all">
                                Orders
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className="px-[1.7rem] p-2 rounded-3xl bg-[#583b9b3f] cursor-pointer text-white hover:text-violet-400 text-lg text-center"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Nav;
