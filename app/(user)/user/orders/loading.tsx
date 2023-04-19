import Heading from "@/app/_components/Heading"
import { Ping } from "@/app/_components/Ping"
import { ProductSkelet } from "@/app/_components/ProductSkelet"
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"

const status = ["pending", "in progress", "done"]

export default function Loading({
  titleLoaded = false,
}: {
  titleLoaded: boolean
}) {
  return (
    <>
      {/*@ts-expect-error  */}
      {!titleLoaded && <Heading title="Orders" />}
      <section className="">
        <div className="py-4">
          <div className="relative flex-1 max-w-md ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="text"
              className="block py-2 w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-zinc-200 focus:border-qpay-pink focus:ring-2 focus:ring-qpay-pink focus-visible:ring-qpay-pink focus-visible:ring-2"
              placeholder="Search"
            />
          </div>
          <div className="pt-4 flex gap-4 max-w-xl">
            {status.map((status) => {
              return (
                <div key={status} className="flex relative">
                  <button
                    key={status}
                    className={`bg-gray-600 relative text-white rounded-md px-3 py-1.5 text-sm font-medium`}
                  >
                    {status}
                  </button>
                  <div className="absolute -top-1 -right-1">
                    {status === "pending" && <Ping status="pending" />}

                    {status === "in progress" && <Ping status="in progress" />}

                    {status === "done" && <Ping status="done" />}
                  </div>
                </div>
              )
            })}
            <div>
              <button className="bg-qpay-blue flex gap-1 align-center items-center text-white rounded-md px-3 py-1.5 text-sm font-medium ">
                <ArrowPathIcon className="h-4 w-4" />
                <span>refresh</span>
              </button>
            </div>
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
