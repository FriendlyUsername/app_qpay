"use client"

import type { Product } from "@prisma/client"
import { Dispatch, createContext, useReducer } from "react"
import toast, { Toaster } from "react-hot-toast"

const reducer = (state: Order, action: Action) => {
  switch (action.type) {
    case "add":
      const existingFoodIndex = state.products.findIndex(
        (productItem) => productItem.id === action.product.id
      )
      if (existingFoodIndex !== -1) {
        const updatedProducts = [...state.products]
        updatedProducts.splice(existingFoodIndex + 1, 0, { ...action.product })
        toast.success("Added to order")
        return {
          products: updatedProducts,
        }
      } else {
        toast.success(`Added to order`)
        return {
          products: [...state.products, { ...action.product }],
        }
      }

    case "remove":
      const index = state.products.findIndex(
        (productItem) => productItem.id === action.product.id
      )
      if (index !== -1) {
        const updatedProducts = [...state.products]
        updatedProducts.splice(index, 1)
        toast.success("Removed from order")
        return {
          products: updatedProducts,
        }
      } else {
        return state
      }
    // case "note":
    //   return {
    //     foods: state.foods.map((foodItem) => {
    //       if (foodItem.food.id === action.food.id) {
    //         return { food: action.food, note: action.note }
    //       } else {
    //         return foodItem
    //       }
    //     }),
    //   }
    default:
      return state
  }
}

type Order = {
  products: Product[]
}

type Action =
  | { type: "add"; product: Product }
  | { type: "remove"; product: Product }
//   | { type: "note"; food: Food; note: string }

const initialState: Order = {
  products: [],
}
export const OrderContext = createContext<{
  order: Order
  dispatch: Dispatch<Action>
}>({
  order: initialState,
  dispatch: () => {},
})

export default function OrderProvider({ children }: any) {
  const [order, dispatch] = useReducer(reducer, initialState)
  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      {children}
      <Toaster
        toastOptions={{
          success: {
            style: {
              padding: "16px",
              color: "#FFFFFF",
              background: "#111827",
              fontFamily: "Inter",
            },
          },
        }}
      />
    </OrderContext.Provider>
  )
}
