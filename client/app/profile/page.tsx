"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Package,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  Edit,
  MapPin,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  // Fake user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "March 2022",
    address: "123 Apple Street, Cupertino, CA 95014",
    phone: "+1 (555) 123-4567",
  };

  // Fake orders data
  const orders = [
    {
      id: "ORD-2023-8756",
      date: "October 15, 2023",
      status: "Delivered",
      total: "$1,299.00",
      items: [
        {
          name: "iPhone 15 Pro",
          color: "Natural Titanium",
          price: "$1,299.00",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2023-6542",
      date: "August 3, 2023",
      status: "Delivered",
      total: "$249.00",
      items: [
        {
          name: "AirPods Pro",
          color: "White",
          price: "$249.00",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-2023-4321",
      date: "May 22, 2023",
      status: "Delivered",
      total: "$799.00",
      items: [
        {
          name: "iPad Air",
          color: "Space Gray",
          price: "$799.00",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ];

  // Fake wishlist data
  const wishlist = [
    {
      name: 'MacBook Pro 14"',
      price: "$1,999.00",
      image: "/placeholder.svg?height=120&width=120",
      badge: "M3 Pro",
    },
    {
      name: "Apple Watch Ultra 2",
      price: "$799.00",
      image: "/placeholder.svg?height=120&width=120",
      badge: "New",
    },
    {
      name: "HomePod mini",
      price: "$99.00",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "AirPods Max",
      price: "$549.00",
      image: "/placeholder.svg?height=120&width=120",
    },
  ];

  // Fake payment methods
  const paymentMethods = [
    {
      type: "Visa",
      last4: "4242",
      expiry: "09/25",
      isDefault: true,
    },
    {
      type: "Mastercard",
      last4: "5555",
      expiry: "12/24",
      isDefault: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since {user.memberSince}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <nav className="space-y-2">
                    <Button
                      variant={activeTab === "orders" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("orders")}
                    >
                      <Package className="mr-2 h-5 w-5" />
                      My Orders
                    </Button>
                    <Button
                      variant={activeTab === "wishlist" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("wishlist")}
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Wishlist
                    </Button>
                    <Button
                      variant={activeTab === "payment" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Methods
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Account Settings
                    </Button>
                    <Separator className="my-4" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">My Orders</CardTitle>
                      <CardDescription>
                        View and track your orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="space-y-6">
                          {orders.map((order) => (
                            <Card key={order.id} className="overflow-hidden">
                              <CardHeader className="bg-muted/50 py-3">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <p className="font-medium">
                                      Order #{order.id}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {order.date}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <Badge
                                      variant={
                                        order.status === "Delivered"
                                          ? "secondary"
                                          : "default"
                                      }
                                    >
                                      {order.status}
                                    </Badge>
                                    <p className="font-medium">{order.total}</p>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                {order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                                      <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {item.color}
                                      </p>
                                      <p className="text-sm">{item.price}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex justify-end mt-4">
                                  <Button variant="outline" size="sm">
                                    View Details
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No orders yet
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            When you place an order, it will appear here.
                          </p>
                          <Button>Start Shopping</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">My Wishlist</CardTitle>
                    <CardDescription>
                      Products you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {wishlist.map((product, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden group hover:shadow-lg transition-all"
                        >
                          <div className="relative aspect-square bg-muted">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            {product.badge && (
                              <Badge className="absolute top-2 right-2">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium text-lg">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {product.price}
                            </p>
                            <div className="flex gap-2">
                              <Button className="w-full">Add to Cart</Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:border-red-200"
                              >
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {paymentMethods.map((method, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-16 bg-muted rounded flex items-center justify-center font-bold">
                                {method.type}
                              </div>
                              <div>
                                <p className="font-medium">
                                  •••• {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiry}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault && (
                                <Badge variant="outline">Default</Badge>
                              )}
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button className="w-full">Add Payment Method</Button>
                  </CardContent>
                </Card>
              )}

              {/* Account Settings Tab */}
              {activeTab === "settings" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={user.name}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            value={user.email}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full p-2 border rounded-md"
                            value={user.phone}
                            readOnly
                          />
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Information
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Shipping Address</h3>
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-muted-foreground">
                                {user.address}
                              </p>
                              <p className="text-muted-foreground">
                                {user.phone}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Address
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Password & Security
                      </h3>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Preferences</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new products, offers and orders
                          </p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                          <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
