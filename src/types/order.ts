import Product from "./product"

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
    order_id: number
    product_id: number
    quantity: number
    price: string // Unit price at time of order
    total: string // Line total (price * quantity)
    product: Product // Embedded product summary
    created_at: Date // Or Date
    updated_at: Date // Or Date
}

export interface OrderPaymentSummary {
    id: number
    status: PaymentStatus
    amount: number
    payment_method_name?: string | null // Name from relation
    transaction_id?: string | null
    created_at: string // Or Date
}

export interface OrderSummary {
    subtotal: number
    delivery_fee: number
    discount_amount: number
    total: number
    payment_method: string // Payment method name or code used
    payment_status: PaymentStatus // Overall payment status (often derived)
}

interface Order {
    id: number
    track_code: string | null
    status: OrderStatus
    status_label: string
    order_date: string // Or Date
    customer: CustomerSummary
    shipping_address: ShippingAddress & {
        address_line_1: string
        address_line_2: string | null
        city_id: number
    }
    items: OrderItem[]
    summary: OrderSummary
    notes?: string | null
    delivery_fee: string
    delivery_status: string
    discount_amount: string
    guest_email: string
    guest_name: string
    payment_method_code: string
    phone_number: string
    postal_code?: string | null
    special_mark?: string | null
    subtotal: string
    total: string
    updated_at: string // Or Date
}

export default Order