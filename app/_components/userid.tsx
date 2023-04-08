"use client"

import { useUser } from "@clerk/nextjs"

export const UserId = () => {
  const { user } = useUser()
  return <div>{user?.id}</div>
}
