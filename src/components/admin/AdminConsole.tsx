"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";

/* ------------------------------------------------------------------ types */

type Hero = { id?: number; src: string; alt: string; visible: boolean };
type Seasonal = {
  id?: number;
  name: string;
  src: string;
  period: string;
  visible: boolean;
};
type Product = { id?: number; name: string; price: string; src: string; visible: boolean };
type Farm = {
  id?: number;
  name: string;
  description: string;
  images: string[];
  visible: boolean;
};
type Gallery = { id?: number; src: string; caption: string; visible: boolean };
type Payment = { id?: number; key: string; name: string; detail: string; image: string };

type Data = {
  hero: Hero[];
  seasonal: Seasonal[];
  products: Product[];
  farms: Farm[];
  gallery: Gallery[];
  payments: Payment[];
};

const TABS = [
  { key: "hero", label: "首頁主圖", en: "Hero" },
  { key: "seasonal", label: "本季出產", en: "Seasonal" },
  { key: "products", label: "獨立菜款", en: "Items" },
  { key: "farms", label: "合作農場", en: "Farms" },
  { key: "payments", label: "付款資料", en: "Payment" },
  { key: "gallery", label: "相片庫", en: "Gallery" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* --------------------------------------------------------------- helpers */

function fileToDataUrl(file: File, max = 2400): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(1, max / img.width);

      // If the image is already small enough,
      // keep the ORIGINAL file to preserve colour and quality.
      if (scale >= 1) {
        const reader = new FileReader();

        reader.onload = () => {
          URL.revokeObjectURL(url);
          resolve(reader.result as string);
        };

        reader.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("圖片讀取失敗"));
        };

        reader.readAsDataURL(file);
        return;
      }

      // Only resize very large images.
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("瀏覽器不支援圖片處理"));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("圖片讀取失敗"));
    };

    img.src = url;
  });
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ----------------------------------------------------------- small parts */

function ImagePicker({
  value,
  onChange,
  label,
  ratio = "aspect-[4/3]",
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  ratio?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative flex ${ratio} w-full items-center justify-center overflow-hidden border border-khaki bg-paper-2`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : (
          <span className="roman px-2 text-center text-[10px] uppercase tracking-[0.2em] text-olive">
            no image
          </span>
        )}
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center bg-paper/80">
            <Loader2 className="animate-spin text-leaf" size={20} />
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer border border-soil px-3 py-1.5 text-[13px] tracking-[0.1em] transition hover:bg-soil hover:text-paper">
          {value ? "更換圖片" : "上載圖片"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              setError("");
              try {
                onChange(await fileToDataUrl(file));
              } catch (err) {
                setError(err instanceof Error ? err.message : "上載失敗");
              } finally {
                setBusy(false);
                e.target.value = "";
              }
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[13px] text-olive underline-offset-4 hover:text-red-700 hover:underline"
          >
            移除
          </button>
        )}
      </div>
      {error && <p className="text-[13px] text-red-700">{error}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  area,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="roman mb-1 block text-[10px] uppercase tracking-[0.24em] text-olive">
        {label}
      </span>
      {area ? (
        <textarea
          value={value}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          className="field resize-y"
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="field" />
      )}
    </label>
  );
}

function RowBar({
  index,
  total,
  visible,
  onUp,
  onDown,
  onToggle,
  onDelete,
}: {
  index: number;
  total: number;
  visible: boolean;
  onUp: () => void;
  onDown: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b hairline bg-paper-2/60 px-3 py-2">
      <span className="roman text-[11px] tracking-[0.24em] text-olive">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="flex items-center gap-1">
        <IconBtn label="上移" onClick={onUp} disabled={index === 0}>
          <ArrowUp size={15} />
        </IconBtn>
        <IconBtn label="下移" onClick={onDown} disabled={index === total - 1}>
          <ArrowDown size={15} />
        </IconBtn>
        <IconBtn label={visible ? "隱藏" : "顯示"} onClick={onToggle}>
          {visible ? <Eye size={15} /> : <EyeOff size={15} className="text-olive" />}
        </IconBtn>
        <IconBtn label="刪除" onClick={onDelete} danger>
          <Trash2 size={15} />
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center border border-transparent transition disabled:opacity-30 ${
        danger ? "hover:border-red-700 hover:text-red-700" : "hover:border-soil"
      }`}
    >
      {children}
    </button>
  );
}

/* --------------------------------------------------------------- console */

const empty: Data = {
  hero: [],
  seasonal: [],
  products: [],
  farms: [],
  gallery: [],
  payments: [],
};

