interface Faq {
    id: number
    faq_category_id: number | null
    question: string
    answer: string
    display_order: number
    is_active: boolean
    created_at: Date
    updated_at: Date
}

export default Faq