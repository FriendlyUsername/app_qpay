import Features from "../_components/Features"
import Footer from "../_components/Footer"
import Hero from "../_components/Hero"
import Mission from "../_components/Mission"
import StartBanner from "../_components/StartBanner"

export default async function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Mission />
      <StartBanner />
      <Footer />
    </>
  )
}
