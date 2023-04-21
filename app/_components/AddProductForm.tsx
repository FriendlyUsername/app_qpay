"use client"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import type { Product } from "@prisma/client"
import { MyInput, MyInputSkeleton } from "./MyInput"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import toast, { Toaster } from "react-hot-toast"

const productSchema = z.object({
  name: z.string().min(1).max(50),
  price: z.number(),
  description: z.string().min(1).max(50),
  id: z.string().min(1).max(50).optional(),
  tags: z
    .array(
      z.object({
        tag: z.string().min(1).max(50),
      })
    )
    .optional(),
})
export const AddProductForm = (props: {
  method: "create" | "update"
  product?: Product
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
  })
  const { fields, append } = useFieldArray({
    control,
    name: "tags", // unique name for your Field Array
  })
  const router = useRouter()
  const processForm = async (data: any) => {
    try {
      if (props.method === "create") {
        const res = await fetch("/api/addproduct", {
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
        const res = await fetch("/api/updateproduct", {
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

  return (
    <section>
      {/* <h2 className="text-xl py-4">
        {props.method === "create" && "Create Food"}{" "}
        {props.method === "update" && "Update Food"}
      </h2> */}
      <form method="post" onSubmit={handleSubmit(processForm)} className="pt-4">
        {props.method === "update" && (
          <MyInput
            register={register}
            name="id"
            errors={errors}
            defaultValue={props.product?.id?.toString() || ""}
            hidden={true}
          />
        )}
        <MyInput
          hidden={false}
          register={register}
          name="name"
          defaultValue={props.product?.name?.toString() || ""}
          errors={errors}
        />
        <MyInput
          hidden={false}
          register={register}
          defaultValue={props.product?.description?.toString() || ""}
          name="description"
          errors={errors}
        />
        <MyInput
          hidden={false}
          register={register}
          name="price"
          defaultValue={props.product?.price?.toString() || "0"}
          errors={errors}
          type="number"
        />
        {fields.map((field, index) => (
          <div key={field.id} className="pb-4">
            <input
              {...register(`tags.${index}.tag` as const)}
              defaultValue={`tags.${index}.tag`}
              placeholder="enter tag"
              className={
                "block py-2 w-full max-w-md mb-2 rounded-full border-none bg-zinc-600 pl-5 font-medium text-zinc-200" +
                // @ts-ignore
                (errors?.tags?.[index]?.tag.message
                  ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-100"
                  : " placeholder:text-gray-400")
              }
            />
            {/*@ts-ignore  */}
            {errors?.tags?.[index]?.tag.message && (
              <div className={"relative mt-2 rounded-md shadow-sm"}>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-2 text-sm text-red-300" id="user-id-error">
                  {/*@ts-ignore  */}
                  {errors?.tags?.[index]?.tag.message.toString()}
                </p>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ tag: "enter tag" })}
          className={
            "rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600" +
            (isSubmitting ? " opacity-50 cursor-not-allowed" : "")
          }
          disabled={isSubmitting}
        >
          Add Tag
        </button>

        <div className="mt-6 flex items-center justify-start gap-x-6">
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

export const SkeletProductForm = () => {
  return (
    <section className="animate-pulse blur-sm">
      {/* <h2 className="text-xl py-4">
        {props.method === "create" && "Create Food"}{" "}
        {props.method === "update" && "Update Food"}
      </h2> */}
      <form method="post" className="pt-4">
        <MyInputSkeleton />
        <MyInputSkeleton />
        <MyInputSkeleton />
        <button
          type="button"
          className={
            "rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          }
        >
          Add Tag
        </button>

        <div className="mt-6 flex items-center justify-start gap-x-6">
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
      </form>
      <Toaster />
    </section>
  )
}
