import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import cardimg from '@/assets/watch2.png'
import { useQuery } from '@tanstack/react-query'
import { getProductsByIdOptions } from '@/services/api/@tanstack/react-query.gen'

export const Route = createFileRoute('/_homeLayout/carts')({
  component: CartPage,
})

type carts = {
  productId: number,
  quantity: number
}[]


function CartPage() {

  const cartsData = localStorage.getItem("carts")
  let carts: carts = cartsData ? JSON.parse(cartsData) : []
  let cartData = []
  if (carts.length) {
    let cartsDetail = carts.map((item) => {
      const { data: product, isSuccess } = useQuery({
        ...getProductsByIdOptions({
          path: {
            id: Number(item.productId)
          }
        }),
        retry: false
      })
      if (isSuccess) {
        return { ...product, ...item }
      }
    })
    console.log(cartsDetail)
  }

  const [cartItems, setCartItems] = useState([
    {
      id: '001',
      name: 'Chrono Master 001',
      model: 'CM-001',
      image: cardimg,
      price: 89999,
      quantity: 1,
    },
    {
      id: '002',
      name: 'Chrono Master 002',
      model: 'CM-002',
      image: cardimg,
      price: 99999,
      quantity: 2,
    },
    {
      id: '003',
      name: 'Chrono Master 001',
      model: 'CM-001',
      image: cardimg,
      price: 89999,
      quantity: 1,
    },
  ])

  const increment = (id: string) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    )
  }

  const decrement = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row text-white px-4 sm:px-8 py-6 gap-6">
      <div className="flex-1 h-full overflow-y-auto pr-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-40 h-auto object-cover rounded-xl"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-400 mb-2">Model: {item.model}</p>
                    <p className="text-lg text-violet-400 mb-4">₹ {item.price}</p>
                  </div>

                  <div className="flex items-center flex-wrap  mb-4">
                    <button
                      onClick={() => decrement(item.id)}
                      className="rounded-s-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border border-zinc-600 ">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="rounded-e-md border border-violet-500 bg-violet-700 px-4 py-2 hover:bg-violet-800 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
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
        )}
      </div>

      <div className="w-full lg:w-80 h-fit sticky mt-14 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-lg mb-2">Total Items: {cartItems.length}</p>
          <p className="text-xl font-semibold text-violet-400">Total: ₹ {totalAmount}</p>
        </div>
        <button className="mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-full transition-all font-medium">
          Pay Now
        </button>
      </div>
    </div>
  )
}
