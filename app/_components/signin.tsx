"use client"

import { SignInButton } from "@clerk/nextjs"

export const MySignInButton = () => {
  return <SignInButton afterSignInUrl="/user" />
}
