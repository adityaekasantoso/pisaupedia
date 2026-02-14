import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const NewsLetterSection = () => {
  return (
    <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 py-10 md:py-12 px-6 md:px-16 max-w-frame mx-auto rounded-[24px] bg-gradient-to-r from-[#03AC0E] via-[#06C167] to-[#00A651] shadow-[0_20px_60px_rgba(0,166,81,0.35)]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.15),transparent_60%)]" />

      <div className="relative flex items-center gap-5 mb-6 md:mb-0">
        <Image
          src="/icons/tokopedia.png"
          alt="Tokopedia Logo"
          width={88}
          height={88}
          className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
        />
        <p
          className={cn([
            integralCF.className,
            "font-bold text-[26px] md:text-[36px] text-white leading-tight tracking-wide",
          ])}
        >
          WE ARE AVAILABLE ON TOKOPEDIA
        </p>
      </div>

      <div className="relative flex items-center">
        <div className="flex flex-col w-full max-w-[380px] mx-auto">
          <p className="text-white/95 text-sm md:text-base mb-6 text-center md:text-left">
            Discover our products on Tokopedia. Shop easily, safely, and conveniently through our official store.
          </p>

          <a
            href="https://www.tokopedia.com/pisaupedia"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="w-full text-sm sm:text-base font-semibold bg-white text-[#03AC0E] hover:bg-[#F0FFF4] h-12 rounded-full px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02]"
              aria-label="Visit our Tokopedia Store"
              type="button"
            >
              Visit Our Store
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
