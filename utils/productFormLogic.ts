import type { ProductForm } from "@/app/_components/AddProductForm"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export const handleUpload = async (
  data: ProductForm,
  method: "create" | "update",
  reset: any,
  router: any
) => {
  if (!data.file || data.file[0] === undefined) {
    try {
      if (method === "create") {
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
    if (method === "create") {
      reset()
    }
  } else {
    const responseData = await fetch("http://localhost:3000/api/uploadimage", {
      method: "POST",
      body: data.file[0],
    }).then((r) => {
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
