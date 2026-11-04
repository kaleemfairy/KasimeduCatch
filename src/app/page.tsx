import { BasketDrawer } from "@/components/BasketDrawer";
import { Catalog } from "@/components/Catalog";
import { DawnModal } from "@/components/DawnModal";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PreOrder } from "@/components/PreOrder";
import { SiteHeader } from "@/components/SiteHeader";
import { StoreHydrator } from "@/components/StoreHydrator";

export default function Home() {
  return (
    <>
      <StoreHydrator />
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
        <PreOrder />
      </main>
      <Footer />
      <BasketDrawer />
      <DawnModal />
    </>
  );
}
