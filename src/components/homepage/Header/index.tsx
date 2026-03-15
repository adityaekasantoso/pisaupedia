import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import * as motion from "framer-motion/client";

const Header = () => {
  return (
    <header className="pt-10 md:pt-24 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1E0F0A] via-[#3A1F13] to-[#5A2B1B]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,130,0.25),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,240,180,0.15),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(20,10,5,0.5))]" />

      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4 text-[#FFF9F1]">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={cn([
              integralCF.className,
              "text-4xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8 text-center md:text-left",
              "bg-gradient-to-r from-[#FFF3B0] via-[#FFD966] to-[#C9A227]",
              "bg-clip-text text-transparent",
              "drop-shadow-[0_8px_30px_rgba(201,162,39,0.35)]",
            ])}
          >
            CRAFTED FOR PRECISION. BUILT TO LAST.
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#FBE8C1] text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px] mx-auto md:mx-0 text-center md:text-left"
          >
            Discover our premium collection of chef knives, crafted with
            precision steel and ergonomic handles to deliver unmatched
            performance in every cut.
          </motion.p>

          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#FFD966]">
                <AnimatedCounter from={0} to={30} />+
              </span>
              <span className="text-xs xl:text-base text-[#FBE8C1] text-nowrap">
                Models
              </span>
            </div>

            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full bg-[#FFD966]/50"
              orientation="vertical"
            />

            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#FFD966]">
                <AnimatedCounter from={0} to={30} />+
              </span>
              <span className="text-xs xl:text-base text-[#FBE8C1] text-nowrap">
                Products
              </span>
            </div>

            <Separator
              className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-[#FFD966]/50"
              orientation="vertical"
            />

            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#FFD966]">
                <AnimatedCounter from={0} to={100} />+
              </span>
              <span className="text-xs xl:text-base text-[#FBE8C1] text-nowrap">
                Customers
              </span>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative md:px-4 min-h-[500px] md:h-[390px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-homepage.png')] md:bg-[url('/images/header-homepage.png')]"
        >
          <Image
            priority
            src="/icons/big-star.png"
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-12 max-w-[76px] max-h-[76px] lg:max-w-24 lg:max-h-max-w-24 xl:max-w-[104px] xl:max-h-[104px] animate-[spin_4s_infinite] filter brightness-150 saturate-150 drop-shadow-[0_0_10px_#FFD966]"
          />
          <Image
            priority
            src="/icons/small-star.png"
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56 max-w-11 max-h-11 md:max-w-14 md:max-h-14 animate-[spin_3s_infinite] filter brightness-150 saturate-150 drop-shadow-[0_0_6px_#FFD966]"
          />
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
