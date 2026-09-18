import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Cloud,
  Eye,
  Flame,
  Grid2X2,
  Home as HomeIcon,
  Layers3,
  Lightbulb,
  Pause,
  Play,
  QrCode,
  ScanLine,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Trash2,
  Tv2,
  Watch,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: string;
  delivery: string;
  image: string;
  tag: string;
  merchant: string;
  reason: string;
};

type ShoppableObject = {
  id: string;
  label: string;
  type: string;
  confidence: string;
  position: string;
  icon: typeof Lightbulb;
  accent: string;
  products: Product[];
};

type Scene = {
  id: string;
  title: string;
  episode: string;
  scene: string;
  duration: string;
  elapsed: string;
  image: string;
  video: string;
  tagline: string;
};

const scenes: Scene[] = [
  { id: "loft-04", title: "The Loft", episode: "S01 · E04", scene: "SCENE 04", duration: "01:42", elapsed: "00:37", image: "/manus-storage/scene-living-room_15090b95.jpg", video: "/manus-storage/visioncart-loft-demo_36b5f32a.mp4", tagline: "A room tells a story." },
  { id: "after-hours-02", title: "After Hours", episode: "S02 · E02", scene: "SCENE 02", duration: "02:08", elapsed: "00:54", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85", video: "/manus-storage/visioncart-after-hours-demo_635e8fb8.mp4", tagline: "The city keeps its secrets." },
  { id: "sunday-market-07", title: "Sunday Market", episode: "S01 · E07", scene: "SCENE 07", duration: "01:56", elapsed: "01:08", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1800&q=85", video: "/manus-storage/visioncart-sunday-market-demo_5f6a20d6.mp4", tagline: "Find the good stuff." },
];

const productImages = {
  lamp: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  sofa: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  jacket: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
};

const objects: ShoppableObject[] = [
  {
    id: "lamp",
    label: "Arc floor lamp",
    type: "Home decor",
    confidence: "98% match",
    position: "left-[17%] top-[45%]",
    icon: Lightbulb,
    accent: "#d7ff52",
    products: [
      {
        id: "lamp-1",
        name: "Arco Halo Floor Lamp",
        category: "Lighting",
        price: "₹8,490",
        originalPrice: "₹10,990",
        rating: "4.8",
        delivery: "Tomorrow",
        image: productImages.lamp,
        tag: "Best visual match",
        merchant: "Amazon Home",
        reason: "Same brushed brass silhouette and warm dome shade.",
      },
      {
        id: "lamp-2",
        name: "Serein Curve Lamp",
        category: "Lighting",
        price: "₹5,999",
        rating: "4.6",
        delivery: "Wed, 24 Sep",
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85",
        tag: "Budget pick",
        merchant: "Luma Studio",
        reason: "Similar warm light, smaller footprint for apartments.",
      },
      {
        id: "lamp-3",
        name: "Mori Paper Glow",
        category: "Lighting",
        price: "₹12,750",
        rating: "4.9",
        delivery: "Thursday",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85",
        tag: "Designer alternative",
        merchant: "Atelier 08",
        reason: "More sculptural profile with the same soft cinematic glow.",
      },
    ],
  },
  {
    id: "sofa",
    label: "Cloud sofa",
    type: "Furniture",
    confidence: "94% match",
    position: "left-[34%] top-[62%]",
    icon: HomeIcon,
    accent: "#a5d7ff",
    products: [
      {
        id: "sofa-1",
        name: "Cloudline Modular Sofa",
        category: "Furniture",
        price: "₹42,990",
        rating: "4.7",
        delivery: "In 5 days",
        image: productImages.sofa,
        tag: "Scene inspired",
        merchant: "Amazon Living",
        reason: "Low profile, deep seat, and soft grey boucle finish.",
      },
      {
        id: "sofa-2",
        name: "Sunday Lounge 3-Seater",
        category: "Furniture",
        price: "₹34,500",
        originalPrice: "₹39,999",
        rating: "4.5",
        delivery: "In 7 days",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
        tag: "Deal",
        merchant: "House of Form",
        reason: "Closest color match at a lower price.",
      },
    ],
  },
  {
    id: "watch",
    label: "Chrono watch",
    type: "Accessories",
    confidence: "91% match",
    position: "left-[54%] top-[34%]",
    icon: Watch,
    accent: "#f8b6ff",
    products: [
      {
        id: "watch-1",
        name: "Noir Chronograph 42",
        category: "Watches",
        price: "₹18,990",
        rating: "4.8",
        delivery: "Tomorrow",
        image: productImages.watch,
        tag: "Exact style",
        merchant: "Amazon Fashion",
        reason: "Black dial, steel case, and leather strap detected.",
      },
      {
        id: "watch-2",
        name: "Field Note Automatic",
        category: "Watches",
        price: "₹11,250",
        rating: "4.6",
        delivery: "Fri, 26 Sep",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
        tag: "Under ₹12k",
        merchant: "Morrow Goods",
        reason: "Minimal alternative with a similar black-on-black face.",
      },
    ],
  },
  {
    id: "jacket",
    label: "Utility jacket",
    type: "Fashion",
    confidence: "89% match",
    position: "left-[72%] top-[47%]",
    icon: Layers3,
    accent: "#ffb86b",
    products: [
      {
        id: "jacket-1",
        name: "Field Utility Overshirt",
        category: "Men's fashion",
        price: "₹4,499",
        originalPrice: "₹5,499",
        rating: "4.5",
        delivery: "Tomorrow",
        image: productImages.jacket,
        tag: "90% visual match",
        merchant: "Amazon Fashion",
        reason: "Olive cotton twill and oversized pocket geometry match.",
      },
    ],
  },
];

const formatPrice = (items: Product[]) => {
  const total = items.reduce((sum, item) => sum + Number(item.price.replace(/[^\d]/g, "")), 0);
  return `₹${total.toLocaleString("en-IN")}`;
};

const analysisDetails: Record<string, { headline: string; detail: string; tags: string[] }> = {
  lamp: { headline: "Shape language, not just color.", detail: "The frame suggests a brushed brass arc, a warm dome shade, and a narrow footprint. Those signals rank above the room’s overall palette.", tags: ["arc silhouette", "brushed brass", "warm light", "compact footprint"] },
  sofa: { headline: "Softness is a measurable signal.", detail: "The vision pass reads a low seat, deep cushions, and a cool boucle-like texture before comparing size and delivery availability.", tags: ["low profile", "deep seat", "cool grey", "boucle texture"] },
  watch: { headline: "The details survive the pause.", detail: "A dark dial, steel case, and leather strap form the core match. Face geometry carries more weight than the wrist angle in the frame.", tags: ["black dial", "steel case", "leather strap", "42 mm profile"] },
  jacket: { headline: "Utility is visible in the geometry.", detail: "Pocket placement, olive twill, and the relaxed shoulder line create the match. Similar color alone would not pass this threshold.", tags: ["olive twill", "utility pockets", "relaxed fit", "overshirt"] },
};

const judgeSteps = [
  { at: 0, label: "Watch the scene", detail: "A shoppable moment begins inside the story." },
  { at: 10, label: "Pause on the object", detail: "The remote freezes a frame and reveals the first visual target." },
  { at: 24, label: "Scan the frame", detail: "The vision layer reads geometry, material, and catalog signals." },
  { at: 40, label: "Explain the match", detail: "Every recommendation gets a human-readable reason." },
  { at: 58, label: "Compare a product", detail: "Price, rating, and delivery complete the visual match." },
  { at: 70, label: "Save the moment", detail: "The featured product is ready in the session cart." },
  { at: 80, label: "Continue on mobile", detail: "A QR handoff keeps the scene and cart in sync." },
] as const;

const qrPattern = [
  "111111100101101111111",
  "100000101110101000001",
  "101110100010101011101",
  "101110101111101011101",
  "101110100100101011101",
  "100000101010101000001",
  "111111101010101111111",
  "000000001101100000000",
  "110111111001011010110",
  "001010010111100101001",
  "111001101010111100111",
  "010110011001001011010",
  "101101110111110110101",
  "000000001010001000000",
  "111111101101101111111",
  "100000100010101000001",
  "101110101111101011101",
  "101110101000101011101",
  "101110101110101011101",
  "100000101001101000001",
  "111111101110101111111",
];

function ProductCard({ product, featured, onAdd }: { product: Product; featured?: boolean; onAdd: () => void }) {
  return (
    <article className={`vc-product-card group ${featured ? "vc-product-card--featured" : ""}`}>
      <div className="relative aspect-[1.15/1] overflow-hidden rounded-[18px] bg-[#22272b]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="vc-mini-tag">{product.tag}</span>
          <button className="vc-icon-button vc-icon-button--dark" aria-label="Save product">
            <Sparkles size={14} />
          </button>
        </div>
        {featured && <div className="vc-confidence"><Eye size={12} /> 98% visual match</div>}
      </div>
      <div className="space-y-2 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="vc-eyebrow">{product.merchant} · {product.category}</p>
            <h3 className="mt-1 text-[15px] font-semibold leading-tight text-[#f3f5ed]">{product.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-[15px] font-semibold text-[#d7ff52]">{product.price}</p>
            {product.originalPrice && <p className="text-[10px] text-[#7c8585] line-through">{product.originalPrice}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#8c9695]">
          <span className="inline-flex items-center gap-1 text-[#ffd66b]">★ {product.rating}</span>
          <span className="inline-flex items-center gap-1"><Zap size={11} className="text-[#d7ff52]" /> {product.delivery}</span>
        </div>
        {featured && <p className="text-[11px] leading-relaxed text-[#9ba5a4]">{product.reason}</p>}
        <button onClick={onAdd} className="vc-buy-button">
          <ShoppingBag size={14} /> Add to cart <ArrowUpRight size={13} className="ml-auto" />
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("lamp");
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"match" | "insight">("match");
  const [analysisState, setAnalysisState] = useState<"ready" | "scanning">("ready");
  const [analysisRun, setAnalysisRun] = useState(1);
  const [videoTime, setVideoTime] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isJudgeMode, setIsJudgeMode] = useState(false);
  const [judgeElapsed, setJudgeElapsed] = useState(0);
  const [judgeStepIndex, setJudgeStepIndex] = useState(0);
  const [toast, setToast] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const selected = useMemo(() => objects.find((item) => item.id === selectedId) ?? objects[0], [selectedId]);
  const activeScene = scenes[activeSceneIndex];
  const analysis = analysisDetails[selected.id];
  const liveSignal = objects[Math.floor(videoTime / 2) % objects.length];
  const liveAnalysis = analysisDetails[liveSignal.id];
  const judgeStep = judgeSteps[judgeStepIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    setVideoTime(0);
    if (!isPaused) {
      void video.play().catch(() => setIsPaused(true));
    }
  }, [activeSceneIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPaused) video.pause();
    else void video.play().catch(() => setIsPaused(true));
  }, [isPaused]);

  useEffect(() => {
    if (!isJudgeMode) return;
    const timer = window.setInterval(() => setJudgeElapsed((elapsed) => Math.min(90, elapsed + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [isJudgeMode]);

  useEffect(() => {
    if (!isJudgeMode) return;
    const nextIndex = judgeSteps.reduce((latest, step, index) => step.at <= judgeElapsed ? index : latest, 0);
    if (nextIndex === judgeStepIndex) return;
    setJudgeStepIndex(nextIndex);
    if (nextIndex === 1) {
      setIsPaused(true);
      setSelectedId("lamp");
    }
    if (nextIndex === 2) runScan();
    if (nextIndex === 3) setActiveTab("insight");
    if (nextIndex === 4) setActiveTab("match");
    if (nextIndex === 5) addToCart(objects[0].products[0]);
    if (nextIndex === 6) setShowQr(true);
  }, [judgeElapsed, isJudgeMode, judgeStepIndex]);

  useEffect(() => {
    if (judgeElapsed >= 90 && isJudgeMode) {
      setIsJudgeMode(false);
      setIsPaused(true);
      setToast("Judge Mode complete · VisionCart journey ready to replay");
      window.setTimeout(() => setToast(""), 3000);
    }
  }, [judgeElapsed, isJudgeMode]);

  const togglePlayback = () => {
    setIsPaused((paused) => !paused);
    setToast(isPaused ? "Live scene playback · analysis is following the frame" : "Frame paused · tap an object to inspect");
    window.setTimeout(() => setToast(""), 1800);
  };

  const startJudgeMode = () => {
    setShowQr(false);
    setShowCart(false);
    setActiveSceneIndex(0);
    setSelectedId("lamp");
    setActiveTab("match");
    setJudgeElapsed(0);
    setJudgeStepIndex(0);
    setIsJudgeMode(true);
    setIsPaused(false);
    setToast("Judge Mode started · follow the 90-second story");
    window.setTimeout(() => setToast(""), 2200);
  };

  const stopJudgeMode = () => {
    setIsJudgeMode(false);
    setIsPaused(true);
    setShowQr(false);
    setToast("Judge Mode paused · explore the demo freely");
    window.setTimeout(() => setToast(""), 2200);
  };

  const runScan = () => {
    setIsScanning(true);
    setAnalysisState("scanning");
    setToast("VisionCart is reading the paused frame…");
    window.setTimeout(() => {
      setIsScanning(false);
      setAnalysisState("ready");
      setAnalysisRun((run) => run + 1);
      setToast("4 shoppable objects found · catalog matched");
    }, 1200);
  };

  const addToCart = (product: Product) => {
    setCartItems((items) => items.some((item) => item.id === product.id) ? items : [...items, product]);
    setToast(`${product.name} ${cartItems.some((item) => item.id === product.id) ? "is already" : "saved to"} your cart`);
    window.setTimeout(() => setToast(""), 2400);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
    setToast("Item removed from your cart");
    window.setTimeout(() => setToast(""), 2400);
  };

  const selectScene = (index: number) => {
    setActiveSceneIndex(index);
    setIsPaused(true);
    setVideoError(false);
    setToast(`${scenes[index].title} loaded · frame paused for inspection`);
    window.setTimeout(() => setToast(""), 2400);
  };

  return (
    <main className="vc-app min-h-screen">
      <div className="vc-noise" />
      <header className="vc-topbar">
        <div className="flex items-center gap-3">
          <div className="vc-logo-mark"><ScanLine size={18} strokeWidth={2.5} /></div>
          <div>
            <p className="vc-brand">VISIONCART <span>AI</span></p>
            <p className="vc-brand-sub">Watch it. Want it. Find it.</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="vc-live-dot"><span /> LIVE DEMO</span>
          <span className="vc-header-divider" />
          <button onClick={() => setToast("Scene browser is ready for the next content pack")} className="vc-nav-button"><Grid2X2 size={14} /> Browse scenes <ChevronDown size={13} /></button>
          <button onClick={() => setShowGuide(true)} className="vc-nav-button"><CircleHelp size={15} /> Guide</button>
          <button onClick={startJudgeMode} className="vc-judge-button"><Play size={12} fill="currentColor" /> Judge Mode</button>
          <button onClick={() => setShowCart(true)} className="vc-cart-button" aria-label={`Open cart with ${cartItems.length} item${cartItems.length === 1 ? "" : "s"}`}><ShoppingBag size={15} /> Cart <b>{cartItems.length.toString().padStart(2, "0")}</b></button>
        </div>
        <div className="flex items-center gap-2 md:hidden"><button onClick={startJudgeMode} className="vc-judge-button" aria-label="Start Judge Mode"><Play size={12} fill="currentColor" /></button><button onClick={() => setShowCart(true)} className="vc-cart-button vc-mobile-cart-button" aria-label={`Open cart with ${cartItems.length} item${cartItems.length === 1 ? "" : "s"}`}><ShoppingBag size={15} /> <b>{cartItems.length.toString().padStart(2, "0")}</b></button></div>
      </header>

      <section className="vc-layout">
        <aside className="vc-sidebar">
          <div className="vc-sidebar-label"><span className="vc-pulse" /> NOW PLAYING</div>
          <div className="vc-series-card">
            <div className="vc-series-poster"><div className="vc-poster-glow" /><span>{activeScene.title.toUpperCase()}<br /><b>{activeScene.scene.replace("SCENE ", "")}</b></span><small>{activeScene.episode}</small></div>
            <div className="px-1 pt-3">
              <p className="vc-eyebrow">Amazon Original · 4K UHD</p>
              <h2 className="mt-1 text-[15px] font-semibold text-[#f1f3ea]">{activeScene.tagline}</h2>
              <p className="mt-1 text-[11px] leading-relaxed text-[#7d8787]">{activeScene.scene.replace("SCENE", "Scene")} · {activeScene.duration} remaining</p>
            </div>
          </div>
          <div className="vc-side-rule" />
          <p className="vc-sidebar-label">SCENE QUEUE</p>
          <div className="space-y-2">
            {scenes.map((scene, index) => (
              <button key={scene.id} onClick={() => selectScene(index)} className={`vc-queue-row ${index === activeSceneIndex ? "is-active" : ""}`}>
                <span className="vc-queue-number">0{index + 4}</span>
                <span>{scene.title} · {scene.scene.replace("SCENE ", "")}</span>
                {index === activeSceneIndex ? <span className="ml-auto vc-queue-live">LIVE</span> : <ArrowDownRight size={13} className="ml-auto text-[#606b6b]" />}
              </button>
            ))}
          </div>
          <div className="vc-sidebar-footer">
            <div className="flex items-center gap-2"><Cloud size={14} className="text-[#d7ff52]" /> AWS vision pipeline online</div>
            <p>Bedrock · Rekognition · catalog index</p>
          </div>
        </aside>

        <section className="vc-main-column">
          <div className="vc-section-heading">
            <div>
              <p className="vc-kicker">SHOPTIMIZED VIEWING <span>{String(activeSceneIndex + 1).padStart(2, "0")} / 03</span></p>
              <h1>Pause the moment.<br /><em>Take it home.</em></h1>
            </div>
            <div className="vc-heading-note"><span className="vc-green-line" /> <span>Point at an object<br />to reveal its story</span></div>
          </div>

          <div className="vc-stage-wrap">
            <div className={`vc-stage ${isPaused ? "is-paused" : ""} ${isScanning ? "is-scanning" : ""}`}>
              {videoError ? <img src={activeScene.image} alt={`${activeScene.title} scene playing inside VisionCart`} className="vc-scene-image" /> : <video ref={videoRef} key={activeScene.video} src={activeScene.video} poster={activeScene.image} muted loop playsInline preload="auto" onTimeUpdate={(event) => setVideoTime(event.currentTarget.currentTime)} onError={() => setVideoError(true)} className="vc-scene-image" aria-label={`${activeScene.title} scene playback`} />}
              <div className="vc-stage-vignette" />
              {isScanning && <div className="vc-analysis-sweep" aria-live="polite"><span /><b>FRAME ANALYSIS · PASS {String(analysisRun + 1).padStart(2, "0")}</b><i>geometry / material / catalog</i></div>}
              <div className="vc-stage-topline"><span><Tv2 size={13} /> {activeScene.title.toUpperCase()} / {activeScene.scene}</span><span className="vc-timecode">{isPaused ? activeScene.elapsed : `LIVE ${Math.floor(videoTime).toString().padStart(2, "0")}s`} <i>/</i> {isPaused ? activeScene.duration : "08s CLIP"}</span></div>
              {isPaused && <div className="vc-paused-pill"><Pause size={12} fill="currentColor" /> FRAME PAUSED <span>·</span> TAP AN OBJECT</div>}
              {objects.map((item) => {
                const Icon = item.icon;
                const isSelected = item.id === selected.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedId(item.id); setIsPaused(true); }}
                    className={`vc-hotspot ${item.position} ${isSelected ? "is-selected" : ""}`}
                    style={{ "--spot-accent": item.accent } as React.CSSProperties}
                    aria-label={`Inspect ${item.label}`}
                  >
                    <span className="vc-hotspot-ring"><Icon size={15} /></span>
                    <span className="vc-hotspot-label">{item.label} <b>{item.confidence}</b></span>
                  </button>
                );
              })}
              <div className="vc-stage-controls">
                <button onClick={togglePlayback} className="vc-play-control" aria-label={isPaused ? "Play scene" : "Pause scene"}>{isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}</button>
                <div className="vc-progress"><span style={{ width: `${isPaused ? "39" : Math.max(5, Math.min(100, (videoTime / 8) * 100))}%` }} /></div>
                <span className="vc-control-time">{isPaused ? activeScene.elapsed : `LIVE ${Math.floor(videoTime).toString().padStart(2, "0")}s`}</span>
                <button onClick={runScan} className={`vc-scan-control ${isScanning ? "is-loading" : ""}`}><ScanLine size={14} /> {isScanning ? "Scanning" : "Scan frame"}</button>
              </div>
            </div>
            <div className="vc-stage-caption"><span><span className={`vc-caption-dot ${analysisState === "scanning" ? "is-scanning" : ""}`} /> {analysisState === "scanning" ? <><b>Reading frame geometry…</b> Rekognition pass in progress</> : <>VisionCart detected <b>4 shoppable moments</b> in this frame</>}</span><span>↑ / ↓ Select <span className="mx-2 text-[#424a4a]">·</span> OK Inspect</span></div>
          </div>

          <div className="vc-detected-row">
            <div className="flex items-center gap-3"><span className="vc-row-label">DETECTED IN FRAME</span><span className="vc-detected-count">04</span></div>
            <div className="vc-object-tabs">
              {objects.map((item) => {
                const Icon = item.icon;
                return <button key={item.id} onClick={() => setSelectedId(item.id)} className={`vc-object-tab ${selected.id === item.id ? "is-selected" : ""}`}><Icon size={14} /> {item.label}</button>;
              })}
            </div>
          </div>

          <div className="vc-bottom-grid">
            <section className="vc-discovery-panel">
              <div className="vc-panel-heading">
                <div><p className="vc-kicker">OBJECT DISCOVERY <span>{isPaused ? "AI MATCH" : `LIVE FOCUS · ${liveSignal.label.toUpperCase()}`}</span></p><h2>{selected.label}</h2></div>
                <div className="vc-panel-actions"><span className="vc-confidence-large"><Sparkles size={13} /> {selected.confidence}</span><button className="vc-icon-button" onClick={runScan}><ScanLine size={15} /></button></div>
              </div>
              <div className="vc-tabs"><button onClick={() => setActiveTab("match")} className={activeTab === "match" ? "is-active" : ""}>Top matches <span>{selected.products.length}</span></button><button onClick={() => setActiveTab("insight")} className={activeTab === "insight" ? "is-active" : ""}>Why this match</button></div>
              {activeTab === "match" ? (
                <div className="vc-product-grid">
                  {selected.products.map((product, index) => <ProductCard key={product.id} product={product} featured={index === 0} onAdd={() => addToCart(product)} />)}
                </div>
              ) : (
                <div className={`vc-insight-card ${analysisState === "scanning" || !isPaused ? "is-analyzing" : ""}`}><div className="vc-insight-orbit"><Sparkles size={25} /></div><div className="min-w-0"><div className="vc-insight-meta"><p className="vc-eyebrow">BEDROCK VISION REASONING</p><span>{!isPaused ? `FRAME ${Math.floor(videoTime).toString().padStart(2, "0")}s · LIVE` : `PASS ${String(analysisRun).padStart(2, "0")} · ${analysisState === "scanning" ? "ANALYZING" : "READY"}`}</span></div><h3>{analysisState === "scanning" ? "Comparing visual signals…" : !isPaused ? `${liveSignal.label} entering the frame.` : analysis.headline}</h3><p>{analysisState === "scanning" ? "Separating object geometry from scene lighting, then re-ranking catalog candidates." : !isPaused ? `Live focus moved to ${liveSignal.label.toLowerCase()}. ${liveAnalysis.detail.split(".")[0]}.` : analysis.detail}</p><div className="vc-reason-tags">{(isPaused ? analysis.tags : liveAnalysis.tags).map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
              )}
            </section>

            <aside className="vc-handoff-panel">
              <div className="vc-handoff-label"><Send size={13} /> TAKE IT WITH YOU</div>
              <h2>Continue on<br /><em>your phone.</em></h2>
              <p>Scan to keep browsing the {selected.label.toLowerCase()} and checkout without interrupting the scene.</p>
              <button onClick={() => setShowQr(true)} className="vc-qr-card"><span className="vc-qr-preview">{qrPattern.map((row, rowIndex) => row.split("").map((cell, cellIndex) => <i key={`${rowIndex}-${cellIndex}`} className={cell === "1" ? "on" : ""} />))}</span><span><b>Scan to open</b><small>visioncart.ai / scene-04</small></span><ArrowUpRight size={16} className="ml-auto" /></button>
              <div className="vc-handoff-divider" />
              <div className="vc-handoff-meta"><span><span className="vc-pulse vc-pulse--small" /> Session synced</span><span>1 item ready</span></div>
            </aside>
          </div>
        </section>
      </section>

      {isJudgeMode && <div className="vc-judge-hud" role="status"><div className="vc-judge-hud-top"><span><span className="vc-pulse vc-pulse--small" /> JUDGE MODE</span><b>{String(judgeElapsed).padStart(2, "0")} / 90s</b><button onClick={stopJudgeMode} aria-label="Exit Judge Mode"><X size={14} /></button></div><div className="vc-judge-progress"><span style={{ width: `${(judgeElapsed / 90) * 100}%` }} /></div><p className="vc-judge-step-count">STEP {String(judgeStepIndex + 1).padStart(2, "0")} / {String(judgeSteps.length).padStart(2, "0")}</p><h3>{judgeStep.label}</h3><p>{judgeStep.detail}</p></div>}
      {toast && <div className="vc-toast"><Check size={14} /> {toast}</div>}

      {showCart && <div className="vc-modal-backdrop vc-cart-backdrop" onClick={() => setShowCart(false)}><aside className="vc-cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping cart"><div className="vc-cart-drawer-head"><div><p className="vc-kicker">SESSION CART <span>{cartItems.length.toString().padStart(2, "0")}</span></p><h2>Saved for<br /><em>later.</em></h2></div><button className="vc-modal-close" onClick={() => setShowCart(false)} aria-label="Close cart"><X size={18} /></button></div>{cartItems.length === 0 ? <div className="vc-cart-empty"><div className="vc-cart-empty-orb"><ShoppingBag size={21} /></div><h3>Your cart is waiting.</h3><p>Tap <b>Add to cart</b> on any matched object to keep it with this scene.</p><button className="vc-modal-done" onClick={() => setShowCart(false)}>Back to scene <ArrowUpRight size={15} /></button></div> : <><div className="vc-cart-items">{cartItems.map((product) => <article key={product.id} className="vc-cart-item"><img src={product.image} alt="" /><div className="min-w-0"><p className="vc-eyebrow">{product.merchant}</p><h3>{product.name}</h3><p className="vc-cart-item-meta">{product.delivery} · ★ {product.rating}</p></div><div className="vc-cart-item-side"><b>{product.price}</b><button onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={14} /></button></div></article>)}</div><div className="vc-cart-summary"><div><span>Items</span><b>{cartItems.length.toString().padStart(2, "0")}</b></div><div><span>Estimated total</span><strong>{formatPrice(cartItems)}</strong></div><button onClick={() => setToast("Checkout handoff is ready for the next step")} className="vc-modal-done">Continue to checkout <ArrowUpRight size={15} /></button><p>Demo mode · mobile handoff keeps this list synced.</p></div></>}</aside></div>}

      {showGuide && <div className="vc-modal-backdrop" onClick={() => setShowGuide(false)}><div className="vc-guide-modal" onClick={(event) => event.stopPropagation()}><button className="vc-modal-close" onClick={() => setShowGuide(false)}><X size={18} /></button><div className="vc-modal-orb"><CircleHelp size={22} /></div><p className="vc-kicker">JUDGE GUIDE · 90 SECOND STORY</p><h2>From frame<br /><em>to cart.</em></h2><p className="vc-guide-intro">VisionCart turns passive viewing into an intelligent shopping moment—without asking the viewer to leave the scene.</p><div className="vc-guide-steps"><div><span>01</span><b>Pause & point</b><small>Fire TV remote selects an object in the live frame.</small></div><div><span>02</span><b>Understand context</b><small>Rekognition finds objects; Bedrock reads shape, material, and intent.</small></div><div><span>03</span><b>Match & explain</b><small>Catalog index ranks visual similarity, rating, price, and delivery.</small></div><div><span>04</span><b>Continue anywhere</b><small>QR handoff keeps the session synced for mobile checkout.</small></div></div><div className="vc-guide-stack"><span><Tv2 size={13} /> Fire TV UI</span><ArrowUpRight size={13} /><span><ScanLine size={13} /> Vision layer</span><ArrowUpRight size={13} /><span><Cloud size={13} /> AWS pipeline</span></div><button className="vc-modal-done" onClick={() => setShowGuide(false)}>Back to demo <ArrowUpRight size={15} /></button></div></div>}
      {showQr && <div className="vc-modal-backdrop" onClick={() => setShowQr(false)}><div className="vc-modal" onClick={(event) => event.stopPropagation()}><button className="vc-modal-close" onClick={() => setShowQr(false)}><X size={18} /></button><div className="vc-modal-orb"><QrCode size={22} /></div><p className="vc-kicker">MOBILE HANDOFF READY</p><h2>Your scene is<br /><em>waiting for you.</em></h2><p>Scan with your phone camera to continue exploring {selected.label.toLowerCase()} matches and save them to your cart.</p><div className="vc-large-qr">{qrPattern.map((row, rowIndex) => row.split("").map((cell, cellIndex) => <i key={`${rowIndex}-${cellIndex}`} className={cell === "1" ? "on" : ""} />))}</div><div className="vc-modal-url">visioncart.ai <span>·</span> scene-04 <span>·</span> {selected.id}</div><button className="vc-modal-done" onClick={() => setShowQr(false)}>Done <Check size={15} /></button></div></div>}
    </main>
  );
}
