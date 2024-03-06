"use client";

import Image from "next/image";

export default function Index() {
  return (
    <>
      <h1>index</h1>
      <div className="flex justify-center">
        <div className="w-6/12">
          <Image
            src="/images/image01.webp"
            alt="cats"
            width={1200}
            height={1200}
            quality={80} // default:75
            sizes="(min-width: 640px) 50vw, 100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={true}
          />
        </div>
      </div>
    </>
  )
}
