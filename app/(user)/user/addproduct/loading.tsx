import { SkeletProductForm } from "@/app/_components/AddProductForm"
import Heading from "@/app/_components/Heading"

export default function Loading() {
  return (
    <>
      {/*@ts-expect-error  */}
      <Heading title="Add Product" />
      <SkeletProductForm />
    </>
  )
}
