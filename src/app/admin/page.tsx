"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Lock,
  ArrowRight,
  Printer,
  Copy,
  ExternalLink,
  MessageCircle,
  Phone,
  Gift,
  DollarSign,
  AlertCircle,
  Eye,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isAdminEmail } from "@/utils/admin";

interface AdminOrder {
  orderId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentMethod: string;
  status: string;
  amount: number;
  courierName?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  items: Array<{
    productId: string;
    name: string;
    finish?: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    addressLine1?: string;
    addressLine2?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pincode?: string;
    fullAddress?: string;
    giftMessage?: string;
  };
}

export default function AdminDashboardPage() {
  const { user, openAuthModal, logout: authLogout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  // AWB editing state map: orderId -> trackingNumber
  const [awbInputs, setAwbInputs] = useState<Record<string, string>>({});
  const [courierInputs, setCourierInputs] = useState<Record<string, string>>({});

  // Check existing session or Google Auth Admin
  useEffect(() => {
    const authSession = sessionStorage.getItem("shubhcoins_admin_auth");
    if (authSession === "true" || (user && isAdminEmail(user.email))) {
      sessionStorage.setItem("shubhcoins_admin_auth", "true");
      setIsAuthenticated(true);
    }
  }, [user]);

  // Fetch orders from API + LocalStorage fallback
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/orders?status=${statusFilter}&payment=${paymentFilter}&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.orders)) {
        // Also merge with any local development orders from localStorage
        const localStored = JSON.parse(
          localStorage.getItem("shubhcoins_orders") || "[]"
        );
        const combined = [...data.orders];

        localStored.forEach((localOrd: any) => {
          if (!combined.some((o) => o.orderId === localOrd.orderId)) {
            combined.unshift({
              orderId: localOrd.orderId,
              paymentMethod: localOrd.method?.includes("COD") ? "cod" : "razorpay",
              status: localOrd.status || "confirmed",
              amount: localOrd.amount || 499,
              createdAt: localOrd.date || new Date().toISOString(),
              items: localOrd.items || [],
              customer: localOrd.shippingAddress
                ? {
                    name: localOrd.shippingAddress.fullName || "Customer",
                    email: localOrd.shippingAddress.email || "support@shubhcoins.in",
                    phone: localOrd.shippingAddress.phone || "7488574616",
                    addressLine1: localOrd.shippingAddress.addressLine1 || "",
                    city: localOrd.shippingAddress.city || "Hyderabad",
                    state: localOrd.shippingAddress.state || "Telangana",
                    pincode: localOrd.shippingAddress.pincode || "500001",
                    fullAddress: `${localOrd.shippingAddress.addressLine1 || ""}, ${
                      localOrd.shippingAddress.city || ""
                    }, ${localOrd.shippingAddress.state || ""} - ${
                      localOrd.shippingAddress.pincode || ""
                    }`,
                    giftMessage: localOrd.shippingAddress.giftMessage || "",
                  }
                : {
                    name: "Patron",
                    email: "support@shubhcoins.in",
                    phone: "7488574616",
                    fullAddress: "Registered at checkout",
                  },
            });
          }
        });

        setOrders(combined);
      }
    } catch (err) {
      console.warn("Could not fetch remote admin orders, using local storage:", err);
      const localStored = JSON.parse(
        localStorage.getItem("shubhcoins_orders") || "[]"
      );
      setOrders(localStored);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, statusFilter, paymentFilter]);

  // Handle Login with PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 748857 (first 6 digits of support number 7488574616) or admin
    if (pinInput === "748857" || pinInput.toLowerCase() === "admin") {
      sessionStorage.setItem("shubhcoins_admin_auth", "true");
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError("Invalid Admin Access PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("shubhcoins_admin_auth");
    setIsAuthenticated(false);
    if (user && isAdminEmail(user.email)) {
      authLogout();
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotification(`Order #${orderId} marked as ${newStatus.toUpperCase()}`);
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      console.warn("DB update failed, updating locally:", err);
    }

    // Update in UI state and localStorage
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      const localStored = JSON.parse(
        localStorage.getItem("shubhcoins_orders") || "[]"
      );
      const updated = localStored.map((o: any) =>
        o.orderId === orderId ? { ...o, status: newStatus } : o
      );
      localStorage.setItem("shubhcoins_orders", JSON.stringify(updated));
    } catch {}

    setUpdatingId(null);
  };

  // Save AWB & Courier partner
  const handleSaveCourier = async (orderId: string) => {
    const trackingNumber = awbInputs[orderId];
    const courierName = courierInputs[orderId] || "BlueDart Express";

    setUpdatingId(orderId);
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          trackingNumber,
          courierName,
          status: "shipped",
        }),
      });
      setNotification(`Courier AWB saved for Order #${orderId}`);
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      console.warn("Courier update error:", e);
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, trackingNumber, courierName, status: "shipped" }
          : o
      )
    );
    setUpdatingId(null);
  };

  // Re-send / Send Order Confirmation Email via Brevo
  const handleSendEmail = async (ord: AdminOrder) => {
    if (!ord.customer?.email) {
      alert("Customer email address is not recorded for this order.");
      return;
    }

    setSendingEmailId(ord.orderId);
    try {
      const res = await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: ord.orderId,
          customerName: ord.customer.name,
          customerEmail: ord.customer.email,
          customerPhone: ord.customer.phone,
          shippingAddress: ord.customer.fullAddress,
          giftMessage: ord.customer.giftMessage,
          paymentMethod: ord.paymentMethod?.includes("cod")
            ? "Cash on Delivery (COD)"
            : "Prepaid Online (Razorpay)",
          amount: ord.amount,
          items: ord.items,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification(`Confirmation email sent to ${ord.customer.email}!`);
      } else {
        alert(
          data.error ||
            "Failed to send email. Please check Brevo IP authorization or credentials."
        );
      }
    } catch (e: any) {
      console.warn("Email trigger error:", e);
      alert(e.message || "Failed to trigger email");
    } finally {
      setSendingEmailId(null);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "failed")
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length;

  const codOrdersCount = orders.filter((o) => o.paymentMethod === "cod").length;
  const prepaidOrdersCount = orders.filter(
    (o) => o.paymentMethod === "razorpay"
  ).length;

  // Filtered orders for view
  const displayedOrders = orders.filter((ord) => {
    if (statusFilter !== "all" && ord.status !== statusFilter) return false;
    if (paymentFilter !== "all" && ord.paymentMethod !== paymentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = ord.orderId?.toLowerCase().includes(q);
      const matchName = ord.customer?.name?.toLowerCase().includes(q);
      const matchPhone = ord.customer?.phone?.includes(q);
      const matchCity = ord.customer?.city?.toLowerCase().includes(q);
      return matchId || matchName || matchPhone || matchCity;
    }
    return true;
  });

  // LOCK SCREEN VIEW
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAE4D9] p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#4A0D17] text-[#DFC278] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#9A7D3E] uppercase tracking-wider">
              Merchant Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#1A1817]">
              ShubhCoins Admin Login
            </h1>
            <p className="text-xs text-[#6B6661]">
              Enter the merchant access PIN to manage orders and fulfillment.
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={openAuthModal}
              className="w-full py-3 px-4 rounded-2xl bg-white border border-[#EAE4D9] hover:bg-stone-50 text-[#1A1817] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 group active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-[#9A7D3E] group-hover:scale-110 transition-transform" />
              <span>Sign in with Google Admin Account</span>
            </button>
            <div className="flex items-center gap-2 text-[10px] text-[#6B6661]">
              <div className="flex-1 h-px bg-stone-200" />
              <span>OR ENTER ACCESS PIN</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin PIN (Default: 748857)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError(null);
                }}
                className="w-full text-center tracking-widest text-base font-mono py-3 px-4 bg-stone-50 border border-[#EAE4D9] rounded-2xl focus:outline-none focus:border-[#4A0D17]"
              />
              {pinError && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#4A0D17] hover:bg-[#32080F] text-white text-xs font-bold transition-all shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <div className="text-[11px] text-[#6B6661] pt-2 border-t border-stone-100">
            <p>Admin Emails: abhishek1973kr@gmail.com, amit4321sg@gmail.com</p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#EAE4D9] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center font-bold text-xs">
              SC
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#4A0D17]">
                ShubhCoins Admin
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full ml-2">
                Live Store
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-stone-50 border border-stone-200 rounded-xl text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-[#1A1817]">{user.name}</span>
                <span className="text-[10px] text-[#6B6661]">({user.email})</span>
              </div>
            )}
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-[#6B6661] hover:text-[#4A0D17] hidden sm:flex items-center gap-1"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={fetchOrders}
              disabled={loading}
              className="p-2 text-stone-600 hover:text-[#4A0D17] hover:bg-stone-50 rounded-xl border border-stone-200 transition-colors flex items-center gap-1 text-xs"
              title="Refresh Orders"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin text-[#4A0D17]" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Floating Notification */}
        {notification && (
          <div className="fixed top-20 right-6 z-50 p-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* 4 KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#6B6661]">
              <span className="text-xs font-semibold">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[#9A7D3E]" />
            </div>
            <strong className="font-serif text-2xl font-bold text-[#4A0D17] block">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </strong>
            <p className="text-[11px] text-emerald-700">Gross Festive Sales</p>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#6B6661]">
              <span className="text-xs font-semibold">Total Orders</span>
              <Package className="w-4 h-4 text-[#9A7D3E]" />
            </div>
            <strong className="font-serif text-2xl font-bold text-[#1A1817] block">
              {orders.length}
            </strong>
            <p className="text-[11px] text-[#6B6661]">All Customer Orders</p>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#6B6661]">
              <span className="text-xs font-semibold">Pending Packing</span>
              <Clock className="w-4 h-4 text-[#9A7D3E]" />
            </div>
            <strong className="font-serif text-2xl font-bold text-amber-600 block">
              {pendingOrdersCount}
            </strong>
            <p className="text-[11px] text-amber-700 font-medium">
              Requires Velvet Casing
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#6B6661]">
              <span className="text-xs font-semibold">Prepaid vs COD</span>
              <Truck className="w-4 h-4 text-[#9A7D3E]" />
            </div>
            <strong className="font-serif text-lg font-bold text-[#1A1817] block">
              {prepaidOrdersCount} Paid • {codOrdersCount} COD
            </strong>
            <p className="text-[11px] text-[#6B6661]">Payment Split</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-[#EAE4D9] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, Phone, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17] font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed / Placed</option>
              <option value="packed">Packed (Velvet Box)</option>
              <option value="shipped">Dispatched / In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17] font-medium"
            >
              <option value="all">All Payment Modes</option>
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="razorpay">Razorpay (Paid Online)</option>
            </select>
          </div>
        </div>

        {/* Orders List / Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#6B6661] px-1">
            <span>
              Showing <strong>{displayedOrders.length}</strong> orders
            </span>
            <span>Sorted by newest first</span>
          </div>

          {displayedOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE4D9] space-y-3">
              <Package className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif text-base font-bold text-[#1A1817]">
                No orders match your filter
              </h3>
              <p className="text-xs text-[#6B6661] max-w-sm mx-auto">
                Try clearing search terms or status filters. Once an order is placed on the storefront, it will appear here instantly.
              </p>
            </div>
          ) : (
            displayedOrders.map((ord) => {
              const orderDate = new Date(ord.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <div
                  key={ord.orderId}
                  className="bg-white rounded-3xl border border-[#EAE4D9] p-5 sm:p-6 shadow-xs space-y-4 hover:border-[#C5A869]/50 transition-colors"
                >
                  {/* Order Card Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#1A1817]">
                        {ord.orderId}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(ord.orderId);
                          setNotification(`Copied #${ord.orderId} to clipboard`);
                          setTimeout(() => setNotification(null), 2500);
                        }}
                        className="text-stone-400 hover:text-stone-700 p-1 rounded"
                        title="Copy Order ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          ord.paymentMethod === "cod"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {ord.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : "Razorpay Paid"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[#6B6661]">{orderDate}</span>
                      <strong className="text-base font-bold text-[#4A0D17]">
                        ₹{ord.amount}
                      </strong>
                    </div>
                  </div>

                  {/* Customer & Items 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                    {/* Customer Info */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-2">
                      <span className="text-[11px] font-bold text-[#9A7D3E] uppercase tracking-wider block">
                        Customer & Delivery Details
                      </span>

                      <div className="space-y-1">
                        <p className="font-bold text-sm text-[#1A1817]">
                          {ord.customer?.name}
                        </p>
                        <div className="flex items-center gap-3 text-[#6B6661]">
                          <a
                            href={`tel:${ord.customer?.phone}`}
                            className="flex items-center gap-1 hover:text-[#4A0D17]"
                          >
                            <Phone className="w-3 h-3 text-[#9A7D3E]" />
                            <span>{ord.customer?.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${ord.customer?.phone?.replace(
                              /\D/g,
                              ""
                            )}?text=Namaste%20${encodeURIComponent(
                              ord.customer?.name || "Customer"
                            )}%2C%20regarding%20your%20ShubhCoins%20Order%20%23${
                              ord.orderId
                            }...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#25D366] font-semibold hover:underline"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>
                      </div>

                      <p className="text-stone-700 leading-relaxed text-[11px] pt-1 border-t border-stone-200">
                        {ord.customer?.fullAddress ||
                          `${ord.customer?.addressLine1 || ""}, ${
                            ord.customer?.city || ""
                          }, ${ord.customer?.state || ""} - ${
                            ord.customer?.pincode || ""
                          }`}
                      </p>

                      {/* Gift Note if present */}
                      {ord.customer?.giftMessage && (
                        <div className="p-2 rounded-xl bg-white border border-[#EAE4D9] text-[11px] text-[#9A7D3E] flex items-start gap-1.5">
                          <Gift className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="italic">
                            Printed Greeting Note: &quot;{ord.customer.giftMessage}&quot;
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Items & Packing Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D9] space-y-2.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#6B6661] uppercase tracking-wider block mb-2">
                          Ordered Items ({ord.items?.reduce((s, i) => s + i.quantity, 0) || 1})
                        </span>

                        <div className="space-y-1.5 max-h-24 overflow-y-auto">
                          {ord.items && ord.items.length > 0 ? (
                            ord.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-xs"
                              >
                                <div>
                                  <span className="font-semibold text-[#1A1817]">
                                    {it.name}
                                  </span>
                                  <span className="text-stone-500 ml-1.5">
                                    × {it.quantity}
                                  </span>
                                </div>
                                <span className="font-bold text-[#4A0D17]">
                                  ₹{it.price * it.quantity}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-[#6B6661]">
                              Festive Keepsake Coin (₹{ord.amount})
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6B6661]">
                        <span>Velvet Presentation Case Included</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleSendEmail(ord)}
                            disabled={sendingEmailId === ord.orderId}
                            className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
                            title="Send or Re-send Order Confirmation Email to customer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>
                              {sendingEmailId === ord.orderId
                                ? "Sending..."
                                : "Send Email"}
                            </span>
                          </button>
                          <Link
                            href={`/order-success?orderId=${encodeURIComponent(
                              ord.orderId
                            )}`}
                            target="_blank"
                            className="font-bold text-[#4A0D17] hover:underline flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Courier Fulfillment Bottom Bar */}
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
                    {/* Status Changer */}
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                      <span className="font-bold text-[#1A1817] whitespace-nowrap">
                        Current Status:
                      </span>
                      <select
                        value={ord.status}
                        disabled={updatingId === ord.orderId}
                        onChange={(e) =>
                          handleUpdateStatus(ord.orderId, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none ${
                          ord.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : ord.status === "shipped"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : ord.status === "packed"
                            ? "bg-purple-100 text-purple-800 border-purple-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        <option value="confirmed">Confirmed / Received</option>
                        <option value="packed">Packed (Velvet Case)</option>
                        <option value="shipped">Shipped (Dispatched)</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Courier Partner & AWB assignment */}
                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                      <select
                        value={
                          courierInputs[ord.orderId] !== undefined
                            ? courierInputs[ord.orderId]
                            : ord.courierName || "BlueDart Express"
                        }
                        onChange={(e) =>
                          setCourierInputs({
                            ...courierInputs,
                            [ord.orderId]: e.target.value,
                          })
                        }
                        className="px-2.5 py-1.5 text-xs bg-white rounded-xl border border-[#EAE4D9] font-medium"
                      >
                        <option value="BlueDart Express">BlueDart Express</option>
                        <option value="Delhivery Air">Delhivery Air</option>
                        <option value="DTDC Premium">DTDC Premium</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Courier AWB Tracking #"
                        value={
                          awbInputs[ord.orderId] !== undefined
                            ? awbInputs[ord.orderId]
                            : ord.trackingNumber || ""
                        }
                        onChange={(e) =>
                          setAwbInputs({
                            ...awbInputs,
                            [ord.orderId]: e.target.value,
                          })
                        }
                        className="px-3 py-1.5 text-xs bg-white rounded-xl border border-[#EAE4D9] w-36 font-mono"
                      />

                      <button
                        onClick={() => handleSaveCourier(ord.orderId)}
                        disabled={updatingId === ord.orderId}
                        className="px-3 py-1.5 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-colors"
                      >
                        Save AWB
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
