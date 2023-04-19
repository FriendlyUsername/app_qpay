import { SkeletFoodForm } from "@/app/_components/AddFoodForm"
import Heading from "@/app/_components/Heading"

export default function Loading() {
  return (
    <>
      {/*@ts-expect-error  */}
      <Heading title="Add Product" />
      <SkeletFoodForm />
    </>
  )
}
