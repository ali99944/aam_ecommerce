import type { Metadata } from "next"
import axiosHttp from "@/lib/axios_client"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"

// Define the Policy interface
interface Policy {
  name: string
  key: string
  content: string
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  try {
    const response = await axiosHttp.get(`policies/${(await params).key}`)
    const policy: Policy = await response.data   

    return {
      title: `${policy.name} | محلات علي ابو مسعود`,
      description: `${policy.name} - محلات علي ابو مسعود`,
    }
  } catch (error) {
    console.log(error);
    
    return {
      title: "سياسة | محلات علي ابو مسعود",
      description: "سياسات محلات علي ابو مسعود",
    }
  }
}


export default async function PolicyPage({ params }: { params: Promise<{ key: string }> }) {
    const response = await axiosHttp.get(`policies/${(await params).key}`)
    const policy: Policy = await response.data    

    return (
      <div className="container mx-auto px-4 py-8">
              <Breadcrumb
                items={[{ label: "الرئيسية", href: "/" }, { label: "السياسات", href: "/policies" }, { label: policy.name }]}
                className="mb-6"
              />
      
              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden">
                  <div className=" p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#00998F]">{policy.name}</h1>
                  </div>
      
                  <div className="p-6 md:p-4">
                    <div
                      className="policy-content prose prose-lg"
                      dangerouslySetInnerHTML={{ __html: policy.content }}
                    />
                  </div>
                </Card>
              </div>
            </div>
    )
}
