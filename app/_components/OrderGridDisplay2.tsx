// "use client"
// TODO Make server search work smoothly
import { TrashIcon } from "@heroicons/react/24/outline"
import type { Order } from "@prisma/client"
import { OrderSearch } from "./OrderSearch"
import { currentUser } from "@clerk/nextjs/app-beta"
import prisma from "@/utils/prisma"

export default async function OrderGridDisplay2({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(searchParams, "searchParams oben")
  // const [opendetails, setOpenDetails] = useState(false)
  // const [opendelete, setOpendelete] = useState(false)
  // const [id, setId] = useState(0)
  // const [blur, setBlur] = useState(false)
  const orders = await getOrders(searchParams)
  if (orders === "you should not be here")
    return <div>you should not be here</div>

  return (
    <>
      <div className="py-4">
        <OrderSearch />
        <div>{/* <button onClick={() => mutate()}>refresh</button> */}</div>
      </div>
      <ul
        role="list"
        className={
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-white " +
          (false ? " blur-sm" : "")
        }
      >
        {orders?.orders.map((order: Order) => (
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
                    // onClick={() => {
                    //   setOpenDetails(true)
                    //   setId(order.id)
                    // }}
                    className="relative uppercase inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
                  >
                    <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                    Edit
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1 text-red-300 ">
                  <button
                    // onClick={() => {
                    //   setOpendelete(true)
                    //   setId(order.id)
                    // }}
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
    </>
  )
}

async function getOrders(searchParams: any) {
  let search = searchParams?.search ?? ""
  let user = await currentUser()
  if (!user) {
    return "you should not be here"
  }
  const orders = prisma.restaurant.findFirst({
    where: {
      user_id: user.id,
    },
    select: {
      orders: {
        where: {
          OR: [
            {
              message: {
                contains: search,
              },
            },
            {
              status: {
                contains: search,
              },
            },
          ],
        },
      },
    },
  })
  return orders
}
