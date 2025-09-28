import Navbar from '../../components/Navbar';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='pt-[72px]'>{children}</main>
    </>
  );
}
