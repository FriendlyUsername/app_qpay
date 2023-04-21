import Heading from "@/app/_components/Heading"
import { Suspense } from "react"
import Loading from "../loading"
import type { Category } from "@prisma/client"
import { currentUser } from "@clerk/nextjs/app-beta"
import prisma from "@/utils/prisma"
import { CategoryForm } from "@/app/_components/CategoryForm"
import Link from "next/link"
type CategoryReturn =
  | "No user found"
  | "No category found"
  | {
      categories: Category[]
    }
  | null
const ShowCategory = ({
  category,
}: {
  category: {
    categories: Category[]
  }
}) => {
  return <CategoryForm method="update" category={category?.categories[0]} />
}

export default async function Category({ params }: { params: any }) {
  const category: CategoryReturn = await getCategory(params)

  if (category === "No user found") return <div>not logged in</div>
  if (
    category === "No category found" ||
    category === null ||
    category.categories.length === 0
  )
    return (
      <div>
        no Category found{" "}
        <Link href={"/user/addcategory"}> go create one :)</Link>
      </div>
    )

  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title={`Edit ${category?.categories[0]?.name}`} />
      <Suspense fallback={<Loading />}>
        <ShowCategory category={category} />
      </Suspense>
    </div>
  )
}

async function getCategory(params: { slug: string }) {
  const user = await currentUser()
  if (!user) return "No user found"
  try {
    const data = await prisma.restaurant.findFirst({
      where: {
        user_id: user.id,
      },
      select: {
        categories: {
          where: {
            id: parseInt(params.slug),
          },
        },
      },
    })
    return data
  } catch (err) {
    console.log(err)
    return "No category found"
  }
}
