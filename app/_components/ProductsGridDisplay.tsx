"use client"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Food, Tag } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { Toaster } from "react-hot-toast"
const ProductTags = ({ product }: any) => {
  if (product.tags === undefined || product.tags.length === 0) return null
  return (
    <ul className="flex gap-2 flex-wrap pt-2">
      {product.tags.map((tag: any) => (
        <li key={tag.tag} className="text-xs font-medium  text-teal-200">
          {tag.tag}
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
  const [filteredProducts, setFilteredProducts] = useState<Food[]>(products)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [id, setId] = useState(0)
  const [blur, setBlur] = useState(false)
  console.log(products)
  return (
    <>
      <div className="py-4">
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
          className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-7 pr-3 text-gray-200 placeholder:text-gray-300  focus:text-gray-100 focus:ring-0 sm:text-lg sm:leading-6"
          placeholder="Search"
        />
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
            className="col-span-1  divide-y flex flex-col divide-zinc-50 rounded-lg  shadow border-zinc-100 border-2"
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
                <ProductTags product={product} />
              </div>
            </div>
            <div className="mt-auto">
              <div className="-mt-px flex divide-x divide-zinc-200 uppercase ">
                <div className="flex w-0 flex-1 text-teal-400">
                  <Link
                    href={`/user/products/${product.id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <PencilSquareIcon className="h-5 w-5 " aria-hidden="true" />
                    Edit
                  </Link>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-red-300 ">
                  <button
                    onClick={() => {
                      setOpen(true)
                      setName(product.name)
                      setId(product.id)
                    }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        name={name}
        id={id}
        setFilteredProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
        setBlur={setBlur}
      />
      <Toaster />
    </>
  )
}
