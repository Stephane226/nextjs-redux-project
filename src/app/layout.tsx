import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import "./styles/globals.css";
import Footer from './components/footer/Footer';
import DataInitializer from './utils/dataInitializer/dataInitializer';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer/>
          <DataInitializer />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
