import Heading from "@/app/_components/Heading"
import { OrderGrid } from "@/app/_components/OrderGrid"
import OrderGridDisplay2 from "@/app/_components/OrderGridDisplay2"

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(searchParams, "searchParams weiter oben")
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Orders" />
      {/*@ts-expect-error Server Components :(        */}
      <OrderGridDisplay2 searchParams={searchParams} />
    </div>
  )
}
