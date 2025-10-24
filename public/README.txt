
Nihong Jastip – Icon & Meta Pack
=================================

Files you can drop into your React project's public/ folder:

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- mstile-150x150.png
- site.webmanifest
- og-image-1200x630.png
- social-1200x1200.png
- logo-256.png / logo-128.png / logo-64.png

Recommended <head> snippet:
<!-- Place these inside <head> -->
<link rel="icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#012E6C">
<!-- Social preview -->
<meta property="og:title" content="Nihong Jastip">
<meta property="og:description" content="Jasa Titip & Ekspedisi Internasional Premium">
<meta property="og:image" content="/og-image-1200x630.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="/og-image-1200x630.png">


React usage example for header logo (CRA):
<img src={process.env.PUBLIC_URL + '/logo-128.png'} alt="Nihong Jastip" />
(Vite):
<img src="/logo-128.png" alt="Nihong Jastip" />

Notes:
- The source had a solid background; these exports keep the brand-blue background (#012E6C) and center the mark.
- If you need a transparent-background variant or a horizontal lockup, tell me and I can export those too.
