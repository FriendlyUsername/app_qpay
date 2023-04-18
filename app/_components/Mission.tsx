export default function Mission() {
  return (
    <div className="pt-24 sm:py-32" id="mission">
      <div className="relative ">
        <div className="relative  h-80 overflow-hidden bg-teal-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-fill md:object-cover"
            src="https://images.unsplash.com/photo-1581349485677-291926f15d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80"
            alt=""
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2dd4bf" />
                <stop offset={1} stopColor="#60c3c621" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-teal-400">
              Our Mission
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bringing Convenience to Restaurant Owners
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-300">
              At QRPAY, we believe that running a restaurant should be as smooth
              and hassle-free as possible. That&apos;s why we&apos;ve developed
              a platform that allows restaurant owners to manage their menu,
              tables, and orders all in one place. Our goal is to provide a
              seamless experience for both restaurant owners and their
              customers, so that everyone can focus on what really matters:
              delicious food and great service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
