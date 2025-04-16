"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation" // Use App Router navigation
import {
  CreditCard,
  ChevronLeft,
  CheckCircle,
  MapPin,
  Phone,
  User,
  Mail,
  Home,
  Landmark, // For special mark
  Loader2, // Loading spinner
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Assuming these are custom/shadcn
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select" // Assuming shadcn Select
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Banner } from "@/components/ui/banner"
import { useGetQuery, useMutationAction } from "@/src/providers/hooks/queries-actions" // Your API hooks
// import { useAuth } from "@/contexts/AuthContext"; // Example Auth context
import PaymentMethod from "@/src/types/payment_method"
import City from "@/src/types/city"
import { getCartToken, setCartToken } from "@/lib/cart-token"

// Define interfaces for fetched data
interface CartItem {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    sell_price: number
    main_image_url: string | null
    sku_code?: string // Make optional if not always present
  }
  line_total: number
}

interface CartData {
  data: CartItem[]
  total: number
  subtotal: number
  guest_cart_token: string | null
}


// --- Mock Auth Hook (Replace with your actual implementation) ---
const useAuth = () => ({
   isAuthenticated: false, // Set to true if user is logged in
   user: { // Example user data
     id: 1,
     name: "Ali Customer",
     email: "ali@example.com",
   },
   token: "dummy-auth-token", // Example auth token
});
// ---------------------------------------------------------------

