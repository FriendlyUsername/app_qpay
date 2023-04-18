"use client"
import { useUser } from "@clerk/nextjs"
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Order } from "@prisma/client"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import useSWR from "swr"
import DeleteOrderModal from "./DeleteOrderModal"
import OrderDetailsModal from "./OrderDetailsModal"
import { Ping } from "./Ping"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import Loading from "../(user)/user/products/loading"
//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

const status = ["pending", "in progress", "done"]

export default function OrderGridDisplay() {
  const [opendetails, setOpenDetails] = useState(false)
  const [opendelete, setOpendelete] = useState(false)
  const [id, setId] = useState(0)
  const [blur, setBlur] = useState(false)
  const user = useUser()

  //  TODO dont auto refresh during search or filter
  const { data, error, mutate, isLoading } = useSWR(
    `/api/orders/${user?.user?.id}`,
    fetcher,
    {
      refreshInterval: 3000,
      onSuccess: () => {
        setFilteredOrders(data?.orders || [])
      },
    }
  )
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(
    data?.orders || []
  )
  if (isLoading) return <Loading />
  if (error) return <div className="pt-4">Error</div>

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
            className="block py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
            placeholder="Search"
          />
        </div>
        <div className="pt-4 flex gap-4">
          {status.map((status) => {
            return (
              <div key={status} className="flex relative">
                <button
                  key={status}
                  onClick={() => {
                    const filtered = data?.orders.filter((order: Order) => {
                      return order.status === status
                    })
                    setFilteredOrders(filtered)
                  }}
                  className="bg-gray-600 relative text-white rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  {`${status} (${
                    data?.orders?.filter(
                      (order: Order) => order.status === status
                    ).length
                  }) `}
                </button>
                <div className="absolute -top-1 -right-1">
                  {status === "pending" && <Ping status="pending" />}

                  {status === "in progress" && <Ping status="in progress" />}

                  {status === "done" && <Ping status="done" />}
                </div>
              </div>
            )
          })}
        </div>
        <div>
          <button
            className="bg-qpay-blue flex gap-1 align-center items-center text-white rounded-md px-3 py-1.5 text-sm font-medium mt-4"
            onClick={() => mutate()}
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>refresh</span>
          </button>
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
              (order.status === "pending" ? " border-qpay-cyan" : "  ") +
              (order.status === "in progress" ? " border-qpay-orange" : "  ") +
              (order.status === "done" ? " border-qpay-violet" : "  ")
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
                <div className="flex w-0 flex-1 text-white">
                  <button
                    onClick={() => {
                      setOpenDetails(true)
                      setId(order.id)
                    }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    Edit
                    <Ping status="pending" />
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-white ">
                  <button
                    onClick={() => {
                      setOpendelete(true)
                      setId(order.id)
                    }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
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
