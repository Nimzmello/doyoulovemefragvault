import React, { useState, useMemo, useRef } from "react";
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
  Edit3,
  Upload,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

// --- Fixed & Updated Initial Data ---
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
    link: "https://www.fragrantica.com/perfume/Chanel/Allure-Homme-Sport-Superleggera-94073.html",
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
    link: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Beau-Le-Parfum-72158.html",
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
    link: "https://www.fragrantica.com/perfume/Azzaro/The-Most-Wanted-Parfum-72531.html",
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
    link: "https://www.fragrantica.com/perfume/Prada/Prada-L-Homme-Intense-45302.html",
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
    link: "https://www.fragrantica.com/perfume/Mith/Bangkok-Mystery-68212.html",
  },
];

const categories = [
  {
    id: "all",
    name: "All Collection",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  { id: "Summer Day", name: "Summer Day", icon: <Wind className="w-5 h-5" /> },
  {
    id: "Summer Night",
    name: "Summer Night",
    icon: <Moon className="w-5 h-5" />,
  },
  {
    id: "Winter / Clubbing",
    name: "Winter / Clubbing",
    icon: <Snowflake className="w-5 h-5" />,
  },
  {
    id: "Special Occasion",
    name: "Special Occasion",
    icon: <Crown className="w-5 h-5" />,
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

const defaultFormState = {
  id: "",
  name: "",
  brand: "",
  category: "Summer Day",
  price: "",
  image: "",
  description: "",
  link: "",
  rating: 4.0,
  notes: { top: "", middle: "", base: "" },
  stats: { longevity: 70, sillage: 70, value: 80, versatility: 80 },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("browse");
  const [perfumesList, setPerfumesList] = useState(initialPerfumes);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [compareList, setCompareList] = useState([]);

  // Modal & Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState(defaultFormState);

  const fileInputRef = useRef(null);

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

  // --- Form Handlers ---
  const openAddForm = () => {
    setFormMode("add");
    setFormData(defaultFormState);
    setIsFormOpen(true);
  };

  const openEditForm = (perfume) => {
    setFormMode("edit");
    setFormData({
      ...perfume,
      notes: {
        top: perfume.notes.top.join(", "),
        middle: perfume.notes.middle.join(", "),
        base: perfume.notes.base.join(", "),
      },
    });
    setSelectedPerfume(null); // Close detail modal to show form clearly
    setIsFormOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Base64 String
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePerfume = (e) => {
    e.preventDefault();
    const formattedPerfume = {
      ...formData,
      id: formMode === "add" ? Date.now().toString() : formData.id,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
      accords: formData.accords || [
        // Keep old accords or add default if new
        { name: "Fresh", value: 80, color: "bg-blue-400" },
        { name: "Woody", value: 60, color: "bg-amber-700" },
      ],
      notes: {
        top: formData.notes.top
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n),
        middle: formData.notes.middle
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n),
        base: formData.notes.base
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n),
      },
    };

    if (formMode === "add") {
      setPerfumesList([formattedPerfume, ...perfumesList]);
    } else {
      setPerfumesList(
        perfumesList.map((p) =>
          p.id === formattedPerfume.id ? formattedPerfume : p
        )
      );

      // Update compare list if the edited item is inside it
      if (compareList.find((c) => c.id === formattedPerfume.id)) {
        setCompareList(
          compareList.map((c) =>
            c.id === formattedPerfume.id ? formattedPerfume : c
          )
        );
      }
    }

    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans pb-20 selection:bg-amber-500 selection:text-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/5 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[160px] rounded-full mix-blend-screen" />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab("browse");
              setSelectedPerfume(null);
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="text-black w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white leading-none">
                THE KIKI VAULT
              </h1>
              <p className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.2em] mt-1">
                PRO EDITION
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
                    ? "text-amber-500 underline underline-offset-8 decoration-2"
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
            <div className="relative hidden sm:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs focus:border-amber-500 focus:bg-white/10 outline-none w-56 transition-all placeholder:text-gray-600"
              />
            </div>
            <button
              onClick={openAddForm}
              className="w-10 h-10 rounded-full bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black flex items-center justify-center transition-all shadow-lg"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* Browse Tab */}
        {activeTab === "browse" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Category Pills */}
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border transition-all whitespace-nowrap ${
                    filterCategory === cat.id
                      ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20"
                      : "bg-[#1a1a1a] text-gray-400 border-white/5 hover:border-white/20"
                  }`}
                >
                  {cat.icon}
                  <span className="text-[11px] font-bold uppercase tracking-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPerfumes.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPerfume(p)}
                  className="group bg-[#151515] rounded-[24px] overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer shadow-xl relative"
                >
                  <div className="h-56 relative overflow-hidden bg-black">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <ImageIcon className="w-10 h-10 text-gray-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                    <button
                      onClick={(e) => toggleCompare(p, e)}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        compareList.find((i) => i.id === p.id)
                          ? "bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/40"
                          : "bg-black/50 border-white/10 text-white hover:bg-amber-500 hover:text-black"
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em]">
                      {p.brand}
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight mt-1 truncate">
                      {p.name}
                    </h3>

                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm font-mono font-bold text-gray-300">
                        {p.price}
                      </p>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-[10px] font-bold text-amber-500">
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

        {/* Compare Tab */}
        {activeTab === "compare" && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
              <div>
                <h2 className="text-4xl font-black text-white">
                  ANALYSIS CENTER
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  Head-to-head comparison metrics
                </p>
              </div>
              {compareList.length > 0 && (
                <button
                  onClick={() => setCompareList([])}
                  className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest bg-red-400/10 px-4 py-2 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {compareList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compareList.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#151515] border border-white/5 rounded-[32px] overflow-hidden"
                  >
                    <div className="h-48 relative bg-black">
                      <img
                        src={p.image}
                        className="w-full h-full object-cover opacity-60"
                        alt={p.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent" />
                      <div className="absolute bottom-5 left-6 right-6">
                        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">
                          {p.brand}
                        </p>
                        <h4 className="text-xl font-bold text-white leading-tight truncate">
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
                          Signature Notes
                        </p>
                        <div className="space-y-2 text-[11px] bg-white/5 p-4 rounded-xl">
                          <div className="flex justify-between">
                            <span className="text-gray-500 font-bold">Top</span>{" "}
                            <span className="text-white text-right truncate w-32">
                              {p.notes.top[0]}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 font-bold">
                              Base
                            </span>{" "}
                            <span className="text-white text-right truncate w-32">
                              {p.notes.base[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center flex flex-col items-center gap-6 opacity-50">
                <Scale className="w-16 h-16 text-gray-600" />
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                  No fragrances selected.
                  <br />
                  Return to collection to add items.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- ADD / EDIT FORM MODAL --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="bg-[#121212] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] relative z-10 border border-white/10 p-8 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  {formMode === "add" ? (
                    <PlusCircle className="text-amber-500" />
                  ) : (
                    <Edit3 className="text-amber-500" />
                  )}
                  {formMode === "add" ? "Add to Vault" : "Edit Blueprint"}
                </h2>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
                  Manage your olfactory collection
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSavePerfume} className="space-y-8">
              {/* Image Upload Section */}
              <div className="flex flex-col sm:flex-row gap-6 items-center bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black border-2 border-dashed border-gray-700 flex-shrink-0 relative group">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-700" />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Perfume Image
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" /> Upload File
                    </button>
                    <span className="text-gray-600 text-xs flex items-center">
                      or
                    </span>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-amber-500 outline-none placeholder:text-gray-700"
                      placeholder="Paste image URL here"
                    />
                  </div>
                </div>
              </div>

              {/* General Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    Brand
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl p-3 text-sm focus:border-amber-500 outline-none text-white"
                    placeholder="e.g. Creed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    Perfume Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl p-3 text-sm focus:border-amber-500 outline-none text-white"
                    placeholder="e.g. Aventus"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl p-3 text-sm focus:border-amber-500 outline-none text-white appearance-none"
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
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl p-3 text-sm focus:border-amber-500 outline-none text-white"
                    placeholder="e.g. 5,000 ฿"
                  />
                </div>
              </div>

              {/* Note Pyramid Input */}
              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" /> Olfactory Notes (Comma
                  separated)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-blue-400 uppercase">
                      Top Notes
                    </label>
                    <textarea
                      value={formData.notes.top}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes: { ...formData.notes, top: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-blue-500 text-gray-300 resize-none"
                      placeholder="Lemon, Apple..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-purple-400 uppercase">
                      Mid Notes
                    </label>
                    <textarea
                      value={formData.notes.middle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes: { ...formData.notes, middle: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-purple-500 text-gray-300 resize-none"
                      placeholder="Rose, Jasmine..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-amber-500 uppercase">
                      Base Notes
                    </label>
                    <textarea
                      value={formData.notes.base}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes: { ...formData.notes, base: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs h-20 outline-none focus:border-amber-500 text-gray-300 resize-none"
                      placeholder="Vanilla, Musk..."
                    />
                  </div>
                </div>
              </div>

              {/* Performance Stats Sliders */}
              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Performance Tuning
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["longevity", "sillage", "versatility", "value"].map(
                    (stat) => (
                      <div key={stat} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
                          <span>{stat}</span>
                          <span className="text-amber-500">
                            {formData.stats[stat]}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.stats[stat]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              stats: {
                                ...formData.stats,
                                [stat]: parseInt(e.target.value),
                              },
                            })
                          }
                          className="w-full accent-amber-500 h-1 bg-black rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Fragrantica URL
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl p-3 text-sm focus:border-amber-500 outline-none text-white"
                  placeholder="https://www.fragrantica.com/perfume/..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
                >
                  {formMode === "add" ? "Save to Vault" : "Update Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DETAIL MODAL --- */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPerfume(null)}
          />
          <div className="bg-[#0f0f0f] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-400">
            {/* Modal Actions */}
            <div className="absolute top-6 right-6 flex gap-3 z-20">
              <button
                onClick={() => openEditForm(selectedPerfume)}
                className="w-10 h-10 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black rounded-full flex items-center justify-center transition-all"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedPerfume(null)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Visuals */}
              <div className="lg:w-2/5 h-[400px] lg:h-auto bg-black relative">
                {selectedPerfume.image ? (
                  <img
                    src={selectedPerfume.image}
                    className="w-full h-full object-cover opacity-70"
                    alt={selectedPerfume.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-20 h-20 text-gray-800" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
              </div>

              {/* Right Side: Data */}
              <div className="lg:w-3/5 p-8 lg:p-12 space-y-10 relative">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-500 text-black px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest">
                      {selectedPerfume.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span className="text-[11px] font-bold text-gray-300">
                        {selectedPerfume.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] mb-1">
                    {selectedPerfume.brand}
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    {selectedPerfume.name}
                  </h2>
                </div>

                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "{selectedPerfume.description}"
                </p>

                {/* Pyramid */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    Olfactory Structure
                  </h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                      <Droplets className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase">
                          Top
                        </p>
                        <p className="text-white text-sm font-medium">
                          {selectedPerfume.notes.top.join(" • ") || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                      <Heart className="w-5 h-5 text-purple-400 mt-0.5" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase">
                          Heart
                        </p>
                        <p className="text-white text-sm font-medium">
                          {selectedPerfume.notes.middle.join(" • ") || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                      <TreePine className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase">
                          Base
                        </p>
                        <p className="text-white text-sm font-medium">
                          {selectedPerfume.notes.base.join(" • ") || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
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
                      label="Value"
                      value={selectedPerfume.stats.value}
                      colorClass="bg-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  {selectedPerfume.link && (
                    <a
                      href={selectedPerfume.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black py-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Fragrantica
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      toggleCompare(selectedPerfume, e);
                      setSelectedPerfume(null);
                    }}
                    className={`flex-1 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      compareList.find((i) => i.id === selectedPerfume.id)
                        ? "bg-amber-500 text-black border-amber-500"
                        : "bg-transparent text-amber-500 border-amber-500/50 hover:bg-amber-500/10"
                    }`}
                  >
                    <Zap className="w-4 h-4" />{" "}
                    {compareList.find((i) => i.id === selectedPerfume.id)
                      ? "In Analysis"
                      : "Add to Compare"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Action */}
      {compareList.length > 0 && activeTab === "browse" && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[50] animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-[#1a1a1a] border border-white/10 text-white px-2 py-2 rounded-full flex items-center gap-4 shadow-2xl shadow-black/50 pr-6">
            <div className="flex gap-[-10px] pl-2">
              {compareList.map((p, i) => (
                <img
                  key={p.id}
                  src={p.image}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#1a1a1a] bg-black"
                  style={{ transform: `translateX(-${i * 8}px)` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -ml-4">
                {compareList.length} Selected
              </span>
              <button
                onClick={() => setActiveTab("compare")}
                className="bg-amber-500 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
