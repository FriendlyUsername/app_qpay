import Heading from "@/app/_components/Heading"
import { CategoryGrid } from "@/app/_components/CategoryGrid"

export default async function Restaurant() {
  return (
    <div className="">
      {/* @ts-expect-error server components  */}
      <Heading title={"Categories"} />
      {/* @ts-expect-error server components  */}
      <CategoryGrid />
    </div>
  )
}
