import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

type MyInputProps = {
  name: string
  register: any
  errors: any
  defaultValue?: string | string[]
  hidden: boolean
  type?: string
}
export const MyInput = (props: MyInputProps) => {
  const registerArgument =
    props.type === "number"
      ? { setValueAs: (v: any) => (v === "" ? undefined : parseInt(v, 10)) }
      : {}
  // console.log(props.errors, props.name)
  console.log(props.errors, "default value")
  return (
    <>
      <div className={"pb-4" + (props.hidden ? " hidden" : "")}>
        <label
          htmlFor={props.name}
          className={"text-lg  font-medium leading-6"}
        >
          <span className="pb-2 block"> {props.name}</span>
        </label>
        <input
          {...props.register(props.name, registerArgument)}
          name={props.name}
          className={
            "bg-transparent w-full rounded-md border-0 py-1.5 ring-gray-300 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" +
            (props.errors[props.name]?.message
              ? " ring-red-300 placeholder:text-red-300 focus:ring-red-500 text-red-100"
              : " placeholder:text-gray-400")
          }
          type={props.type || "text"}
          placeholder={props.name}
          defaultValue={props.defaultValue || ""}
        />

        {props.errors[props.name]?.message && (
          <div className={"relative mt-2 rounded-md shadow-sm"}>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-sm text-red-300" id="user-id-error">
              {props.errors[props.name]?.message.toString()}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
