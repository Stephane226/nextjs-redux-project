import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import "./styles/globals.css";
import Footer from './components/footer/Footer';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer/>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
