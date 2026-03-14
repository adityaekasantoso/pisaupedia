"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { TbUserCircle } from "react-icons/tb";
import { useAuth } from "@/../context/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Login successful");
        login(data.user, data.token);
        router.push("/shop");
      } else {
        const message = data.message || "Invalid email or password";
        setError(message);
        toast.error(message);
      }
    } catch {
      setError("Server error occurred");
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-black/20 p-3 rounded-full focus:outline-none focus:ring-0 text-sm md:text-base";

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="w-full lg:max-w-[420px] mx-auto p-8 space-y-6 rounded-[20px] border border-black/10 mt-20">
          <div className="flex flex-col items-center space-y-2">
            <TbUserCircle size={60} className="text-black/80" />
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Sign In Your Account
            </h2>
            <p className="text-center text-black/70 text-sm md:text-base">
              Access your account to continue shopping, track orders, and enjoy
              exclusive offers.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white rounded-full h-[50px] md:h-[54px] font-semibold text-base md:text-lg"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm md:text-base text-black/60">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-black hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}