import './globals.css';

export const metadata = {
  title: 'Salih Sülkü - Büyük Veri Analisti & Portföy',
  description:
    'Salih Sülkü - Manisa Celal Bayar Üniversitesi Büyük Veri Analistliği öğrencisi. Veri bilimi, makine öğrenmesi ve yazılım süreçleri portföyü.',
  openGraph: {
    title: 'Salih Sülkü - Büyük Veri Analisti & Portföy',
    description:
      'Salih Sülkü - Manisa Celal Bayar Üniversitesi Büyük Veri Analistliği öğrencisi. Veri bilimi, makine öğrenmesi ve yazılım süreçleri portföyü.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf6f0] text-stone-900 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
