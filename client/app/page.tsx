"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ShoppingCart,
  Heart,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tablet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("iphone");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-black text-white">
          <div className="absolute inset-0 z-0 h-full">
            <div className="relative w-full h-full">
              <video
                src="/video/xlarge.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 object-cover w-full h-full opacity-50 mix-blend-overlay"
              ></video>
            </div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              iPhone 15 Pro
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Титановый. Мощный. Профессиональный.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                Купить сейчас
                <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Узнать больше
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Категории</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Smartphone className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-medium text-center">iPhone</h3>
                </CardContent>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Tablet className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-medium text-center">iPad</h3>
                </CardContent>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Laptop className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-medium text-center">Mac</h3>
                </CardContent>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Watch className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-medium text-center">Watch</h3>
                </CardContent>
              </Card>
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Headphones className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="font-medium text-center">AirPods</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Популярные товары
            </h2>
            <Tabs
              defaultValue="iphone"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="iphone">iPhone</TabsTrigger>
                  <TabsTrigger value="ipad">iPad</TabsTrigger>
                  <TabsTrigger value="mac">Mac</TabsTrigger>
                  <TabsTrigger value="watch">Watch</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="iphone" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "iPhone 15 Pro",
                      price: "129 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "Новинка",
                    },
                    {
                      name: "iPhone 15",
                      price: "99 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "Новинка",
                    },
                    {
                      name: "iPhone 14 Pro",
                      price: "109 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                    {
                      name: "iPhone 14",
                      price: "79 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                  ].map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ipad" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "iPad Pro",
                      price: "99 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "M2",
                    },
                    {
                      name: "iPad Air",
                      price: "79 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                    {
                      name: "iPad",
                      price: "49 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                    {
                      name: "iPad mini",
                      price: "59 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                  ].map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mac" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: 'MacBook Pro 16"',
                      price: "249 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "M3 Max",
                    },
                    {
                      name: 'MacBook Pro 14"',
                      price: "189 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "M3 Pro",
                    },
                    {
                      name: 'MacBook Air 15"',
                      price: "149 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "M2",
                    },
                    {
                      name: "Mac mini",
                      price: "79 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "M2",
                    },
                  ].map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="watch" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Apple Watch Ultra 2",
                      price: "89 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "Новинка",
                    },
                    {
                      name: "Apple Watch Series 9",
                      price: "49 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                      badge: "Новинка",
                    },
                    {
                      name: "Apple Watch SE",
                      price: "29 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                    {
                      name: "Apple Watch Nike",
                      price: "39 990 ₽",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                  ].map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg">
                Смотреть все{" "}
                {activeTab === "iphone"
                  ? "iPhone"
                  : activeTab === "ipad"
                  ? "iPad"
                  : activeTab === "mac"
                  ? "Mac"
                  : "Watch"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Почему выбирают нас
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShoppingCart className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle>Официальная гарантия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Все устройства имеют официальную гарантию производителя 1
                    год
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Smartphone className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle>Сервисное обслуживание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Собственный сервисный центр с квалифицированными
                    специалистами
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Headphones className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle>Поддержка 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Круглосуточная поддержка клиентов по телефону и онлайн
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: { name: string; price: string; image: string; badge?: string };
}) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute top-2 right-2">{product.badge}</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-muted-foreground mb-4">{product.price}</p>
        <div className="flex gap-2">
          <Button className="w-full">Купить</Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-primary hover:border-primary"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
