import { AddCategorySkeleton } from "@/app/_components/CategoryForm"
import Heading from "@/app/_components/Heading"

export default function Loading() {
  return (
    <>
      {/*@ts-expect-error  */}
      <Heading title="Add Category" />
      <section className="blur-sm animate-pulse pt-4">
        <AddCategorySkeleton />
      </section>
    </>
  )
}
