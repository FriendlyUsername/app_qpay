import React, { Suspense } from "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta"
import { MySignInButton } from "./signin"

// const AsyncVodsButton = async ({ slug }: { slug: string | undefined }) => {
//   const user = await currentUser();

//   if (user?.username === slug) return null;

//   return <GoToVodsButton user={user?.username} />;
// };

const TopRightNav = async ({ slug }: { slug: string | undefined }) => {
  return (
    <>
      <Suspense fallback={<div />}>
        {/** @ts-expect-error Async Server Component */}
        {/* <AsyncVodsButton slug={slug} /> */}
      </Suspense>
      <div className="flex h-12 w-12 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            layout: {
              logoPlacement: "none",
            },
            elements: {
              userButtonAvatarBox: "h-8 w-8 sm:h-12 sm:w-12",
            },
          }}
        />
      </div>
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
      <div className="flex h-16 w-full items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <SignedOut>
            <MySignInButton />
          </SignedOut>
          <SignedIn>
            {/* TODO: Make this fallback a skeleton with a profile picture since we know that much by now */}
            <Suspense fallback={<div />}>
              {/* @ts-expect-error Server Component */}
              <TopRightNav slug={slug} />
            </Suspense>
          </SignedIn>
        </div>
      </div>

      {/* Content */}
      {children}
    </>
  )
}
