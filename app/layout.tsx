import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@/components/Provider';
import { fonts } from '@/font';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { ViewTransitions } from 'next-view-transitions';
import { Footer } from '@/components/ui/Footer';
import { cookies } from 'next/headers';
import GoogleCaptchaWrapper from '@/components/GoogleWrapper';
import { DrawerExample } from '@/components/CookieDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ijele Membership',
  description: 'Membership website for Ijele SC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = cookies().get('id')?.value;

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn('min-h-screen', inter.className, fonts.rubik.variable)}
        >
          {/* <GoogleCaptchaWrapper> */}
          <Provider>
            <div className="bg-white min-h-screen overflow-x-hidden">
              <Header id={id} />
              {children}
              <DrawerExample />
              <Footer />
            </div>
          </Provider>
          {/* </GoogleCaptchaWrapper> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
