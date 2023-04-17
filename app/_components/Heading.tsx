export default async function Heading(props: { title: string; icon?: any }) {
  return (
    <div className="border-b border-gray-600 pb-5">
      <h3 className="text-3xl flex gap-3 text-teal-300 font-semibold leading-6 ">
        {props.title}
        {props.icon}
      </h3>
    </div>
  )
}
