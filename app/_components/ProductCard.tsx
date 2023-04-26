"use client"
import { useContext } from "react"
import { OrderContext } from "./OrderContext"
import Image from "next/image"
import type { Product, Tag } from "@prisma/client"

export const ProductCard = ({
  product,
}: {
  product: Product & {
    tags: Tag[]
  }
  href: string
}) => {
  const { dispatch, order } = useContext(OrderContext)
  if (!product) return null
  return (
    <article className="group block">
      <div className="space-y-2">
        {product?.img && (
          <div className="relative">
            <Image
              src={product.img || "https://picsum.photos/200/400?grayscale"}
              width={400}
              placeholder="blur"
              height={200}
              className="rounded-xl max-h-[200px] group-hover:opacity-80"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+3/HPx10jQPE0+k6ZrPh6TTtKsbi41R7nVUiu7WeMkQxi2H3lk2su4sCrjBHFd54c+InhvxJ4e0vxFa3aRw6pawXSKxG5VnQOAfcA81474z8G+ENU1OeXU9Dsbt/N8zdNbRSHfn72WU/N79a9U03TtPj061jjtYkRIkAARQAAowAMV2Sa7GsIH//2Q=="
              alt={product.name}
            />
          </div>
        )}
        <div className=" flex justify-between truncate text-md uppercase font-medium text-white group-hover:text-vercel-cyan">
          <h3>{product.name}</h3>
          <p className="ml-2 text-md text-zinc-400">
            {order.products.filter((f) => f.id === product.id).length}
          </p>
        </div>
        <div className="flex font-montserrat">
          <div className="text-sm leading-snug text-white">€</div>
          <div className="text-lg font-bold leading-snug text-white">
            {product.price}
          </div>
        </div>
        <div className="text-zinc-400">{product.description}</div>
        <div className="grid grid-cols-2 ">
          <div className="gap-2">
            {product.tags?.map((tag: any) => (
              <p
                key={tag.id}
                className="inline-block px-1 text-sm font-medium text-qpay-cyan"
              >
                {" "}
                {tag.name}
              </p>
            ))}
          </div>

          <div className="ml-auto flex justify-end gap-4 basis-1/2">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "remove",
                  product: product,
                })
              }
              className="text-qpay-orange border-[1px] rounded-lg px-6 py-1 border-zinc-600 h-8 self-end"
            >
              -
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "add",
                  product: product,
                })
              }
              className="text-qpay-cyan border-[1px] rounded-lg px-6 py-1 border-zinc-600 h-8 self-end"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
