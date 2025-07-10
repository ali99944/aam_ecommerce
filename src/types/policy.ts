export interface Policy {
    id: number
    key: string
    name: string
    content: string

    created_at: string
    updated_at: string
}

export type PolicyCategory = Omit<Policy, 'content' | 'id' | 'created_at'>
