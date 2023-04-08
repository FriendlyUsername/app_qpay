export default async function Heading(props: { title: string }) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {props.title}
      </h3>
    </div>
  )
}
