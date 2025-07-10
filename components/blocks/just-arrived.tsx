"use client"

import ProductCard from "../custom/product-card"
import Carousel from "../ui/carousel"
import { ProductCardSkeleton } from "../ui/skeletons"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { Product } from "@/src/types"



export default function JustArrived() {

  const { data: products, isFetching: is_products_loading } = useGetQuery<Product[]>({
    url: 'products/listings/just-arrived',
    key: ['products', 'just-arrived']
  })  

  if(is_products_loading) return <ProductCardSkeleton />


  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Products Carousel */}
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
              title="وصل حديثاً"
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
