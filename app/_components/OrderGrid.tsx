import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import OrderGridDisplay2 from "./OrderGridDisplay2"

export const OrderGrid = async () => {
  // @ts-expect-error
  return <OrderGridDisplay2 />
}
