"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Pencil, Save, X, AlertCircle, CheckCircle2, Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const WEDDING_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG ?? "sajin-and-keerthan";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time?: string | null;
  venue_name: string;
  venue_address: string;
  venue_lat: number;
  venue_lng: number;
  venue_map_url?: string | null;
  sort_order: number;
}

interface WeddingData {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  bride_family: string;
  groom_family: string;
  wedding_date: string;
  greeting_default: string;
  config_json: Record<string, unknown>;
  events: WeddingEvent[];
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function toDateInputValue(iso: string) {
  return iso ? iso.slice(0, 10) : "";
}

function Field({
  label, id, hint, children,
}: {
  label: string; id?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-zinc-500">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-zinc-400">{hint}</p>}
    </div>
  );
}

function SectionCard({
  title, description, children,
}: {
  title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <Card className="border-zinc-200 shadow-none">
      <CardContent className="p-0">
        {/* Card header */}
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
          {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
        </div>
        {/* Card body */}
        <div className="px-4 py-5 sm:px-6 space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function SaveRow({
  onClick, saving, label = "Save",
}: {
  onClick: () => void; saving: boolean; label?: string;
}) {
  return (
    <div className="pt-1">
      <Button onClick={onClick} disabled={saving} size="sm" className="w-full sm:w-auto">
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        {saving ? "Saving…" : label}
      </Button>
    </div>
  );
}

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 z-50",
      "sm:left-auto sm:right-6 sm:bottom-6 sm:w-auto sm:max-w-xs",
      "flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm shadow-lg",
      type === "success"
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-red-50 border-red-200 text-red-800",
    )}>
      {type === "success"
        ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
        : <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />}
      <span className="flex-1">{message}</span>
    </div>
  );
}

// ─── Event form ───────────────────────────────────────────────────────────────

function emptyEvent(sortOrder: number): Omit<WeddingEvent, "id"> {
  return {
    name: "", date: "", start_time: "", end_time: "",
    venue_name: "", venue_address: "",
    venue_lat: 0, venue_lng: 0, venue_map_url: "",
    sort_order: sortOrder,
  };
}

