"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  projectType: string
  budget: string
  timeline: string
}

interface ContactFormProps {
  embedded?: boolean
  showProjectDetails?: boolean
  compactMode?: boolean
}

export function ContactForm({ 
  embedded = false, 
  showProjectDetails = true, 
  compactMode = false 
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData)
      
      setSubmitted(true)
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Portfolio/Branding",
    "Consulting",
    "Other"
  ]

  const budgetRanges = [
    "Under $5K",
    "$5K - $15K",
    "$15K - $30K",
    "$30K - $50K",
    "$50K+",
    "Let's discuss"
  ]

  const timelines = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible"
  ]

  if (submitted) {
    return (
      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Thank you for reaching out!</h3>
          <p className="text-slate-300 mb-4">
            I've received your message and will get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:text-white"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  const FormContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">
            Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Your full name"
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.email@example.com"
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            required
          />
        </div>
      </div>

      {!compactMode && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-300">
              Company
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Your company (optional)"
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Your phone number (optional)"
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-slate-300">
          Subject *
        </Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange("subject", e.target.value)}
          placeholder="What's this about?"
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
          required
        />
      </div>

      {/* Project Details */}
      {showProjectDetails && !compactMode && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-400" />
            Project Details
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Project Type</Label>
              <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Budget Range</Label>
              <Select onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range} className="text-white">
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Timeline</Label>
              <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline} className="text-white">
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-slate-300">
          Message *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Tell me about your project or what you'd like to discuss..."
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )

  if (embedded) {
    return (
      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-purple-400" />
            Get In Touch
          </CardTitle>
          <CardDescription className="text-slate-300">
            Ready to start your project? Let's discuss how I can help bring your ideas to life.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {FormContent}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          <Mail className="mr-2 h-4 w-4" />
          Contact Me
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-purple-400" />
            Get In Touch
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Ready to start your project? Let's discuss how I can help bring your ideas to life.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {FormContent}
        </div>
      </DialogContent>
    </Dialog>
  )
}