interface DeliveryFee {
  id: number
  name: string
  amount: number
  city_id: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth() // Get auth state
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    guest_name: "", // Only used if !isAuthenticated
    guest_email: "", // Only used if !isAuthenticated
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    city_id: "", // Store ID as string for Select component
    postal_code: "",
    special_mark: "",
    notes: "",
  })
  const [selectedPaymentMethodCode, setSelectedPaymentMethodCode] = useState<string | null>(null)
  const [deliveryFee, setDeliveryFee] = useState<number>(0) // State for fetched delivery fee
  const [orderRequestId, setOrderRequestId] = useState<number | null>(null)
  const [orderComplete, setOrderComplete] = useState(false)
  const [guestCartToken, setGuestCartToken] = useState<string | null>(null)

   // Get initial guest token
   useEffect(() => {
    if (!isAuthenticated) {
        setGuestCartToken(getCartToken())
    }
   }, [isAuthenticated])


  // --- API Calls ---

  // Fetch Cart Data
  const { data: cartData, isLoading: isLoadingCart, error: cartError } = useGetQuery<CartData>({
    url: '/cart',
    key: ['cart', guestCartToken], // Re-fetch if token changes
    options: { enabled: !!guestCartToken || isAuthenticated, }, // Fetch only if identified
    headers: guestCartToken ? { 'X-Cart-Token': guestCartToken } : {}
  })

  // Fetch Payment Methods
  const { data: paymentMethodsData, isLoading: isLoadingPayments } = useGetQuery<PaymentMethod[]>({
    url: '/payment-methods', // Assuming endpoint fetches ENABLED methods
    key: ['payment-methods']
  })

  // Fetch Cities
  const { data: citiesData, isLoading: isLoadingCities } = useGetQuery<City[]>({
    url: '/cities', // Your cities endpoint
    key: ['cities']
  })

  // Fetch Cities
  const { data: feesData, isLoading: isLoadingFees } = useGetQuery<DeliveryFee[]>({
    url: '/delivery-fees', // Your delivery-fees endpoint
    key: ['delivery-fees']
  })

   // Fetch Delivery Fee (Example: Simulate based on city ID, replace with API call)
   useEffect(() => {
      // const selectedCityId = formData.city_id ? parseInt(formData.city_id, 10) : null;
      if (formData.city_id) {
        console.log('am here');
        console.log(feesData);
        
        console.log(feesData?.find((fee) => fee.city_id === +formData.city_id)?.amount || 0);
        console.log(+formData.city_id);
        
        
        
          setDeliveryFee(
              feesData?.find((fee) => fee.city_id === +formData.city_id)?.amount || 0
          );
          // --------------------
      } else {
          setDeliveryFee(0); // Reset fee if no city selected
      }
   }, [formData.city_id, feesData]);

  // Order Submission Mutation
  const { mutateAsync: submitOrder, isPending: isSubmittingOrder, error: submissionError } = useMutationAction<Order>({
    url: '/orders',
    method: 'post',
    headers: { 'X-Cart-Token': guestCartToken || cartData?.guest_cart_token },
  })

  // --- Effects ---

  // Handle cart token from API response for guests
   useEffect(() => {
       if (!isAuthenticated && cartData?.guest_cart_token && cartData.guest_cart_token !== guestCartToken) {
           setGuestCartToken(cartData.guest_cart_token);
           setCartToken(cartData.guest_cart_token); // Save to localStorage
       }
   }, [cartData, isAuthenticated, guestCartToken]);

  // Set default payment method
  useEffect(() => {
    if (!selectedPaymentMethodCode && paymentMethodsData) {
      const defaultMethod = paymentMethodsData.find(method => method.is_default)
      if (defaultMethod) {
        setSelectedPaymentMethodCode(defaultMethod.code)
      } else if (paymentMethodsData.length > 0) {
        setSelectedPaymentMethodCode(paymentMethodsData[0].code) // Fallback to first available
      }
    }
  }, [paymentMethodsData, selectedPaymentMethodCode])

   // Pre-fill form if user is authenticated
   useEffect(() => {
       if (isAuthenticated && user) {
           setFormData(prev => ({
               ...prev,
               // Pre-fill only if the fields are empty to avoid overwriting user input
               guest_name: '', // Clear guest fields
               guest_email: '',
               // Assuming user object has phone, address etc. Add those here if available
               // phone_number: prev.phone_number || user.phone || '',
               // address_line_1: prev.address_line_1 || user.address?.line1 || '',
               // city_id: prev.city_id || user.address?.cityId || '',
           }));
       }
   }, [isAuthenticated, user]);

  // --- Event Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

   // Handle Select changes (City)
   const handleSelectChange = (name: string) => (value: string) => {
       setFormData(prev => ({ ...prev, [name]: value }));
   };

   // Handle Radio changes (Payment Method)
   const handlePaymentChange = (value: string) => {
      setSelectedPaymentMethodCode(value);
   };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Final Step: Submit order request
      if (!selectedPaymentMethodCode) {
          alert("Please select a payment method."); // Basic validation
          return;
      }
       if (!formData.city_id) {
          alert("Please select your city.");
          return;
      }

      const orderPayload = {
        phone_number: formData.phone_number,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2 || null,
        city_id: parseInt(formData.city_id, 10),
        postal_code: formData.postal_code || null,
        special_mark: formData.special_mark || null,
        notes: formData.notes || null,
        payment_method_code: selectedPaymentMethodCode,
        // Include guest details only if not authenticated
        ...(!isAuthenticated && {
            guest_name: formData.guest_name,
            guest_email: formData.guest_email,
        })
      };

      console.log("Submitting Order Payload:", orderPayload);

       // Include cart token header if guest
       const headers = guestCartToken ? { 'X-Cart-Token': guestCartToken } : {};

      submitOrder(orderPayload, {
        onSuccess: (response) => {
          setOrderComplete(true)
          setOrderRequestId(response.request_id)
          // IMPORTANT: Clear cart ONLY after successful submission (and potentially approval)
          // This example clears on successful *request* submission. Adjust if needed.
          if (guestCartToken) {
            localStorage.removeItem('cartToken'); // Clear guest token
          }
          // Optionally trigger a cart refresh/clear using react-query invalidation if needed
          // queryClient.invalidateQueries(['cart']);
        },
        onError: (error) => {
           console.error("Order submission failed:", error)
           // Display error message to user
        }
      }); // Pass headers to mutation if needed
    }
  }

  // --- Calculations ---
  const total = cartData?.total ?? 0;
  const grandTotal = +total + +deliveryFee;

  // --- Render Logic ---

   if (isLoadingCart || isLoadingPayments || isLoadingCities) {
       return (
           <div className="flex flex-col min-h-screen">
               <Header />
               <main className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#00998F]" />
               </main>
               <Footer />
           </div>
       );
   }

   if (cartError) {
     return (
          <div className="flex flex-col min-h-screen">
               <Header />
               <main className="flex-grow container mx-auto px-4 py-8">
                  <Banner message={`Error loading cart: ${cartError.message || 'Please try again.'}`} variant="error" />
               </main>
               <Footer />
          </div>
     )
   }

   if (!cartData || cartData.data.length === 0) {
        // Redirect to cart page or show empty cart message if cart is empty
        return (
             <div className="flex flex-col min-h-screen">
               <Header />
               <main className="flex-grow container mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
                    <p className="text-gray-600 mb-6">لا يوجد منتجات في سلتك لبدء عملية الشراء.</p>
                    <Button onClick={() => router.push('/')}>
                        العودة للتسوق
                    </Button>
               </main>
               <Footer />
           </div>
        )
    }


  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-12 bg-[#D2EAE8] rounded-md shadow-sm"> {/* Added styles */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-4">تم استلام طلبك للمراجعة!</h1>
              <p className="text-gray-600 mb-6">شكراً لك. سيتم مراجعة طلبك وسيتم التواصل معك للتأكيد. يمكنك تتبع حالة الطلب.</p>
              <div className="p-4 rounded-sm mb-6">
                <p className="text-gray-700 mb-2">
                  رقم طلب المراجعة: <span className="font-bold">{orderRequestId}</span>
                </p>
                <p className="text-gray-700">
                  المبلغ الإجمالي المقدر: <span className="font-bold">{grandTotal} دينار</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push('/')}>
                  العودة للرئيسية
                </Button>
                 {/* Link to order tracking page (needs implementation) */}
                <Button variant="outline" onClick={() => router.push('/track-order')}>
                  تتبع طلبك
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // --- Main Checkout Form Render ---
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "سلة التسوق", href: "/cart" }, { label: "إتمام الطلب" }]}
            className="mb-6"
          />

          <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

          {/* Checkout Steps */}
          <div className="flex justify-between mb-8 border-b border-gray-200">
            {/* Step Buttons (remain mostly the same) */}
             <button className={`pb-4 px-2 sm:px-4 relative ${activeStep >= 1 ? "text-[#00998F] font-medium" : "text-gray-500"}`} onClick={() => activeStep > 1 && setActiveStep(1)} disabled={activeStep < 1}>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep >= 1 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
                <span className="text-sm sm:text-base">الشحن</span>
              </div>
              {activeStep === 1 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>
             <button className={`pb-4 px-2 sm:px-4 relative ${activeStep >= 2 ? "text-[#00998F] font-medium" : "text-gray-500"}`} onClick={() => activeStep > 2 && setActiveStep(2)} disabled={activeStep < 2}>
               <div className="flex items-center gap-1 sm:gap-2">
                 <div className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep >= 2 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
                 <span className="text-sm sm:text-base">الدفع</span>
               </div>
              {activeStep === 2 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>
             <button className={`pb-4 px-2 sm:px-4 relative ${activeStep >= 3 ? "text-[#00998F] font-medium" : "text-gray-500"}`} disabled={activeStep < 3}>
               <div className="flex items-center gap-1 sm:gap-2">
                 <div className={`flex items-center justify-center w-6 h-6 rounded-full ${activeStep >= 3 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"}`}>3</div>
                 <span className="text-sm sm:text-base">المراجعة</span>
               </div>
              {activeStep === 3 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>
          </div>

          {/* Submission Error Banner */}
          {submissionError && (
             <Banner message={`Order submission failed: ${submissionError.message || 'Please check your details and try again.'}`} variant="error" className="mb-4"/>
          )}


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} id="checkout-form">
                {/* Step 1: Shipping Information */}
                {activeStep === 1 && (
                  <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#00998F]" />
                        معلومات التوصيل
                      </h2>
                    </div>

                    <div className="p-4 space-y-4">
                       {/* Show Guest Fields only if not authenticated */}
                       {!isAuthenticated && (
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                label="الاسم الكامل"
                                name="guest_name"
                                value={formData.guest_name}
                                onChange={handleChange}
                                icon={User}
                                iconPosition="right"
                                required={!isAuthenticated}
                                />
                                <Input
                                label="البريد الإلكتروني"
                                type="email"
                                name="guest_email"
                                value={formData.guest_email}
                                onChange={handleChange}
                                icon={Mail}
                                iconPosition="right"
                                required={!isAuthenticated}
                                />
                           </div>
                       )}

                        {/* Phone Number */}
                         <Input
                           label="رقم الهاتف"
                           type="tel"
                           name="phone_number"
                           value={formData.phone_number}
                           onChange={handleChange}
                           icon={Phone}
                           iconPosition="right"
                           required
                         />

                        {/* Address Line 1 */}
                      <Input
                        label="العنوان التفصيلي (الشارع، البناية، الطابق)"
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleChange}
                        icon={Home}
                        iconPosition="right"
                        required
                      />
                      {/* Address Line 2 */}
                      <Input
                        label="العنوان الإضافي (اختياري)"
                        name="address_line_2"
                        value={formData.address_line_2}
                        onChange={handleChange}
                      />
                      {/* City & Postal Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="city_id" className="text-sm font-medium">المدينة <span className="text-red-500">*</span></label>
                          <Select
                            value={formData.city_id}
                            onChange={handleSelectChange('city_id')} // Use onValueChange for shadcn Select
                            options={(citiesData ?? [])?.map(e => {
                              return {
                                label: e.name,
                                value: e.id.toString()
                              }
                            })}
                            />
                         </div>
                         <Input
                            label="الرمز البريدي (اختياري)"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                         />
                      </div>
                      {/* Special Mark */}
                      <Input
                        label="علامة مميزة للعنوان (اختياري)"
                        name="special_mark"
                        value={formData.special_mark}
                        onChange={handleChange}
                        icon={Landmark}
                        iconPosition="right"
                        placeholder="e.g., بجانب المسجد الكبير"
                      />
                      {/* Notes */}
                      <Textarea
                        label="ملاحظات الطلب (اختياري)"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        // icon={BookMarked}
                        // iconPosition="right"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-[#00998F]" />
                          طريقة الدفع
                        </h2>
                      </div>
                      <div className="p-4">
                         {isLoadingPayments ? (
                            <p>جاري تحميل طرق الدفع...</p>
                         ) : (
                             <RadioGroup
                                value={selectedPaymentMethodCode ?? ''}
                                onChange={handlePaymentChange} // Use onValueChange for shadcn RadioGroup
                             >
                                {(paymentMethodsData || []).map((method) => (
                                    <RadioItem
                                    key={method.code}
                                    value={method.code}
                                    // id={`payment_${method.code}`}
                                    label={method.name}
                                    description={method.description ?? ''}
                                    // Add icon if available?
                                    />
                                ))}
                             </RadioGroup>
                         )}
                      </div>
                    </div>
                    {/* Removed Credit Card and Installment Sections */}
                  </div>
                )}

                {/* Step 3: Review Order */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg">مراجعة الطلب</h2>
                      </div>
                      <div className="p-4">
                        {/* Products Review (Uses cartData.data) */}
                        <h3 className="font-medium mb-3">المنتجات</h3>
                        <div className="divide-y divide-gray-200 mb-4 max-h-80 overflow-y-auto">
                           {(cartData?.data ?? []).map((item) => (
                              <div key={item.id} className="py-3 flex gap-4">
                                 <div className="relative h-16 w-16 flex-shrink-0">
                                    <Image
                                    src={item.product.main_image_url || "/images/placeholder-product.png"}
                                    alt={item.product.name}
                                    fill
                                    className="object-contain border rounded-sm"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex justify-between">
                                       <div>
                                          <div className="font-medium text-sm">{item.product.name}</div>
                                          <div className="text-xs text-gray-500">الكمية: {item.quantity}</div>
                                       </div>
                                       <div className="text-right font-bold text-sm text-[#00998F]">
                                          {item.line_total} دينار
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Shipping Info Review */}
                        <h3 className="font-medium mb-3">معلومات التوصيل</h3>
                        <div className="bg-gray-50 p-3 rounded-sm mb-4 text-sm space-y-1">
                           <p><strong>الاسم:</strong> {isAuthenticated ? user?.name : formData.guest_name}</p>
                           <p><strong>البريد الإلكتروني:</strong> {isAuthenticated ? user?.email : formData.guest_email}</p>
                           <p><strong>الهاتف:</strong> {formData.phone_number}</p>
                           <p><strong>العنوان:</strong> {formData.address_line_1} {formData.address_line_2 && `, ${formData.address_line_2}`}</p>
                           <p><strong>المدينة:</strong> {citiesData?.find(c => c.id.toString() === formData.city_id)?.name ?? 'N/A'} {formData.postal_code && `(${formData.postal_code})`}</p>
                           {formData.special_mark && <p><strong>علامة مميزة:</strong> {formData.special_mark}</p>}
                           {formData.notes && <p><strong>ملاحظات:</strong> {formData.notes}</p>}
                        </div>

                        {/* Payment Method Review */}
                        <h3 className="font-medium mb-3">طريقة الدفع</h3>
                        <div className="bg-gray-50 p-3 rounded-sm mb-4 text-sm">
                           <p className="font-medium">
                              {paymentMethodsData?.find(method => method.code === selectedPaymentMethodCode)?.name ?? 'N/A'}
                           </p>
                           {/* Display instructions if available */}
                            {paymentMethodsData?.find(method => method.code === selectedPaymentMethodCode)?.instructions && (
                                <p className="text-xs text-gray-600 mt-1">
                                    {paymentMethodsData?.find(method => method.code === selectedPaymentMethodCode)?.instructions}
                                </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {activeStep > 1 ? (
                    <Button type="button" variant="outline" onClick={() => setActiveStep(activeStep - 1)} icon={ChevronLeft} iconPosition="right">
                      العودة
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={() => router.push('/cart')} icon={ChevronLeft} iconPosition="right">
                      العودة للسلة
                    </Button>
                  )}

                  <Button type="submit" disabled={isSubmittingOrder || (activeStep === 1 && !formData.city_id) || (activeStep === 2 && !selectedPaymentMethodCode) }>
                    {isSubmittingOrder ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {isSubmittingOrder ? "جاري المعالجة..." : activeStep < 3 ? "متابعة" : "تأكيد وإرسال الطلب"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden sticky top-4">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">ملخص الطلب</h2>
                </div>
                <div className="p-4">
                  {/* Item Summary List */}
                  <div className="max-h-60 overflow-y-auto mb-4 border-b pb-4">
                     {(cartData?.data ?? []).map((item) => (
                        <div key={item.id} className="flex gap-3 mb-3">
                           <div className="relative h-14 w-14 flex-shrink-0 border border-gray-200 rounded-sm">
                              <Image
                                 src={item.product.main_image_url || "/images/placeholder-product.png"}
                                 alt={item.product.name}
                                 fill
                                 className="object-contain"
                              />
                           </div>
                           <div className="flex-1">
                              <div className="text-sm font-medium line-clamp-1">{item.product.name}</div>
                              <div className="text-xs text-gray-500">الكمية: {item.quantity}</div>
                              <div className="text-sm font-bold text-[#00998F]">
                                 {item.line_total} دينار
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  {/* Totals */}
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">المجموع الفرعي:</span>
                       <span className="font-medium">{cartData.total} دينار</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-600">الشحن لـ {citiesData?.find(c=> c.id.toString() === formData.city_id)?.name || '...'}:</span>
                       <span className="font-medium">
                         {deliveryFee === 0 && formData.city_id ? "جاري الحساب..." : `${deliveryFee} دينار`}
                       </span>
                     </div>
                      {/* Add Discounts/Taxes here if applicable later */}
                     <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                       <span>المجموع الكلي:</span>
                       <span className="text-[#00998F]">{grandTotal} دينار</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}