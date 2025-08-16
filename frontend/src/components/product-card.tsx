import { Link } from "@tanstack/react-router"
import { baseURL } from "@/services/baseUrl"
function ProductCard({ data }) {
    return (
        <Link to="/products/$productId" params={{ productId: data.id }} resetScroll={true} className="card card-bg-1 flex flex-col w-[17rem] lg:w-[20rem] p-6 pt-2 rounded-4xl  transition-all hover:border border-purple-950">
            <p className='text-white p-2 text-xs lg:text-sm font-bold rounded-3xl bg-[#573b9b23] me-auto'>LIMITED TO {data.quantity} PIECES</p>
            <img src={baseURL + data.image} width={300} alt="" />
            <p className='text-slate-300 text-sm lg:text-md mt-2 mb-1'>{data.model}</p>
            <p className='text-white text-sm lg:text-md font-bold'>{data.name}</p>
            <p className='text-slate-300 mt-1 text-sm lg:text-md '>&#8377; {data.price}</p>
        </Link>
        // <a href={`/products/${data.id}`} className="card card-bg-1 flex flex-col w-[17rem] lg:w-[20rem] p-6 pt-2 rounded-4xl  transition-all hover:border border-purple-950">
        //     <p className='text-white p-2 text-xs lg:text-sm font-bold rounded-3xl bg-[#573b9b23] me-auto'>LIMITED TO {data.quantity} PIECES</p>
        //     <img src={baseURL + data.image} width={300} alt="" />
        //     <p className='text-slate-300 text-sm lg:text-md mt-2 mb-1'>{data.model}</p>
        //     <p className='text-white text-sm lg:text-md font-bold'>{data.name}</p>
        //     <p className='text-slate-300 mt-1 text-sm lg:text-md '>&#8377; {data.price}</p>
        // </a>
    )
}

export default ProductCard