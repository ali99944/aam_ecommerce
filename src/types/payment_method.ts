interface PaymentMethod {
    id: number;
    name: string;
    code: string;
    description?: string | null;
    image: string;
    slug: string;
    supported_currencies?: string | null;
    is_default: boolean;
    is_enabled: boolean;
    is_test_mode: boolean;
    is_online: boolean;
    display_order: number;
    instructions?: string | null;
    redirect_url?: string | null;
    created_at: Date;
    updated_at: Date;

}

export default PaymentMethod