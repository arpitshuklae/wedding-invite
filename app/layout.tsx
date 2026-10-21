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
        <style
          dangerouslySetInnerHTML={{
            __html: `#open-envelope.paper-envelope{position:fixed;inset:0;z-index:80;width:100%;height:100%;margin:0;padding:0;border:0;display:block;overflow:hidden;background:#f6f0e4;cursor:pointer;transform:none}#open-envelope[hidden],#open-envelope[data-state=open]{display:none!important;pointer-events:none!important;visibility:hidden}#open-envelope .env-scene{position:absolute;left:0;right:0;top:0;height:46%;overflow:hidden;background:#d7e6f2}#open-envelope .env-scene-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 42%}#open-envelope .env-body,#open-envelope .env-sheet{position:absolute;inset:0;background:#f6f0e4}#open-envelope .env-body{clip-path:polygon(0% 100%,50% 62%,100% 100%)}#open-envelope .env-collar{position:absolute;inset:0;pointer-events:none;transition:transform 1s cubic-bezier(.23,1,.32,1),translate 1s cubic-bezier(.23,1,.32,1)}#open-envelope .env-collar-left .env-sheet{clip-path:polygon(0% 46%,51.4% 62%,0% 100%)}#open-envelope .env-collar-right .env-sheet{clip-path:polygon(100% 46%,48.6% 62%,100% 100%)}#open-envelope[data-state=sliding] .env-collar-left{transform:translateX(-18%)!important;translate:-18% 0!important}#open-envelope[data-state=sliding] .env-collar-right{transform:translateX(18%)!important;translate:18% 0!important}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ease="transform 1s cubic-bezier(0.23,1,0.32,1)";function unlock(){var h=document.documentElement,b=document.body;h.classList.add("invite-ready");h.classList.remove("h-full");if(b){b.classList.add("invite-ready");b.classList.remove("h-full")}h.style.setProperty("overflow","auto","important");h.style.setProperty("height","auto","important");h.style.setProperty("max-height","none","important");if(b){b.style.setProperty("overflow","auto","important");b.style.setProperty("height","auto","important");b.style.setProperty("max-height","none","important")}}function hide(el){if(!el||el.getAttribute("data-state")==="open")return;el.setAttribute("data-state","open");el.hidden=true;el.setAttribute("aria-hidden","true");el.style.cssText="display:none!important;pointer-events:none!important;visibility:hidden;position:fixed;inset:auto;width:0;height:0;z-index:-1;overflow:hidden";unlock()}function slide(el){var left=el.querySelector(".env-collar-left");var right=el.querySelector(".env-collar-right");if(left){left.style.transition=ease;left.style.webkitTransition=ease;left.style.transform="translateX(-18%)";left.style.webkitTransform="translateX(-18%)";left.style.translate="-18% 0"}if(right){right.style.transition=ease;right.style.webkitTransition=ease;right.style.transform="translateX(18%)";right.style.webkitTransform="translateX(18%)";right.style.translate="18% 0"}}function go(){var el=document.getElementById("open-envelope");if(!el||el.getAttribute("data-state")!=="closed")return;el.setAttribute("data-state","sliding");el.classList.add("is-pressed");window.__INVITE_OPEN=true;try{window.dispatchEvent(new Event("invite-open"));el.dispatchEvent(new Event("invite-open",{bubbles:true}))}catch(err){}if(el.getAttribute("data-capture")==="slid")return;slide(el);var done=false;function finish(){if(done)return;done=true;hide(el)}var left=el.querySelector(".env-collar-left");if(left)left.addEventListener("transitionend",function(ev){if(!ev.propertyName||ev.propertyName.indexOf("transform")!==-1||ev.propertyName==="translate")finish()});setTimeout(finish,1100)}function from(e){var el=document.getElementById("open-envelope");if(!el||el.hidden)return;if(el===e.target||(e.target&&el.contains(e.target)))go()}document.addEventListener("pointerdown",from,true);document.addEventListener("touchstart",from,{capture:true,passive:true});document.addEventListener("click",from,true)})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
