import CustomerOrderCart from "@/app/_components/CustomerOrderCart"

export default async function Home(params: { params: { slug: string } }) {
  return <CustomerOrderCart />
}
