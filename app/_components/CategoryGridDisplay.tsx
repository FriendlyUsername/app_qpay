"use client"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Category, Food } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { Toaster } from "react-hot-toast"
import DeleteCategoryModal from "./DeleteCategoryModal"

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
      <div className="py-4">
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
          className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-7 pr-3 text-gray-200 placeholder:text-gray-300  focus:text-gray-100 focus:ring-0 sm:text-lg sm:leading-6"
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
            className="col-span-1  divide-y flex flex-col divide-white rounded-lg  shadow border-white border-2"
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
                <div className="flex w-0 flex-1 text-teal-400">
                  <Link
                    href={`/user/categories/${category.id}`}
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
                      setName(category.name)
                      setId(category.id)
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
