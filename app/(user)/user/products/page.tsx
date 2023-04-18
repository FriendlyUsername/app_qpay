import Heading from "@/app/_components/Heading"
import { Suspense } from "react"
import Loading from "./loading"
import ProductsGrid from "@/app/_components/ProductsGrid"

export default async function Restaurant() {
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        {/*@ts-expect-error Server Components :(        */}
        <Heading title={"Products"} />
        {/* @ts-expect-error server components  */}
        <ProductsGrid />
      </Suspense>
    </div>
  )
}