function EventForm({
  initial, onSave, onCancel, saving,
}: {
  initial: Omit<WeddingEvent, "id"> & { id?: string };
  onSave: (data: typeof initial) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-4 pt-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Event Name" id="ev-name">
          <Input id="ev-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Wedding Ceremony" />
        </Field>
        <Field label="Date" id="ev-date">
          <Input id="ev-date" type="date" value={toDateInputValue(form.date)} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="Start Time" id="ev-start">
          <Input id="ev-start" value={form.start_time} onChange={(e) => set("start_time", e.target.value)} placeholder="e.g. 10:00 AM" />
        </Field>
        <Field label="End Time" id="ev-end" hint="Optional">
          <Input id="ev-end" value={form.end_time ?? ""} onChange={(e) => set("end_time", e.target.value)} placeholder="e.g. 1:00 PM" />
        </Field>
        <Field label="Venue Name" id="ev-vname">
          <Input id="ev-vname" value={form.venue_name} onChange={(e) => set("venue_name", e.target.value)} placeholder="e.g. St. Mary's Church" />
        </Field>
        <Field label="Venue Address" id="ev-vaddr">
          <Input id="ev-vaddr" value={form.venue_address} onChange={(e) => set("venue_address", e.target.value)} placeholder="Full address" />
        </Field>
        <Field label="Latitude" id="ev-lat">
          <Input id="ev-lat" type="number" step="any" value={form.venue_lat} onChange={(e) => set("venue_lat", e.target.value)} />
        </Field>
        <Field label="Longitude" id="ev-lng">
          <Input id="ev-lng" type="number" step="any" value={form.venue_lng} onChange={(e) => set("venue_lng", e.target.value)} />
        </Field>
      </div>
      <Field label="Google Maps URL" id="ev-maps" hint="Optional — paste a share link from Google Maps">
        <Input id="ev-maps" value={form.venue_map_url ?? ""} onChange={(e) => set("venue_map_url", e.target.value)} placeholder="https://maps.google.com/..." />
      </Field>
      <Field label="Sort Order" id="ev-sort" hint="Lower number = appears first">
        <Input id="ev-sort" type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className="w-24" />
      </Field>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button onClick={() => onSave(form)} disabled={saving} size="sm" className="flex-1 sm:flex-none">
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save Event
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving} className="flex-1 sm:flex-none">
          <X className="h-3.5 w-3.5" /> Cancel
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContentPage() {
  const [wedding, setWedding]   = useState<WeddingData | null>(null);
  const [loading, setLoading]   = useState(true);

  const [savingInfo,   setSavingInfo]   = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [savingOg,     setSavingOg]     = useState(false);
  const [savingEvent,  setSavingEvent]  = useState(false);
  const [deletingId,   setDeletingId]   = useState<string | null>(null);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [infoForm,   setInfoForm]   = useState<Partial<WeddingData>>({});
  const [configForm, setConfigForm] = useState<Record<string, string>>({});
  const [ogForm,     setOgForm]     = useState<Record<string, string>>({});

  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [addingEvent,    setAddingEvent]    = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchWedding = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weddings/${WEDDING_SLUG}`);
      if (!res.ok) throw new Error();
      const data: WeddingData = await res.json();
      setWedding(data);

      setInfoForm({
        bride_name:       data.bride_name,
        groom_name:       data.groom_name,
        bride_family:     data.bride_family,
        groom_family:     data.groom_family,
        wedding_date:     data.wedding_date,
        greeting_default: data.greeting_default,
      });

      const cfg = (data.config_json ?? {}) as Record<string, unknown>;
      setConfigForm({
        hashtag:      String(cfg.hashtag      ?? ""),
        countdown_to: String(cfg.countdown_to ?? ""),
        primaryColor: String(cfg.primaryColor ?? "#C9A84C"),
        showRsvpForm: String(cfg.showRsvpForm ?? "true"),
        coverPhoto:   String(cfg.coverPhoto   ?? ""),
      });

      const og = (cfg.og ?? {}) as Record<string, unknown>;
      setOgForm({
        image:                 String(og.image                 ?? ""),
        title_universal:       String(og.title_universal       ?? ""),
        description_universal: String(og.description_universal ?? ""),
        title_personal:        String(og.title_personal        ?? ""),
        description_personal:  String(og.description_personal  ?? ""),
        title_category:        String(og.title_category        ?? ""),
        description_category:  String(og.description_category  ?? ""),
      });
    } catch {
      showToast("Failed to load wedding data", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWedding(); }, [fetchWedding]);

  const saveInfo = async () => {
    setSavingInfo(true);
    try {
      const res = await fetch(`/api/weddings/${WEDDING_SLUG}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoForm),
      });
      if (!res.ok) throw new Error();
      showToast("Wedding info saved!", "success");
      fetchWedding();
    } catch { showToast("Failed to save info", "error"); }
    finally { setSavingInfo(false); }
  };

  const saveConfig = async () => {
    if (!wedding) return;
    setSavingConfig(true);
    try {
      const cfg = { ...(wedding.config_json ?? {}),
        hashtag:      configForm.hashtag      || undefined,
        countdown_to: configForm.countdown_to || undefined,
        primaryColor: configForm.primaryColor || "#C9A84C",
        showRsvpForm: configForm.showRsvpForm === "true",
        coverPhoto:   configForm.coverPhoto   || null,
      };
      const res = await fetch(`/api/weddings/${WEDDING_SLUG}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config_json: cfg }),
      });
      if (!res.ok) throw new Error();
      showToast("Settings saved!", "success");
      fetchWedding();
    } catch { showToast("Failed to save settings", "error"); }
    finally { setSavingConfig(false); }
  };

  const saveOg = async () => {
    if (!wedding) return;
    setSavingOg(true);
    try {
      const ogData: Record<string, string> = {};
      for (const [k, v] of Object.entries(ogForm)) if (v.trim()) ogData[k] = v.trim();
      const cfg = { ...(wedding.config_json ?? {}), og: ogData };
      const res = await fetch(`/api/weddings/${WEDDING_SLUG}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config_json: cfg }),
      });
      if (!res.ok) throw new Error();
      showToast("OG settings saved!", "success");
      fetchWedding();
    } catch { showToast("Failed to save OG settings", "error"); }
    finally { setSavingOg(false); }
  };

  const saveEvent = async (data: Omit<WeddingEvent, "id"> & { id?: string }) => {
    setSavingEvent(true);
    try {
      const isNew = !data.id;
      const res = await fetch(
        isNew
          ? `/api/weddings/${WEDDING_SLUG}/events`
          : `/api/weddings/${WEDDING_SLUG}/events/${data.id}`,
        { method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data) },
      );
      if (!res.ok) throw new Error();
      showToast(isNew ? "Event created!" : "Event updated!", "success");
      setEditingEventId(null);
      setAddingEvent(false);
      fetchWedding();
    } catch { showToast("Failed to save event", "error"); }
    finally { setSavingEvent(false); }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/weddings/${WEDDING_SLUG}/events/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error();
      showToast("Event deleted", "success");
      fetchWedding();
    } catch { showToast("Failed to delete event", "error"); }
    finally { setDeletingId(null); }
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 space-y-5">
        <div className="space-y-2">
          <div className="h-6 w-24 rounded bg-zinc-100 animate-pulse" />
          <div className="h-4 w-64 rounded bg-zinc-100 animate-pulse" />
        </div>
        {[180, 220, 200, 260].map((h, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 overflow-hidden">
            <div className="h-14 bg-zinc-50 border-b border-zinc-100" />
            <div className={`bg-white animate-pulse`} style={{ height: h }} />
          </div>
        ))}
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">Could not load wedding data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-5 pb-24 md:pb-10">
      {toast && <Toast {...toast} />}

      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Content</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Manage all visible content for the invitation site.</p>
      </div>

      {/* ── Wedding Info ────────────────────────────────────────────────────── */}
      <SectionCard
        title="Wedding Info"
        description="Names, date, and the default greeting shown to all visitors."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Bride's Name" id="bride-name">
            <Input id="bride-name" value={infoForm.bride_name ?? ""}
              onChange={(e) => setInfoForm((p) => ({ ...p, bride_name: e.target.value }))}
              placeholder="Bride's full name" />
          </Field>
          <Field label="Groom's Name" id="groom-name">
            <Input id="groom-name" value={infoForm.groom_name ?? ""}
              onChange={(e) => setInfoForm((p) => ({ ...p, groom_name: e.target.value }))}
              placeholder="Groom's full name" />
          </Field>
          <Field label="Bride's Family" id="bride-family">
            <Input id="bride-family" value={infoForm.bride_family ?? ""}
              onChange={(e) => setInfoForm((p) => ({ ...p, bride_family: e.target.value }))}
              placeholder="e.g. The Thomas Family" />
          </Field>
          <Field label="Groom's Family" id="groom-family">
            <Input id="groom-family" value={infoForm.groom_family ?? ""}
              onChange={(e) => setInfoForm((p) => ({ ...p, groom_family: e.target.value }))}
              placeholder="e.g. The Menon Family" />
          </Field>
          <Field label="Wedding Date & Time" id="wedding-date">
            <Input id="wedding-date" type="datetime-local"
              value={infoForm.wedding_date ? infoForm.wedding_date.slice(0, 16) : ""}
              onChange={(e) => setInfoForm((p) => ({ ...p, wedding_date: e.target.value }))} />
          </Field>
        </div>
        <Field label="Default Greeting" id="greeting" hint="Shown on universal and category invite links">
          <Input id="greeting" value={infoForm.greeting_default ?? ""}
            onChange={(e) => setInfoForm((p) => ({ ...p, greeting_default: e.target.value }))}
            placeholder="e.g. You're warmly invited to celebrate with us" />
        </Field>
        <SaveRow onClick={saveInfo} saving={savingInfo} label="Save Wedding Info" />
      </SectionCard>

      {/* ── Events ──────────────────────────────────────────────────────────── */}
      <SectionCard
        title="Events"
        description="Add and manage ceremony, reception, and other events."
      >
        {wedding.events.length === 0 && !addingEvent && (
          <p className="text-sm text-zinc-400 py-4 text-center">No events yet — add one below.</p>
        )}

        <div className="space-y-3">
          {wedding.events.map((ev) => (
            <div key={ev.id} className="rounded-lg border border-zinc-200 bg-zinc-50/50">
              <div className="px-4 py-3">
                {editingEventId === ev.id ? (
                  <EventForm
                    initial={ev}
                    onSave={saveEvent}
                    onCancel={() => setEditingEventId(null)}
                    saving={savingEvent}
                  />
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900">{ev.name}</p>
                      <p className="text-xs text-zinc-500">
                        {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        {" · "}{ev.start_time}{ev.end_time ? ` – ${ev.end_time}` : ""}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">{ev.venue_name} · {ev.venue_address}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0"
                        onClick={() => { setEditingEventId(ev.id); setAddingEvent(false); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="sm"
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
                        onClick={() => deleteEvent(ev.id)} disabled={deletingId === ev.id}>
                        {deletingId === ev.id
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <Trash2 className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {addingEvent && (
          <div className="rounded-lg border border-dashed border-zinc-300 px-4 py-4 bg-zinc-50/50">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">New Event</p>
            <EventForm
              initial={emptyEvent(wedding.events.length + 1)}
              onSave={saveEvent}
              onCancel={() => setAddingEvent(false)}
              saving={savingEvent}
            />
          </div>
        )}

        {!addingEvent && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto"
            onClick={() => { setAddingEvent(true); setEditingEventId(null); }}>
            <Plus className="h-3.5 w-3.5" /> Add Event
          </Button>
        )}
      </SectionCard>

      {/* ── Site Settings ───────────────────────────────────────────────────── */}
      <SectionCard
        title="Site Settings"
        description="Countdown timer, hashtag, accent colour, and RSVP visibility."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Hashtag" id="hashtag" hint='e.g. #KeerthanWedsSajin'>
            <Input id="hashtag" value={configForm.hashtag}
              onChange={(e) => setConfigForm((p) => ({ ...p, hashtag: e.target.value }))}
              placeholder="#BrideWeddsGroom" />
          </Field>
          <Field label="Countdown To" id="countdown" hint="Ceremony start — shows the timer on the invite page">
            <Input id="countdown" type="datetime-local"
              value={configForm.countdown_to ? configForm.countdown_to.slice(0, 16) : ""}
              onChange={(e) => setConfigForm((p) => ({ ...p, countdown_to: e.target.value }))} />
          </Field>
          <Field label="Show RSVP Form" id="show-rsvp">
            <select id="show-rsvp" value={configForm.showRsvpForm}
              onChange={(e) => setConfigForm((p) => ({ ...p, showRsvpForm: e.target.value }))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Field>
          <Field label="Accent Colour" id="primary-color">
            <div className="flex items-center gap-2">
              <input type="color" id="primary-color"
                value={configForm.primaryColor}
                onChange={(e) => setConfigForm((p) => ({ ...p, primaryColor: e.target.value }))}
                className="h-9 w-12 shrink-0 cursor-pointer rounded border border-zinc-200 p-0.5" />
              <Input value={configForm.primaryColor}
                onChange={(e) => setConfigForm((p) => ({ ...p, primaryColor: e.target.value }))}
                className="font-mono" />
            </div>
          </Field>
        </div>
        <Field label="Cover Photo URL" id="cover-photo" hint="Optional — hero background image">
          <Input id="cover-photo" value={configForm.coverPhoto}
            onChange={(e) => setConfigForm((p) => ({ ...p, coverPhoto: e.target.value }))}
            placeholder="https://..." />
        </Field>
        <SaveRow onClick={saveConfig} saving={savingConfig} label="Save Settings" />
      </SectionCard>

      {/* ── SEO / OG ────────────────────────────────────────────────────────── */}
      <SectionCard
        title="SEO / OG"
        description={`Controls link previews on WhatsApp, Instagram, etc. Use {name} to insert the guest's name.`}
      >
        <Field label="OG Image URL" id="og-image" hint="Recommended size: 953 × 501 px">
          <Input id="og-image" value={ogForm.image}
            onChange={(e) => setOgForm((p) => ({ ...p, image: e.target.value }))}
            placeholder="/og-image.jpg" />
        </Field>

        <div className="space-y-3 pt-1">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Universal link — site.com/
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" id="og-title-u">
              <Input id="og-title-u" value={ogForm.title_universal}
                onChange={(e) => setOgForm((p) => ({ ...p, title_universal: e.target.value }))}
                placeholder="Bride & Groom — Wedding Invitation 💌" />
            </Field>
            <Field label="Description" id="og-desc-u">
              <Input id="og-desc-u" value={ogForm.description_universal}
                onChange={(e) => setOgForm((p) => ({ ...p, description_universal: e.target.value }))}
                placeholder="You're invited to celebrate their wedding." />
            </Field>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Personal link — site.com/john-doe
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" id="og-title-p">
              <Input id="og-title-p" value={ogForm.title_personal}
                onChange={(e) => setOgForm((p) => ({ ...p, title_personal: e.target.value }))}
                placeholder="You're invited, {name}! 💌" />
            </Field>
            <Field label="Description" id="og-desc-p">
              <Input id="og-desc-p" value={ogForm.description_personal}
                onChange={(e) => setOgForm((p) => ({ ...p, description_personal: e.target.value }))}
                placeholder="Dear {name}, you are warmly invited." />
            </Field>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Category link — site.com/family
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" id="og-title-c">
              <Input id="og-title-c" value={ogForm.title_category}
                onChange={(e) => setOgForm((p) => ({ ...p, title_category: e.target.value }))}
                placeholder="You're invited! 💌" />
            </Field>
            <Field label="Description" id="og-desc-c">
              <Input id="og-desc-c" value={ogForm.description_category}
                onChange={(e) => setOgForm((p) => ({ ...p, description_category: e.target.value }))}
                placeholder="You are warmly invited to the wedding." />
            </Field>
          </div>
        </div>

        <SaveRow onClick={saveOg} saving={savingOg} label="Save OG Settings" />
      </SectionCard>
    </div>
  );
}
