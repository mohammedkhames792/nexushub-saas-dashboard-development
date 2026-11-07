"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles,
  ChevronLeft, ChevronRight, Quote,
} from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const TESTIMONIALS = [
  { quote: "NexusHub transformed how I manage my projects. The analytics alone saved me 20 hours a week.", author: "Sarah Mitchell", role: "Senior Engineer, Vercel" },
  { quote: "The Kanban board and community features make this the most complete dev platform I've used.", author: "David Park", role: "CTO, ByteForge" },
  { quote: "From tracking revenue to organizing tasks — NexusHub does it all beautifully.", author: "Lena Rodriguez", role: "Indie Creator & Consultant" },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const demoLogin = useAuthStore((s) => s.demoLogin);
  const addToast = useToastStore((s) => s.addToast);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (data: LoginForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login(data.email, data.password);
      addToast("success", "Welcome back!", "You've been logged in successfully.");
      router.push("/dashboard");
      setIsSubmitting(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    demoLogin();
    addToast("success", "Demo Mode Activated", "Logged in as Alex Chen");
    router.push("/dashboard");
  };

  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen flex">
      {/* ─── Left: Branding ─── */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">NexusHub</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="h-10 w-10 text-white/30 mb-4" />
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                &ldquo;{TESTIMONIALS[testimonialIdx].quote}&rdquo;
              </p>
              <div>
                <p className="text-white font-semibold">{TESTIMONIALS[testimonialIdx].author}</p>
                <p className="text-white/60 text-sm">{TESTIMONIALS[testimonialIdx].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/50 text-sm">The developer ecosystem, unified.</p>
        </div>
      </div>

      {/* ─── Right: Form ─── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-surface-50 dark:bg-surface-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-nexus-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-surface-900 dark:text-white tracking-tight">NexusHub</span>
          </div>

          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-surface-500 dark:text-surface-400 mb-8">Sign in to your account to continue</p>

          {/* Quick Demo Login */}
          <button
            onClick={handleDemoLogin}
            className="w-full mb-6 flex items-center justify-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-semibold py-3 px-4 transition-all duration-200 hover:shadow-lg hover:shadow-nexus-600/25 active:scale-[0.98]"
          >
            <Sparkles className="h-5 w-5" />
            Quick Demo Login
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200 dark:border-surface-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-50 dark:bg-surface-950 px-3 text-surface-400">or continue with email</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-2.5 px-4 text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
              <span className="text-base">🔵</span>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-2.5 px-4 text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
              <span className="text-base">⬛</span>
              GitHub
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? "border-red-400 dark:border-red-400" : "border-surface-200 dark:border-surface-700"} bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all text-sm`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${errors.password ? "border-red-400 dark:border-red-400" : "border-surface-200 dark:border-surface-700"} bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("remember")}
                  type="checkbox"
                  className="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-nexus-600 focus:ring-nexus-500"
                />
                <span className="text-sm text-surface-600 dark:text-surface-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-nexus-600 hover:text-nexus-700 dark:text-nexus-400 dark:hover:text-nexus-300 font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 disabled:bg-nexus-400 text-white font-semibold py-3 px-4 transition-all duration-200 hover:shadow-lg hover:shadow-nexus-600/25 active:scale-[0.98] disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-nexus-600 hover:text-nexus-700 dark:text-nexus-400 dark:hover:text-nexus-300 font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
