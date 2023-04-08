import { auth } from "@clerk/nextjs/app-beta"
import { UserId } from "../_components/userid"
const IsAuth = async () => {
  const self = await auth()
  if (!self) return <div> no User here</div>
  return <div> User here</div>
}

export default async function Home() {
  return (
    <div className="my-auto flex flex-col items-center justify-center">
      <UserId />
      {/*@ts-expect-error Server Components :(        */}
      <IsAuth />
      Home
    </div>
  )
}
