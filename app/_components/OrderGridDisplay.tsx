// "use client"
import { useUser } from "@clerk/nextjs"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Category, Food, Order } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import useSWR from "swr"
import DeleteOrderModal from "./DeleteOrderModal"
import OrderDetailsModal from "./OrderDetailsModal"
const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

const status = ["pending", "in progress", "done"]

export default function OrderGridDisplay() {
  const [opendetails, setOpenDetails] = useState(false)
  const [opendelete, setOpendelete] = useState(false)
  const [id, setId] = useState(0)
  const [blur, setBlur] = useState(false)
  const user = useUser()

  const { data, error, mutate, isLoading } = useSWR(
    `/api/orders/${user?.user?.id}`,
    fetcher,
    {
      refreshInterval: 13000,
      onSuccess: () => {
        setFilteredOrders(data?.orders || [])
      },
    }
  )
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(
    data?.orders || []
  )
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      <div className="py-4">
        <input
          type="text"
          onChange={(e) => {
            const filtered = data?.orders.filter((order: Order) => {
              return (
                order.message
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                order.status
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            })
            setFilteredOrders(filtered)
          }}
          className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-7 pr-3 text-gray-200 placeholder:text-gray-300  focus:text-gray-100 focus:ring-0 sm:text-lg sm:leading-6"
          placeholder="Search"
        />
        <div className="pt-4 flex gap-4">
          {status.map((status) => {
            return (
              <button
                key={status}
                onClick={() => {
                  const filtered = data?.orders.filter((order: Order) => {
                    return order.status === status
                  })
                  setFilteredOrders(filtered)
                }}
                className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm font-medium"
              >{`${status} (${
                data?.orders.filter((order: Order) => order.status === status)
                  .length
              })`}</button>
            )
          })}
        </div>
        <div>
          <button onClick={() => mutate()}>refresh</button>
        </div>
      </div>
      <ul
        role="list"
        className={
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-white " +
          (blur ? " blur-sm" : "")
        }
      >
        {filteredOrders.map((order: Order) => (
          <li
            key={order.id}
            className={
              "col-span-1  divide-y flex flex-col divide-white rounded-lg  shadow  border-2" +
              (order.status === "pending"
                ? " border-green-400"
                : " border-white ")
            }
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center space-x-3">
                  <h3 className="truncate text-2xl font-medium ">
                    {order.message}
                  </h3>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="-mt-px flex divide-x divide-gray-200 uppercase ">
                <div className="flex w-0 flex-1 text-teal-400">
                  <button
                    onClick={() => {
                      setOpenDetails(true)
                      setId(order.id)
                    }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                    Edit
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-red-300 ">
                  <button
                    onClick={() => {
                      setOpendelete(true)
                      setId(order.id)
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
      <OrderDetailsModal
        open={opendetails}
        setOpen={setOpenDetails}
        id={id}
        setBlur={setBlur}
        name={"some name"}
      />
      <DeleteOrderModal
        open={opendelete}
        setOpen={setOpendelete}
        id={id}
        setBlur={setBlur}
      />
      <Toaster />
    </>
  )
}
