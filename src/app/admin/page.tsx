"use client";

import { useEffect, useState } from "react";
import { defaultData, type SiteContent } from "@/lib/store";

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [pass, setPass] = useState("");
  const [data, setData] = useState<SiteContent>(defaultData);
  const [storageConfigured, setStorageConfigured] = useState(false);
  const [authConfigured, setAuthConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [contentResponse, sessionResponse] = await Promise.all([
          fetch("/api/site-content", { cache: "no-store" }),
          fetch("/api/admin/session", { cache: "no-store" }),
        ]);
        const session = await sessionResponse.json();
        setAuthConfigured(Boolean(session.configured));
        setLogged(Boolean(session.authenticated));
        if (contentResponse.ok) {
          const result = await contentResponse.json();
          setData(result.content);
          setStorageConfigured(Boolean(result.storageConfigured));
        }
      } catch {
        setMessage("Could not load the site settings. Refresh and try again.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const updateService = (index: number, field: string, value: string) => {
    setData((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) =>
        serviceIndex === index ? { ...service, [field]: value } : service,
      ),
    }));
  };

  const login = async () => {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not sign in.");
      setLogged(true);
      setPass("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save changes.");
      setMessage("Saved. The public website now uses these changes.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save changes.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setLogged(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading site settings…</div>;
  }

  if (!logged) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-sm">
          <h1 className="text-2xl font-black mb-2"><span className="text-yellow-500">WANO</span>FII Admin</h1>
          <p className="text-white/50 text-sm mb-6">Sign in to manage the public website.</p>
          <input
            type="password"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter") void login(); }}
            placeholder="Admin password"
            className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 mb-4"
            autoComplete="current-password"
          />
          <button disabled={!authConfigured || busy} onClick={() => void login()} className="w-full bg-yellow-500 text-black font-black py-3 rounded-xl disabled:opacity-50">
            {busy ? "Signing in…" : "Login"}
          </button>
          {!authConfigured && <p className="text-amber-300 text-sm mt-4">Admin sign-in needs to be configured in the Vercel environment settings.</p>}
          {message && <p className="text-red-300 text-sm mt-4">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black">Wanofii Admin</h1>
          <button onClick={() => void logout()} className="text-white/50 text-sm">Logout</button>
        </div>

        {!storageConfigured && (
          <div className="bg-amber-950/60 border border-amber-500/30 p-4 rounded-2xl mb-6 text-sm text-amber-100">
            Shared storage is not connected yet. Set up the database and Vercel environment variables using <strong>SUPABASE_SETUP.md</strong> before saving edits for the public site.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10">
            <h3 className="font-black mb-4">Homepage Hero</h3>
            <label className="text-xs text-white/50">Title</label>
            <input value={data.hero.title} onChange={(event) => setData({ ...data, hero: { ...data.hero, title: event.target.value } })} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 mb-2" />
            <label className="text-xs text-white/50">Highlighted title</label>
            <input value={data.hero.gold} onChange={(event) => setData({ ...data, hero: { ...data.hero, gold: event.target.value } })} className="w-full bg-black border border-yellow-500/30 rounded-xl px-3 py-2 mb-2 text-yellow-500" />
            <label className="text-xs text-white/50">Last title line</label>
            <input value={data.hero.sub} onChange={(event) => setData({ ...data, hero: { ...data.hero, sub: event.target.value } })} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 mb-2" />
            <label className="text-xs text-white/50">Description</label>
            <textarea value={data.hero.desc} onChange={(event) => setData({ ...data, hero: { ...data.hero, desc: event.target.value } })} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2" rows={4} />
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10">
            <h3 className="font-black mb-4">Contact</h3>
            <label className="text-xs text-white/50">WhatsApp number (include country code)</label>
            <input value={data.whatsapp} onChange={(event) => setData({ ...data, whatsapp: event.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 mb-3" />
            <p className="text-xs text-white/40">Admin password is managed securely in Vercel settings.</p>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/10 mt-6">
          <h3 className="font-black mb-4">Homepage Services</h3>
          <p className="text-xs text-white/40 mb-4">Names and descriptions control the English homepage. Images, prices, and visibility are shared across languages.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {data.services.map((service, index) => (
              <div key={service.id} className="bg-black p-4 rounded-2xl border border-white/5 flex gap-3">
                <img src={service.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-1 min-w-0 space-y-1">
                  <input aria-label={`${service.name} name`} value={service.name} onChange={(event) => updateService(index, "name", event.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-sm" />
                  <input aria-label={`${service.name} description`} value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs" />
                  <input aria-label={`${service.name} price`} value={service.price} onChange={(event) => updateService(index, "price", event.target.value)} className="w-full bg-zinc-900 border border-yellow-500/20 rounded-lg px-2 py-1 text-xs text-yellow-500" placeholder="Optional price" />
                  <input aria-label={`${service.name} image URL`} value={service.img} onChange={(event) => updateService(index, "img", event.target.value)} className="w-full bg-zinc-900 border border-white/5 rounded-lg px-2 py-1 text-[10px] text-white/50" placeholder="Image URL or /image-name.jpg" />
                  <label className="flex items-center gap-2 text-xs text-white/60 pt-1">
                    <input type="checkbox" checked={service.active} onChange={(event) => setData((current) => ({
                      ...current,
                      services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, active: event.target.checked } : item),
                    }))} />
                    Show on homepage
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {message && <p role="status" className="mt-4 text-center text-sm text-white/80">{message}</p>}
        <button disabled={busy} onClick={() => void save()} className="w-full mt-6 bg-yellow-500 text-black font-black text-lg py-4 rounded-full disabled:opacity-50">
          {busy ? "Saving…" : "SAVE ALL CHANGES"}
        </button>
        <a href="/" target="_blank" rel="noreferrer" className="block text-center mt-4 text-white/50 text-sm">→ View Website</a>
      </div>
    </div>
  );
}
