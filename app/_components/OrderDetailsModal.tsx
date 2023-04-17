"use client"
import { Transition, Dialog } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, Fragment, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { MyInput } from "./MyInput"
import { Food } from "@prisma/client"

const deleteSchema = z.object({
  id: z.string().min(1).max(50),
})

export default function OrderDetailsModal({
  open,
  setOpen,
  name,
  id,
  setBlur,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  name: string
  id: number
  setBlur: Dispatch<SetStateAction<boolean>>
}) {
  const cancelButtonRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(deleteSchema),
  })
  setBlur(isSubmitting ? true : false)

  async function prozessForm(data: any) {
    console.log(data, "data")
    try {
      const res = await fetch("/api/editorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        const message = await res.json()
        toast.success(message.message)
        // remove from list
      }
      if (res.status === 500) {
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
    reset()
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <form method="post" onSubmit={handleSubmit(prozessForm)}>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <MyInput
                      name="id"
                      register={register}
                      hidden={true}
                      errors={errors}
                      defaultValue={id.toString()}
                    />
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Delete {name} {id}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Delete {name}? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  )
}
