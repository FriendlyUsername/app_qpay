import Link from "next/link"

export const NavBar = ({ slug }: { slug: string }) => {
  return (
    <div className="flex flex-row justify-between py-4">
      <div>
        <Link href={`/customer/${slug}`} className="text-white">
          Home
        </Link>
      </div>
      <div>
        {/*TODO link to actual order  */}
        <Link href={`/customer/${slug}/order`} className="text-white">
          Cart
        </Link>
      </div>
    </div>
  )
}
