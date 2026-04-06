import React, { useState, useMemo } from "react";
import {
  Search,
  Wind,
  Moon,
  Snowflake,
  Crown,
  Info,
  ArrowRight,
  ChevronLeft,
  Plus,
  X,
  BarChart3,
  Tag,
  Zap,
  Star,
  ExternalLink,
  Sparkles,
  LayoutGrid,
  Scale,
  FlaskConical,
  Droplets,
  TreePine,
  Heart,
  PlusCircle,
  Save,
} from "lucide-react";

// --- Initial Data ---
const initialPerfumes = [
  {
    id: "ahs-super",
    name: "Allure Homme Sport Superleggera",
    brand: "Chanel",
    category: "Summer Day",
    price: "6,500 ฿",
    image:
      "https://images.unsplash.com/photo-1541604193435-225878996233?auto=format&fit=crop&q=80&w=400",
    rating: 4.5,
    accords: [
      { name: "Citrus", value: 95, color: "bg-yellow-400" },
      { name: "Woody", value: 80, color: "bg-amber-700" },
      { name: "Aromatic", value: 70, color: "bg-emerald-500" },
    ],
    notes: {
      top: ["Mandarin Orange", "Citrus", "Mint"],
      middle: ["Cedar", "Sandalwood"],
      base: ["Amber", "White Musk"],
    },
    stats: { longevity: 75, sillage: 65, value: 80, versatility: 95 },
    description:
      "ความสดชื่นที่คมและโปร่งกว่ารุ่นดั้งเดิม เน้นความหรูหราแบบมินิมอลและดูสปอร์ตแบบไฮเอนด์",
    link: "https://www.fragrantica.com/perfume/Chanel/Allure-Homme-Sport-Superleggera-95713.html",
  },
  {
    id: "ahs-ee",
    name: "Allure Homme Sport Eau Extreme",
    brand: "Chanel",
    category: "Summer Day",
    price: "6,200 ฿",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    rating: 4.6,
    accords: [
      { name: "Vanilla", value: 90, color: "bg-orange-200" },
      { name: "Aromatic", value: 85, color: "bg-emerald-600" },
      { name: "Woody", value: 75, color: "bg-amber-800" },
    ],
    notes: {
      top: ["Mandarin Orange", "Mint", "Sage"],
      middle: ["Pepper"],
      base: ["Tonka Bean", "Musk", "Cedar"],
    },
    stats: { longevity: 85, sillage: 80, value: 85, versatility: 90 },
    description:
      "ตัวตึงตลอดกาล มีความหวานนวลจาก Tonka Bean ผสมความสดชื่น เหมาะกับทุกโอกาส",
    link: "https://www.fragrantica.com/perfume/Chanel/Allure-Homme-Sport-Eau-Extreme-14669.html",
  },
  {
    id: "le-beau",
    name: "Le Beau Le Parfum",
    brand: "Jean Paul Gaultier",
    category: "Summer Night",
    price: "4,800 ฿",
    image:
      "https://images.unsplash.com/photo-1557170334-a7c3c437c014?auto=format&fit=crop&q=80&w=400",
    rating: 4.5,
    accords: [
      { name: "Coconut", value: 95, color: "bg-stone-200" },
      { name: "Sweet", value: 90, color: "bg-pink-400" },
      { name: "Amber", value: 85, color: "bg-orange-500" },
    ],
    notes: {
      top: ["Pineapple", "Iris", "Ginger"],
      middle: ["Coconut", "Woody Notes"],
      base: ["Tonka Bean", "Amber"],
    },
    stats: { longevity: 90, sillage: 85, value: 85, versatility: 70 },
    description:
      "หวานมะพร้าวและสับปะรด ให้ฟีล Tropical ปาร์ตี้ริมสระที่เซ็กซี่มาก",
    link: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Beau-Le-Parfum-72355.html",
  },
  {
    id: "tmw-edp",
    name: "The Most Wanted Parfum",
    brand: "Azzaro",
    category: "Winter / Clubbing",
    price: "4,500 ฿",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    accords: [
      { name: "Warm Spicy", value: 95, color: "bg-red-700" },
      { name: "Amber", value: 90, color: "bg-orange-600" },
      { name: "Sweet", value: 85, color: "bg-pink-500" },
    ],
    notes: {
      top: ["Ginger"],
      middle: ["Woody Notes"],
      base: ["Bourbon Vanilla"],
    },
    stats: { longevity: 95, sillage: 90, value: 90, versatility: 60 },
    description:
      "ที่สุดของความเซ็กซี่สายหวานไหม้ (Toffee) ฟุ้งกระจายตัวพ่อในผับ",
    link: "https://www.fragrantica.com/perfume/Azzaro/The-Most-Wanted-Parfum-73332.html",
  },
  {
    id: "prada-intense",
    name: "L'Homme Intense",
    brand: "Prada",
    category: "Special Occasion",
    price: "5,500 ฿",
    image:
      "https://images.unsplash.com/photo-1512789677070-65bd03571100?auto=format&fit=crop&q=80&w=400",
    rating: 4.6,
    accords: [
      { name: "Iris", value: 95, color: "bg-indigo-300" },
      { name: "Amber", value: 80, color: "bg-orange-400" },
      { name: "Leather", value: 75, color: "bg-neutral-800" },
    ],
    notes: {
      top: ["Iris"],
      middle: ["Amber", "Patchouli"],
      base: ["Tonka Bean", "Leather"],
    },
    stats: { longevity: 85, sillage: 75, value: 85, versatility: 75 },
    description: "แป้งหรู คุณชาย สะอาดแต่ดาร์กและภูมิฐานที่สุดในไลน์ L'Homme",
    link: "https://www.fragrantica.com/perfume/Prada/Prada-L-Homme-Intense-45124.html",
  },
  {
    id: "mith-mystery",
    name: "Bangkok Mystery",
    brand: "Mith",
    category: "Summer Day",
    price: "1,500 ฿",
    image:
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=400",
    rating: 4.4,
    accords: [
      { name: "Woody", value: 90, color: "bg-amber-800" },
      { name: "Fruity", value: 80, color: "bg-green-400" },
      { name: "Smoky", value: 70, color: "bg-gray-600" },
    ],
    notes: {
      top: ["Bergamot", "Apple", "Pink Pepper"],
      middle: ["Birch", "Patchouli", "Jasmine"],
      base: ["Musk", "Ambergris", "Oakmoss"],
    },
    stats: { longevity: 70, sillage: 65, value: 100, versatility: 90 },
    description:
      "ความภูมิฐานสไตล์ Aventus แต่มีความสดชื่นและสะอาดแบบที่เข้ากับอากาศเมืองไทยได้ดีเยี่ยม",
    link: "https://www.fragrantica.com/perfume/Mith/Bangkok-Mystery-73305.html",
  },
];

