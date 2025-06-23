// 'use client'

// import Link from "next/link"
// import Image from "next/image"
// import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronUp } from 'lucide-react'

// // Payment methods
// const paymentMethods = [
//   {
//     name: "Visa",
//     image: "/image/payment-methods/Tabby-01.svg",
//   },
//   {
//     name: "Mastercard",
//     image: "/image/payment-methods/Tamara.svg",
//   },
//   {
//     name: "Apple Pay",
//     image: "/image/payment-methods/STC-pay-01.svg",
//   },
//   {
//     name: "Mada",
//     image: "/image/payment-methods/Visa-01.svg",
//   },
//   {
//     name: "STC Pay",
//     image: "/image/payment-methods/STC-pay-01.svg",
//   },
// ]

// // Store categories
// const categories = [
//   { name: "مكيفات", href: "/store/air-conditioners" },
//   { name: "أجهزة منزلية", href: "/store/home-appliances" },
//   { name: "قطع غيار", href: "/store/spare-parts" },
//   { name: "عروض خاصة", href: "/store/special-offers" },
//   { name: "الأكثر مبيعاً", href: "/store/best-sellers" },
// ]

// // Customer service links
// const customerService = [
//   { name: "طريقة الطلب", href: "/store/how-to-order" },
//   { name: "سياسة الإرجاع", href: "/store/return-policy" },
//   { name: "الشحن والتوصيل", href: "/store/shipping" },
//   { name: "الأسئلة الشائعة", href: "/store/faq" },
//   { name: "اتصل بنا", href: "/store/contact" },
// ]

// export default function ZainStoreFooter() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

//   return (
//     <footer className="bg-white">
//       {/* Main Footer */}
//       <div className="pt-8 pb-8 border-t border-gray-200">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {/* Column 1: Store Info */}
//             <div className="space-y-4">
//               <Link href="/store" className="flex items-center gap-2">
//                 <div className="relative w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
//                   <span className="text-white font-bold text-xl">Z</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="font-bold text-xl text-primary">ZAIN STORE</span>
//                   <span className="text-xs text-gray-500 -mt-1">للأجهزة المنزلية</span>
//                 </div>
//               </Link>

//               <p className="text-gray-600 leading-relaxed text-sm">
//                 زين ستور هو وجهتك الأولى للحصول على أفضل الأجهزة المنزلية والمكيفات وقطع الغيار بأسعار تنافسية وجودة
//                 عالية مع خدمة توصيل سريعة لجميع مناطق المملكة
//               </p>

//               <div className="flex items-center gap-3">
//                 <Link
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 cursor-pointer text-white transition-colors duration-300"
//                   aria-label="Facebook"
//                 >
//                   <Facebook className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 cursor-pointer text-white transition-colors duration-300"
//                   aria-label="Twitter"
//                 >
//                   <Twitter className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 cursor-pointer text-white transition-colors duration-300"
//                   aria-label="Instagram"
//                 >
//                   <Instagram className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 cursor-pointer text-white transition-colors duration-300"
//                   aria-label="YouTube"
//                 >
//                   <Youtube className="w-4 h-4" />
//                 </Link>
//               </div>
//             </div>

//             {/* Column 2: Categories */}
//             <div>
//               <h3 className="text-lg font-bold mb-4 text-primary">الفئات</h3>
//               <ul className="space-y-2">
//                 {categories.map((category) => (
//                   <li key={category.name}>
//                     <Link
//                       href={category.href}
//                       className="text-gray-600 hover:text-primary transition-colors text-sm"
//                     >
//                       {category.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Customer Service */}
//             <div>
//               <h3 className="text-lg font-bold mb-4 text-primary">خدمة العملاء</h3>
//               <ul className="space-y-2">
//                 {customerService.map((item) => (
//                   <li key={item.name}>
//                     <Link
//                       href={item.href}
//                       className="text-gray-600 hover:text-primary transition-colors text-sm"
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 4: Contact Info */}
//             <div>
//               <h3 className="text-lg font-bold mb-4 text-primary">اتصل بنا</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                   <span className="text-gray-600 text-sm">
//                     الرياض، المملكة العربية السعودية
//                     <br />
//                     طريق الملك فهد، برج المملكة، الطابق 20
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 text-primary flex-shrink-0" />
//                   <Link
//                     href="tel:8001234567"
//                     className="text-gray-600 hover:text-primary transition-colors text-sm"
//                   >
//                     800 123 4567
//                   </Link>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-primary flex-shrink-0" />
//                   <Link
//                     href="mailto:store@zaindev.com"
//                     className="text-gray-600 hover:text-primary transition-colors text-sm"
//                   >
//                     store@zaindev.com
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Methods Section */}
//       <div className="border-t border-gray-200">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center  flex-wrap justify-center">
//               {paymentMethods.map((method, index) => (
//                 <div
//                   key={`${method.name}-${index}`}>
//                   <Image
//                     src={method.image || "/placeholder.svg"}
//                     alt={method.name}
//                     width={40}
//                     height={25}
//                     className="h-16 w-20 object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
            
//             <div className="text-center md:text-right">
//               <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} ZAIN STORE. جميع الحقوق محفوظة</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-[#e04a1c] transition-colors z-10"
//         aria-label="Scroll to top"
//       >
//         <ChevronUp className="w-5 h-5" />
//       </button>
//     </footer>
//   )
// }
