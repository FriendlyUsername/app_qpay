import Link from "next/link"
import { UserButton } from "@clerk/nextjs/app-beta"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full">
      <nav className="flex basis-1/6 gap-8 px-8 pt-8 text-white border-r-2 border-gray-700">
        <div className="flex flex-col gap-8 py-8">
          <Link href={"/user/restaurant"}>Restaurant</Link>
          <Link href={"/user/addproduct"}>Add Product</Link>
          <Link href={"/user/addcategory"}>Add Category</Link>
          <Link href={"/user/categories"}>Categories</Link>
          <Link href={"/user/products"}>Products</Link>
          <Link href={"/user/orders"}>Orders</Link>
          <Link href={"/user/tables"}>Tables</Link>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              layout: {
                logoPlacement: "none",
              },
              elements: {
                rootBox: "mt-auto",
                userButtonAvatarBox: "h-8 w-8 sm:h-12 sm:w-12",
              },
            }}
          />
        </div>
      </nav>
      <div className="min-h-full basis-5/6 pl-8 pt-8">
        <div className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-zinc-100">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
