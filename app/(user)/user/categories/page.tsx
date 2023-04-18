import Heading from "@/app/_components/Heading"
import { Suspense } from "react"
import Loading from "./loading"
import { CategoryGrid } from "@/app/_components/CategoryGrid"

export default async function Restaurant() {
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error server components  */}
        <Heading title={"Categories"} />
        {/* @ts-expect-error server components  */}
        <CategoryGrid />
      </Suspense>
    </div>
  )
}
