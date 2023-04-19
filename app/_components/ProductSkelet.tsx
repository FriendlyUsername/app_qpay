const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`
export const ProductSkelet = () => {
  return (
    <div className="col-span-1  divide-y flex flex-col divide-zinc-50 rounded-lg  shadow border-zinc-600 border-2">
      <div className={`relative h-[167px] rounded-xl bg-black ${shimmer}`} />
    </div>
  )
}
