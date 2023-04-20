import { Food } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"

export const FoodCard = ({ food, href }: { food: Food; href: string }) => {
  console.log(food)
  return (
    <Link href={href} className="group block">
      <div className="space-y-2">
        {food.img && (
          <div className="relative">
            <Image
              src={food.img || "https://picsum.photos/200/400?grayscale"}
              width={400}
              placeholder="blur"
              height={200}
              className="rounded-xl max-h-[200px] grayscale group-hover:opacity-80"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+3/HPx10jQPE0+k6ZrPh6TTtKsbi41R7nVUiu7WeMkQxi2H3lk2su4sCrjBHFd54c+InhvxJ4e0vxFa3aRw6pawXSKxG5VnQOAfcA81474z8G+ENU1OeXU9Dsbt/N8zdNbRSHfn72WU/N79a9U03TtPj061jjtYkRIkAARQAAowAMV2Sa7GsIH//2Q=="
              alt={food.name}
            />
          </div>
        )}
        <div className="truncate text-sm font-medium text-white group-hover:text-vercel-cyan">
          {food.name}
        </div>
        <div className="flex">
          <div className="text-sm leading-snug text-white">€</div>
          <div className="text-lg font-bold leading-snug text-white">
            {food.price}
          </div>
        </div>
        <div className="text-zinc-400">{food.description}</div>
        {food.tags?.map((e, ind) => (
          <div key={ind} className="text-zinc-400">
            {e}
          </div>
        ))}
      </div>
    </Link>
  )
}
