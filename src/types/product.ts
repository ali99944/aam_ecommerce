export interface ProductImage {
    id: number
    src: string | null
}

export interface ProductSpec {
    id: number
    name: string
    value: string
}

interface Product {
    id: number
    name: string
    category: string
    image: string
    discount?: number | null
    badge?: string

    description?: string
    main_image?: string
    cost_price?: number
    sell_price?: number
    stock?: number
    overall_rating?: number
    total_rating?: number
    status?: string
    is_public?: boolean
    is_featured?: boolean

    sku_code: string
    barcode: string

    specs: ProductSpec[]
    gallery: ProductImage[]
}

export default Product