import Image from "next/image";
import PaymentPage from "@/components/PaymentPage";

export default async function Page({ params }) {
  const { username } = await params; // No need to await here; params is already resolved

  return (
      <>
          <PaymentPage username={username} />
      </>
  );
}
