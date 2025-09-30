"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Loader2,
  Sparkles,
  Coffee,
  Briefcase,
  Calendar,
  Mail,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "link"
  options?: string[]
  links?: { text: string; href: string }[]
}

interface ChatbotModalProps {
  defaultOpen?: boolean
}

export function ChatbotModal({ defaultOpen = false }: ChatbotModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialMessage: Message = {
    id: "welcome",
    content: "Hi! I'm Karim's AI assistant. I can help you learn about his work, schedule meetings, or answer questions about his services. What would you like to know?",
    sender: "bot",
    timestamp: new Date(),
    type: "quick-reply",
    options: [
      "View Portfolio",
      "Schedule Meeting",
      "About Karim",
      "Contact Info",
      "Recent Projects"
    ]
  }

  useEffect(() => {
    if (showWelcome && messages.length === 0) {
      setMessages([initialMessage])
      setShowWelcome(false)
    }
  }, [showWelcome, messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const simulateTyping = async (duration = 1000) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    setIsTyping(false)
  }

  const getBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("portfolio") || lowerMessage.includes("work") || lowerMessage.includes("projects")) {
      return {
        id: Date.now().toString(),
        content: "I'd love to show you Karim's portfolio! He has worked on various projects including web applications, mobile apps, and cloud solutions.",
        sender: "bot",
        timestamp: new Date(),
        type: "link",
        links: [
          { text: "View Full Portfolio", href: "/portfolio" },
          { text: "Recent Projects", href: "/projects" }
        ]
      }
    }
    
    if (lowerMessage.includes("meeting") || lowerMessage.includes("schedule") || lowerMessage.includes("calendar")) {
      return {
        id: Date.now().toString(),
        content: "Great! Karim is available for consultations and project discussions. You can check his calendar or send him a direct message.",
        sender: "bot",
        timestamp: new Date(),
        type: "link",
        links: [
          { text: "View Calendar", href: "/family/calendar" },
          { text: "Send Message", href: "mailto:karim@kygroup.com" }
        ]
      }
    }
    
    if (lowerMessage.includes("about") || lowerMessage.includes("who")) {
      return {
        id: Date.now().toString(),
        content: "Karim is an entrepreneur and full-stack developer with 5+ years of experience. He specializes in modern web applications, cloud architecture, and digital innovation. He's passionate about creating solutions that make a real difference.",
        sender: "bot",
        timestamp: new Date(),
        type: "quick-reply",
        options: ["View Resume", "See Skills", "Contact Karim"]
      }
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
      return {
        id: Date.now().toString(),
        content: "Here are the best ways to reach Karim:",
        sender: "bot",
        timestamp: new Date(),
        type: "link",
        links: [
          { text: "Email: karim@kygroup.com", href: "mailto:karim@kygroup.com" },
          { text: "LinkedIn", href: "https://linkedin.com/in/karim" },
          { text: "GitHub", href: "https://github.com/k9Doge3" }
        ]
      }
    }
    
    if (lowerMessage.includes("skills") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
      return {
        id: Date.now().toString(),
        content: "Karim's expertise includes React/Next.js, Node.js, TypeScript, Python, Cloud Services (AWS/Vercel), Database Design, and UI/UX. He stays current with the latest technologies and best practices.",
        sender: "bot",
        timestamp: new Date(),
        type: "quick-reply",
        options: ["View Resume", "See Projects", "Discuss a Project"]
      }
    }
    
    if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return {
        id: Date.now().toString(),
        content: "You can view Karim's detailed resume with his experience, education, and achievements.",
        sender: "bot",
        timestamp: new Date(),
        type: "link",
        links: [{ text: "View Resume", href: "/resume" }]
      }
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return {
        id: Date.now().toString(),
        content: "Hello! Nice to meet you! I'm here to help you learn more about Karim and his work. What interests you most?",
        sender: "bot",
        timestamp: new Date(),
        type: "quick-reply",
        options: ["His Portfolio", "Schedule Meeting", "His Background", "Contact Info"]
      }
    }
    
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return {
        id: Date.now().toString(),
        content: "You're very welcome! Is there anything else you'd like to know about Karim or his services?",
        sender: "bot",
        timestamp: new Date(),
        type: "quick-reply",
        options: ["View More Projects", "Schedule a Call", "Contact Directly"]
      }
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      content: "I'm here to help! You can ask me about Karim's portfolio, schedule a meeting, learn about his background, or get his contact information. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      type: "quick-reply",
      options: ["Portfolio", "Schedule Meeting", "About Karim", "Contact Info"]
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    
    await simulateTyping()
    
    const botResponse = getBotResponse(content)
    setMessages(prev => [...prev, botResponse])
  }

  const handleQuickReply = (option: string) => {
    handleSendMessage(option)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 z-50 p-0"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 p-0 max-w-md h-[600px] flex flex-col">
          {/* Header */}
          <DialogHeader className="p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-white text-sm">Karim's Assistant</DialogTitle>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-slate-400">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-slate-400 hover:text-white"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : "order-2"}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-800 text-slate-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Quick Reply Options */}
                        {message.type === "quick-reply" && message.options && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.options.map((option) => (
                              <Button
                                key={option}
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuickReply(option)}
                                className="text-xs bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {/* Links */}
                        {message.type === "link" && message.links && (
                          <div className="space-y-2 mt-3">
                            {message.links.map((link, index) => (
                              <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                target={link.href.startsWith("http") ? "_blank" : "_self"}
                                onClick={() => setIsOpen(false)}
                              >
                                <ExternalLink className="h-3 w-3" />
                                {link.text}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-500 mt-1 px-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    
                    {message.sender === "bot" && (
                      <Avatar className="h-6 w-6 order-1 mr-2">
                        <AvatarFallback className="bg-purple-600 text-white">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="bg-purple-600 text-white">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}