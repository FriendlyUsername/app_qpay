"use client"
import { useContext } from "react"
import { OrderContext } from "./OrderContext"
import Link from "next/link"

export default function CustomerOrderCart() {
  const { order } = useContext(OrderContext)
  return (
    <div className="">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold font-montserrat tracking-tight text-white">
          Current Order
        </h1>

        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul
              role="list"
              className="divide-y divide-zinc-600 border-b border-t border-zinc-600"
            >
              {order?.products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.img || ""}
                      alt={product.name + " image"}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm font-medium text-white">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            {product.description}
                          </p>
                        </div>

                        <p className="text-right text-sm font-medium text-white">
                          <div className="flex font-montserrat">
                            <div className="text-sm leading-snug text-white">
                              €
                            </div>

                            <div className="text-lg font-bold leading-snug text-white">
                              {product.price}
                            </div>
                          </div>
                        </p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>

                        <button
                          type="button"
                          className="ml-4 text-sm font-medium text-qpay-orange sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6 border-zinc-600 border-[1px] rounded-lg">
            <div className="rounded-lg  px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-zinc-200">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-white">
                      {order?.products.reduce((acc, product) => {
                        return acc + parseInt(product.price)
                      }, 0)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-qpay-pink px-4 py-3 text-base font-medium text-white shadow-sm  "
              >
                Order now
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or
                <Link href="#" className="font-medium text-qpay-cyan pl-2">
                  Continue Ordering
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
