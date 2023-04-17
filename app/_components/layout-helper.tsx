import React, { Suspense } from "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta"
import { MySignInButton } from "./signin"
import Link from "next/link"

// const AsyncVodsButton = async ({ slug }: { slug: string | undefined }) => {
//   const user = await currentUser();

//   if (user?.username === slug) return null;

//   return <GoToVodsButton user={user?.username} />;
// };

const TopRightNav = async ({ slug }: { slug: string | undefined }) => {
  return (
    <>
      <div className="flex h-12 w-12 items-center"></div>
    </>
  )
}

export const LayoutHelper = async ({
  children,
  slug,
}: {
  children: React.ReactNode
  slug?: string
}) => {
  return (
    <>
      {/* Header */}

      {/* Content */}
      {children}
    </>
  )
}
