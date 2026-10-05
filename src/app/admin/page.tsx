"use client";
import { useState, useEffect } from "react";
import { defaultData } from "@/lib/store";

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [pass, setPass] = useState("");
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem("wanofii_data");
    if (saved) setData(JSON.parse(saved));
    const isLogged = localStorage.getItem("wanofii_admin") === "yes";
    if (isLogged) setLogged(true);
  }, []);

  const save = () => {
    localStorage.setItem("wanofii_data", JSON.stringify(data));
    alert("✅ Saved! Go to homepage and refresh - client will see new prices!");
  };

  if (!logged) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-sm">
          <h1 className="text-2xl font-black mb-2"><span className="text-yellow-500">WANO</span>FII Admin</h1>
          <p className="text-white/50 text-sm mb-6">Enter password to edit prices & pictures</p>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 mb-4" />
          <button onClick={()=>{
            if(pass===data.password){ setLogged(true); localStorage.setItem("wanofii_admin","yes"); }
            else alert("Wrong password - default is wanofii123");
          }} className="w-full bg-yellow-500 text-black font-black py-3 rounded-xl">Login</button>
          <p className="text-[11px] text-white/30 mt-4">Default: wanofii123 - You can change it after login</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">Admin Panel - Change Without Code</h1>
          <button onClick={()=>{localStorage.removeItem("wanofii_admin"); location.reload();}} className="text-white/50 text-sm">Logout</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10">
            <h3 className="font-black mb-4">Hero Section</h3>
            <input value={data.hero.title} onChange={e=>setData({...data, hero:{...data.hero, title:e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 mb-2" placeholder="Title" />
            <input value={data.hero.gold} onChange={e=>setData({...data, hero:{...data.hero, gold:e.target.value}})} className="w-full bg-black border border-yellow-500/30 rounded-xl px-3 py-2 mb-2 text-yellow-500" placeholder="Gold Text" />
            <textarea value={data.hero.desc} onChange={e=>setData({...data, hero:{...data.hero, desc:e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2" placeholder="Description" />
          </div>
          <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10">
            <h3 className="font-black mb-4">Settings</h3>
            <label className="text-xs text-white/50">WhatsApp Number</label>
            <input value={data.whatsapp} onChange={e=>setData({...data, whatsapp:e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 mb-3" />
            <label className="text-xs text-white/50">Admin Password</label>
            <input value={data.password} onChange={e=>setData({...data, password:e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2" />
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10 mt-6">
          <h3 className="font-black mb-4">Services - Edit Price, Name, Picture</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.services.map((s, i) => (
              <div key={s.id} className="bg-black p-4 rounded-2xl border border-white/5 flex gap-3">
                <img src={s.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <input value={s.name} onChange={e=>{ const n=[...data.services]; n[i].name=e.target.value; setData({...data, services:n}); }} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-sm mb-1" />
                  <input value={s.price} onChange={e=>{ const n=[...data.services]; n[i].price=e.target.value; setData({...data, services:n}); }} className="w-full bg-zinc-900 border border-yellow-500/20 rounded-lg px-2 py-1 text-xs text-yellow-500 mb-1" />
                  <input value={s.img} onChange={e=>{ const n=[...data.services]; n[i].img=e.target.value; setData({...data, services:n}); }} className="w-full bg-zinc-900 border border-white/5 rounded-lg px-2 py-1 text-[10px] text-white/30" placeholder="Image URL" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={save} className="w-full mt-6 bg-yellow-500 text-black font-black text-lg py-4 rounded-full">💾 SAVE ALL CHANGES</button>
        <a href="/" target="_blank" className="block text-center mt-4 text-white/50 text-sm">→ View Website (refresh after save)</a>
      </div>
    </div>
  );
}