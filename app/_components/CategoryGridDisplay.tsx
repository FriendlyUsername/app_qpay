"use client"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Category, Food } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { Toaster } from "react-hot-toast"
import DeleteCategoryModal from "./DeleteCategoryModal"
import { Ping } from "./Ping"

export default function CategoryGridDisplay({
  categories,
}: {
  categories: Category[]
}) {
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(categories)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [id, setId] = useState(0)
  const [blur, setBlur] = useState(false)
  return (
    <>
      <div className="py-4 ">
        <input
          type="text"
          onChange={(e) => {
            const filtered = categories.filter((category) => {
              return category.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            })
            setFilteredCategories(filtered)
          }}
          className="block max-w-md placeholder:text-zinc-300 py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
          placeholder="Search"
        />
      </div>
      <ul
        role="list"
        className={
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-white " +
          (blur ? " blur-sm" : "")
        }
      >
        {filteredCategories.map((category) => (
          <li
            key={category.id}
            className="col-span-1  divide-y flex flex-col divide-white rounded-lg  shadow border-qpay-cyan border-2"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center space-x-3">
                  <h3 className="truncate text-2xl font-medium ">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="-mt-px flex divide-x divide-gray-200 uppercase ">
                <div className="flex w-0 flex-1 text-white">
                  <Link
                    href={`/user/categories/${category.id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <div className="relative flex gap-2 items-center ">
                      Edit
                      <Ping status="pending" />
                    </div>
                  </Link>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-white ">
                  <button
                    onClick={() => {
                      setOpen(true)
                      setName(category.name)
                      setId(category.id)
                    }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <div className="relative flex gap-2 items-center ">
                      Delete
                      <Ping status="done" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DeleteCategoryModal
        open={open}
        setOpen={setOpen}
        name={name}
        id={id}
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        setBlur={setBlur}
      />
      <Toaster />
    </>
  )
}
