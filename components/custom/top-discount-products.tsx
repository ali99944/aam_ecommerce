"use client"

import ProductCard from "./product-card"
import Carousel from "../ui/carousel"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { Product } from "@/src/types"
import { ProductCardSkeleton } from "../ui/skeletons"



export default function TopDiscountsProducts() {

  const { data: products, isFetching: is_products_loading } = useGetQuery<Product[]>({
    url: 'products/listings/top-discounts',
    key: ['products', 'top-discounts']
  })

  if (is_products_loading) return <ProductCardSkeleton />


  return (
    <>


      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="mb-12">
            <Carousel
              slidesPerView={{
                small_mobile: 2,
                mobile: 2,
                tablet: 3,
                desktop: 4,
              }}
              spaceBetween={18}
              loop={false}
              title="منتجات بخصم عالي"
            >
              {(products ?? [])?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  )
}
