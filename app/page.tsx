import Navbar from "@/components/Navbar";
import ScrollScene from "@/components/ScrollScene";
import SeccionMisionVision from "@/components/home/SeccionMisionVision";
import SeccionValores from "@/components/home/SeccionValores";
import SeccionSoluciones from "@/components/home/SeccionSoluciones";
import PasosTrabajo from "@/components/home/PasosTrabajo";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollScene />

        <SeccionSoluciones />
        <SeccionMisionVision />
        <SeccionValores />
        <PasosTrabajo />
      </main>
      <Footer />
    </>
  );
}
