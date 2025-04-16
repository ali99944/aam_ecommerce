// src/types/entities.ts (or wherever you keep your shared types)

// --- Product Related ---

export interface ProductSummary {
    discount_percentage: number
    is_new: boolean
    category_name: string
    brand_name: unknown
    discount_price: number
    price: number
    is_in_stock: boolean
    id: number
    name: string
    sell_price: number
    main_image_url: string | null
    stock: number
    status: 'active' | 'out-of-stock' // Use string literals for known statuses
    is_featured: boolean
    overall_rating?: number // Optional depending on resource
    sku_code: string
  }
  
  export interface ProductImage {
    id: number
    image_url: string | null // Derived from 'src'
  }
  
  export interface ProductSpec {
    id: number
    name: string
    value: string
    // is_active is usually filtered out by the API resource for frontend
  }
  
  export interface ProductAddon {
    id: number
    name: string
    price: number
     // is_active is usually filtered out by the API resource for frontend
  }
  
  export interface SubCategorySummary {
    id: number
    name: string
    // Include category if needed: category?: CategorySummary
  }
  
  export interface BrandSummary {
      id: number
      name: string
      image_url?: string | null
  }
  
  export interface DiscountSummary {
      id: number
      name: string
      type: 'fixed' | 'percentage'
      value: number
      formatted_value: string // From model accessor
  }
  
  // export interface ProductDetail extends ProductSummary {
  //   description: string
  //   is_public: boolean
  //   is_favorited: boolean // Set based on current user context
  //   sub_category?: SubCategorySummary | null
  //   brand?: BrandSummary | null
  //   discount?: DiscountSummary | null
  //   images?: ProductImage[]
  //   specs?: ProductSpec[]
  //   addons?: ProductAddon[]
  //   created_at?: string // Or Date
  // }
  
  // --- Cart Related ---
  
  export interface CartItem {
    id: number // This is the cart_item ID
    quantity: number
    product: ProductSummary
    line_total: number
    // addons_data?: any // If you add addons to cart items
  }
  
  export interface CartData {
    data: CartItem[] // Array of cart items
    total: number
    subtotal: number
    guest_cart_token: string | null
  }
  
  // --- Order Related ---
  
  export type OrderStatus = 'pending' | 'in-check' | 'processing' | 'completed' | 'cancelled'
  export type PaymentStatus = 'pending' | 'completed' | 'failed'
  export type DeliveryStatus = 'pending' | 'assigned' | 'out_for_delivery' | 'completed' | 'failed' // Example statuses
  
  export interface CustomerSummary {
    name: string
    // email?: string // Might be excluded for privacy unless it's the user's own order
  }
  
  export interface CitySummary {
      id: number
      name: string
  }
  
  export interface ShippingAddress {
    address_line_1: string
    address_line_2?: string | null
    city?: string | null // City name might be included directly
    postal_code?: string | null
    special_mark?: string | null
    phone_number: string
  }
  
  export interface OrderItem {
    id: number // order_items ID
    quantity: number
    price: number // Unit price at time of order
    total: number // Line total (price * quantity)
    product: ProductSummary // Embedded product summary
  }
  
  export interface OrderPaymentSummary {
      id: number
      status: PaymentStatus
      amount: number
      payment_method_name?: string | null // Name from relation
      transaction_id?: string | null
      created_at: string // Or Date
  }
  
  export interface OrderDeliverySummary {
      id: number
      status: DeliveryStatus
      tracking_number?: string | null
      delivery_date?: string | null // Expected or actual delivery date
      delivery_personnel_name?: string | null // From relation
      confirmation_image_url?: string | null
      // Potentially add company name if needed
      // delivery_company_name?: string | null
  }
  
  export interface OrderSummary {
    subtotal: number
    delivery_fee: number
    discount_amount: number
    total: number
    payment_method: string // Payment method name or code used
    payment_status: PaymentStatus // Overall payment status (often derived)
  }
  
  export interface Order {
    id: number
    track_code: string | null // Will be null until order is approved?
    status: OrderStatus
    status_label: string
    order_date: string // Or Date
    customer: CustomerSummary
    shipping_address: ShippingAddress
    items: OrderItem[]
    summary: OrderSummary
    delivery?: OrderDeliverySummary | null
    notes?: string | null
    // Potentially include invoice summary if needed
    // invoice?: { invoice_number: string, status: string }
  }
  
  
  // --- Other Supporting Interfaces ---
  
  export interface PaymentMethod {
    id: number
    name: string
    code: string // Important identifier
    description?: string | null
    image_url: string | null // Model accessor provides placeholder
    slug: string
    gateway_provider?: string | null
    is_online: boolean
    instructions?: string | null
    // Sensitive fields are usually excluded from public API responses
  }
  
  export interface City {
    id: number
    name: string
    // delivery_fee?: number // Could be added by API if joining
  }
  
  // --- Action Request (Frontend might only need ID) ---
  export interface ActionRequestSummary {
      request_id: number
      // Potentially include type or status if needed by UI after submission
      // action_type?: string
      // status?: 'pending' | 'approved' | 'rejected'
  }
  
  // --- API Responses (Examples) ---
  
  // Example for POST /api/orders response
  export interface OrderSubmissionResponse {
      message: string
      request_id: number // ID of the ActionRequest created
      estimated_delivery_time?: string // Optional estimate
  }
  
  // Example for POST /api/products/{product}/favorite response
  export interface ToggleFavoriteResponse {
      message: string
      is_favorited: boolean
  }
  
  // Example for a paginated response (adjust based on your actual pagination structure)
  export interface PaginatedResponse<T> {
    data: T[]
    links: {
      first: string | null
      last: string | null
      prev: string | null
      next: string | null
    }
    meta: {
      current_page: number
      from: number | null
      last_page: number
      path: string
      per_page: number
      to: number | null
      total: number
      // Add other meta info if your API provides it
    }
  }

  export interface ProductSummary {
    id: number
    name: string
    sell_price: number
    main_image_url: string | null
    stock: number
    status: 'active' | 'out-of-stock'
    is_featured: boolean
    overall_rating?: number
    // Add these based on mock data if not present
    oldPrice?: number | null // Corresponds to discount logic maybe?
    rating?: number // Use overall_rating?
    reviewCount?: number // Use total_rating?
    isNew?: boolean // Does your API provide this?
    isBestSeller?: boolean // Does your API provide this?
    isDiscounted?: boolean // Does your API provide this?
    discount?: number // Discount percentage?
    brand?: {
      id: number
      name: string
    } // Embed brand summary
    subCategory?: {
      id: number 
      name: string
    } // Embed subCategory summary
  }
  
  // Define the structure of the API response for products (including pagination)
  export interface PaginatedProductsResponse {
    data: ProductSummary[]
    links: {
      first: string | null
      last: string | null
      prev: string | null
      next: string | null
    }
    meta: {
      current_page: number
      from: number | null
      last_page: number // total pages
      path: string
      per_page: number
      to: number | null
      total: number // total items
    }
  }
  
  export interface Category {
    id: number
    name: string | null
    description: string | null
    is_active: boolean
    is_featured: boolean
    total_sub_categories: number
    cover_image: string | null
    icon_image: string | null
  }
  
  export interface Brand {
    id: number
    name: string
    // Add other fields if needed from your API
  }
  
  // --- Add Cart & Favorite related types if not already present ---
  export interface ToggleFavoriteResponse {
      message: string
      is_favorited: boolean
  }
  
  export interface AddToCartPayload {
      product_id: number
      quantity: number
  }
  
  export interface CartData {
    data: CartItem[]
    total: number
    subtotal: number
    guest_cart_token: string | null
  }
  
  // --- Define Filter State Type ---
  export interface ProductFilters {
    search?: string
    sub_category_id?: string | null // Use string for easier form handling
    brand_id?: string | null
    min_price?: number | null
    max_price?: number | null
    status?: string | null // 'active' or 'all' maybe
    is_public?: boolean | string | null // '1', '0' or 'all' maybe
    is_featured?: boolean | string | null
    onlyInStock?: boolean // Frontend specific filter? Map to status=active
    onlyDiscounted?: boolean // Frontend specific filter? Need API support
    sort_by?: string // e.g., 'created_at', 'sell_price'
    sort_dir?: 'asc' | 'desc'
    page?: number // For pagination
  }

  export interface User {
    id: number
    name: string
    email: string
    phone?: string | null
    email_verified_at?: string | null // From Laravel standard
    // Add any other relevant user fields: phone, avatar_url, etc.
  }
  
  // Interface for API login response
  export interface AuthResponse {
    customer: User
    token: string // Assumes API returns token on login
    // Include refresh token if using them
  }



export interface Seo {
    id: number
    name: string
    key: string
    type: 'page' | 'record'
    title: string
    description: string
    keywords: string
    robots_meta: string
    canonical_url: string
    og_title: string
    og_description: string
    og_image: string
    og_image_alt: string
    og_locale: string
    og_site_name: string
    twitter_title: string
    twitter_description: string
    twitter_image: string
    twitter_alt: string
    custom_meta_tags?: string | null
    created_at: string
    updated_at: string

}
