import Link from "next/link"
import { UserButton } from "@clerk/nextjs/app-beta"
import SideBarNavLink from "@/app/_components/SidebarNavLink"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full">
      <nav className="flex basis-1/6 gap-8 px-8 pt-8 text-white border-r-2 border-gray-700">
        <div className="flex flex-col gap-8 py-8">
          <SideBarNavLink slug="restaurant">Restaurant</SideBarNavLink>
          <SideBarNavLink slug="addproduct">Add Product</SideBarNavLink>
          <SideBarNavLink slug="addcategory">Add Category</SideBarNavLink>
          <SideBarNavLink slug="categories">Categories</SideBarNavLink>
          <SideBarNavLink slug="products">Products</SideBarNavLink>
          <SideBarNavLink slug="orders">Orders</SideBarNavLink>
          <SideBarNavLink slug="tables">Tables</SideBarNavLink>
          <Link href="/customer/user_2O17ICXqJbosZTXpDCPIINMpF36">
            customer
          </Link>

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
