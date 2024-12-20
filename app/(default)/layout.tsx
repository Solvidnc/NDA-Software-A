"use client";

import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";



export default function DefaultLayout({


  // Bad: Calling setState during render will cause issues
  
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
