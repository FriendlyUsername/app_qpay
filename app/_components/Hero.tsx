"use client"
import { Suspense, useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
// import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta"
import Loading from "../(user)/user/restaurant/loading"
import Link from "next/link"
import { Dialog } from "@headlessui/react"
import { SignInButton } from "@clerk/nextjs"
import { HeroImage } from "./HeroImage"

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Mission", href: "#mission" },
  //   { name: "Product", href: "#" },
]

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h2 className="text-white font-bold text-2xl">QRPAY</h2>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-teal-300"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* TODO PUT USER ICON HERE  */}
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>

            <div className="flex items-center gap-4">
              {/* <SignedOut>
                <MySignInButton />
              </SignedOut>
              <SignedIn> */}
              {/* TODO: Make this fallback a skeleton with a profile picture since we know that much by now */}
              <Suspense fallback={<Loading />}>
                <Link className="text-white" href="/user">
                  Userpage
                </Link>
              </Suspense>
              {/* </SignedIn> */}
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h2 className="font-bold text-white text-xl">QRPAY</h2>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {/*TODO make signoutpbutton optional  */}
                  <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                    <SignInButton />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <HeroImage />
    </div>
  )
}
