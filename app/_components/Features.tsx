import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid"

const features = [
  {
    name: "Easy Menu Management",
    description:
      "With our intuitive platform, you can easily add, remove, or update your menu items in real-time. No more printing new menus or manually updating prices!",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Efficient Order Tracking",
    description:
      "Never miss an order again! Our platform allows you to track and manage your orders in real-time, ensuring your customers always receive their food on time.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Quick Table Set-up",
    description:
      "Generate custom QR codes for your tables in seconds and let your customers place their orders from the comfort of their seat. It's quick, easy, and hassle-free!",
    href: "#",
    icon: ArrowPathIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-400">
            Features
          </h2>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Unleash the Potential of Your Restaurant with QRPay
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our platform makes it easy to manage your menu, track orders, and
            generate QR codes for your tables. Get started today and see a boost
            in sales!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-teal-400"
                    aria-hidden="true"
                  />
                  <h4> {feature.name}</h4>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-teal-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
