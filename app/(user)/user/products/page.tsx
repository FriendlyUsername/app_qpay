import Heading from "@/app/_components/Heading"
import ProductsGrid from "@/app/_components/ProductsGrid"

export default async function Restaurant() {
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title={"Products"} />
      {/* @ts-expect-error server components  */}
      <ProductsGrid />
    </div>
  )
}
