import { auth } from "@clerk/nextjs/app-beta"
const IsAuth = async () => {
  const self = await auth()
  if (!self) return <div> no User here</div>
  return <div> User here</div>
}

export default async function Home() {
  return (
    <div className="my-auto flex flex-col items-center justify-center">
      {/*@ts-expect-error Server Components :(        */}
      <IsAuth />
      userpage
    </div>
  )
}
