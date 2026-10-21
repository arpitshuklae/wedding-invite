import type { Metadata, Viewport } from "next";
import { Allura, Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kartik weds Srashti",
  description:
    "Wedding invitation for Kartik and Srashti — 18th & 19th January 2027, Vrindavan Garden, Bhopal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${greatVibes.variable} ${allura.variable} ${cormorant.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-[#8fa8c4] text-[#1d3557]">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function unlock(){var h=document.documentElement,b=document.body;h.classList.add("invite-ready");h.classList.remove("h-full");if(b){b.classList.add("invite-ready");b.classList.remove("h-full")}h.style.setProperty("overflow","auto","important");h.style.setProperty("height","auto","important");h.style.setProperty("max-height","none","important");if(b){b.style.setProperty("overflow","auto","important");b.style.setProperty("height","auto","important");b.style.setProperty("max-height","none","important")}}function hide(el){el.setAttribute("data-state","open");el.hidden=true;el.setAttribute("aria-hidden","true");el.style.cssText="display:none!important;pointer-events:none!important;visibility:hidden;position:fixed;inset:auto;width:0;height:0;z-index:-1;overflow:hidden";unlock()}function go(){var el=document.getElementById("open-envelope");if(!el||el.getAttribute("data-state")!=="closed")return;el.setAttribute("data-state","sliding");el.classList.add("is-pressed");window.__INVITE_OPEN=true;try{window.dispatchEvent(new Event("invite-open"));el.dispatchEvent(new Event("invite-open",{bubbles:true}))}catch(err){}if(el.getAttribute("data-capture")==="slid")return;setTimeout(function(){hide(el)},1600)}function from(e){var el=document.getElementById("open-envelope");if(!el||el.hidden)return;if(el===e.target||(e.target&&el.contains(e.target)))go()}document.addEventListener("pointerdown",from,true);document.addEventListener("touchstart",from,{capture:true,passive:true});document.addEventListener("click",from,true)})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
