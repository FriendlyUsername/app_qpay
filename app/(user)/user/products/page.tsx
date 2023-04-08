import Heading from "@/app/_components/Heading"

export default async function Products() {
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Products" />
      ProductsPage
    </div>
  )
}
