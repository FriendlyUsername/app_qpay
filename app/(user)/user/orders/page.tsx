import Heading from "@/app/_components/Heading"

export default async function Orders() {
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Orders" />
      OrdersPage
    </div>
  )
}
