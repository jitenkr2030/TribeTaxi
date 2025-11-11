import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TribeTaxi - Jharkhand's Community-Owned Ride-Hailing Platform",
  description: "TribeTaxi is Jharkhand's first community-owned ride-hailing platform with zero commission for drivers and transparent pricing for riders. Available across 10 cities in Jharkhand.",
  keywords: ["TribeTaxi", "Jharkhand", "ride-hailing", "taxi", "cab", "transportation", "zero commission", "rural connectivity", "tribal languages"],
  authors: [{ name: "TribeTaxi Team" }],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TribeTaxi",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "TribeTaxi - Jharkhand's Community-Owned Ride-Hailing Platform",
    description: "Zero commission ride-hailing platform serving Jharkhand with rural connectivity and tribal language support.",
    url: "https://tribetaxi.in",
    siteName: "TribeTaxi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TribeTaxi - Jharkhand's Ride-Hailing Platform",
    description: "Zero commission ride-hailing platform serving Jharkhand",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2D2D2D" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TribeTaxi" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
              
              // Install prompt for PWA
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install button or custom UI
                const installButton = document.createElement('button');
                installButton.textContent = 'Install TribeTaxi';
                installButton.style.position = 'fixed';
                installButton.style.bottom = '20px';
                installButton.style.right = '20px';
                installButton.style.zIndex = '1000';
                installButton.style.padding = '10px 20px';
                installButton.style.backgroundColor = '#2D2D2D';
                installButton.style.color = 'white';
                installButton.style.border = 'none';
                installButton.style.borderRadius = '5px';
                installButton.style.cursor = 'pointer';
                
                installButton.addEventListener('click', () => {
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the install prompt');
                    } else {
                      console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                  });
                });
                
                document.body.appendChild(installButton);
              });
              
              // Handle app installed
              window.addEventListener('appinstalled', (evt) => {
                console.log('TribeTaxi was installed.');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
