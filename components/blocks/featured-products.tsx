"use client"

import Button from "../ui/button"
import ProductCard from "../custom/product-card"
import { ProductCardSkeleton } from "../ui/skeletons"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { Product } from "@/src/types"
import Carousel from "../ui/carousel"

export default function FeaturedProducts() {
 const { data: products, isFetching: is_products_loading } = useGetQuery<Product[]>({
    url: 'products/listings/featured',
    key: ['products', 'featured']
  })  

  if(is_products_loading) return <ProductCardSkeleton />

  return (
    <>
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
                        title="منتجات مميزة"
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
