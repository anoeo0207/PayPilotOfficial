"use client"

import * as React from "react"
import {
  Search,
  FileText,
  CreditCard,
  Users,
  Mail,
  MessageCircle,
  Phone,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How can we help you?</h1>
            <p className="text-lg text-muted-foreground">Search our knowledge base or browse categories below</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 h-12 text-lg"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Popular Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Getting Started</CardTitle>
                  <CardDescription>New to our platform?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Create your first invoice
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Set up your account
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Import existing data
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Billing & Payments</CardTitle>
                  <CardDescription>Manage your finances</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Payment methods
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Recurring invoices
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Tax settings
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Account Settings</CardTitle>
                  <CardDescription>Manage your team</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  User permissions
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Team management
                </li>
                <li className="flex items-center text-sm hover:text-primary cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Security settings
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Articles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="group cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      How to customize invoice templates?
                    </CardTitle>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <CardDescription className="flex items-center mt-2">
                    <Clock className="h-4 w-4 mr-2" />5 min read
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-semibold">Still need help?</h2>
            <p className="text-muted-foreground">Our support team is available 24/7 to assist you</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Button variant="outline" className="h-auto py-4 space-y-2">
                <Mail className="h-5 w-5 mb-1" />
                <span className="block">Email Support</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 space-y-2">
                <MessageCircle className="h-5 w-5 mb-1" />
                <span className="block">Live Chat</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 space-y-2">
                <Phone className="h-5 w-5 mb-1" />
                <span className="block">Phone Support</span>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Average response time: Under 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

