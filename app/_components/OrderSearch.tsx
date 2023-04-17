"use client"

import { usePathname, useRouter } from "next/navigation"
import { startTransition, useState, useTransition } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export function OrderSearch() {
  let [focused, setFocused] = useState(false)
  let [isPending, setIsPending] = useTransition()
  let pathname = usePathname()
  let { replace } = useRouter()

  let handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search)
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    params.delete("page")
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="relative flex-1 max-w-md ">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
      </div>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="block py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <div className=""></div>}
    </div>
  )
}
