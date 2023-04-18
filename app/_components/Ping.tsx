type PingProps = {
  status: "pending" | "in progress" | "done" | "error"
}
export function Ping(props: PingProps) {
  return (
    <span className={`flex h-[11px] w-[11px]`}>
      <span
        className={
          `absolute inline-flex h-[11px] w-[11px] animate-ping rounded-full  opacity-75 ` +
          (props.status === "pending" ? " bg-qpay-cyan" : "") +
          (props.status === "in progress" ? " bg-qpay-orange" : "") +
          (props.status === "done" ? " bg-qpay-violet" : "")
        }
      ></span>
      <span
        className={
          `relative inline-flex h-[11px] w-[11px] rounded-full bg-qpay-cyan ` +
          (props.status === "pending" ? " bg-qpay-cyan" : "") +
          (props.status === "in progress" ? " bg-qpay-orange" : "") +
          (props.status === "done" ? " bg-qpay-violet" : "") +
          (props.status === "error" ? " bg-qpay-red" : "")
        }
      ></span>
    </span>
  )
}
