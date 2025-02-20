"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowRight,
  ExternalLink,
  GamepadIcon,
  Gift,
  Globe,
  Laptop,
  SmartphoneIcon,
  Star,
  Trophy,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DevelopedBy() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-top" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm">
              Crafting Digital Experiences
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-violet-900 to-gray-900 bg-clip-text text-transparent">
              Developed by AE
            </h1>
            <p className="text-xl text-gray-600">
              Creating innovative games, apps, and tools that empower millions of users worldwide
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Latest Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our collection of award-winning games, productivity apps, and digital tools
            </p>
            <div className="flex justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.value)}
                  className="rounded-full"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((product) => activeCategory === "all" || product.category === activeCategory)
              .map((product, index) => (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/90">{product.badge}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                        {product.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex items-center mt-4">
                      <div className="flex text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button className="flex-1 rounded-full">
                      {product.category === "games" ? "Play Now" : "Get Started"}
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A timeline of our achievements and product releases</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-12 border-l-2 border-primary/20 last:border-0">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary/20 -translate-x-1/2">
                  <div className="absolute inset-1 rounded-full bg-primary" />
                </div>
                <div className="space-y-2">
                  <Badge>{item.year}</Badge>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-primary/10 text-primary">Recognition</Badge>
            <h2 className="text-3xl font-bold">Awards & Recognition</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {awards.map((award, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{award.title}</h3>
                  <p className="text-sm text-gray-600">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Experience Our Products?</h2>
            <p className="text-gray-300">
              Join millions of satisfied users and discover why our products are loved worldwide
            </p>
            <Button size="lg" variant="outline" className="rounded-full bg-white text-gray-900 hover:bg-gray-100">
              View All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { icon: Users, value: "2M+", label: "Active Users" },
  { icon: Gift, value: "50+", label: "Products Released" },
  { icon: Globe, value: "120+", label: "Countries Reached" },
  { icon: Trophy, value: "15+", label: "Industry Awards" },
]

const categories = [
  { icon: Laptop, label: "All", value: "all" },
  { icon: GamepadIcon, label: "Games", value: "games" },
  { icon: SmartphoneIcon, label: "Apps", value: "apps" },
  { icon: Laptop, label: "Tools", value: "tools" },
]

const products = [
  {
    title: "Cosmic Quest",
    category: "games",
    description: "An epic space adventure game with stunning visuals and immersive gameplay.",
    image: "/placeholder.svg",
    price: "$19.99",
    reviews: "2.3k",
    badge: "Featured",
  },
  {
    title: "TaskFlow Pro",
    category: "apps",
    description: "AI-powered task management app for maximum productivity.",
    image: "/placeholder.svg",
    price: "$4.99/mo",
    reviews: "4.2k",
    badge: "New",
  },
  {
    title: "Invoice Manager",
    category: "tools",
    description: "Professional invoicing solution for businesses of all sizes.",
    image: "/placeholder.svg",
    price: "$9.99/mo",
    reviews: "1.8k",
    badge: "Popular",
  },
  {
    title: "Speed Racer X",
    category: "games",
    description: "High-octane racing game with futuristic vehicles and tracks.",
    image: "/placeholder.svg",
    price: "$24.99",
    reviews: "3.1k",
    badge: "Best Seller",
  },
  {
    title: "Health Track",
    category: "apps",
    description: "Complete health and fitness tracking solution.",
    image: "/placeholder.svg",
    price: "Free",
    reviews: "5.7k",
    badge: "Trending",
  },
  {
    title: "Code Studio Pro",
    category: "tools",
    description: "Advanced IDE for professional developers.",
    image: "/placeholder.svg",
    price: "$14.99/mo",
    reviews: "2.9k",
    badge: "Premium",
  },
]

const timeline = [
  {
    year: "2024",
    title: "Launched TaskFlow Pro",
    description: "Released our most advanced productivity app, reaching 1M users in the first month.",
  },
  {
    year: "2023",
    title: "Cosmic Quest Release",
    description: "Our flagship game received multiple industry awards and critical acclaim.",
  },
  {
    year: "2022",
    title: "Invoice Manager 2.0",
    description: "Major update to our business tool with AI-powered features.",
  },
  {
    year: "2021",
    title: "Company Formation",
    description: "Started our journey with a small team of passionate developers.",
  },
]

const awards = [
  {
    title: "Best Mobile Game 2023",
    description: "Cosmic Quest won the prestigious Mobile Game of the Year award.",
  },
  {
    title: "Innovation Excellence",
    description: "Recognized for breakthrough AI implementation in TaskFlow Pro.",
  },
  {
    title: "Business Solution Award",
    description: "Invoice Manager named best business tool of the year.",
  },
]

