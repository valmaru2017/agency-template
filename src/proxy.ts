import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────
// Maintenance / "Coming soon" switch.
//
// Set the environment variable MAINTENANCE_MODE=true (in Hostinger's
// Environment variables, then redeploy) and every page on the site answers
// with the Coming soon page below. Remove it or set it to anything else and
// the real site is served exactly as before — nothing here touches the
// pages themselves.
// ─────────────────────────────────────────────────────────────────────────

const COMING_SOON_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Neness — Coming soon</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: "Manrope", system-ui, sans-serif;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }
  img { height: 40px; width: auto; }
  h1 {
    margin: 48px 0 0;
    font-family: "Cormorant", Georgia, serif;
    font-weight: 300;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p {
    margin: 16px 0 0;
    max-width: 44ch;
    text-wrap: balance;
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
  }
  footer {
    position: absolute;
    bottom: 28px;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }
  a { color: inherit; text-decoration: none; }
</style>
</head>
<body>
  <img src="/neness/logo-full.png" alt="Neness">
  <h1>Coming soon</h1>
  <p>The craft of classic automotive detailing. San Diego.</p>
  <footer><a href="mailto:info@neness.com">info@neness.com</a></footer>
</body>
</html>`;

export function proxy() {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  // 503 + Retry-After tells search engines the downtime is temporary, so
  // they keep the real pages indexed instead of replacing them with this.
  return new NextResponse(COMING_SOON_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "86400",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  // Every page, but not Next's build assets or files with an extension
  // (images, video, fonts, robots.txt…) — the Coming soon page needs the
  // logo, and blocking assets has no effect on what visitors see.
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
