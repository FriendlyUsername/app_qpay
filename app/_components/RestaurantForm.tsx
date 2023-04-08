"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { Restaurant } from "@prisma/client"
import { useUser } from "@clerk/nextjs"

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
        console.log(res, "res")
      } else {
        console.log("doing this")
        const res = await fetch("/api/updaterestaurant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        console.log(res, "res")
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
        <div>
          <label
            htmlFor="user_id"
            className="block text-sm hidden font-medium leading-6 text-gray-900"
          >
            user_id
          </label>
          <input
            {...register("user_id", { required: true })}
            name="user_id"
            className={
              "block bg-transparent hidden  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.user_id?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder={"user_id"}
            defaultValue={user?.user?.id}
          />

          {errors.user_id?.message && (
            <div className="relative mt-2 hidden rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="user-id-error">
                {errors.user_id?.message.toString()}
              </p>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            name="name"
            className={
              "block bg-transparent  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.name?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder={"name"}
            defaultValue={props.restaurant?.name || ""}
          />

          {errors.name?.message && (
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="name-error">
                {errors.name?.message.toString()}
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Adress
          </label>

          <input
            {...register("address", { required: true })}
            name="address"
            className={
              "block bg-transparent  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.address?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder={"address"}
            defaultValue={props.restaurant?.address || ""}
          />

          {errors.address?.message && (
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="address-error">
                {errors.address?.message.toString()}
              </p>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            State
          </label>
          <input
            {...register("state", { required: true })}
            name="state"
            className={
              "block bg-transparent  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.state?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder={"state"}
            defaultValue={props.restaurant?.state || ""}
          />

          {errors.state?.message && (
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="state-error">
                {errors.state?.message.toString()}
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <input
            {...register("city", { required: true })}
            name="city"
            className={
              "block bg-transparent  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.city?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder="name"
            defaultValue={props.restaurant?.city || ""}
          />

          {errors.city?.message && (
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="city-error">
                {errors.city?.message.toString()}
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="zip"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Zip
          </label>
          <input
            {...register("zip", { required: true })}
            name="zip"
            className={
              "block bg-transparent  w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
              (errors.zip?.message
                ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-900"
                : " text-gray-900 placeholder:text-gray-400")
            }
            type="text"
            placeholder="zip"
            defaultValue={props.restaurant?.zip || ""}
          />

          {errors.zip?.message && (
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-red-600" id="zip-error">
                {errors.zip?.message.toString()}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
