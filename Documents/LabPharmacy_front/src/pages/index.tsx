import Navbar from '../components/navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center px-24 pt-10 ${inter.className}`}
    >
      <Navbar />
      home
    </main>
  );
}
