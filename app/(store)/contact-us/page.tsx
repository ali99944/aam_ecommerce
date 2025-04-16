import { constructMetadata } from "@/lib/seo_fetcher"
import { Metadata } from "next"
import ContactPage from "./contact-us";

export const generateMetadata = async (): Promise<Metadata> => await constructMetadata('contact_us');
export default function Page() {
  return (
    <ContactPage />
  )
}
