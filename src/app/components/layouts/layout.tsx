import Header from "@/app/components/header";
import '@/app/globals.css';
import { useEffect } from "react";

// function Layout({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     console.log("Layoutレンダリング");
//   }, []);
//   return (
//     <>
//       <Header />
//       <main className="p-5">{children}</main>
//     </>
//   )
// }
const Layout = (props : {
  children: React.ReactNode;
}) => {
  const { children } = props;
  useEffect(() => {
    console.log("Layoutレンダリング");
  }, []);
  return (
    <>
      <Header />
      <main className="p-5">{children}</main>
    </>
  )
}

export default Layout