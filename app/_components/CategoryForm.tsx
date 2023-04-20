"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import type { Category } from "@prisma/client"
import { useUser } from "@clerk/nextjs"
import { MyInput, MyInputSkeleton } from "./MyInput"
import toast, { Toaster } from "react-hot-toast"

const categorySchema = z.object({
  name: z.string().min(1).max(50),
  restaurantId: z.string().min(1).max(50),
  id: z.string().min(1).max(50).optional(),
})
export const CategoryForm = (props: {
  method: "create" | "update"
  category?: Category
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
  })
  const router = useRouter()
  const processForm = async (data: any) => {
    try {
      if (props.method === "create") {
        const res = await fetch("/api/addcategory", {
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
      } else {
        const res = await fetch("/api/updatecategory", {
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
      {/* <h2 className="text-xl py-4">
        {props.method === "create" && "Create Food"}{" "}
        {props.method === "update" && "Update Food"}
      </h2> */}
      <form method="post" onSubmit={handleSubmit(processForm)} className="pt-4">
        <MyInput
          register={register}
          name="restaurantId"
          errors={errors}
          defaultValue={user?.user?.id || ""}
          hidden={true}
        />
        <MyInput
          hidden={false}
          register={register}
          name="name"
          defaultValue={props.category?.name?.toString() || ""}
          errors={errors}
        />
        <MyInput
          hidden={true}
          register={register}
          defaultValue={props.category?.id?.toString() || "0"}
          name="id"
          errors={errors}
        />

        <div className="pt-4 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className={
              "rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600" +
              (isSubmitting ? " opacity-50 cursor-not-allowed" : "")
            }
            disabled={isSubmitting}
          >
            Save
          </button>
          <button type="button" className="text-sm font-semibold leading-6 ">
            Cancel
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  )
}
export const AddCategorySkeleton = () => {
  return (
    <section>
      <MyInputSkeleton />
      <div className="pt-4 flex items-center justify-start gap-x-6">
        <button
          type="submit"
          className={
            "rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          }
        >
          Save
        </button>
        <button type="button" className="text-sm font-semibold leading-6 ">
          Cancel
        </button>
      </div>
    </section>
  )
}
