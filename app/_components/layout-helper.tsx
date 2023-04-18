import React from "react"

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
