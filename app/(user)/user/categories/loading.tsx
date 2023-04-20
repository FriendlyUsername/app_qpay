import Heading from "@/app/_components/Heading"
import { ProductSkelet } from "@/app/_components/ProductSkelet"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

export default function Loading() {
  return (
    <>
      {/*@ts-expect-error  */}
      <Heading title="Categories" />
      <section className="">
        <div className="py-4">
          <div className="relative flex-1 max-w-md ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="text"
              className="max-w-md block py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
              placeholder="Search"
            />
          </div>
        </div>
        <ul
          role="list"
          className={
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-zinc-100 "
          }
        >
          {Array(12)
            .fill("loop")
            .map((e, i) => (
              <ProductSkelet key={i} />
            ))}
        </ul>
      </section>
    </>
  )
}
