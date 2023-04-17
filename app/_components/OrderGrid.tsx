import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/app-beta"
import OrderGridDisplay from "./OrderGridDisplay"

export const OrderGrid = async () => {
  return <OrderGridDisplay />
}
