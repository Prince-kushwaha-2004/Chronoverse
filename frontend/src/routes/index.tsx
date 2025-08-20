import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import watchImg from '@/assets/watch.png'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Nav from '@/components/nav';
// import { productData } from '@/data/data';
import ProductCard from '@/components/product-card';
import Footer from '@/components/footer';
import { getLoginOptions, getProductsOptions } from '@/services/api/@tanstack/react-query.gen';
import Loader from '@/components/loader';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
    component: Home,
})


function Home() {
    const router = useRouter()
    const { data, isLoading: loading, isSuccess } = useQuery({
        ...getLoginOptions({}),
        retry: false,
    });
    const { data: productData, isLoading: productLoading } = useQuery({
        ...getProductsOptions({}),
        retry: false,
    }
    )

    if (loading || productLoading) {
        return <Loader />
    }
    if (isSuccess) {
        if (data.user_data) {
            router.navigate({ to: "/admin" })
        }
    }

    const products = Object.groupBy(productData ?? [], data => data.category ?? "");
    // console.log(products)


    return (
        <>
            <div className="w-screen h-screen flex flex-col custome-bg-2 ">
                <Nav role="user" />
                <div className='flex-1 text-white flex gap-10 justify-between items-center px-[1rem] sm:px-[2rem] 2xl:px-[10rem]'>
                    <div className="hero-text ">
                        <h1 className='text-4xl sm:text-5xl md:text-6xl mb-[3rem] font-bold '>Where <span className='bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent'> Time Meets</span>  Art</h1>
                        <p className='text-md md:text-lg mt-4 text-slate-400'>Discover limited-edition mechanical masterpieces that redefine timekeeping. <br /> Welcome to the universe of horological excellence – welcome to Chronoverse.

                        </p>
                        <p className='text-md md:text-lg mt-4 text-slate-400'> Every Chronoverse watch tells a story – of engineering brilliance, timeless design, and cosmic inspiration.</p>
                        <div className=''>
                            <button><a href='/#products' className='text-md md:text-lg  px-[1.7rem] p-2 rounded-3xl bg-[#573b9b23] text-violet-400  flex gap-3 items-center mt-5 hover:text-white font-semibold transition-all'>Explore Our Products <MdOutlineKeyboardDoubleArrowDown /> </a></button>

                        </div>
                    </div>
                    <div className="image mt-auto mb-auto hidden lg:block">
                        <img src={watchImg} width={800} alt="" />
                    </div>
                </div>

            </div>
            <div className='w-screen py-5 custome-bg-3 ' >
                <div className='px-[1rem] sm:px-[2rem] 2xl:px-[10rem]'>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl pt-5 cursor-pointer text-center text-neutral-200" id='products'>PRODUCTS</h1>


                    {Object.keys(products)?.map((key, i) => (
                        <div key={i}>
                            <h1 className="text-2xl md:text-3xl lg:text-2xl  pt-5 cursor-pointer text-neutral-200">{key}</h1>
                            <div className='flex flex-wrap justify-around my-5'>
                                {products[key]?.map((watch, i) => (
                                    <ProductCard data={watch} key={i} />
                                ))}
                            </div>
                        </div>


                    ))}
                </div>

                <Footer />

            </div>

            {/* <div className='w-screen h-screen bg-slate-500 flex justify-center items-center'>
                <h1 className='text-xl'>{data?.name}</h1>
            </div> */}
        </>
    )
}