export function AdminConsole() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<TabKey>("hero");
  const [data, setData] = useState<Data>(empty);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const json = await res.json();
    if (json.ok) {
      setData({
        hero: json.hero ?? [],
        seasonal: json.seasonal ?? [],
        products: json.products ?? [],
        farms: json.farms ?? [],
        gallery: json.gallery ?? [],
        payments: json.payments ?? [],
      });
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setRows = <K extends TabKey>(key: K, rows: Data[K]) =>
    setData((d) => ({ ...d, [key]: rows }) as Data);

  const save = async () => {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource: tab, rows: data[tab] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "儲存失敗");
      setStatus(json.message ?? "已儲存變更");
      if (Array.isArray(json.rows)) {
        setRows(tab, json.rows as Data[typeof tab]);
      }
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "儲存失敗");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 3500);
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
      await load();
    } else {
      const json = await res.json().catch(() => ({ error: "登入失敗" }));
      setLoginError(json.error ?? "登入失敗");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="animate-spin text-leaf" size={26} />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-5">
        <form onSubmit={login} className="w-full max-w-sm border hairline bg-white p-8">
          <p className="roman text-[10px] uppercase tracking-[0.3em] text-olive">
            GrownDirect — CMS
          </p>
          <h1 className="mt-3 font-serif text-[34px] font-black tracking-[0.08em] text-ink">
            內容管理
          </h1>
          <label className="mt-7 block">
            <span className="roman mb-1 block text-[10px] uppercase tracking-[0.24em] text-olive">
              Password
            </span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              placeholder="請輸入管理密碼"
            />
          </label>
          {loginError && <p className="mt-3 text-[14px] text-red-700">{loginError}</p>}
          <button
            type="submit"
            className="mt-6 w-full bg-brand py-3 text-[16px] tracking-[0.16em] text-white transition hover:bg-deep"
          >
            登入
          </button>
          <Link
            href="/"
            className="mt-5 block text-center text-[14px] text-olive underline-offset-4 hover:underline"
          >
            ← 返回網站
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b hairline bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[20px] font-black tracking-[0.1em] text-ink">
              有種直送
            </span>
            <span className="roman text-[10px] uppercase tracking-[0.3em] text-olive">
              Content Manager
            </span>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className="flex items-center gap-1.5 text-[14px] text-leaf">
                <Check size={15} /> {status}
              </span>
            )}
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-brand px-5 py-2.5 text-[15px] tracking-[0.12em] text-white transition hover:bg-deep disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : null}
              儲存變更
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-10 items-center justify-center border hairline text-olive transition hover:border-soil hover:text-ink"
              aria-label="登出"
              title="登出"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-8 md:grid-cols-[220px_1fr]">
        <nav className="flex flex-col gap-1 md:sticky md:top-24 md:self-start">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex items-baseline justify-between border-l-2 px-4 py-3 text-left transition ${
                tab === t.key
                  ? "border-brand bg-white text-ink"
                  : "border-transparent text-olive hover:border-khaki hover:text-ink"
              }`}
            >
              <span className="text-[16px] tracking-[0.06em]">{t.label}</span>
              <span className="roman text-[9px] uppercase tracking-[0.22em] opacity-70">
                {t.en}
              </span>
            </button>
          ))}
          <Link
            href="/"
            className="mt-4 px-4 text-[14px] text-olive underline-offset-4 hover:underline"
          >
            ← 預覽網站
          </Link>
        </nav>

        <section className="min-w-0">
          <div className="mb-6 border-b hairline pb-4">
            <h2 className="font-serif text-[30px] font-black tracking-[0.06em] text-ink">
              {TABS.find((t) => t.key === tab)?.label}
            </h2>
            <p className="mt-1 text-[15px] leading-[1.8] text-olive">
              {tab === "hero" && "首頁全幅背景圖，兩張圖片會自動淡入淡出交替顯示。"}
              {tab === "seasonal" && "本季出產的菜款：可新增、改名、換圖、排序及顯示／隱藏。"}
              {tab === "products" && "獨立菜款：名稱、價格、圖片、排序及顯示／隱藏。"}
              {tab === "farms" && "合作農場：農場名稱、簡介、2–4 張圖片及顯示／隱藏。"}
              {tab === "payments" && "付款教學圖片與說明文字，右側即為網站顯示的位置。"}
              {tab === "gallery" && "首頁農場故事相片庫（Instagram 替代方案）：手動管理圖片及說明。"}
            </p>
          </div>

          {/* ---------------- HERO ---------------- */}
          {tab === "hero" && (
            <div className="grid gap-6 sm:grid-cols-2">
              {data.hero.map((row, i) => (
                <div key={i} className="border hairline bg-white">
                  <RowBar
                    index={i}
                    total={data.hero.length}
                    visible={row.visible}
                    onUp={() => setRows("hero", move(data.hero, i, i - 1))}
                    onDown={() => setRows("hero", move(data.hero, i, i + 1))}
                    onToggle={() =>
                      setRows(
                        "hero",
                        data.hero.map((r, j) =>
                          j === i ? { ...r, visible: !r.visible } : r,
                        ),
                      )
                    }
                    onDelete={() => setRows("hero", data.hero.filter((_, j) => j !== i))}
                  />
                  <div className="grid gap-4 p-4">
                    <ImagePicker
                      value={row.src}
                      ratio="aspect-[16/9]"
                      label={`首頁主圖 ${i + 1}`}
                      onChange={(v) =>
                        setRows(
                          "hero",
                          data.hero.map((r, j) => (j === i ? { ...r, src: v } : r)),
                        )
                      }
                    />
                    <Field
                      label="圖片說明 Alt"
                      value={row.alt}
                      onChange={(v) =>
                        setRows(
                          "hero",
                          data.hero.map((r, j) => (j === i ? { ...r, alt: v } : r)),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <AddButton
                label="新增一張主圖"
                onClick={() =>
                  setRows("hero", [...data.hero, { src: "", alt: "", visible: true }])
                }
              />
            </div>
          )}

          {/* ---------------- SEASONAL ---------------- */}
          {tab === "seasonal" && (
            <div className="space-y-5">
              {data.seasonal.map((row, i) => (
                <div key={i} className="border hairline bg-white">
                  <RowBar
                    index={i}
                    total={data.seasonal.length}
                    visible={row.visible}
                    onUp={() => setRows("seasonal", move(data.seasonal, i, i - 1))}
                    onDown={() => setRows("seasonal", move(data.seasonal, i, i + 1))}
                    onToggle={() =>
                      setRows(
                        "seasonal",
                        data.seasonal.map((r, j) =>
                          j === i ? { ...r, visible: !r.visible } : r,
                        ),
                      )
                    }
                    onDelete={() =>
                      setRows("seasonal", data.seasonal.filter((_, j) => j !== i))
                    }
                  />
                  <div className="grid gap-4 p-4 md:grid-cols-[160px_1fr]">
                    <ImagePicker
                      value={row.src}
                      label={row.name}
                      onChange={(v) =>
                        setRows(
                          "seasonal",
                          data.seasonal.map((r, j) => (j === i ? { ...r, src: v } : r)),
                        )
                      }
                    />
                    <div className="grid content-start gap-4">
                      <Field
                        label="蔬菜名稱"
                        value={row.name}
                        onChange={(v) =>
                          setRows(
                            "seasonal",
                            data.seasonal.map((r, j) => (j === i ? { ...r, name: v } : r)),
                          )
                        }
                      />
                      <label className="block">
                        <span className="roman mb-1 block text-[10px] uppercase tracking-[0.24em] text-olive">
                          Period
                        </span>
                        <select
                          value={row.period}
                          onChange={(e) =>
                            setRows(
                              "seasonal",
                              data.seasonal.map((r, j) =>
                                j === i ? { ...r, period: e.target.value } : r,
                              ),
                            )
                          }
                          className="field"
                        >
                          <option value="current">本季（本季出產）</option>
                          <option value="next">下月預告</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <AddButton
                label="新增菜款"
                onClick={() =>
                  setRows("seasonal", [
                    ...data.seasonal,
                    { name: "", src: "", period: "current", visible: true },
                  ])
                }
              />
            </div>
          )}

          {/* ---------------- PRODUCTS ---------------- */}
          {tab === "products" && (
            <div className="space-y-5">
              {data.products.map((row, i) => (
                <div key={i} className="border hairline bg-white">
                  <RowBar
                    index={i}
                    total={data.products.length}
                    visible={row.visible}
                    onUp={() => setRows("products", move(data.products, i, i - 1))}
                    onDown={() => setRows("products", move(data.products, i, i + 1))}
                    onToggle={() =>
                      setRows(
                        "products",
                        data.products.map((r, j) =>
                          j === i ? { ...r, visible: !r.visible } : r,
                        ),
                      )
                    }
                    onDelete={() =>
                      setRows("products", data.products.filter((_, j) => j !== i))
                    }
                  />
                  <div className="grid gap-4 p-4 md:grid-cols-[160px_1fr]">
                    <ImagePicker
                      value={row.src}
                      label={row.name}
                      onChange={(v) =>
                        setRows(
                          "products",
                          data.products.map((r, j) => (j === i ? { ...r, src: v } : r)),
                        )
                      }
                    />
                    <div className="grid content-start gap-4 sm:grid-cols-2">
                      <Field
                        label="菜款名稱"
                        value={row.name}
                        onChange={(v) =>
                          setRows(
                            "products",
                            data.products.map((r, j) => (j === i ? { ...r, name: v } : r)),
                          )
                        }
                      />
                      <Field
                        label="價格"
                        value={row.price}
                        onChange={(v) =>
                          setRows(
                            "products",
                            data.products.map((r, j) => (j === i ? { ...r, price: v } : r)),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <AddButton
                label="新增菜款"
                onClick={() =>
                  setRows("products", [
                    ...data.products,
                    { name: "", price: "", src: "", visible: true },
                  ])
                }
              />
            </div>
          )}

          {/* ---------------- FARMS ---------------- */}
          {tab === "farms" && (
            <div className="space-y-6">
              {data.farms.map((row, i) => (
                <div key={i} className="border hairline bg-white">
                  <RowBar
                    index={i}
                    total={data.farms.length}
                    visible={row.visible}
                    onUp={() => setRows("farms", move(data.farms, i, i - 1))}
                    onDown={() => setRows("farms", move(data.farms, i, i + 1))}
                    onToggle={() =>
                      setRows(
                        "farms",
                        data.farms.map((r, j) =>
                          j === i ? { ...r, visible: !r.visible } : r,
                        ),
                      )
                    }
                    onDelete={() => setRows("farms", data.farms.filter((_, j) => j !== i))}
                  />
                  <div className="grid gap-4 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="農場名稱"
                        value={row.name}
                        onChange={(v) =>
                          setRows(
                            "farms",
                            data.farms.map((r, j) => (j === i ? { ...r, name: v } : r)),
                          )
                        }
                      />
                      <Field
                        label="農場簡介"
                        area
                        value={row.description}
                        onChange={(v) =>
                          setRows(
                            "farms",
                            data.farms.map((r, j) =>
                              j === i ? { ...r, description: v } : r,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[0, 1, 2, 3].map((slot) => (
                        <ImagePicker
                          key={slot}
                          ratio="aspect-square"
                          label={`農場圖片 ${slot + 1}`}
                          value={row.images[slot] ?? ""}
                          onChange={(v) =>
                            setRows(
                              "farms",
                              data.farms.map((r, j) => {
                                if (j !== i) return r;
                                const images = [...r.images];
                                if (v) images[slot] = v;
                                else images.splice(slot, 1);
                                return { ...r, images };
                              }),
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <AddButton
                label="新增合作農場"
                onClick={() =>
                  setRows("farms", [
                    ...data.farms,
                    { name: "", description: "", images: [], visible: true },
                  ])
                }
              />
            </div>
          )}

          {/* ---------------- PAYMENTS ---------------- */}
          {tab === "payments" && (
            <div className="space-y-6">
              {data.payments.map((row, i) => (
                <div key={i} className="border hairline bg-white p-4">
                  <p className="roman mb-3 text-[11px] uppercase tracking-[0.26em] text-leaf">
                    {row.name}
                  </p>
                  <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                    <ImagePicker
                      value={row.image}
                      ratio="aspect-square"
                      label={`${row.name} 付款圖片`}
                      onChange={(v) =>
                        setRows(
                          "payments",
                          data.payments.map((r, j) =>
                            j === i ? { ...r, image: v } : r,
                          ),
                        )
                      }
                    />
                    <div className="grid content-start gap-4">
                      <Field
                        label="說明文字"
                        area
                        value={row.detail}
                        onChange={(v) =>
                          setRows(
                            "payments",
                            data.payments.map((r, j) =>
                              j === i ? { ...r, detail: v } : r,
                            ),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------------- GALLERY ---------------- */}
          {tab === "gallery" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.gallery.map((row, i) => (
                <div key={i} className="border hairline bg-white">
                  <RowBar
                    index={i}
                    total={data.gallery.length}
                    visible={row.visible}
                    onUp={() => setRows("gallery", move(data.gallery, i, i - 1))}
                    onDown={() => setRows("gallery", move(data.gallery, i, i + 1))}
                    onToggle={() =>
                      setRows(
                        "gallery",
                        data.gallery.map((r, j) =>
                          j === i ? { ...r, visible: !r.visible } : r,
                        ),
                      )
                    }
                    onDelete={() =>
                      setRows("gallery", data.gallery.filter((_, j) => j !== i))
                    }
                  />
                  <div className="grid gap-4 p-4">
                    <ImagePicker
                      value={row.src}
                      ratio="aspect-square"
                      label={row.caption}
                      onChange={(v) =>
                        setRows(
                          "gallery",
                          data.gallery.map((r, j) => (j === i ? { ...r, src: v } : r)),
                        )
                      }
                    />
                    <Field
                      label="圖片說明"
                      value={row.caption}
                      onChange={(v) =>
                        setRows(
                          "gallery",
                          data.gallery.map((r, j) => (j === i ? { ...r, caption: v } : r)),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <AddButton
                label="新增相片"
                onClick={() =>
                  setRows("gallery", [...data.gallery, { src: "", caption: "", visible: true }])
                }
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[120px] items-center justify-center gap-2 border border-dashed border-khaki text-[15px] tracking-[0.1em] text-olive transition hover:border-soil hover:text-ink"
    >
      <Plus size={17} />
      {label}
    </button>
  );
}
