// src/app/(protected)/profile/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button'; // Assuming your custom Button
import { Input } from '@/components/ui/input';   // Assuming your custom Input
import { Textarea } from '@/components/ui/textarea'; // Assuming your custom Textarea
import { Breadcrumb } from '@/components/ui/breadcrumb'; // Assuming your custom Breadcrumb
import { Avatar } from '@/components/ui/avatar'; // YOUR Avatar component
import { Card } from '@/components/ui/card';     // YOUR Card component
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    ShoppingBag,
    Heart,
    LogOut,
    CreditCard,
    Settings,
    Edit3,
    Loader2,
    HomeIcon // Added for breadcrumb if needed
} from 'lucide-react';
    import { useRouter } from 'next/navigation';
import { changePassword, logoutUser, PasswordChangePayload, ProfileUpdatePayload, selectCurrentUser, updateProfile } from '@/src/store/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/src/store/hook';
import { useToast } from '@/components/ui/toast';

// Dummy Data Structures (Keep as is)
interface DummyOrder {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total: number;
}
interface DummyAddress {
    id: number;
    label: string;
    address_line_1: string;
    city: string;
    isDefault: boolean;
}
const dummyOrders: DummyOrder[] = [ /* ... */ ];
const dummyAddresses: DummyAddress[] = [ /* ... */ ];
// --- End Dummy Data ---


