"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Restaurant } from "@prisma/client"
import { useUser } from "@clerk/nextjs"
import { MyInput } from "./MyInput"

// TODO fine tune the valid inputs
const restaurantSchema = z.object({
  name: z.string().min(10),
  address: z.string().min(10),
  city: z.string().min(10),
  state: z.string().min(10),
  zip: z.string().min(10),
  user_id: z.string().min(10),
})
export const RestaurantForm = (props: {
  restaurant?: Restaurant
  method: "create" | "update"
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
  })
  const router = useRouter()
  const processForm = async (data: any) => {
    try {
      if (props.method === "create") {
        const res = await fetch("/api/addrestaurant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        console.log(res, "res in restaurant form")
      } else {
        const res = await fetch("/api/updaterestaurant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }
      router.refresh()
    } catch (error) {
      console.error(error)
    }
    if (props.method === "create") {
      reset()
    }
  }
  const user = useUser()
  return (
    <section>
      <h2 className="text-xl py-4">
        {props.method === "create" && "Create Restaurant"}{" "}
        {props.method === "update" && "Update Restaurant"}
      </h2>
      <form method="post" onSubmit={handleSubmit(processForm)}>
        <MyInput
          register={register}
          errors={errors}
          name="user_id"
          hidden={true}
          defaultValue={user?.user?.id || ""}
        />
        <MyInput
          register={register}
          errors={errors}
          name="name"
          hidden={false}
          defaultValue={props.restaurant?.city || ""}
        />

        <MyInput
          register={register}
          errors={errors}
          name="address"
          hidden={false}
          defaultValue={props.restaurant?.address || ""}
        />

        <MyInput
          register={register}
          errors={errors}
          name="state"
          hidden={false}
          defaultValue={props.restaurant?.state || ""}
        />

        <MyInput
          register={register}
          errors={errors}
          name="city"
          hidden={false}
          defaultValue={props.restaurant?.city || ""}
        />

        <MyInput
          register={register}
          errors={errors}
          name="zip"
          hidden={false}
          defaultValue={props.restaurant?.zip || ""}
        />

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Save
          </button>
          <button type="button" className="text-sm font-semibold leading-6 ">
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
