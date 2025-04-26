"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Coffee,
  DollarSign,
  FileCheck,
  MessageSquare,
  Shield,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  Phone,
  Bell,
  Lock,
  CheckSquare,
  Calendar,
  ArrowUpRight,
  Menu,
  X,
  Gift,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { FormSubmitButton } from "@/components/form-submit-button"
import { OptimizedImage } from "@/components/optimized-image"
import { useMobile } from "@/hooks/use-mobile"
import { useState, useEffect, useRef } from "react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [countdown, setCountdown] = useState({ hours: 3, minutes: 59, seconds: 59 })
  const [formStep, setFormStep] = useState(1)
  const isMobile = useMobile()
  const heroRef = useRef<HTMLDivElement>(null)
  const registrationRef = useRef<HTMLDivElement>(null)

  // Handle scroll for sticky header and performance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // スムーススクロールのためのCSS変数設定
    document.documentElement.style.scrollBehavior = "smooth"
    document.documentElement.classList.add("font-optimize")

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = ""
      document.documentElement.classList.remove("font-optimize")
    }
  }, [])

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Track UTM parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get("utm_source")
    const utmMedium = urlParams.get("utm_medium")
    const utmCampaign = urlParams.get("utm_campaign")

    if (utmSource || utmMedium || utmCampaign) {
      // Store UTM parameters in localStorage for conversion tracking
      localStorage.setItem("utm_source", utmSource || "")
      localStorage.setItem("utm_medium", utmMedium || "")
      localStorage.setItem("utm_campaign", utmCampaign || "")
    }
  }, [])

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth" })
    setSheetOpen(false)
  }

  const closeSheet = () => setSheetOpen(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formStep === 1) {
      setFormStep(2)
      // Scroll to keep the form in view after expanding
      setTimeout(() => {
        registrationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    } else {
      // Submit form logic would go here
      alert("診断申し込みありがとうございます！担当者から連絡いたします。")
    }
  }

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="flex min-h-screen flex-col will-change-transform tap-highlight-transparent">
      {/* Sticky Notification Bar with Countdown */}
      <div className="bg-yellow-100 text-yellow-800 py-2 text-center text-xs sm:text-sm font-medium sticky top-0 z-50">
        <div className="container flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <Bell className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 animate-pulse" />
          <span>
            <span className="font-bold">本日限定</span>：登録で
            <span className="font-bold underline">非公開求人10件</span>プレゼント！
            <span className="ml-1 inline-flex items-center bg-red-100 text-red-700 px-1 py-0.5 rounded">
              残り時間: {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
            </span>
          </span>
        </div>
      </div>

      <header
        className={`sticky top-8 z-40 w-full border-b backdrop-blur transition-all duration-200 ${
          isScrolled ? "bg-background/95 supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-background"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <TrendingUp className="h-6 w-6 text-teal-500" />
            <span>キャリアマッチ</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-teal-500 transition-colors">
              サービス内容
            </Link>
            <Link href="#success" className="text-sm font-medium hover:text-teal-500 transition-colors">
              成功事例
            </Link>
            <Link href="#flow" className="text-sm font-medium hover:text-teal-500 transition-colors">
              サービスの流れ
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-teal-500 transition-colors">
              よくある質問
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="flex items-center gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600 hidden md:flex">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>LINE登録</span>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden min-touch-target">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between font-bold text-xl mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-teal-500" />
                      <span>キャリアマッチ</span>
                    </div>
                    <SheetClose className="rounded-full hover:bg-gray-100 p-2">
                      <X className="h-5 w-5" />
                      <span className="sr-only">閉じる</span>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link
                      href="#features"
                      className="text-base font-medium hover:text-teal-500 transition-colors py-3 border-b min-touch-target"
                      onClick={closeSheet}
                    >
                      サービス内容
                    </Link>
                    <Link
                      href="#success"
                      className="text-base font-medium hover:text-teal-500 transition-colors py-3 border-b min-touch-target"
                      onClick={closeSheet}
                    >
                      成功事例
                    </Link>
                    <Link
                      href="#flow"
                      className="text-base font-medium hover:text-teal-500 transition-colors py-3 border-b min-touch-target"
                      onClick={closeSheet}
                    >
                      サービスの流れ
                    </Link>
                    <Link
                      href="#faq"
                      className="text-base font-medium hover:text-teal-500 transition-colors py-3 border-b min-touch-target"
                      onClick={closeSheet}
                    >
                      よくある質問
                    </Link>
                  </nav>
                  <div className="mt-auto space-y-4">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 h-12" onClick={scrollToRegistration}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>LINE登録</span>
                    </Button>
                    <Button className="w-full" variant="outline" onClick={scrollToRegistration}>
                      無料診断を受ける
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Phone Button */}
            <Button
              variant="outline"
              size="icon"
              className="border-teal-500 text-teal-700 hover:bg-teal-50 md:hidden min-touch-target"
              aria-label="電話で問い合わせ"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Optimized for Google Ads */}
      <section ref={heroRef} className="w-full py-8 sm:py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-teal-50">
        <div className="container px-4 md:px-6 lg:px-8 xl:max-w-7xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full whitespace-nowrap">
                  20代30代専用エージェント
                </Badge>
                <Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-700 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full">
                  未経験OK
                </Badge>
                <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full">
                  転職成功率98%
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-teal-500 block">未経験からの転職成功率No.1</span>
                <span className="block">
                  年収<span className="text-teal-500 text-4xl sm:text-6xl md:text-7xl font-extrabold">+200万円</span>
                  の可能性
                </span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-xl font-medium">
                20-30代専門エージェントが最短2週間の転職を実現。
                <span className="font-bold bg-yellow-100 px-1 border-b-2 border-yellow-400">書類選考通過率95%以上</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-base sm:text-lg h-12 sm:h-14 px-4 sm:px-8 shadow-lg transition-transform hover:scale-105 group animate-pulse"
                  onClick={scrollToRegistration}
                  aria-label="今すぐ無料診断を受ける"
                >
                  <span>今すぐ無料診断を受ける</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-teal-500 text-teal-700 hover:bg-teal-50 h-12 sm:h-14 px-4 sm:px-8 group"
                  aria-label="LINEで相談する"
                >
                  <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>LINEで相談する</span>
                  <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                <div className="flex items-center">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">完全無料</span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">登録は1分</span>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0" />
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">20代30代限定</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 bg-white/80 rounded-lg p-2 sm:p-3 border border-teal-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                      M
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-700">
                      Y
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-300 flex items-center justify-center text-xs font-bold text-teal-700">
                      K
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold">今週の転職成功者: 28名</p>
                    <p className="text-xs text-muted-foreground">残り枠: あと5名のみ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-6 lg:mt-0">
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-xl shadow-2xl">
                <OptimizedImage
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="若手ビジネスパーソンの笑顔と年収推移グラフ"
                  className="object-cover w-full h-full"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-white/95 p-3 sm:p-4 rounded-lg shadow-lg">
                  <p className="text-xs sm:text-sm font-medium">平均年収推移</p>
                  <div className="flex items-end gap-1 sm:gap-2">
                    <div className="text-center">
                      <div className="h-12 sm:h-16 w-6 sm:w-8 bg-gray-200 rounded-t-md relative">
                        <div className="absolute bottom-0 w-full h-1/3 bg-teal-300 rounded-t-md"></div>
                      </div>
                      <p className="text-[10px] sm:text-xs mt-1">前職</p>
                      <p className="text-[10px] sm:text-xs font-bold">320万円</p>
                    </div>
                    <div className="text-center">
                      <div className="h-16 sm:h-24 w-6 sm:w-8 bg-gray-200 rounded-t-md relative">
                        <div className="absolute bottom-0 w-full h-1/2 bg-teal-400 rounded-t-md"></div>
                      </div>
                      <p className="text-[10px] sm:text-xs mt-1">転職後</p>
                      <p className="text-[10px] sm:text-xs font-bold">450万円</p>
                    </div>
                    <div className="text-center">
                      <div className="h-24 sm:h-32 w-6 sm:w-8 bg-gray-200 rounded-t-md relative">
                        <div className="absolute bottom-0 w-full h-2/3 bg-teal-500 rounded-t-md"></div>
                      </div>
                      <p className="text-[10px] sm:text-xs mt-1">1年後</p>
                      <p className="text-[10px] sm:text-xs font-bold">520万円</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3 border border-teal-100 hidden sm:block">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold">Google口コミ評価: 4.9/5.0</p>
                    <div className="flex">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
              {/* New: Special offer badge */}
              <div className="absolute -top-2 -left-2 bg-red-500 text-white p-2 rounded-full shadow-lg animate-bounce hidden sm:flex items-center justify-center w-16 h-16">
                <div className="text-center">
                  <p className="text-xs font-bold">今だけ</p>
                  <p className="text-xs font-bold">特典付き</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - With real-time stats */}
      <section className="w-full py-3 sm:py-4 bg-teal-500 text-white overflow-x-auto">
        <div className="container">
          <div className="flex flex-nowrap md:flex-wrap justify-between items-center gap-4 text-xs sm:text-sm min-w-max md:min-w-0 px-4 md:px-0">
            <div className="flex items-center whitespace-nowrap">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span>
                今月の登録者: <b>342</b>名
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span>
                内定率: <b>92.7</b>%
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span>
                平均年収アップ額: <b> 183</b>万円
              </span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span>
                最短転職期間: <b>2</b>週間
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Conversion Form - For Google Ads Landing */}
      <section className="w-full py-8 bg-white border-b" id="registration-form" ref={registrationRef}>
        <div className="container px-4 md:px-6 lg:px-8 xl:max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl bg-teal-50 rounded-xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            {/* Diagonal "Limited Offer" Banner */}
            <div className="absolute -right-12 top-6 bg-red-500 text-white py-1 px-10 transform rotate-45 shadow-md z-10">
              <span className="text-xs font-bold">期間限定</span>
            </div>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">\ 60秒で完了 / 無料キャリア診断</h2>
              <p className="text-sm text-muted-foreground">あなたの市場価値を今すぐチェック</p>
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center bg-white rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-gray-600 border border-gray-200">
                  <Lock className="h-2 w-2 sm:h-3 sm:w-3 mr-1 text-teal-500" />
                  <span>個人情報保護済み</span>
                </div>
              </div>
            </div>

            {/* Multi-step form with progress indicator */}
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${formStep === 1 ? "bg-teal-500 text-white" : "bg-teal-500 text-white"} flex items-center justify-center text-xs font-bold`}
                  >
                    1
                  </div>
                  <span className="text-[10px] sm:text-xs mt-1">基本情報</span>
                </div>
                <div className="flex-1 flex items-center mx-1 sm:mx-2">
                  <div className={`h-1 w-full ${formStep >= 1 ? "bg-teal-500" : "bg-gray-300"}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${formStep >= 2 ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-600"} flex items-center justify-center text-xs font-bold`}
                  >
                    2
                  </div>
                  <span className="text-[10px] sm:text-xs mt-1">職歴情報</span>
                </div>
                <div className="flex-1 flex items-center mx-1 sm:mx-2">
                  <div className={`h-1 w-full ${formStep >= 2 ? "bg-teal-500" : "bg-gray-300"}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span className="text-[10px] sm:text-xs mt-1">診断結果</span>
                </div>
              </div>
            </div>

            <form className="grid gap-3 sm:gap-4" onSubmit={handleFormSubmit}>
              {formStep === 1 ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Input
                        id="quick-name"
                        placeholder="お名前"
                        required
                        className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Input
                        id="quick-age"
                        placeholder="年齢"
                        type="number"
                        required
                        className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Input
                      id="quick-email"
                      placeholder="メールアドレス"
                      type="email"
                      required
                      className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Input
                      id="quick-phone"
                      placeholder="電話番号"
                      type="tel"
                      required
                      className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <FormSubmitButton
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 h-12 sm:h-14 text-sm sm:text-lg min-touch-target"
                      aria-label="次へ進む"
                    >
                      次へ進む（残り5枠）
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </FormSubmitButton>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1 sm:space-y-2">
                    <Input
                      id="current-job"
                      placeholder="現在の職種"
                      required
                      className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Input
                      id="current-salary"
                      placeholder="現在の年収（万円）"
                      type="number"
                      required
                      className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Input
                      id="desired-job"
                      placeholder="希望職種"
                      required
                      className="bg-white h-10 sm:h-12 text-sm min-touch-target"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <FormSubmitButton
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 h-12 sm:h-14 text-sm sm:text-lg min-touch-target"
                      aria-label="無料診断を受ける"
                    >
                      無料診断を受ける（残り5枠）
                      <Gift className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </FormSubmitButton>
                  </div>
                </>
              )}

              <div className="flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
                <CheckSquare className="h-2 w-2 sm:h-3 sm:w-3 text-teal-500 flex-shrink-0" />
                <span>利用規約とプライバシーポリシーに同意したものとみなされます</span>
              </div>
            </form>

            {/* Real-time activity indicator */}
            <div className="mt-3 sm:mt-4 bg-white rounded-lg p-2 sm:p-3 border border-gray-200 flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-[10px] sm:text-xs text-gray-600">
                <span className="font-medium">田中さん</span>が2分前に登録しました（東京都・28歳）
              </p>
            </div>

            {/* New: Special offer details */}
            <div className="mt-3 sm:mt-4 bg-yellow-50 rounded-lg p-2 sm:p-3 border border-yellow-200">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                <p className="text-[10px] sm:text-xs font-medium text-yellow-800">
                  今だけ特典：登録者全員に「年収アップ交渉術PDF」をプレゼント！
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Focused on 20s-30s concerns */}
      <section id="pain-points" className="w-full py-8 sm:py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 lg:px-8 xl:max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                こんな悩み、ありませんか？
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                20代30代の多くが抱える「このまま大丈夫？」という不安。
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-muted hover:border-teal-200 transition-colors hover:shadow-lg">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal-100">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">このまま年収が上がる気がしない</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  「同期と比べて給料が低い...」「このままじゃ結婚も家も無理...」そんな将来不安を解消します。
                </p>
                <Button
                  variant="link"
                  className="mt-3 sm:mt-4 text-teal-500 p-2 -m-2 h-auto text-sm"
                  onClick={scrollToRegistration}
                  aria-label="無料診断で年収アップの可能性を確認"
                >
                  無料診断で年収アップの可能性を確認 <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-muted hover:border-teal-200 transition-colors hover:shadow-lg">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal-100">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">スキルなしで転職できるか不安</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  「プログラミングできない」「資格持ってない」でも大丈夫。あなたの"伸びしろ"を評価する企業を紹介します。
                </p>
                <Button
                  variant="link"
                  className="mt-3 sm:mt-4 text-teal-500 p-2 -m-2 h-auto text-sm"
                  onClick={scrollToRegistration}
                  aria-label="未経験OKの求人を確認する"
                >
                  未経験OKの求人を確認する <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-muted hover:border-teal-200 transition-colors hover:shadow-lg">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal-100">
                  <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">今の仕事にやりがいを感じない</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  「毎日同じ作業の繰り返し...」「成長している実感がない...」そんな停滞感から抜け出せます。
                </p>
                <Button
                  variant="link"
                  className="mt-3 sm:mt-4 text-teal-500 p-2 -m-2 h-auto text-sm"
                  onClick={scrollToRegistration}
                  aria-label="やりがいのある仕事を探す"
                >
                  やりがいのある仕事を探す <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">人気の転職先カテゴリー</h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground">
                未経験からでも挑戦できる、高年収・高成長の職種
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-6 sm:py-8">
            <Tabs defaultValue="it" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="it" className="text-xs sm:text-sm">
                  IT・Web
                </TabsTrigger>
                <TabsTrigger value="marketing" className="text-xs sm:text-sm">
                  マーケティング
                </TabsTrigger>
                <TabsTrigger value="sales" className="text-xs sm:text-sm">
                  営業職
                </TabsTrigger>
                <TabsTrigger value="consulting" className="text-xs sm:text-sm">
                  コンサルティング
                </TabsTrigger>
              </TabsList>
              <TabsContent value="it" className="mt-4 sm:mt-6">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">Webエンジニア</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収400〜600万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        プログラミング経験がなくても、研修制度が充実した企業多数
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">ITコンサルタント</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収500〜800万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        論理的思考力があれば、IT知識は入社後に習得可能
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2 lg:col-span-1">
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">プロジェクトマネージャー</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収600〜900万円</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800 text-[10px] sm:text-xs">経験者優遇</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        コミュニケーション能力が高ければチャンスあり
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="marketing" className="mt-4 sm:mt-6">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">Webマーケター</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収400〜550万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        デジタルツールの基本操作ができれば応募可能
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">SNSマーケティング</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収350〜500万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">普段からSNSを使っている方なら適性あり</p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2 lg:col-span-1">
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">広告運用スペシャリスト</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収450〜650万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        データ分析に興味がある方に最適なポジション
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="sales" className="mt-4 sm:mt-6">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">IT営業</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収450〜600万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        コミュニケーション力があれば技術知識は不要
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">法人営業</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収400〜700万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">飲食・アパレル出身者が多数活躍中</p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2 lg:col-span-1">
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">カスタマーサクセス</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収400〜550万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">接客業経験者が転職しやすい人気職種</p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="consulting" className="mt-4 sm:mt-6">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">経営コンサルタント</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収600〜1000万円</p>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800 text-[10px] sm:text-xs">経験者優遇</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">
                        論理的思考力と問題解決能力が求められる
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">人事コンサルタント</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収500〜800万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">人材業界出身者でなくても挑戦可能</p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2 lg:col-span-1">
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base">業務改善コンサルタント</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">年収450〜700万円</p>
                      <Badge className="mt-2 bg-teal-100 text-teal-800 text-[10px] sm:text-xs">未経験OK</Badge>
                      <p className="text-[10px] sm:text-xs mt-2 text-gray-500">事務職からのキャリアチェンジに最適</p>
                      <Button
                        variant="link"
                        className="mt-2 text-teal-500 p-0 h-auto text-[10px] sm:text-xs"
                        onClick={scrollToRegistration}
                      >
                        求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="text-center mt-4 sm:mt-6">
            <Button
              aria-label="無料診断を受ける"
              className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base"
              onClick={scrollToRegistration}
            >
              すべての職種を見る
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Unique Value Section - Tailored for inexperienced job seekers */}
      <section id="features" className="w-full py-8 sm:py-12 md:py-24 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                未経験でも内定が取れる3つの理由
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                他のエージェントとは違う、キャリアマッチ独自のサポート
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-none shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-teal-100">
                  <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">ポテンシャル採用枠の確保</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  「経験不問」「第二新卒歓迎」の非公開求人を多数保有。スキルより人柄とやる気で評価する企業だけを厳選。
                </p>
                <div className="mt-3 sm:mt-4 bg-teal-100/50 p-2 rounded-md">
                  <p className="text-[10px] sm:text-xs text-teal-800">
                    <span className="font-bold">実績：</span>未経験者の書類選考通過率95%以上
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-none shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-teal-100">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">強み発掘カウンセリング</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  あなたが気づいていない「強み」を発見。職務経歴書では伝わらない魅力を面接官に伝える方法を伝授。
                </p>
                <div className="mt-3 sm:mt-4 bg-teal-100/50 p-2 rounded-md">
                  <p className="text-[10px] sm:text-xs text-teal-800">
                    <span className="font-bold">実績：</span>面接通過率が平均40%アップ
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-none shadow-lg md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-teal-100">
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">年収交渉代行</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  「自分で言い出せない...」そんな年収交渉はプロが代行。平均15%以上のアップを実現しています。
                </p>
                <div className="mt-3 sm:mt-4 bg-teal-100/50 p-2 rounded-md">
                  <p className="text-[10px] sm:text-xs text-teal-800">
                    <span className="font-bold">実績：</span>平均年収アップ額183万円
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base" onClick={scrollToRegistration}>
              無料診断で自分の市場価値を確認する
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories - Relatable examples for 20s-30s */}
      <section id="success" className="w-full py-8 sm:py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                リアル転職成功事例
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                あなたと同じ「未経験」から転職に成功した先輩たち
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 py-6 sm:py-12 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-40 sm:h-48 w-full md:h-auto md:w-1/3">
                    <Image
                      src="/placeholder.svg?height=300&width=200"
                      fill
                      alt="成功事例1"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 sm:p-6 md:w-2/3">
                    <div className="flex items-center mb-2">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">26歳</Badge>
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">
                        大学卒
                      </Badge>
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">文系</Badge>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold">アパレル販売 → IT営業</h3>
                    <p className="text-sm sm:text-lg font-semibold text-teal-500">年収320万円→480万円</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      「PCスキルもなく不安でしたが、『接客での傾聴力』を強みとしてアピールする方法を教えてもらい、大手IT企業に転職できました。研修制度が充実していて、今は楽しく働いています！」
                    </p>
                    <div className="mt-3 sm:mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="text-[10px] sm:text-xs border-teal-200 text-teal-700"
                        onClick={scrollToRegistration}
                      >
                        私も相談してみる <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-40 sm:h-48 w-full md:h-auto md:w-1/3">
                    <Image
                      src="/placeholder.svg?height=300&width=200"
                      fill
                      alt="成功事例2"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 sm:p-6 md:w-2/3">
                    <div className="flex items-center mb-2">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">29歳</Badge>
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">
                        フリーター
                      </Badge>
                      <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-700 text-[10px] sm:text-xs">
                        職歴なし
                      </Badge>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold">フリーター → Webマーケター</h3>
                    <p className="text-sm sm:text-lg font-semibold text-teal-500">月収18万円→32万円</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      「職歴なしの29歳で諦めかけていました。でも『趣味でやっていたブログ運営』を強みに変えるアドバイスをもらい、ベンチャー企業のマーケティング部門に入社。今は正社員として安定しています。」
                    </p>
                    <div className="mt-3 sm:mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="text-[10px] sm:text-xs border-teal-200 text-teal-700"
                        onClick={scrollToRegistration}
                      >
                        私も相談してみる <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-4 sm:mt-6">
            <Button className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base" onClick={scrollToRegistration}>
              もっと成功事例を見る
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Service Flow - Simplified and engaging */}
      <section id="flow" className="w-full py-8 sm:py-12 md:py-24 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                サービスの流れ
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                登録から内定まで、すべて専任アドバイザーがサポート
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl py-6 sm:py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <h3 className="font-bold text-sm sm:text-base">カンタン登録</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">60秒で完了</p>
                <div className="mt-2">
                  <FileCheck className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <h3 className="font-bold text-sm sm:text-base">強み発掘</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">カウンセリング</p>
                <div className="mt-2">
                  <Zap className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <h3 className="font-bold text-sm sm:text-base">求人紹介</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">厳選非公開求人</p>
                <div className="mt-2">
                  <Users className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  4
                </div>
                <h3 className="font-bold text-sm sm:text-base">面接対策</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">書類添削も実施</p>
                <div className="mt-2">
                  <MessageSquare className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  5
                </div>
                <h3 className="font-bold text-sm sm:text-base">年収交渉</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">平均15%アップ</p>
                <div className="mt-2">
                  <DollarSign className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold mb-2">
                  6
                </div>
                <h3 className="font-bold text-sm sm:text-base">入社後支援</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">3ヶ月間サポート</p>
                <div className="mt-2">
                  <ThumbsUp className="h-6 w-6 text-teal-500 mx-auto" />
                </div>
              </div>
            </div>

            {/* Mobile view - Horizontal scrollable cards */}
            <div className="md:hidden mt-4 overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max px-2">
                <div className="flex items-center bg-teal-100 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-teal-800">最短2週間で内定</span>
                </div>
                <div className="flex items-center bg-teal-100 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-teal-800">完全無料サポート</span>
                </div>
                <div className="flex items-center bg-teal-100 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-teal-800">LINEで気軽に相談</span>
                </div>
                <div className="flex items-center bg-teal-100 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-teal-800">土日面談OK</span>
                </div>
              </div>
            </div>

            {/* Desktop additional info */}
            <div className="hidden md:flex justify-center gap-6 mt-8">
              <div className="flex items-center bg-teal-100 rounded-full px-4 py-2">
                <Clock className="h-4 w-4 mr-2 text-teal-700" />
                <span className="text-sm font-medium text-teal-800">最短2週間で内定</span>
              </div>
              <div className="flex items-center bg-teal-100 rounded-full px-4 py-2">
                <Shield className="h-4 w-4 mr-2 text-teal-700" />
                <span className="text-sm font-medium text-teal-800">完全無料サポート</span>
              </div>
              <div className="flex items-center bg-teal-100 rounded-full px-4 py-2">
                <MessageSquare className="h-4 w-4 mr-2 text-teal-700" />
                <span className="text-sm font-medium text-teal-800">LINEで気軽に相談</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base" onClick={scrollToRegistration}>
              今すぐ無料診断を受ける
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Examples - Focused on trending industries */}
      <section className="w-full py-8 sm:py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                未経験から挑戦できる人気職種
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                スキルより「可能性」で評価される、20代30代に人気の職種
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-6 sm:py-12">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border p-2 sm:p-4 text-left font-medium">職種</th>
                    <th className="border p-2 sm:p-4 text-left font-medium">平均年収</th>
                    <th className="border p-2 sm:p-4 text-left font-medium">未経験の強み</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 sm:p-4 font-medium">IT営業</td>
                    <td className="border p-2 sm:p-4 text-teal-500 font-bold">450〜600万円</td>
                    <td className="border p-2 sm:p-4 text-xs sm:text-sm">コミュニケーション力・素直さ・学習意欲</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 sm:p-4 font-medium">Webマーケター</td>
                    <td className="border p-2 sm:p-4 text-teal-500 font-bold">400〜550万円</td>
                    <td className="border p-2 sm:p-4 text-xs sm:text-sm">SNS活用経験・トレンド感度・分析思考</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-4 font-medium">HR系ベンチャー</td>
                    <td className="border p-2 sm:p-4 text-teal-500 font-bold">380〜500万円</td>
                    <td className="border p-2 sm:p-4 text-xs sm:text-sm">人に興味がある・共感力・行動力</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 sm:p-4 font-medium">DX推進アシスタント</td>
                    <td className="border p-2 sm:p-4 text-teal-500 font-bold">350〜480万円</td>
                    <td className="border p-2 sm:p-4 text-xs sm:text-sm">デジタルツール使用経験・柔軟性・好奇心</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-6">
            <Button className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base" onClick={scrollToRegistration}>
              無料診断で適職を診断する
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Strengths - With relatable examples */}
      <section className="w-full py-8 sm:py-12 md:py-24 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">私たちの強み</h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                20代30代の未経験転職に特化した専門エージェント
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-6 sm:py-12 md:grid-cols-2">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal-100">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">20代30代専門</h3>
                <ul className="mt-3 sm:mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">アドバイザーの平均年齢29.4歳</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">同世代だから本音で相談できる</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">LINEでいつでも気軽に連絡OK</span>
                  </li>
                </ul>
                <div className="mt-3 sm:mt-4 flex justify-end">
                  <Button
                    variant="link"
                    className="text-[10px] sm:text-xs text-teal-500 p-0"
                    onClick={scrollToRegistration}
                  >
                    相談してみる <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal-100">
                  <ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">未経験採用に強い</h3>
                <ul className="mt-3 sm:mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">ポテンシャル採用枠を多数確保</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">未経験でも評価される強みの見つけ方</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">成長企業との独占取引多数</span>
                  </li>
                </ul>
                <div className="mt-3 sm:mt-4 flex justify-end">
                  <Button
                    variant="link"
                    className="text-[10px] sm:text-xs text-teal-500 p-0"
                    onClick={scrollToRegistration}
                  >
                    非公開求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Risk Hedge */}
      <section className="w-full py-8 sm:py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                安心のリスクヘッジ
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                転職活動における不安要素をすべて解消
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-6 sm:py-12 md:grid-cols-2">
            <Card className="bg-teal-50 border-none">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">完全無料宣言</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  成功報酬は企業負担（求職者費用0円）。転職が決まらなくても一切費用はかかりません。
                </p>
                <div className="mt-3 sm:mt-4 flex justify-end">
                  <Button
                    variant="link"
                    className="text-[10px] sm:text-xs text-teal-500 p-0"
                    onClick={scrollToRegistration}
                  >
                    無料診断を受ける <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-teal-50 border-none">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">プライバシー保護</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  応募企業への情報開示は同意制。現職への漏洩リスクゼロで安心して転職活動ができます。
                </p>
                <div className="mt-3 sm:mt-4 flex justify-end">
                  <Button
                    variant="link"
                    className="text-[10px] sm:text-xs text-teal-500 p-0"
                    onClick={scrollToRegistration}
                  >
                    プライバシーポリシーを見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="w-full py-8 sm:py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 sm:mb-8">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold">多くの方に選ばれています</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold text-teal-500">98%</div>
              <p className="text-xs sm:text-sm text-center">転職成功率</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold text-teal-500">4.9/5.0</div>
              <p className="text-xs sm:text-sm text-center">利用者満足度</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold text-teal-500">3,200+</div>
              <p className="text-xs sm:text-sm text-center">非公開求人数</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold text-teal-500">15%+</div>
              <p className="text-xs sm:text-sm text-center">平均年収アップ率</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
            <Image
              src="/placeholder.svg?height=60&width=120"
              width={120}
              height={60}
              alt="企業ロゴ1"
              className="opacity-70 hover:opacity-100 transition-opacity w-20 h-10 sm:w-[120px] sm:h-[60px]"
            />
            <Image
              src="/placeholder.svg?height=60&width=120"
              width={120}
              height={60}
              alt="企業ロゴ2"
              className="opacity-70 hover:opacity-100 transition-opacity w-20 h-10 sm:w-[120px] sm:h-[60px]"
            />
            <Image
              src="/placeholder.svg?height=60&width=120"
              width={120}
              height={60}
              alt="企業ロゴ3"
              className="opacity-70 hover:opacity-100 transition-opacity w-20 h-10 sm:w-[120px] sm:h-[60px]"
            />
            <Image
              src="/placeholder.svg?height=60&width=120"
              width={120}
              height={60}
              alt="企業ロゴ4"
              className="opacity-70 hover:opacity-100 transition-opacity w-20 h-10 sm:w-[120px] sm:h-[60px]"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section - Addressing common concerns */}
      <section id="faq" className="w-full py-8 sm:py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">よくある質問</h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl">
                未経験転職に関するよくある疑問にお答えします
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-6 sm:py-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm sm:text-base">本当に未経験でも転職できますか？</AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm">
                  はい、可能です。実際に当社の支援で転職された方の98%が「未経験」からのスタートです。重要なのは「経験」ではなく「可能性」。あなたの持つ強みや素質を最大限アピールする方法をお教えします。特に20代30代は「伸びしろ」を評価する企業が多く、チャンスがたくさんあります。
                  <div className="mt-3 sm:mt-4">
                    <Button
                      variant="link"
                      className="text-[10px] sm:text-xs text-teal-500 p-0"
                      onClick={scrollToRegistration}
                    >
                      未経験OKの求人を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm sm:text-base">
                  現在年収300万円ですが、本当に年収アップできますか？
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm">
                  十分可能です。当社の支援で転職された方の平均年収アップ額は183万円です。特に未経験からIT業界やWebマーケティング業界に転職された方は、年収150万円以上アップするケースが多いです。また、年収交渉のプロが企業と交渉するため、提示額よりも平均15%アップした条件で内定を獲得しています。
                  <div className="mt-3 sm:mt-4">
                    <Button
                      variant="link"
                      className="text-[10px] sm:text-xs text-teal-500 p-0"
                      onClick={scrollToRegistration}
                    >
                      年収アップ事例を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm sm:text-base">
                  職歴がほとんどなくても大丈夫ですか？
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm">
                  はい、問題ありません。第二新卒やフリーター期間が長い方も多数転職成功しています。実は「白紙の状態」は企業にとって「自社色に染められる」というメリットがあります。また、アルバイト経験や趣味など、意外なところに「強み」が眠っていることも。私たちはそんな隠れた才能を見つけ出すプロです。
                  <div className="mt-3 sm:mt-4">
                    <Button
                      variant="link"
                      className="text-[10px] sm:text-xs text-teal-500 p-0"
                      onClick={scrollToRegistration}
                    >
                      職歴なしからの転職事例を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm sm:text-base">在職中でも転職活動はできますか？</AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm">
                  もちろん可能です。実際に登録者の約7割は在職中です。平日夜（21時まで）や土日の面談にも対応しています。また、LINEでのやり取りがメインなので、通勤中や休憩時間に気軽に相談できます。企業への応募も同意制なので、現職にバレる心配はありません。
                  <div className="mt-3 sm:mt-4">
                    <Button
                      variant="link"
                      className="text-[10px] sm:text-xs text-teal-500 p-0"
                      onClick={scrollToRegistration}
                    >
                      在職中の転職活動について相談する <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-sm sm:text-base">
                  本当に費用は一切かからないのですか？
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm">
                  はい、求職者様からは一切費用をいただいておりません。当社の報酬は、採用企業様からいただく成功報酬のみです。転職が決まらなくても費用は発生しません。また、転職後に「やっぱり合わなかった」という場合のサポートも無料で行っています。
                  <div className="mt-3 sm:mt-4">
                    <Button
                      variant="link"
                      className="text-[10px] sm:text-xs text-teal-500 p-0"
                      onClick={scrollToRegistration}
                    >
                      無料サービスの詳細を見る <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button className="bg-teal-500 hover:bg-teal-600 text-sm sm:text-base" onClick={scrollToRegistration}>
              他の質問を相談する
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Optimized for conversion */}
      <section className="w-full py-8 sm:py-12 md:py-24 bg-teal-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 sm:mb-8">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="block">あなたの市場価値、</span>
                <span className="block">
                  <span className="underline decoration-white decoration-2">今すぐ</span>チェックしませんか？
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-xl">
                <span className="font-bold">\ 60秒で完了 /</span> 今の仕事では見えない「あなたの可能性」を発見します
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-lg">
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="bg-teal-600 p-3 sm:p-4 text-white text-center">
                <h3 className="text-lg sm:text-xl font-bold">60秒カンタン診断</h3>
                <p className="text-xs sm:text-sm">\ 登録者限定 / 非公開求人をご紹介</p>
              </div>
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        お名前<span className="text-red-500">*</span>
                      </label>
                      <Input id="name" placeholder="山田 太郎" required className="h-9 sm:h-10 text-sm" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label
                        htmlFor="age"
                        className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        年齢<span className="text-red-500">*</span>
                      </label>
                      <Input id="age" placeholder="28" type="number" required className="h-9 sm:h-10 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="address"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      現住所<span className="text-red-500">*</span>
                    </label>
                    <Input id="address" placeholder="東京都渋谷区〇〇1-2-3" required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      電話番号<span className="text-red-500">*</span>
                    </label>
                    <Input id="phone" placeholder="090-1234-5678" type="tel" required className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="current-job"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      現在の職種<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="current-job"
                      placeholder="例：営業、事務、エンジニアなど"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="current-salary"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      現在年収<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="current-salary"
                      placeholder="350"
                      type="number"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">万円単位でご入力ください</p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="desired-job"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      希望職種<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="desired-job"
                      placeholder="例：ITエンジニア、Webマーケティング、営業など"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      メールアドレス<span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      placeholder="your-email@example.com"
                      type="email"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <FormSubmitButton
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 h-10 sm:h-12 text-sm sm:text-lg font-bold shadow-lg transition-transform hover:scale-105 group"
                  >
                    <span>今すぐ無料診断を受ける</span>
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </FormSubmitButton>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 pt-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500" />
                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
                      個人情報は厳重に管理し、転職サポート以外の目的では使用しません
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500 flex-shrink-0" />
                      <span className="ml-1 text-[10px] sm:text-xs">完全無料</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500 flex-shrink-0" />
                      <span className="ml-1 text-[10px] sm:text-xs">60秒で完了</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500 flex-shrink-0" />
                      <span className="ml-1 text-[10px] sm:text-xs">即日対応</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="mt-4 sm:mt-6 bg-white/10 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-2">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 sm:w-10 sm:h-10"
                    alt="ユーザー1"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white w-8 h-8 sm:w-10 sm:h-10"
                    alt="ユーザー2"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    className="rounded-full border-2 border-white w-8 h-8 sm:w-10 sm:h-10"
                    alt="ユーザー3"
                    width={40}
                    height={40}
                    height={40}
                  />
                </div>
                <p className="text-xs sm:text-sm text-white/90">
                  <span className="font-bold">28名</span>が本日登録！
                  <span className="font-bold text-yellow-300">残り5枠</span>
                  の無料相談枠があります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-8 sm:py-12 md:py-24 bg-teal-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                あなたの人生を変える一歩を、今
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-xl">
                「このままでいいのかな...」と思ったら、まずは無料診断から。あなたの市場価値、可能性を知るところからスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-teal-500 hover:bg-white/90 group animate-pulse text-sm sm:text-base"
                  onClick={scrollToRegistration}
                >
                  今すぐ無料診断を受ける
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-teal-500 text-sm sm:text-base"
                >
                  <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  LINEで相談する
                </Button>
              </div>
              <div className="flex items-center mt-4 bg-teal-700/50 p-2 sm:p-3 rounded-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-300" />
                <p className="text-xs sm:text-sm">
                  <span className="font-bold text-yellow-300">本日限定</span>：登録で非公開求人10件プレゼント！
                </p>
              </div>
            </div>
            <div className="relative h-[250px] sm:h-[300px] overflow-hidden rounded-xl lg:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                fill
                alt="キャリアアップのイメージ"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 p-2 sm:p-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500" />
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    平均年収<span className="text-teal-500">+183万円</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-50 shadow-lg">
        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 text-sm h-14 font-bold"
          onClick={scrollToRegistration}
          aria-label="今すぐ無料診断を受ける"
        >
          今すぐ無料診断を受ける
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
