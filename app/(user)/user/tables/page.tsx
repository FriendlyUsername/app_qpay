import Heading from "@/app/_components/Heading"

export default async function Tables() {
  return (
    <>
      {/*@ts-expect-error Server Components :(        */}
      <Heading title="Tables" />
      <div className="">TablesPage</div>
    </>
  )
}
