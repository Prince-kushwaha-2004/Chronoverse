import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getProductsByIdOptions } from '@/services/api/@tanstack/react-query.gen'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/loader'
import { baseURL } from '@/services/baseUrl'
export const Route = createFileRoute('/_homeLayout/products/$productId')({
  component: ProductComponent,
})
type carts = {
  productId: number,
  quantity: number
}[]


function ProductComponent() {
  const { productId } = Route.useParams()
  const [quantity, setQuantity] = useState(1)
  const { data: product, isLoading: loading } = useQuery({
    ...getProductsByIdOptions({
      path: {
        id: Number(productId)
      }
    }),
    retry: false
  })
  if (loading) {
    return <Loader />
  }

  const increment = () => setQuantity(q => (q > ((product?.quantity ?? 1) - 1) ? q : q + 1))
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1))

  const handleAddToCart = () => {
    console.log('Added to cart:', { productId, quantity })
    const cartsData = localStorage.getItem("carts")
    let carts: carts = cartsData ? JSON.parse(cartsData) : []
    let product = carts.filter((data) => data.productId == Number(productId))
    console.log(product, carts)
    if (!product.length) {
      carts.push({
        productId: Number(productId),
        quantity: quantity
      })
    } else {
      carts = carts.map((data) => {
        if (data.productId === Number(productId)) {
          return {
            productId: Number(productId),
            quantity: quantity
          };
        } else {
          return data;
        }
      });
    }
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-6xl text-white ">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <img
          src={baseURL + product?.image}
          alt={product?.name}
          className="w-full lg:w-1/2 h-[350px] object-contain rounded-xl"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{product?.name}</h1>
          <p className="text-sm text-gray-400 mb-4">{product?.model}</p>

          <p className="text-gray-400 mb-4">{product?.description}</p>
          <p className="text-xl text-violet-400 font-semibold mb-6">₹ {product?.price}</p>

          <div className="flex items-center mb-6 ">
            <button
              onClick={decrement}
              className="rounded-s-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
            >
              -
            </button>
            <span className="px-4 py-2 border border-zinc-600 ">{quantity}</span>
            <button
              onClick={increment}
              className="rounded-e-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-violet-700 hover:bg-violet-800 rounded-full font-medium transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
