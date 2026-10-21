import type { Metadata, Viewport } from "next";
import { Allura, Cinzel, Cormorant_Garamond } from "next/font/google";
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

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
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

const ENVELOPE_CSS = `#open-envelope.paper-envelope{--paper:#f6f0e4;--peak:56%;--mouth:30%;position:fixed;inset:0;z-index:80;width:100%;height:100%;margin:0;padding:0;border:0;display:block;overflow:hidden;background:#f6f0e4;cursor:pointer;transform:none;touch-action:manipulation;-webkit-appearance:none;appearance:none}#open-envelope[hidden],#open-envelope[data-state=open]{display:none!important;pointer-events:none!important;visibility:hidden}#open-envelope .env-scene{position:absolute;inset:0;z-index:1;overflow:hidden;background:#d7e6f2}#open-envelope .env-scene-img{display:block;position:absolute;left:-8%;top:-28%;width:130%;height:130%;max-width:none;object-fit:cover;object-position:42% 48%}#open-envelope .env-body,#open-envelope .env-sheet{position:absolute;inset:0;background:#f6f0e4}#open-envelope .env-body{z-index:2;clip-path:polygon(0% 100%,50% 56%,100% 100%)}#open-envelope .env-collar{position:absolute;inset:0;pointer-events:none}#open-envelope .env-collar-right{z-index:3}#open-envelope .env-collar-left{z-index:4}#open-envelope .env-collar-left .env-sheet{clip-path:polygon(0% 30%,51.6% 56%,0% 100%);filter:drop-shadow(12px 8px 10px rgba(48,32,16,.32))}#open-envelope .env-collar-right .env-sheet{clip-path:polygon(100% 30%,48.4% 56%,100% 100%);filter:drop-shadow(-12px 8px 10px rgba(48,32,16,.26))}#open-envelope .env-seal-shade{position:absolute;left:50%;top:56%;z-index:5;width:8.4rem;height:4.6rem;margin-left:-4.2rem;margin-top:-.83rem;background:radial-gradient(ellipse at 50% 42%,rgba(86,64,38,.2) 0%,rgba(86,64,38,.08) 42%,transparent 72%)}#open-envelope .env-copy{position:absolute;left:0;right:0;bottom:8.5%;z-index:6;text-align:center;pointer-events:none}#open-envelope .env-flourish{display:block;width:7.2rem;height:1.05rem;margin:0 auto .7rem}#open-envelope .env-kicker{display:block;font-family:var(--font-cinzel),serif;font-size:.64rem;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:#6d5b43}#open-envelope .env-script{display:block;margin:.2rem 0 0;font-family:var(--font-script),cursive;font-size:2.55rem;line-height:.88;color:#3a3127}#open-envelope .env-seal{position:absolute;left:50%;top:56%;z-index:8;display:grid;place-items:center;width:7.5rem;height:7.5rem;margin-left:-3.75rem;margin-top:-3.45rem;padding:0;border:0;background:transparent;pointer-events:none}#open-envelope .env-seal-face{display:block;width:6.45rem;height:6.45rem;background:center/118% 118% no-repeat url("/images/wax-seal.png");-webkit-mask:url("/heart-mask.svg") center/100% 100% no-repeat;mask:url("/heart-mask.svg") center/100% 100% no-repeat}#open-envelope[data-capture=slid] .env-collar-left{transform:translate3d(-12%,0,0)}#open-envelope[data-capture=slid] .env-collar-right{transform:translate3d(12%,0,0)}`;

const ENVELOPE_JS = `(function(){var ease="transform 1s cubic-bezier(0.4,0,0.2,1)";function unlock(){var h=document.documentElement,b=document.body;h.classList.add("invite-ready");h.classList.remove("h-full");if(b){b.classList.add("invite-ready");b.classList.remove("h-full")}h.style.setProperty("overflow","auto","important");h.style.setProperty("height","auto","important");h.style.setProperty("max-height","none","important");if(b){b.style.setProperty("overflow","auto","important");b.style.setProperty("height","auto","important");b.style.setProperty("max-height","none","important")}}function hide(el){if(!el||el.getAttribute("data-state")==="open")return;el.setAttribute("data-state","open");el.hidden=true;el.setAttribute("aria-hidden","true");el.style.cssText="display:none!important;pointer-events:none!important;visibility:hidden;position:fixed;inset:auto;width:0;height:0;z-index:-1;overflow:hidden";unlock()}function setX(node,x,animate){if(!node)return;node.style.setProperty("transition",animate?ease:"none","important");node.style.setProperty("-webkit-transition",animate?ease:"none","important");node.style.setProperty("transform","translate3d("+x+",0,0)","important");node.style.setProperty("-webkit-transform","translate3d("+x+",0,0)","important");node.style.removeProperty("translate")}function go(){var el=document.getElementById("open-envelope");if(!el||el.getAttribute("data-state")!=="closed")return;var left=el.querySelector(".env-collar-left");var right=el.querySelector(".env-collar-right");setX(left,"0",false);setX(right,"0",false);if(left)void left.offsetWidth;el.setAttribute("data-state","sliding");el.classList.add("is-pressed");window.__INVITE_OPEN=true;try{window.dispatchEvent(new Event("invite-open"));el.dispatchEvent(new Event("invite-open",{bubbles:true}))}catch(err){}if(el.getAttribute("data-capture")==="slid")return;requestAnimationFrame(function(){requestAnimationFrame(function(){setX(left,"-12%",true);setX(right,"12%",true)})});setTimeout(function(){hide(el)},1200)}function from(e){var el=document.getElementById("open-envelope");if(!el||el.hidden)return;if(el===e.target||(e.target&&el.contains(e.target)))go()}document.addEventListener("pointerdown",from,true);document.addEventListener("touchstart",from,{capture:true,passive:true});document.addEventListener("click",from,true)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${allura.variable} ${cormorant.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-[#8fa8c4] text-[#1d3557]">
        <style dangerouslySetInnerHTML={{ __html: ENVELOPE_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: ENVELOPE_JS }} />
        {children}
      </body>
    </html>
  );
}
