import { Database, Download, HardDrive, Upload, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DataController() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Data Controller</h1>
          <p className="text-muted-foreground mt-2">Manage your data and storage settings</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <HardDrive className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Storage Overview</CardTitle>
                <CardDescription>Monitor your storage usage</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used Storage</span>
                <span>75% (75GB of 100GB)</span>
              </div>
              <Progress value={75} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Documents</h4>
                <p className="text-2xl font-bold">35GB</p>
                <p className="text-sm text-muted-foreground">46% of total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Media</h4>
                <p className="text-2xl font-bold">25GB</p>
                <p className="text-sm text-muted-foreground">33% of total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Other</h4>
                <p className="text-2xl font-bold">15GB</p>
                <p className="text-sm text-muted-foreground">21% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Database className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Import and export your data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Button className="h-24" variant="outline">
                <div className="space-y-2">
                  <Upload className="h-6 w-6 mx-auto" />
                  <span className="block">Import Data</span>
                </div>
              </Button>
              <Button className="h-24" variant="outline">
                <div className="space-y-2">
                  <Download className="h-6 w-6 mx-auto" />
                  <span className="block">Export Data</span>
                </div>
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Export Format</h4>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Trash2 className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Data Cleanup</CardTitle>
                <CardDescription>Manage data retention and cleanup</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium">Auto Cleanup</h4>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="destructive" className="w-full">
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

