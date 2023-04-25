"use client"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

export default function SideBarNavLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment
  return (
    <Link
      href={`/user/${slug}`}
      // Change style depending on whether the link is active
      style={{ fontWeight: isActive ? "bold" : "normal" }}
      className={
        `block rounded-md px-3 py-2 text-md font-medium hover:text-gray-300 ` +
        (isActive ? "text-white" : "text-zinc-400 hover:bg-zinc-800")
      }
    >
      {children}
    </Link>
  )
}
