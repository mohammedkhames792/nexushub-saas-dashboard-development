"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useAuthStore, useToastStore } from "@/lib/store";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string().min(6, "Confirm your password"),
}).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const demoLogin = useAuthStore((s) => s.demoLogin);
  const addToast = useToastStore((s) => s.addToast);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = (data: RegisterForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      registerUser(data.name, data.email, data.password);
      addToast("success", "Account created!", "Welcome to NexusHub.");
      router.push("/dashboard");
      setIsSubmitting(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    demoLogin();
    addToast("success", "Demo Mode Activated", "Logged in as Alex Chen");
    router.push("/dashboard");
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl border ${hasError ? "border-red-400" : "border-surface-200 dark:border-surface-700"} bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all text-sm`;

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient relative overflow-hidden flex-col justify-center items-center p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-md text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">NexusHub</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Join the ecosystem</h2>
          <p className="text-white/70 leading-relaxed">
            Create your account and unlock the full power of project management, analytics, task boards, and community — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Analytics", "Kanban", "Projects", "Community"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Form */}
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

          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Create your account</h1>
          <p className="text-surface-500 dark:text-surface-400 mb-8">Start your journey with NexusHub</p>

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
              <span className="bg-surface-50 dark:bg-surface-950 px-3 text-surface-400">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Alex Chen"
                  className={inputClass(!!errors.name)}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass(!!errors.email)}
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
                  className={inputClass(!!errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  {...register("confirm")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClass(!!errors.confirm)}
                />
              </div>
              {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>}
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
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Already have an account?{" "}
            <Link href="/login" className="text-nexus-600 hover:text-nexus-700 dark:text-nexus-400 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
