const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Datenschutz", href: "#" },
    { name: "Impressum", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="text-zinc-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-zinc-300 hover:text-teal-300"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-zinc-500">
          &copy; 2023 QRPAY, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
