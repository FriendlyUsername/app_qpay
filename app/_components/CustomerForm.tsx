"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Category, Product, Restaurant, Tag } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useContext } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { MyInput } from "./MyInput"
import { CustomerProductList } from "./CustomerGrid"
import { OrderContext } from "./OrderContext"
import { NavBar } from "./CustomerNavBar"

const orderSchema = z.any()

export default function CustomerForm({
  restaurant,
  slug,
}: {
  restaurant: Restaurant & {
    products: (Product & {
      tags: Tag[]
    })[]
    categories: Category[]
  }
  slug: string
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  })
  const router = useRouter()
  const { order } = useContext(OrderContext)
  if (!restaurant) return <div className="text-white">no restaurant found</div>
  async function processForm(data: any) {
    console.log(data, "data from customer form")
    // TODO make this come from input
    data.status = "pending"
    data.id = slug
    data.order = order
    console.log(order.products, "order.foods")
    try {
      const res = await fetch("/api/addorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        const message = await res.json()
        toast.success(message.message)
      }
      if (res.status === 500) {
        toast.error("Something went wrong")
      }
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  console.log(order, "order from customer form")
  return (
    <div className="px-4 my-auto text-white flex flex-col pb-16">
      <NavBar slug={slug} />
      <div>
        <h2>Categories</h2>
        <div className="flex gap-4 text-white">
          {restaurant.categories.map((category: Category) => (
            <div key={category.id}>
              <h3 className="">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4">
        <form onSubmit={handleSubmit(processForm)}>
          <h2 className="text-2xl pb-4">Products</h2>
          <CustomerProductList products={restaurant.products} />
          {order?.products && (
            <div className="text-qpay-cyan text-md">
              {Array.from(
                new Set(order.products.map((product) => product.id))
              ).map((id) => {
                const foodName = order.products.find(
                  (product) => product.id === id
                )?.name
                const quantity = order.products.filter(
                  (product) => product.id === id
                ).length
                return (
                  <div className="flex gap-4" key={id}>
                    <p>Name:&quot;{foodName}&quot;</p>
                    <p>Quantity: {quantity}</p>
                  </div>
                )
              })}
            </div>
          )}
          <MyInput
            register={register}
            errors={errors}
            hidden={false}
            name="message"
          />
          <button
            className="fixed bottom-2 inset-x-0 max-w-max mx-auto bg-qpay-pink rounded-lg  px-4 py-2 text-zinc-900 font-bold text-center"
            type="submit"
          >
            order with {order?.products.length} items
          </button>
        </form>
      </div>
    </div>
  )
}
