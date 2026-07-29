"use client";

import React, { useState } from "react";

export default function KyronixStore() {
  const [activeTab, setActiveTab] = useState<"home" | "library" | "reader">("home");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([
    "Absolute masterpiece! The panel flow here is incredible.",
    "That cliffhanger at the end of the chapter gave me chills."
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0d0f12]/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold tracking-wider text-amber-500 cursor-pointer" onClick={() => setActiveTab("home")}>
            KYRONIX<span className="text-zinc-100">.STORE</span>
          </h1>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-zinc-400">
            <button onClick={() => setActiveTab("home")} className={`hover:text-amber-500 transition ${activeTab === "home" ? "text-amber-500" : ""}`}>
              Discover
            </button>
            <button onClick={() => setActiveTab("library")} className={`hover:text-amber-500 transition ${activeTab === "library" ? "text-amber-500" : ""}`}>
              My Shelves
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => alert("PWA Install Ready: Tap your browser menu and select 'Add to Home Screen'.")}
            className="text-xs bg-amber-500 text-black font-semibold px-3 py-1.5 rounded-full hover:bg-amber-400 transition shadow-lg shadow-amber-500/10">
            Install App
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-amber-500">
            K
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "home" && (
          <div className="space-y-12">
            {/* Hero Banner / Featured */}
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12">
              <div className="max-w-xl space-y-4">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Featured Webtoon & Book
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Chronicles of Eldoria</h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Immerse yourself in a hybrid experience blending rich novel chapters with high-contrast vertical panels. Track your reading progress, join discussions, and read offline.
                </p>
                <div className="flex space-x-4 pt-2">
                  <button 
                    onClick={() => { setSelectedBook("Eldoria"); setActiveTab("reader"); }}
                    className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                    Start Reading Now
                  </button>
                  <button 
                    onClick={() => setActiveTab("library")}
                    className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-6 py-2.5 rounded-xl text-sm transition">
                    Want to Read
                  </button>
                </div>
              </div>
            </section>

            {/* Webtoon Comic Cards Grid */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight">Trending Comics & Manga</h3>
                <span className="text-xs text-zinc-500 hover:text-amber-500 cursor-pointer">View all</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Shadow Hunter", ep: "Ep. 24", genre: "Action / Dark Fantasy", img: "from-purple-900 to-zinc-900" },
                  { title: "Lagos Cyberpunk", ep: "Ep. 12", genre: "Sci-Fi / Thriller", img: "from-blue-900 to-zinc-900" },
                  { title: "Neon Blossom", ep: "Ep. 08", genre: "Slice of Life", img: "from-amber-900 to-zinc-900" },
                  { title: "Bloodline Kings", ep: "Ep. 45", genre: "Epic Fantasy", img: "from-red-900 to-zinc-900" },
                ].map((comic, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedBook(comic.title); setActiveTab("reader"); }}
                    className="group cursor-pointer bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition">
                    <div className={`h-48 bg-gradient-to-b ${comic.img} flex items-end p-3 relative`}>
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20">
                        {comic.ep}
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-sm group-hover:text-amber-500 transition truncate">{comic.title}</h4>
                      <p className="text-xs text-zinc-500">{comic.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity Feed Section */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight">Community Activity Feed</h3>
              <div className="space-y-4">
                {[
                  { user: "Amaka_Reads", action: "finished reading", item: "The Ozidi Saga", time: "2m ago" },
                  { user: "TundeComics", action: "rated 5 stars ⭐", item: "Shadow Hunter Ep. 24", time: "15m ago" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/80 rounded-xl text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-amber-500 text-xs">
                        {act.user[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-zinc-200">@{act.user}</span>{' '}
                        <span className="text-zinc-400">{act.action}</span>{' '}
                        <span className="font-medium text-amber-400">{act.item}</span>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-600">{act.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "library" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Bookshelf</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Want to Read", "Currently Reading", "Finished"].map((shelf, sIdx) => (
                <div key={sIdx} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <h4 className="font-bold text-sm tracking-wide text-zinc-300">{shelf}</h4>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">0</span>
                  </div>
                  <div className="h-40 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 text-xs space-y-2">
                    <p>No books added yet</p>
                    <button onClick={() => setActiveTab("home")} className="text-amber-500 hover:underline">Explore catalog</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reader" && (
          <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <button onClick={() => setActiveTab("home")} className="text-xs text-zinc-400 hover:text-amber-500 transition flex items-center space-x-1">
              ← Back to Discovery
            </button>
            <div className="space-y-2">
              <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">Vertical Webtoon Reader</span>
              <h2 className="text-3xl font-extrabold">{selectedBook || "Eldoria Chapter 1"}</h2>
            </div>

            {/* Simulated Webtoon Vertical Panels */}
            <div className="space-y-4">
              <div className="w-full h-96 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-600 font-medium">
                [ Vertical Panel Image 1 ]
              </div>
              <div className="w-full h-96 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-600 font-medium">
                [ Vertical Panel Image 2 ]
              </div>
            </div>

            {/* Inline Comments Section */}
            <div className="border-t border-zinc-800 pt-8 space-y-6">
              <h3 className="font-bold text-lg">Episode Discussion</h3>
              <form onSubmit={handleAddComment} className="flex gap-3">
                <input 
                  type="text" 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment for this episode..." 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition">
                  Post
                </button>
              </form>
              <div className="space-y-3">
                {comments.map((c, index) => (
                  <div key={index} className="p-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm text-zinc-300">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}