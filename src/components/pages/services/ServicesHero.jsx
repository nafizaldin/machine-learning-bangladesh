'use client';

import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesHero() {
  const router = useRouter();

  return (
    <section className="w-full component-gap-x ">
      <div className="flex flex-col md:flex-row items-center gap-10 pb-24">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="heading-56  font-bold text-primary dark:text-white">
            Services That Will Drive Growth and Innovation
          </h1>
          <p className="text-16 text-secondary">
            From idea to launch, we provide end-to-end design and development solutions tailored to your business goals. We don’t just deliver services — we deliver experiences. Our team blends creativity, strategy, and technology to help brands grow, scale, and stay ahead in the digital world.
          </p>

          <div className="flex gap-4 mt-4">
            <FlexibleButton
              label="Start a Project"
              iconName="Vector"
              variant="solid"
              onClick={() => router.push('/contact')}
            />
            <FlexibleButton
              label="Learn More"
              iconName="book"
              variant="outline"
              onClick={() => router.push('/about-us')}
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
        <Image src="/images/services/services-banner.webp" alt="Hero Image" layout="responsive" width={700} height={500} />
         
        </div>
      </div>
    </section>
  );
}
