import { ShoppingCart, Search, User, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between m-auto max-w-7xl">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-semibold text-lg">AppleStore</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                iPhone
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                iPad
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Mac
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Watch
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                AirPods
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex w-40 lg:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
            <Link href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  2
                </Badge>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
