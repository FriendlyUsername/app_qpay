import Heading from "@/app/_components/Heading"
import type { Product } from "@prisma/client"
import { AddProductForm } from "@/app/_components/AddProductForm"
import { currentUser } from "@clerk/nextjs/app-beta"
import prisma from "@/utils/prisma"
type ProductReturn =
  | "No user found"
  | "No food found"
  | {
      products: Product[]
    }
  | null
const ShowFood = ({ product }: { product: ProductReturn }) => {
  if (product === "No user found") return <div>not logged in</div>
  if (product === "No food found" || product === null)
    return <div>no Product found go create one :)</div>
  console.log(product, "logging foof from ShowFood")

  return <AddProductForm method="update" product={product.products[0]} />
}

export default async function Restaurant({ params }: { params: any }) {
  const product: ProductReturn = await getProduct(params)
  return (
    <div className="">
      {/*@ts-expect-error Server Components :(        */}
      <Heading title={`Edit ${food?.foods[0]?.name}`} />
      {/* <Suspense fallback={<Loading />}> */}
      {/* {!restaurant && <RestaurantForm method="create" />}
        {restaurant && (
          <RestaurantForm restaurant={restaurant} method="update" />
        )} */}
      {/* <ProductsGrid /> */}
      <ShowFood product={product} />
      {/* </Suspense> */}
    </div>
  )
}

async function getProduct(params: any) {
  const user = await currentUser()
  if (!user) return "No user found"
  try {
    const data = await prisma.restaurant.findFirst({
      where: {
        user_id: user.id,
      },
      select: {
        products: {
          where: {
            id: parseInt(params.slug),
          },
        },
      },
    })
    return data
  } catch (err) {
    console.log(err)
    return "No food found"
  }
}
