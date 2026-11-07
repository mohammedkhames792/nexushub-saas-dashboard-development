"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Palette,
  Shield,
  Bell,
  Globe,
  Camera,
  Save,
  Check,
} from "lucide-react";
import { useAuthStore, useUIStore, useToastStore } from "@/lib/store";
import { Breadcrumb } from "@/components/breadcrumb";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const addToast = useToastStore((s) => s.addToast);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [bio, setBio] = useState(
    "Full-stack developer and creator. Building beautiful products with modern web technologies.",
  );
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    addToast("success", "Settings Saved", "Your changes have been applied.");
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${enabled ? "bg-nexus-600" : "bg-surface-300 dark:bg-surface-600"}`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-4xl pb-10"
    >
      <Breadcrumb />

      {/* Header section with clean spacing */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Settings
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
          <User className="h-5 w-5 text-nexus-500" />
          <h2 className="text-base font-semibold text-surface-900 dark:text-white">
            Profile
          </h2>
        </div>
        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-nexus-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user?.avatar ?? "U"}
            </div>
            <div>
              <button className="flex items-center gap-2 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300 py-2 px-4 transition-colors">
                <Camera className="h-4 w-4" /> Change Avatar
              </button>
              <p className="text-xs text-surface-400 mt-1.5">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-nexus-500/40 focus:border-nexus-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
          <Palette className="h-5 w-5 text-nexus-500" />
          <h2 className="text-base font-semibold text-surface-900 dark:text-white">
            Appearance
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                Theme
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (theme === "dark") toggleTheme();
                }}
                className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all ${theme === "light" ? "bg-nexus-600 text-white shadow-md" : "bg-surface-100 dark:bg-surface-800 text-surface-500"}`}
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (theme === "light") toggleTheme();
                }}
                className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all ${theme === "dark" ? "bg-nexus-600 text-white shadow-md" : "bg-surface-100 dark:bg-surface-800 text-surface-500"}`}
              >
                <Shield className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-surface-400">
            Current:{" "}
            <span className="font-medium capitalize">{theme} mode</span>
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
          <Bell className="h-5 w-5 text-nexus-500" />
          <h2 className="text-base font-semibold text-surface-900 dark:text-white">
            Notifications
          </h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                Email Notifications
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Receive updates via email
              </p>
            </div>
            <Toggle enabled={notifEmail} onChange={setNotifEmail} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                Push Notifications
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Receive push notifications in browser
              </p>
            </div>
            <Toggle enabled={notifPush} onChange={setNotifPush} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-semibold py-2.5 px-6 transition-all hover:shadow-lg hover:shadow-nexus-600/25 active:scale-[0.98] text-sm"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </motion.div>
  );
}
