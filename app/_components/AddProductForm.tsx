"use client"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import type { Product } from "@prisma/client"
import { MyInput, MyInputSkeleton } from "./MyInput"
import { ExclamationCircleIcon, PhotoIcon } from "@heroicons/react/20/solid"
import toast, { Toaster } from "react-hot-toast"

const productSchema = z.object({
  name: z.string().min(1).max(50),
  price: z.number(),
  description: z.string().min(1).max(50),
  id: z.string().min(1).max(50).optional(),
  file: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  tags: z
    .array(
      z.object({
        tag: z.string().min(1).max(50),
      })
    )
    .optional(),
})
type ProductForm = z.infer<typeof productSchema>
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
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  })
  const { fields, append } = useFieldArray({
    control,
    name: "tags", // unique name for your Field Array
  })
  const router = useRouter()
  const processForm: SubmitHandler<ProductForm> = async (data) => {
    // no image uploaded
    if (!data.file || data.file[0] === undefined) {
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
          } else {
            toast.error("Something went wrong")
          }
        } else {
          const res = await fetch("/api/updateproduct", {
            method: "POST",
            body: JSON.stringify(data),
          })
          if (res.status === 200) {
            const message = await res.json()
            toast.success(message.message)
          } else {
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
    } else {
      const responseData = await fetch(
        "http://localhost:3000/api/uploadimage",
        {
          method: "POST",
          body: data.file[0],
        }
      ).then((r) => {
        return r.json() as Promise<{ secure_url: string; error?: string }>
      })
      if (responseData.error) {
        toast.error(responseData.error)
      } else {
        data.file = responseData.secure_url
        const res = await fetch("/api/addproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (res.status === 200) {
          const message = await res.json()
          toast.success(message.message)
        } else {
          toast.error("Something went wrong")
        }
      }
    }
  }

  return (
    <section>
      {/* <h2 className="text-xl py-4">
        {props.method === "create" && "Create Food"}{" "}
        {props.method === "update" && "Update Food"}
      </h2> */}
      <form
        method="post"
        onSubmit={handleSubmit(processForm)}
        className="pt-4 max-w-md"
      >
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
        <div className="col-span-full pb-4">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-white"
          >
            Product Image
          </label>
          <div className=" mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-500"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-400">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer rounded-md bg-zinc-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-qpay-cyan focus-within:ring-offset-2 focus-within:ring-offset-zinc-900 hover:text-qpay-cyan"
                >
                  <span>Upload a file</span>
                  <input
                    {...register("file")}
                    name="file"
                    type="file"
                    // className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-zinc-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="pb-4">
            <input
              {...register(`tags.${index}.tag` as const)}
              defaultValue={`tags.${index}.tag`}
              placeholder="enter tag"
              className={
                "block py-2 w-full max-w-md mb-2 placeholder:text-zinc-400 rounded-full border-none bg-zinc-600 pl-5 font-medium text-zinc-200" +
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