export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const currentUser = useAppSelector(selectCurrentUser);

    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { addToast } = useToast()

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await dispatch(logoutUser()).unwrap();
            addToast("Logged out successfully.", 'success');
            router.push('/');
        } catch (error: any) {
            addToast(error || "Logout failed. Please try again.", 'error');
            setIsLoggingOut(false);
        }
    };

    const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // Construct payload, potentially removing unchanged fields
        const payload: ProfileUpdatePayload = {
            name: formData.get('name') as string, // Add name field to form
            email: formData.get('email') as string, // Add name field to form
            phone: formData.get('phone') as string, // Add phone field
            avatar: formData.get('avatar') as File, // Get file if avatar field added
            // remove_avatar: formData.get('remove_avatar') ? '1' : undefined, // If using checkbox
        };
        // Remove empty file input if no file selected
        if (!payload.avatar || payload.avatar.size === 0) {
            delete payload.avatar;
        }
    
        try {
            await dispatch(updateProfile(payload)).unwrap();
            setIsEditingInfo(false); // Close form on success
            // Optionally dispatch resetProfileUpdateStatus() after a delay or on unmount
        } catch (err) {
            // Error handled by thunk/toast, potentially show specific field errors from profileErrors
            console.error("Profile update component error:", err);
        }
    };

    const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload: PasswordChangePayload = {
            current_password: formData.get('current_password') as string,
            password: formData.get('new_password') as string,
            password_confirmation: formData.get('new_password_confirmation') as string,
        };
    
        try {
            await dispatch(changePassword(payload)).unwrap();
            // Optionally clear form fields on success
            // event.currentTarget.reset();
             addToast("Password updated!", 'info'); // Extra feedback
            // Optionally dispatch resetPasswordChangeStatus()
        } catch (err) {
             console.error("Password change component error:", err);
             // Display specific errors from passwordErrors if needed
        }
    };


    if (!currentUser) {
        return (
             <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-[#00998F]" />
             </div>
        );
    }

    const getInitials = (name: string): string => {
        const names = name.split(' ');
        if (names.length === 1) return names[0][0]?.toUpperCase() || '?';
        return (names[0][0]?.toUpperCase() || '') + (names[names.length - 1][0]?.toUpperCase() || '');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <Breadcrumb
                        items={[{ label: "الرئيسية", href: "/" }, { label: "ملفي الشخصي" }]}
                        className="mb-6"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="md:col-span-1">
                            {/* --- Use your Card component --- */}
                            <Card className="sticky top-4 !p-0 overflow-hidden bg-white" bordered> 
                                <div className="flex flex-col items-center text-center p-4 pt-6 border-b">
                                    {/* --- Use your Avatar component --- */}
                                    <Avatar
                                        size="xl" // Use appropriate size prop
                                        src={currentUser.avatar_url || undefined}
                                        alt={currentUser.name}
                                        fallback={getInitials(currentUser.name)}
                                        className="w-24 h-24 mb-3 border-2 border-[#00998F]" // Custom classes if needed
                                    />
                                    <h2 className="text-xl font-bold">{currentUser.name}</h2> {/* Use h2 or similar for title */}
                                    <p className="text-sm text-gray-500">{currentUser.email}</p> {/* Use p for description */}
                                </div>
                                <div className="p-2"> {/* Adjust padding as needed */}
                                    <nav className="flex flex-col">
                                        <ProfileNavItem href="#account-info" icon={User} label="معلومات الحساب" />
                                        <ProfileNavItem href="#addresses" icon={MapPin} label="عناويني" />
                                        <ProfileNavItem href="#orders" icon={ShoppingBag} label="طلباتي" />
                                        <ProfileNavItem href="#favorites" icon={Heart} label="المفضلة" />
                                        <ProfileNavItem href="#payment-methods" icon={CreditCard} label="طرق الدفع" />
                                        <ProfileNavItem href="#change-password" icon={Lock} label="تغيير كلمة المرور" />
                                        <ProfileNavItem href="#settings" icon={Settings} label="إعدادات الحساب" />
                                        {/* --- Remove Separator, maybe add border manually --- */}
                                        <div className="my-1 border-t border-gray-100"></div>
                                         <button
                                             onClick={handleLogout}
                                             disabled={isLoggingOut}
                                             className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-right"
                                        >
                                             {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                                            <span>{isLoggingOut ? 'جاري...' : 'تسجيل الخروج'}</span>
                                         </button>
                                    </nav>
                                </div>
                            </Card>
                        </div>

                        {/* Main Content Sections */}
                        <div className="md:col-span-3 space-y-8">

                            {/* Account Information */}
                            <Card id="account-info" bordered className="bg-white"
                                header={
                                    (
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold">معلومات الحساب</h3> {/* Title */}
                                                <p className="text-sm text-gray-500">تعديل معلوماتك الشخصية.</p> {/* Description */}
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => setIsEditingInfo(!isEditingInfo)}>
                                                <Edit3 className="h-4 w-4 mr-1" /> {isEditingInfo ? 'إلغاء' : 'تعديل'}
                                            </Button>
                                        </div>
                                    )
                                }
                            >
                                {isEditingInfo ? (
                                    <form className="space-y-4" onSubmit={handleProfileSubmit}>
                                        <Input name="name" label="الاسم الكامل" defaultValue={currentUser.name} icon={User} iconPosition="right" required />
                                        <Input name="email" label="البريد الإلكتروني" type="email" defaultValue={currentUser.email} icon={Mail} iconPosition="right" required />
                                        <Input name="phone" label="رقم الهاتف" type="tel" defaultValue={currentUser.phone || ''} icon={Phone} iconPosition="right" />
                                        <Button type="submit" className="mt-2">حفظ التغييرات</Button>
                                    </form>
                                ) : (
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <p><strong>الاسم:</strong> {currentUser.name}</p>
                                        <p><strong>البريد الإلكتروني:</strong> {currentUser.email}</p>
                                        <p><strong>رقم الهاتف:</strong> {currentUser.phone || <span className="text-gray-400">لم يتم إضافته</span>}</p>
                                    </div>
                                )}
                            </Card>

                            {/* Saved Addresses */}
                            <Card bordered className="bg-white"
                                header={
                                    (
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold">عناويني</h3>
                                                <p className="text-sm text-gray-500">إدارة عناوين الشحن الخاصة بك.</p>
                                            </div>
                                            <Button variant="outline" size="sm"> <MapPin className="h-4 w-4 mr-1" /> إضافة عنوان </Button>
                                        </div>
                                    )
                                }
                            >
                                <div className="space-y-4">
                                    {dummyAddresses.length > 0 ? dummyAddresses.map((address) => (
                                        <div key={address.id} className="border p-3 rounded-md flex justify-between items-start bg-gray-50">
                                            <div>
                                                 <span className="font-medium">{address.label}</span>
                                                 {address.isDefault && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mr-2">الافتراضي</span>}
                                                <p className="text-sm text-gray-600">{address.address_line_1}, {address.city}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="sm" className="text-xs">تعديل</Button>
                                                <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600">حذف</Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-gray-500">لم تقم بإضافة أي عناوين بعد.</p>
                                    )}
                                </div>
                            </Card>

                            {/* Recent Orders */}
                            <Card id="orders" bordered className="bg-white"
                                header={( <div> <h3 className="text-lg font-bold">أحدث الطلبات</h3> <p className="text-sm text-gray-500">عرض حالة وتفاصيل طلباتك الأخيرة.</p> </div> )}
                                footer={( <div className="text-center"><Button variant="link" className="text-[#00998F]">عرض جميع الطلبات</Button></div> )}
                            >
                                <div className="-m-4"> {/* Negative margin to counter card body padding */}
                                    <div className="table-responsive">
                                        <table className="admin-table w-full text-sm"> {/* Use text-sm */}
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="p-2 text-right font-medium">رقم الطلب</th>
                                                    <th className="p-2 text-right font-medium">التاريخ</th>
                                                    <th className="p-2 text-right font-medium">الحالة</th>
                                                    <th className="p-2 text-end font-medium">المجموع</th>
                                                    <th className="p-2 text-end"></th>
                                                </tr>
                                            </thead>
                                             <tbody>
                                                {dummyOrders.map(order => (
                                                    <tr key={order.id} className="border-b last:border-b-0">
                                                         <td className="p-2"><Link href={`/track-order?code=${order.id}`} className="text-[#00998F] hover:underline font-mono">#{order.id}</Link></td>
                                                        <td className="p-2">{order.date}</td>
                                                        <td className="p-2">{/* Status Badge */}<span>{order.status}</span></td>
                                                         <td className="p-2 text-end font-medium">AED {order.total.toFixed(2)}</td>
                                                         <td className="p-2 text-end"><Link href={`/track-order?code=${order.id}`} className="text-xs text-gray-500 hover:text-[#00998F]">التفاصيل</Link></td>
                                                    </tr>
                                                ))}
                                             </tbody>
                                        </table>
                                     </div>
                                </div>
                            </Card>

                             {/* Favorites (Dummy) */}
                             <Card id="favorites" bordered className="bg-white"
                                header={
                                    ( <div><h3 className="text-lg font-bold">المفضلة</h3><p className="text-sm text-gray-500">قائمة المنتجات المحفوظة.</p></div> )
                                }
                             >
                                <p className="text-sm text-gray-500">لا توجد لديك منتجات مفضلة حالياً. <Link href="/products" className="text-[#00998F]">تصفح المنتجات</Link>.</p>
                            </Card>

                            {/* Change Password */}
                             <Card id="change-password" bordered className="bg-white" header={
                                (<h3 className="text-lg font-bold">تغيير كلمة المرور</h3>)
                             }>
                                 <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                                     <Input label="كلمة المرور الحالية" type="password" name="current_password" icon={Lock} iconPosition="right" required />
                                     <Input label="كلمة المرور الجديدة" type="password" name="new_password" icon={Lock} iconPosition="right" required />
                                     <Input label="تأكيد كلمة المرور الجديدة" type="password" name="new_password_confirmation" icon={Lock} iconPosition="right" required />
                                     <Button type="submit">تحديث كلمة المرور</Button>
                                 </form>
                            </Card>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

interface ProfileNavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
}

const ProfileNavItem: React.FC<ProfileNavItemProps> = ({ href, icon: Icon, label }) => {
    // Add active state logic based on scroll position or section visibility later
    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <Icon className="h-4 w-4 text-gray-500" />
            <span>{label}</span>
        </Link>
    );
}