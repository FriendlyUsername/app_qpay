"use client"
import type { Food, Tag } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { Toaster } from "react-hot-toast"
import { Ping } from "./Ping"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
const ProductTags = ({ tags }: { tags: Tag[] }) => {
  if (tags === undefined || tags.length === 0) return null
  return (
    <ul className="flex gap-2 flex-wrap pt-2">
      {tags.map((tag, ind) => (
        <li key={ind} className="text-xs font-medium  text-teal-200">
          {/* {tag.} */}
        </li>
      ))}
    </ul>
  )
}

export default function ProductsGridDisplay({
  products,
}: {
  products: (Food & {
    tags: Tag[]
  })[]
}) {
  const [filteredProducts, setFilteredProducts] = useState<
    (Food & {
      tags: Tag[]
    })[]
  >(products)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [id, setId] = useState(0)
  const [blur, setBlur] = useState(false)
  console.log(products, "products")
  return (
    <>
      <div className="py-4">
        <div className="relative flex-1 max-w-md ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
          </div>
          <input
            type="text"
            onChange={(e) => {
              const filtered = products.filter((product) => {
                return product.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              })
              setFilteredProducts(filtered)
            }}
            className=" max-w-md block py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
            placeholder="Search"
          />
        </div>
      </div>
      <ul
        role="list"
        className={
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-zinc-100 " +
          (blur ? " blur-sm" : "")
        }
      >
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className="col-span-1  divide-y flex flex-col divide-zinc-600 rounded-lg  shadow border-zinc-700 border-2"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center space-x-3">
                  <h3 className="truncate text-2xl font-medium text-zinc-50 ">
                    {product.name}
                  </h3>
                  <span className="inline-block flex-shrink-0 align-end text-zinc-50 px-2 py-0.5 text-xl font-medium ">
                    {product.price}€
                  </span>
                </div>
                <p className="mt-1 truncate text-sm ">{product.description}</p>
                <ProductTags tags={product.tags} />
              </div>
            </div>
            <div className="mt-auto">
              <div className="-mt-px flex divide-x divide-zinc-600 uppercase ">
                <div className="flex w-0 flex-1 text-white">
                  <Link
                    href={`/user/products/${product.id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    Edit
                    <Ping status="pending" />
                  </Link>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-white ">
                  <button
                    onClick={() => {
                      setOpen(true)
                      setName(product.name)
                      setId(product.id)
                    }}
                    className="uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    Delete
                    <Ping status="error" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <DeleteModal
        open={open}
        setOpen={setOpen}
        name={name}
        id={id}
        setFilteredProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
        setBlur={setBlur}
      /> */}
      <Toaster />
    </>
  )
}
