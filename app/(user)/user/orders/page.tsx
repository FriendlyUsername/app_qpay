import Heading from "@/app/_components/Heading"
import { OrderGrid } from "@/app/_components/OrderGrid"

export default async function Orders() {
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Orders" />
      {/*@ts-expect-error Server Components :(        */}
      <OrderGrid />
    </div>
  )
}
