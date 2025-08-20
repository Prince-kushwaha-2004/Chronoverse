import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { postCartsOptions } from '@/services/api/@tanstack/react-query.gen'
import Loader from '@/components/loader'
import { baseURL } from '@/services/baseUrl'
import { toast } from 'sonner'
import OrderForm from '@/components/order-form'

export const Route = createFileRoute('/_homeLayout/carts')({
  component: CartPage,
})

type carts = {
  productId: number,
  quantity: number
}[]


function CartPage() {

  const cartsData = localStorage.getItem("carts")
  const [carts, setCarts] = useState<carts>(cartsData ? JSON.parse(cartsData) : [])
  const [cart, setCart] = useState<carts>(cartsData ? JSON.parse(cartsData) : [])
  const cartsLength = carts.reduce((result, data) => result + data.quantity, 0)

  const { data: cartItems, isLoading: loading } = useQuery({
    ...postCartsOptions({
      body: cart
    }),
    retry: false
  })
  if (loading) return <Loader />

  const increment = (id: number) => {
    const product = cartItems?.filter((data) => data.id == id)[0]
    setCarts(prev =>
      prev.map(item => (item.productId === id && item.quantity + 1 <= Number(product?.quantity)) ? { ...item, quantity: item.quantity + 1 } : item)
    )
    let data = carts.map((data) => {
      if (data.productId === id) {
        return {
          productId: id,
          quantity: data.quantity + 1
        };
      } else {
        return data;
      }
    });
    localStorage.setItem("carts", JSON.stringify(data));

  }

  const decrement = (id: number) => {
    setCarts(prev =>
      prev.map(item =>
        item.productId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
    let data = carts.map((data) => {
      if (data.productId === id) {
        return {
          productId: id,
          quantity: data.quantity - 1
        };
      } else {
        return data;
      }
    });
    localStorage.setItem("carts", JSON.stringify(data));

  }

  const removeItem = (id: number) => {
    setCarts(prev => prev.filter(item => item.productId != id))
    let data = carts.filter((data) => {
      return data.productId != id
    });
    localStorage.setItem("carts", JSON.stringify(data));
    toast.success("Product Remove from Cart Successfully")
    setCart(prev => prev.filter(item => item.productId != id))

  }


  const totalAmount = carts.reduce(
    (total, item, index) =>
      total +
      (cartItems && cartItems[index] && cartItems[index].price
        ? cartItems[index].price * item.quantity
        : 0),
    0
  )

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row text-white px-4 sm:px-8 py-6 gap-6">
      {carts.length === 0 ? (
        <p className="text-center w-full text-3xl my-auto text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex-1 h-full overflow-y-auto pr-1">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {carts.map((item, index) => (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row gap-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <img
                    src={cartItems && baseURL + cartItems[index].image}
                    alt={cartItems && cartItems[index].image}
                    className="w-full md:w-40 h-auto object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">{cartItems && cartItems[index].name}</h2>
                      <p className="text-sm text-gray-400 mb-2">Model: {cartItems && cartItems[index].model}</p>
                      <p className="text-lg text-violet-400 mb-4">₹ {cartItems && cartItems[index].price}</p>
                    </div>

                    <div className="flex items-center flex-wrap  mb-4">
                      <button
                        onClick={() => decrement(item.productId)}
                        className="rounded-s-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border border-zinc-600 ">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.productId)}
                        className="rounded-e-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-full   bg-red-500/10 backdrop-blur-md text-red-500 hover:bg-red-600/20 hover:border-red-400 hover:text-red-400 transition-all text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full lg:w-80 h-fit sticky mt-14 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <p className="text-lg mb-2">Total Items: {cartsLength}</p>
              <p className="text-xl font-semibold text-violet-400">Total: ₹ {totalAmount}</p>
            </div>

            <OrderForm data={{ carts, totalProducts: cartsLength, totalAmount: totalAmount, cartItems: cartItems, setCarts }} />
          </div>
        </>
      )}
    </div>
  )
}