const categories = [
  {
    id: "all",
    name: "All Collection",
    icon: <LayoutGrid className="w-5 h-5" />,
    color: "from-gray-600 to-gray-800",
  },
  {
    id: "Summer Day",
    name: "Summer Day",
    icon: <Wind className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "Summer Night",
    name: "Summer Night",
    icon: <Moon className="w-5 h-5" />,
    color: "from-indigo-600 to-purple-500",
  },
  {
    id: "Winter / Clubbing",
    name: "Winter / Clubbing",
    icon: <Snowflake className="w-5 h-5" />,
    color: "from-purple-700 to-pink-600",
  },
  {
    id: "Special Occasion",
    name: "Special Occasion",
    icon: <Crown className="w-5 h-5" />,
    color: "from-amber-600 to-orange-500",
  },
];

// --- Sub-Components ---

const StatBar = ({ label, value, colorClass = "bg-amber-500" }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClass} transition-all duration-1000`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const AccordBar = ({ name, value, color }) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden relative">
      <div
        className={`h-full ${color} opacity-60 transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
      <span className="absolute inset-0 flex items-center px-3 text-[10px] font-bold text-white uppercase tracking-wider">
        {name}
      </span>
    </div>
    <span className="text-[10px] font-mono text-gray-500 w-8">{value}%</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("browse");
  const [perfumesList, setPerfumesList] = useState(initialPerfumes);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [compareList, setCompareList] = useState([]);

  // New Perfume Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPerfume, setNewPerfume] = useState({
    name: "",
    brand: "",
    category: "Summer Day",
    price: "",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    description: "",
    link: "",
    notes: { top: "", middle: "", base: "" },
    stats: { longevity: 70, sillage: 70, value: 80, versatility: 80 },
  });

  const filteredPerfumes = useMemo(() => {
    return perfumesList.filter((p) => {
      const matchCat =
        filterCategory === "all" || p.category === filterCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filterCategory, searchTerm, perfumesList]);

  const toggleCompare = (p, e) => {
    e.stopPropagation();
    if (compareList.find((item) => item.id === p.id)) {
      setCompareList(compareList.filter((item) => item.id !== p.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, p]);
    }
  };

  const handleAddPerfume = (e) => {
    e.preventDefault();
    const id = newPerfume.name.toLowerCase().replace(/\s+/g, "-");
    const formattedPerfume = {
      ...newPerfume,
      id,
      rating: 4.0,
      accords: [
        { name: "Fresh", value: 80, color: "bg-blue-400" },
        { name: "Woody", value: 60, color: "bg-amber-700" },
      ],
      notes: {
        top: newPerfume.notes.top.split(",").map((n) => n.trim()),
        middle: newPerfume.notes.middle.split(",").map((n) => n.trim()),
        base: newPerfume.notes.base.split(",").map((n) => n.trim()),
      },
    };
    setPerfumesList([formattedPerfume, ...perfumesList]);
    setShowAddForm(false);
    // Reset form
    setNewPerfume({
      name: "",
      brand: "",
      category: "Summer Day",
      price: "",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
      description: "",
      link: "",
      notes: { top: "", middle: "", base: "" },
      stats: { longevity: 70, sillage: 70, value: 80, versatility: 80 },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans pb-20 selection:bg-amber-500 selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 bg-amber-500/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-500/5 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setActiveTab("browse");
              setSelectedPerfume(null);
            }}
          >
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sparkles className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white leading-none">
                THE KIKI VAULT
              </h1>
              <p className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.2em] mt-1">
                Digital Perfumery Archive
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-8">
            {["browse", "compare"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "text-amber-500 underline underline-offset-8"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab === "browse" ? "Collection" : "Analysis"}
                {tab === "compare" && compareList.length > 0 && (
                  <span className="ml-2 bg-amber-500 text-black px-1.5 py-0.5 rounded-full text-[9px]">
                    {compareList.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs focus:border-amber-500 outline-none w-48 transition-all"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-amber-500 transition-all"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {activeTab === "browse" && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Category Filter */}
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap ${
                    filterCategory === cat.id
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                  }`}
                >
                  {cat.icon}
                  <span className="text-[11px] font-bold uppercase tracking-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Perfume Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPerfumes.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPerfume(p)}
                  className="group bg-[#121212] rounded-[28px] overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 cursor-pointer relative"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    <button
                      onClick={(e) => toggleCompare(p, e)}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        compareList.find((i) => i.id === p.id)
                          ? "bg-amber-500 border-amber-500 text-black scale-110"
                          : "bg-black/40 border-white/10 text-white hover:bg-amber-500"
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em]">
                        {p.brand}
                      </p>
                      <h3 className="text-lg font-bold text-white leading-tight mt-0.5 truncate">
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      {p.accords.slice(0, 2).map((a) => (
                        <span
                          key={a.name}
                          className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-gray-500 uppercase"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <p className="text-sm font-mono font-bold text-white">
                        {p.price}
                      </p>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-bold">
                          {p.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "compare" && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-white">
                  ANALYSIS CENTER
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  Head-to-head comparison of your target scents
                </p>
              </div>
              {compareList.length > 0 && (
                <button
                  onClick={() => setCompareList([])}
                  className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest border-b border-red-400/30 pb-1"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {compareList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {compareList.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl"
                  >
                    <div className="h-40 relative">
                      <img
                        src={p.image}
                        className="w-full h-full object-cover opacity-50"
                        alt={p.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                      <div className="absolute bottom-5 left-6">
                        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">
                          {p.brand}
                        </p>
                        <h4 className="text-xl font-bold text-white">
                          {p.name}
                        </h4>
                      </div>
                    </div>
                    <div className="p-8 space-y-8">
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                          Performance Index
                        </p>
                        <StatBar
                          label="Longevity"
                          value={p.stats.longevity}
                          colorClass="bg-blue-500"
                        />
                        <StatBar
                          label="Sillage"
                          value={p.stats.sillage}
                          colorClass="bg-purple-500"
                        />
                        <StatBar
                          label="Versatility"
                          value={p.stats.versatility}
                          colorClass="bg-green-500"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                          Signature Pyramid
                        </p>
                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-gray-500 italic">Top:</span>{" "}
                            <span className="text-white text-right">
                              {p.notes.top.slice(0, 2).join(", ")}...
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 italic">Base:</span>{" "}
                            <span className="text-white text-right">
                              {p.notes.base.slice(0, 2).join(", ")}...
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPerfume(p)}
                        className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-500 transition-colors"
                      >
                        Open Blueprint
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center gap-6">
                <Scale className="w-12 h-12 text-gray-700" />
                <p className="text-gray-500 text-sm max-w-xs font-medium uppercase tracking-wider">
                  No fragrances selected. Zap some scents from the collection to
                  analyze.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Perfume Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setShowAddForm(false)}
          />
          <div className="bg-[#121212] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] relative z-10 border border-white/10 p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Add to Collection
                </h2>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                  Expanding the Archive
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleAddPerfume}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Perfume Name
                </label>
                <input
                  required
                  type="text"
                  value={newPerfume.name}
                  onChange={(e) =>
                    setNewPerfume({ ...newPerfume, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-amber-500 outline-none"
                  placeholder="e.g. Aventus"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Brand
                </label>
                <input
                  required
                  type="text"
                  value={newPerfume.brand}
                  onChange={(e) =>
                    setNewPerfume({ ...newPerfume, brand: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-amber-500 outline-none"
                  placeholder="e.g. Creed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Category
                </label>
                <select
                  value={newPerfume.category}
                  onChange={(e) =>
                    setNewPerfume({ ...newPerfume, category: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-amber-500 outline-none"
                >
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Price (THB)
                </label>
                <input
                  type="text"
                  value={newPerfume.price}
                  onChange={(e) =>
                    setNewPerfume({ ...newPerfume, price: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-amber-500 outline-none"
                  placeholder="e.g. 5,000 ฿"
                />
              </div>

              <div className="md:col-span-2 space-y-2 pt-4">
                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-4">
                  Note Pyramid (Comma separated)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-500 uppercase">
                      Top Notes
                    </label>
                    <textarea
                      value={newPerfume.notes.top}
                      onChange={(e) =>
                        setNewPerfume({
                          ...newPerfume,
                          notes: { ...newPerfume.notes, top: e.target.value },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-blue-500"
                      placeholder="Lemon, Apple..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-500 uppercase">
                      Middle Notes
                    </label>
                    <textarea
                      value={newPerfume.notes.middle}
                      onChange={(e) =>
                        setNewPerfume({
                          ...newPerfume,
                          notes: {
                            ...newPerfume.notes,
                            middle: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-purple-500"
                      placeholder="Rose, Jasmine..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-500 uppercase">
                      Base Notes
                    </label>
                    <textarea
                      value={newPerfume.notes.base}
                      onChange={(e) =>
                        setNewPerfume({
                          ...newPerfume,
                          notes: { ...newPerfume.notes, base: e.target.value },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-amber-500"
                      placeholder="Vanilla, Musk..."
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Fragrantica Link
                </label>
                <input
                  type="url"
                  value={newPerfume.link}
                  onChange={(e) =>
                    setNewPerfume({ ...newPerfume, link: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-amber-500 outline-none"
                  placeholder="https://www.fragrantica.com/perfume/..."
                />
              </div>

              <div className="md:col-span-2 pt-6">
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Save to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPerfume(null)}
          />
          <div className="bg-[#0f0f0f] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] relative z-10 border border-white/10 shadow-3xl animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setSelectedPerfume(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center z-20 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Visuals */}
              <div className="lg:w-2/5 h-[500px] lg:h-auto sticky top-0">
                <img
                  src={selectedPerfume.image}
                  className="w-full h-full object-cover grayscale-[20%]"
                  alt={selectedPerfume.name}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent hidden lg:block" />
              </div>

              {/* Right Side: Data */}
              <div className="lg:w-3/5 p-10 lg:p-16 space-y-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {selectedPerfume.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 px-3 border-l border-white/10 ml-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">
                        {selectedPerfume.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs">
                    {selectedPerfume.brand}
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-black text-white mt-4 tracking-tighter uppercase">
                    {selectedPerfume.name}
                  </h2>
                </div>

                <p className="text-gray-400 text-lg italic leading-relaxed font-medium">
                  "{selectedPerfume.description}"
                </p>

                {/* Note Pyramid Section */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Olfactory Pyramid
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Top Layer */}
                    <div className="group bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <Droplets className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                            Top Notes (Opening)
                          </p>
                          <p className="text-white font-bold">
                            {selectedPerfume.notes.top.join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Mid Layer */}
                    <div className="group bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                            Heart Notes (Mid)
                          </p>
                          <p className="text-white font-bold">
                            {selectedPerfume.notes.middle.join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Base Layer */}
                    <div className="group bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                          <TreePine className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                            Base Notes (Dry Down)
                          </p>
                          <p className="text-white font-bold">
                            {selectedPerfume.notes.base.join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accords Section */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Intensity Accords
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    {selectedPerfume.accords.map((a) => (
                      <AccordBar
                        key={a.name}
                        name={a.name}
                        value={a.value}
                        color={a.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Perf Stats */}
                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                  <div className="space-y-4">
                    <StatBar
                      label="Longevity"
                      value={selectedPerfume.stats.longevity}
                      colorClass="bg-blue-500"
                    />
                    <StatBar
                      label="Sillage"
                      value={selectedPerfume.stats.sillage}
                      colorClass="bg-purple-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <StatBar
                      label="Versatility"
                      value={selectedPerfume.stats.versatility}
                      colorClass="bg-green-500"
                    />
                    <StatBar
                      label="Price Value"
                      value={selectedPerfume.stats.value}
                      colorClass="bg-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedPerfume.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white text-black py-5 rounded-2xl text-center text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Open in Fragrantica
                  </a>
                  <button
                    onClick={(e) => {
                      toggleCompare(selectedPerfume, e);
                      setSelectedPerfume(null);
                    }}
                    className={`px-10 py-5 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      compareList.find((i) => i.id === selectedPerfume.id)
                        ? "bg-amber-500 text-black border-amber-500"
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <Zap className="w-4 h-4" /> Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Comparison Toggle */}
      {compareList.length > 0 && activeTab === "browse" && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl shadow-amber-500/20">
            <div className="flex items-center gap-2 pr-6 border-r border-black/10">
              <Scale className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {compareList.length} Selected
              </span>
            </div>
            <div className="flex gap-2">
              {compareList.map((p) => (
                <img
                  key={p.id}
                  src={p.image}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTab("compare")}
              className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all ml-4"
            >
              Analyze
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
