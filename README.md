import { useState } from “react”;

// ─── Design Tokens ───────────────────────────────────────────────
const C = {
navy: “#0F1F3D”, navyLight: “#1A3260”,
teal: “#00C2A8”, tealDark: “#009E88”,
amber: “#F59E0B”, red: “#EF4444”,
green: “#22C55E”, blue: “#3B82F6”,
purple: “#8B5CF6”, pink: “#EC4899”,
slate: “#64748B”, slateLight: “#94A3B8”,
bg: “#F0F4F8”, white: “#FFFFFF”,
border: “#E2E8F0”,
};

const FONT = `@import url('https://urldefense.proofpoint.com/v2/url?u=https-3A__fonts.googleapis.com_css2-3Ffamily-3DDM-2BSans-3Aital-2Cwght-400-2C300-3B0-2C400-3B0-2C500-3B0-2C600-3B0-2C700-3B0-2C800-3B1-2C400-26family-3DDM-2BMono-3Awght-40400-3B500-26display-3Dswap&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=uy0Cf9OYpwz6yI1x5KVQQfzWp6UJTITm2PFRq5RPw9A&e=');`;
const GLOBAL = `* { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: 'DM Sans', sans-serif; background: ${https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e=}; color: ${https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e=}; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } input, textarea, select { font-family: 'DM Sans', sans-serif; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }`;

// ─── Demo Accounts ────────────────────────────────────────────────
const ACCOUNTS = [
{ email: “manager@oakwood.com”,     password: “demo123”, role: “manager”,     name: “Jordan Ellis”,   property: “Oakwood Apartments” },
{ email: “maintenance@oakwood.com”, password: “demo123”, role: “maintenance”, name: “Carlos Rivera”,  property: “Oakwood Apartments” },
{ email: “carpet@turnclean.com”,    password: “demo123”, role: “vendor”,      name: “Ray Vega”,       company: “TurnClean Carpet”,    trade: “carpet” },
{ email: “paint@freshcoat.com”,     password: “demo123”, role: “vendor”,      name: “Lisa Huang”,     company: “Fresh Coat Painters”, trade: “paint” },
];

// ─── App Data ─────────────────────────────────────────────────────
const STAGE_CONFIG = [
{ id: “maintenance”, label: “Maintenance”, days: “5–7 days”, color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.blue&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=sNqhbAxz5LewGCcMBH8XIg3_6un-fpM6KhJrfsp1Dxg&e=,   icon: “🔧” },
{ id: “paint”,       label: “Paint”,       days: “2 days”,   color: C.purple, icon: “🎨” },
{ id: “clean”,       label: “Clean”,       days: “1 day”,    color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.pink&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=fQCAWt3cR2qN5q5Z1sBDieBfgUyoWQmkA7zT92OvrtA&e=,   icon: “🧹” },
{ id: “carpet”,      label: “Carpet”,      days: “1 day”,    color: C.teal,   icon: “🏠” },
{ id: “complete”,    label: “Complete”,    days: “”,          color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e=,  icon: “✅” },
];

const UNITS = [
{ id: “101”, tenant: “Sarah Mitchell”, moveOut: “Mar 10”, stageIndex: 1, damage: true,  damageNote: “Hole in bedroom wall, stained carpet section near closet” },
{ id: “204”, tenant: “James Ortega”,   moveOut: “Mar 8”,  stageIndex: 3, damage: false, damageNote: “” },
{ id: “312”, tenant: “Priya Nair”,     moveOut: “Mar 12”, stageIndex: 0, damage: true,  damageNote: “Broken cabinet door, damaged window blinds” },
{ id: “115”, tenant: “Tom Weller”,     moveOut: “Mar 6”,  stageIndex: 4, damage: false, damageNote: “” },
{ id: “222”, tenant: “Angela Brooks”,  moveOut: “Mar 13”, stageIndex: 2, damage: false, damageNote: “” },
{ id: “408”, tenant: “Derek Kim”,      moveOut: “Mar 11”, stageIndex: 0, damage: true,  damageNote: “Water damage under sink, needs subfloor inspection” },
];

const VENDORS_LIST = [
{ id: “maint”,  trade: “maintenance”, company: “Pro Maintenance Co.”, contact: “Mike Torres”, phone: “(555) 210-4400”, email: “maint@promaint.com”, status: “active” },
{ id: “paint”,  trade: “paint”,       company: “Fresh Coat Painters”, contact: “Lisa Huang”,  phone: “(555) 340-9911”, email: “paint@freshcoat.com”, status: “active” },
{ id: “clean”,  trade: “clean”,       company: “Sparkle Clean LLC”,   contact: “Dana Willis”, phone: “(555) 884-2230”, email: “clean@sparkle.com”, status: “active” },
{ id: “carpet”, trade: “carpet”,      company: “TurnClean Carpet”,    contact: “Ray Vega”,    phone: “(555) 990-1122”, email: “carpet@turnclean.com”, status: “active” },
];

// ─── Shared Components ────────────────────────────────────────────
const Badge = ({ color, children, small }) => (
<span style={{ display: “inline-flex”, alignItems: “center”, gap: 4, background: color + “18”, color, border: `1px solid ${color}33`, borderRadius: 6, padding: small ? “1px 8px” : “3px 10px”, fontSize: small ? 11 : 12, fontWeight: 600, letterSpacing: 0.2, whiteSpace: “nowrap” }}>
{children}
</span>
);

const Card = ({ children, style = {} }) => (

  <div style={{ background: C.white, borderRadius: 16, border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}`, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, variant = “primary”, style = {}, disabled }) => {
const variants = {
primary:   { background: C.teal,  color: C.white, border: “none” },
secondary: { background: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e=,    color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e=,  border: `1px solid ${C.border}` },
danger:    { background: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.red&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HxDyUrdsYVgoW5Y6_3yO0zeSgf2eVj_6n4FDUI6-V0M&e=,   color: C.white, border: “none” },
navy:      { background: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e=,  color: C.white, border: “none” },
ghost:     { background: “transparent”, color: C.slate, border: “none” },
};
return (
<button onClick={onClick} disabled={disabled} style={{ …variants[variant], borderRadius: 10, padding: “10px 18px”, fontSize: 14, fontWeight: 600, display: “inline-flex”, alignItems: “center”, gap: 7, transition: “opacity 0.15s”, opacity: disabled ? 0.5 : 1, …style }}>
{children}
</button>
);
};

const Input = ({ label, type = “text”, value, onChange, placeholder, style = {} }) => (

  <div style={{ marginBottom: 14, ...style }}>
    {label && <div style={{ fontSize: 12, fontWeight: 600, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}`, fontSize: 14, outline: "none", background: C.white, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e= }} />
  </div>
);

const StageBar = ({ stageIndex }) => (

  <div style={{ display: "flex", gap: 3 }}>
    {STAGE_CONFIG.map((s, i) => (
      <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bs.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QXNDOBvJnzdDMUafS0S3mXkiT1l_f6N_1toBfQiXJY0&e=} style={{ height: 5, flex: 1, borderRadius: 99, background: i <= stageIndex ?https://urldefense.proofpoint.com/v2/url?u=http-3A__s.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rd6EVV3WHwnVeqTyaeLysEet8y30Z3GGUjC3E3tat9E&e=lor :https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=ScAaDeyZHVGRJ8ihuT715rYRijWYTbp_Xpw_rv63SUg&e=rder }} />
    ))}
  </div>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
const [email, setEmail] = useState(””);
const [password, setPassword] = useState(””);
const [error, setError] = useState(””);
const [loading, setLoading] = useState(false);

const handleLogin = () => {
setError(””);
setLoading(true);
setTimeout(() => {
const account = ACCOUNTS.find(a => https://urldefense.proofpoint.com/v2/url?u=http-3A__a.email&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=PSfN-s9Y424fA7VrjB1u1yuaNfAWk3N4hn9vpQx9UNI&e= === email && a.password === password);
if (account) { onLogin(account); }
else { setError(“Invalid email or password. Try a demo account below.”); }
setLoading(false);
}, 600);
};

const demoAccounts = [
{ label: “Property Manager”, email: “manager@oakwood.com”, color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e= },
{ label: “Maintenance Staff”, email: “maintenance@oakwood.com”, color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.blue&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=sNqhbAxz5LewGCcMBH8XIg3_6un-fpM6KhJrfsp1Dxg&e= },
{ label: “Carpet Vendor”, email: “carpet@turnclean.com”, color: C.teal },
{ label: “Paint Vendor”, email: “paint@freshcoat.com”, color: C.purple },
];

return (
<div style={{ minHeight: “100vh”, background: `linear-gradient(135deg, $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=1kAH9O_WqTuCi8q6AFWeKu1iU3IqU85hDn0duGh-Slc&e=} 0%, $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=1kAH9O_WqTuCi8q6AFWeKu1iU3IqU85hDn0duGh-Slc&e=Light} 60%, #1e4d7b 100%)`, display: “flex”, alignItems: “center”, justifyContent: “center”, padding: 24 }}>
<div style={{ width: “100%”, maxWidth: 420 }}>
{/* Logo */}
<div style={{ textAlign: “center”, marginBottom: 36 }}>
<div style={{ fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1 }}>
Turn<span style={{ color: C.teal }}>Genie</span>
</div>
<div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 6, letterSpacing: 1.5, textTransform: “uppercase” }}>Smarter Unit Turns</div>
</div>

```
    {/* Login Card */}
    <div style={{ background: C.white, borderRadius: 20, padding: "32px 32px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Welcome back</div>
      <div style={{ fontSize: 14, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 24 }}>Sign in to your account</div>

      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />

      {error && <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.red&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HxDyUrdsYVgoW5Y6_3yO0zeSgf2eVj_6n4FDUI6-V0M&e= + "12", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.red&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=TWubavzEGJNw4bZU6koz4DVJt2CcggFigHgNPTG20jg&e=}44`, borderRadius: 9, padding: "10px 14px", fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.red&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HxDyUrdsYVgoW5Y6_3yO0zeSgf2eVj_6n4FDUI6-V0M&e=, marginBottom: 14 }}>{error}</div>}

      <button onClick={handleLogin} disabled={loading}
        style={{ width: "100%", background: C.teal, color: C.white, border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 700, marginBottom: 8, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div style={{ textAlign: "center", fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginTop: 4 }}>
        <a href="#" style={{ color: C.teal, textDecoration: "none" }}>Forgot password?</a>
      </div>
    </div>

    {/* Demo accounts */}
    <div style={{ marginTop: 24 }}>
      <div style={{ textAlign: "center", fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginBottom: 14, letterSpacing: 0.5 }}>— DEMO ACCOUNTS (password: demo123) —</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {demoAccounts.map(a => (
          <button key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Ba.email&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=yPWHfyAAEdOb-6vwLYz7s0s_3zOPvHYA57XJMKLCXPE&e=} onClick={() => { setEmail(https://urldefense.proofpoint.com/v2/url?u=http-3A__a.email&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=PSfN-s9Y424fA7VrjB1u1yuaNfAWk3N4hn9vpQx9UNI&e=); setPassword("demo123"); }}
            style={{ background: a.color + "22", border: `1px solid ${a.color}44`, borderRadius: 10, padding: "10px 12px", textAlign: "left", color: C.white }}>
            <div style={{ fontSize: 12, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__a.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=5PBAYMTg8A50gmObslJVK90U4HsrFejOEumkMftZHq0&e=lor }}>{a.label}</div>
            <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 2 }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__a.email&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=PSfN-s9Y424fA7VrjB1u1yuaNfAWk3N4hn9vpQx9UNI&e=}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
</div>
```

);
}

// ─── SIDEBAR ──────────────────────────────────────────────────────
function Sidebar({ user, activeView, setActiveView, onLogout }) {
const navMap = {
manager:     [{ id: “dashboard”, icon: “⊞”, label: “Dashboard” }, { id: “units”, icon: “🏢”, label: “Units” }, { id: “vendors”, icon: “👥”, label: “Vendors” }, { id: “invite”, icon: “✉️”, label: “Invite Vendors” }, { id: “reports”, icon: “📊”, label: “Reports” }],
maintenance: [{ id: “maint_jobs”, icon: “🔧”, label: “My Jobs” }],
vendor:      [{ id: “vendor_jobs”, icon: “📋”, label: “My Jobs” }],
};
const nav = navMap[user.role] || [];

const roleColor = { manager: C.teal, maintenance: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.blue&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=sNqhbAxz5LewGCcMBH8XIg3_6un-fpM6KhJrfsp1Dxg&e=, vendor: C.purple }[user.role];
const roleLabel = { manager: “Property Manager”, maintenance: “Maintenance”, vendor: “Vendor” }[user.role];

return (
<div style={{ width: 230, minHeight: “100vh”, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e=, display: “flex”, flexDirection: “column”, flexShrink: 0 }}>
{/* Logo */}
<div style={{ padding: “26px 22px 18px”, borderBottom: “1px solid #ffffff12” }}>
<div style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: -0.5 }}>
Turn<span style={{ color: C.teal }}>Genie</span>
</div>
<div style={{ fontSize: 10, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 2, letterSpacing: 1.2, textTransform: “uppercase” }}>Smarter Unit Turns</div>
</div>

```
  {/* User badge */}
  <div style={{ padding: "16px 18px", borderBottom: "1px solid #ffffff12" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: roleColor + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: roleColor, flexShrink: 0 }}>
        {user.name.charAt(0)}
      </div>
      <div style={{ overflow: "hidden" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__user.name&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=9QKJetDOxDciC9h5JwbQGG0bwAd8rG779O7QfNGRDzY&e=}</div>
        <Badge color={roleColor} small>{roleLabel}</Badge>
      </div>
    </div>
    {user.property && <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 10 }}>🏢 {user.property}</div>}
    {https://urldefense.proofpoint.com/v2/url?u=http-3A__user.company&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=BRbbKMLet17sjhJTv2IPENN5PSdDZizPTYVtADvIs6c&e= && <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 10 }}>🚚 {https://urldefense.proofpoint.com/v2/url?u=http-3A__user.company&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=BRbbKMLet17sjhJTv2IPENN5PSdDZizPTYVtADvIs6c&e=}</div>}
  </div>

  {/* Nav */}
  <nav style={{ padding: "14px 12px", flex: 1 }}>
    {nav.map(item => (
      <button key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bitem.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=bMJeT5zFHIlL7alhtvzUqoGVEgBa-6vL7_Uky7QeUqc&e=} onClick={() => setActiveView(https://urldefense.proofpoint.com/v2/url?u=http-3A__item.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HzGO2k67MGd21G2f5LX3Wgx9ImXewkb9ukBRphbWbIw&e=)}
        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 9, border: "none", marginBottom: 3, background: activeView === https://urldefense.proofpoint.com/v2/url?u=http-3A__item.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HzGO2k67MGd21G2f5LX3Wgx9ImXewkb9ukBRphbWbIw&e= ? roleColor + "22" : "transparent", color: activeView === https://urldefense.proofpoint.com/v2/url?u=http-3A__item.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HzGO2k67MGd21G2f5LX3Wgx9ImXewkb9ukBRphbWbIw&e= ? roleColor : "#94A3B8", fontSize: 14, fontWeight: activeView === https://urldefense.proofpoint.com/v2/url?u=http-3A__item.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HzGO2k67MGd21G2f5LX3Wgx9ImXewkb9ukBRphbWbIw&e= ? 600 : 400, textAlign: "left" }}>
        <span style={{ fontSize: 15 }}>{item.icon}</span>{item.label}
      </button>
    ))}
  </nav>

  {/* Logout */}
  <div style={{ padding: "0 12px 20px" }}>
    <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 9, border: "none", background: "transparent", color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, fontSize: 13, textAlign: "left" }}>
      <span>⬅</span> Sign Out
    </button>
  </div>
</div>
```

);
}

// ─── MANAGER VIEWS ────────────────────────────────────────────────
function ManagerDashboard() {
return (
<div>
<div style={{ marginBottom: 26 }}>
<h1 style={{ fontSize: 24, fontWeight: 800 }}>Dashboard</h1>
<p style={{ color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontSize: 14, marginTop: 3 }}>Friday, March 13 · Oakwood Apartments</p>
</div>

```
  <div style={{ display: "flex", gap: 14, marginBottom: 26 }}>
    {[
      { label: "Active Turns", value: "6", sub: "Units in progress", color: C.teal },
      { label: "Avg. Turn Time", value: "8.2d", sub: "Last 30 days", color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e= },
      { label: "Pending Invoices", value: "3", sub: "Awaiting review", color: C.amber },
      { label: "Completed (Mar)", value: "4", sub: "This month", color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= },
    ].map(s => (
      <Card key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bs.la&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HDrTo0RQGAykl3_OE9xZQiz8kGJvCImj7VXlLmaI9Bg&e=bel} style={{ flex: 1, padding: "18px 20px" }}>
        <div style={{ fontSize: 26, fontWeight: 800, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__s.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rd6EVV3WHwnVeqTyaeLysEet8y30Z3GGUjC3E3tat9E&e=lor, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
        <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{s.sub}</div>
      </Card>
    ))}
  </div>

  {/* Kanban Pipeline */}
  <Card style={{ marginBottom: 22 }}>
    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Turn Pipeline</div>
    <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
      {STAGE_CONFIG.map((stage, si) => {
        const units = UNITS.filter(u => u.stageIndex === si);
        return (
          <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bstage.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=pFdMzO4SlZIX0zC9qnYP1f0MrdCxfDgqDYtQL_nW5Fw&e=} style={{ flex: 1, minWidth: 130 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 10, borderBottom: `2px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bstage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=EjExDhXA84c-wZ58pz7u9YNLu57KhbObgqX8xDnDJuc&e=lor}44` }}>
              <span>{stage.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IlgPuEkYURqnJzY3o8SiqFTfPWRXi069U5622Tu-c5s&e=lor }}>{stage.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IlgPuEkYURqnJzY3o8SiqFTfPWRXi069U5622Tu-c5s&e=lor + "18", color:https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IlgPuEkYURqnJzY3o8SiqFTfPWRXi069U5622Tu-c5s&e=lor, borderRadius: 99, padding: "0px 7px", fontWeight: 700 }}>{units.length}</span>
            </div>
            {units.map(u => (
              <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bu.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=7mzK3Yfikfp2zXVcFhjRaRwaOkeQf8tKSwLpRDYCRCY&e=} style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e=, borderRadius: 9, padding: "10px 11px", marginBottom: 7, border: u.damage ? `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s1jn-7J1KgvXQ3Jjq_8HHgzyrnfSubT0C-XY9T39Uds&e=ber}55` : `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Unit {https://urldefense.proofpoint.com/v2/url?u=http-3A__u.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=uM5OME7bTQgMeCBqYpBn9K3lKeuTttGSBQh7CfjG8CE&e=}</div>
                <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginTop: 1 }}>{u.tenant}</div>
                {u.damage && <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber, marginTop: 5, fontWeight: 600 }}>⚠ Damage noted</div>}
              </div>
            ))}
            {units.length === 0 && <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, fontStyle: "italic", padding: "6px 0" }}>Empty</div>}
          </div>
        );
      })}
    </div>
  </Card>

  {/* Recent Activity */}
  <Card>
    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Activity</div>
    {[
      { time: "9:14 AM", text: "TurnClean Carpet marked Unit 204 complete", icon: "✅", color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= },
      { time: "Yesterday", text: "Fresh Coat Painters uploaded 4 completion photos for Unit 101", icon: "📷", color: C.teal },
      { time: "Yesterday", text: "Invoice submitted by Sparkle Clean LLC for Unit 222 — $185", icon: "📄", color: C.amber },
      { time: "Mar 11", text: "Damage flagged on Unit 408 — water damage under sink", icon: "⚠️", color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.red&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HxDyUrdsYVgoW5Y6_3yO0zeSgf2eVj_6n4FDUI6-V0M&e= },
    ].map((a, i, arr) => (
      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 14, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` : "none" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__a.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=5PBAYMTg8A50gmObslJVK90U4HsrFejOEumkMftZHq0&e=lor + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</div>
        <div>
          <div style={{ fontSize: 13 }}>{a.text}</div>
          <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, marginTop: 2 }}>{a.time}</div>
        </div>
      </div>
    ))}
  </Card>
</div>
```

);
}

function UnitsView() {
const [selected, setSelected] = useState(null);

if (selected) {
const unit = UNITS.find(u => https://urldefense.proofpoint.com/v2/url?u=http-3A__u.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=uM5OME7bTQgMeCBqYpBn9K3lKeuTttGSBQh7CfjG8CE&e= === selected);
const stage = STAGE_CONFIG[unit.stageIndex];
const vendor = VENDORS_LIST.find(v => https://urldefense.proofpoint.com/v2/url?u=http-3A__v.trade&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=J04LO_7bdLZpBJpgAnSHvDehmpD-PQ91QapO9zLPmvE&e= === https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=0AXrYohuMfyKmj-_f3RfcwVtl9vUT6-EvtQ80b8u7Lo&e=);

```
return (
  <div>
    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.teal, fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>← Back to Units</button>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>Unit {https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=DJUZqYIZyFN24_y9x2m-40_DKrEZxwaq-85uYvAYtBc&e=}</h1>
      <Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bstage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=EjExDhXA84c-wZ58pz7u9YNLu57KhbObgqX8xDnDJuc&e=lor}>{stage.icon} {stage.label}</Badge>
      {unit.damage && <Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s1jn-7J1KgvXQ3Jjq_8HHgzyrnfSubT0C-XY9T39Uds&e=ber}>⚠ Damage</Badge>}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
      <Card style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Tenant</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{unit.tenant}</div>
        <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginTop: 4 }}>Moved out: {unit.moveOut}</div>
      </Card>
      <Card style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Current Vendor</div>
        {vendor ? (<>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__vendor.company&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=WOyEcRHwUnUXVMNR3j-kPAYxS2ooARjC8hoxnP8CrRk&e=}</div>
          <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginTop: 4 }}>{vendor.contact} · {vendor.phone}</div>
        </>) : <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e=, fontWeight: 600 }}>✅ Turn complete</div>}
      </Card>
    </div>

    {/* Progress stepper */}
    <Card style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20 }}>Turn Progress</div>
      <div style={{ display: "flex", position: "relative" }}>
        {STAGE_CONFIG.map((s, i) => (
          <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bs.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QXNDOBvJnzdDMUafS0S3mXkiT1l_f6N_1toBfQiXJY0&e=} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
            {i < STAGE_CONFIG.length - 1 && (
              <div style={{ position: "absolute", top: 16, left: "50%", right: "-50%", height: 2, background: i <https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.stageIndex-3FC.green-3AC.border-2CzIndex-3A0-7D-7D_&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rlwemHanx-sYaujL0Uy8YjuP9eFcvVRbcrCsw6NzaHg&e=>
            )}
            <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto 8px", background: i <https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.stageIndex-3FC.green-3Ai-3D-3D-3Dunit.stageIndex-3Fs.color-3AC.border-2Cdisplay-3A-22flex-22-2CalignItems-3A-22center-22-2CjustifyContent-3A-22center-22-2CfontSize-3A14-2Cposition-3A-22relative-22-2CzIndex-3A1-2CboxShadow-3Ai-3D-3D-3Dunit.stageIndex-3F-600004px-24-7Bs.color-7D33-60-3A-22none&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6cctp9LSr2ATTNG3abk_2ulzhhByox3Ee1eTu4ZOM-o&e="}}>
              {i <https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=qZhKahYS8kza98qU58XHhyAMiW1KOdxcCQgKdUILCVI&e=ageIndex ? "✓" : s.icon}
            </div>
            <div style={{ fontSize: 11, fontWeight: i ===https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=qZhKahYS8kza98qU58XHhyAMiW1KOdxcCQgKdUILCVI&e=ageIndex ? 700 : 400, color: i ===https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=qZhKahYS8kza98qU58XHhyAMiW1KOdxcCQgKdUILCVI&e=ageIndex ?https://urldefense.proofpoint.com/v2/url?u=http-3A__s.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rd6EVV3WHwnVeqTyaeLysEet8y30Z3GGUjC3E3tat9E&e=lor :https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{s.label}</div>
            {s.days && <div style={{ fontSize: 10, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight }}>{s.days}</div>}
          </div>
        ))}
      </div>
    </Card>

    {unit.damage && (
      <Card style={{ border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s1jn-7J1KgvXQ3Jjq_8HHgzyrnfSubT0C-XY9T39Uds&e=ber}44`, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber + "08", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber, marginBottom: 8 }}>⚠ Damage Notes</div>
        <div style={{ fontSize: 14, marginBottom: 14 }}>{unit.damageNote}</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[1, 2].map(n => (
            <div key={n} style={{ flex: 1, background: C.white, borderRadius: 10, padding: "28px", border: `1px dashed $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}`, fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, textAlign: "center" }}>📷<br />Photo {n}</div>
          ))}
          <div style={{ flex: 1, background: C.teal + "10", borderRadius: 10, padding: "28px", border: `2px dashed ${C.teal}55`, fontSize: 12, color: C.teal, textAlign: "center" }}>+<br />Add Photo</div>
        </div>
      </Card>
    )}
  </div>
);
```

}

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<h1 style={{ fontSize: 24, fontWeight: 800 }}>Units</h1>
<Btn>+ Add Unit</Btn>
</div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 14 }}>
{UNITS.map(unit => {
const stage = STAGE_CONFIG[unit.stageIndex];
return (
<button key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bunit.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=BoSd1Rauzo-Okfwpg87CQeVY4umpVacGCrRg3MKlcLg&e=} onClick={() => setSelected(https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=DJUZqYIZyFN24_y9x2m-40_DKrEZxwaq-85uYvAYtBc&e=)} style={{ background: C.white, borderRadius: 14, padding: “18px 20px”, border: `1px solid ${unit.damage ? C.amber + "66" : C.border}`, textAlign: “left”, boxShadow: “0 1px 4px rgba(0,0,0,0.04)” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 10 }}>
<div style={{ fontSize: 18, fontWeight: 800 }}>Unit {https://urldefense.proofpoint.com/v2/url?u=http-3A__unit.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=DJUZqYIZyFN24_y9x2m-40_DKrEZxwaq-85uYvAYtBc&e=}</div>
<Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bstage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=EjExDhXA84c-wZ58pz7u9YNLu57KhbObgqX8xDnDJuc&e=lor}>{stage.icon} {stage.label}</Badge>
</div>
<div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 12 }}>{unit.tenant} · {unit.moveOut}</div>
<StageBar stageIndex=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bunit.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=9aCEsl_GoBzeLRnjwIbfU0dKOeplg6a6iNnc-n5L3gA&e=ageIndex} />
{unit.damage && <div style={{ fontSize: 11, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber, marginTop: 8, fontWeight: 600 }}>⚠ Damage noted</div>}
</button>
);
})}
</div>
</div>
);
}

function VendorsView() {
return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 24 }}>
<h1 style={{ fontSize: 24, fontWeight: 800 }}>Vendors</h1>
</div>

```
  <Card style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Turn Sequence</div>
    <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 16 }}>Vendors are automatically scheduled in this order. Drag to reorder.</div>
    {STAGE_CONFIG.filter(s => https://urldefense.proofpoint.com/v2/url?u=http-3A__s.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s-dx1uQhVxZ8nqml0XL8FnCwyJzFa2BHrhnf69dHIk0&e= !== "complete").map((stage, i) => {
      const vendor = VENDORS_LIST.find(v => https://urldefense.proofpoint.com/v2/url?u=http-3A__v.trade&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=J04LO_7bdLZpBJpgAnSHvDehmpD-PQ91QapO9zLPmvE&e= === https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=0AXrYohuMfyKmj-_f3RfcwVtl9vUT6-EvtQ80b8u7Lo&e=);
      return (
        <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bstage.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=pFdMzO4SlZIX0zC9qnYP1f0MrdCxfDgqDYtQL_nW5Fw&e=} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 10, marginBottom: 8, border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}`, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e= }}>
          <div style={{ color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ateLight, fontSize: 18, cursor: "grab" }}>⠿</div>
          <div style={{ width: 34, height: 34, borderRadius: 9, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IlgPuEkYURqnJzY3o8SiqFTfPWRXi069U5622Tu-c5s&e=lor + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{stage.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__stage.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IlgPuEkYURqnJzY3o8SiqFTfPWRXi069U5622Tu-c5s&e=lor }}>Step {i + 1}: {stage.label}</div>
            <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{vendor?.company} · {vendor?.contact}</div>
          </div>
          <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, background: C.white, padding: "3px 10px", borderRadius: 6, border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` }}>{stage.days}</div>
          <Btn variant="secondary" style={{ padding: "5px 12px", fontSize: 12 }}>Edit</Btn>
        </div>
      );
    })}
  </Card>

  <Card>
    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Notification Settings</div>
    {["Email notifications to vendors when scheduled", "SMS text when it's their turn", "In-app notification on job assignment"].map((label, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < 2 ? `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` : "none" }}>
        <div style={{ fontSize: 13 }}>{label}</div>
        <div style={{ width: 42, height: 23, borderRadius: 99, background: C.teal, position: "relative", flexShrink: 0 }}>
          <div style={{ width: 17, height: 17, borderRadius: "50%", background: C.white, position: "absolute", top: 3, right: 3 }} />
        </div>
      </div>
    ))}
  </Card>
</div>
```

);
}

function InviteView() {
const [sent, setSent] = useState(false);
const [email, setEmail] = useState(””);
const [trade, setTrade] = useState(“carpet”);

return (
<div>
<h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Invite Vendors</h1>
<p style={{ color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontSize: 14, marginBottom: 26 }}>Send a secure invite link — vendors set their own password on signup.</p>

```
  <Card style={{ maxWidth: 500, marginBottom: 22 }}>
    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Send Invite</div>
    <Input label="Vendor Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vendor@company.com" />
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Trade / Role</div>
      <select value={trade} onChange={e => setTrade(e.target.value)}
        style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, color: https://urldefense.proofpoint.com/v2/url?u=http-3A__C.navy&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=eSDmuhBKb8FCtjNDwte17Xj21z0BI2maszJw3wUti9I&e=, background: C.white }}>
        <option value="maintenance">Maintenance</option>
        <option value="paint">Painter</option>
        <option value="clean">Cleaner</option>
        <option value="carpet">Carpet Cleaner</option>
        <option value="other">Other</option>
      </select>
    </div>

    {sent ? (
      <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= + "10", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=gayEzsOVf8fuZxKnTg_lmvjDJMGJ-BzbkEoc8ZDm8fo&e=}44`, borderRadius: 10, padding: "13px 16px", fontSize: 14, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e=, fontWeight: 600 }}>
        ✅ Invite sent to {email}!
      </div>
    ) : (
      <Btn onClick={() => { if (email) setSent(true); }} style={{ width: "100%" }}>Send Invite Link</Btn>
    )}
  </Card>

  <Card>
    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Pending Invites</div>
    {[
      { email: "newclean@sparkle.com", trade: "Cleaner", sent: "Mar 12", status: "pending" },
      { email: "fixes@handyman.com",   trade: "Maintenance", sent: "Mar 10", status: "accepted" },
    ].map((inv, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 1 ? `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` : "none" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__inv.email&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=IfcWOkHQb0v--J2mT3qg_-yXi8gl9m1qsnKa_t2rCko&e=}</div>
          <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__inv.trade&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=BRDQrmZfclHcsikYbvKf36qsqXAgqajwdn3L_Simz9Q&e=} · Sent {inv.sent}</div>
        </div>
        <Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Binv.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=sAeiscE1NN3Mry-qsVKYLoM2r3kgoA-1v59MWOah10o&e=atus === "accepted" ?https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= :https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber}>
          {inv.status === "accepted" ? "✓ Accepted" : "⏳ Pending"}
        </Badge>
        {inv.status === "pending" && <Btn variant="secondary" style={{ padding: "5px 12px", fontSize: 12 }}>Resend</Btn>}
      </div>
    ))}
  </Card>
</div>
```

);
}

// ─── MAINTENANCE VIEWS ────────────────────────────────────────────
function MaintenanceJobs({ user }) {
const [completing, setCompleting] = useState(null);
const jobs = [
{ unit: “312”, address: “312 Oakwood Dr”, scheduled: “Mar 12 – Mar 18”, damage: “Broken cabinet door, damaged window blinds”, photos: 2 },
{ unit: “408”, address: “408 Oakwood Dr”, scheduled: “Mar 13 – Mar 19”, damage: “Water damage under sink, needs subfloor inspection”, photos: 0 },
];

return (
<div>
<h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>My Jobs</h1>
<p style={{ color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontSize: 14, marginBottom: 26 }}>Oakwood Apartments · {https://urldefense.proofpoint.com/v2/url?u=http-3A__user.name&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=9QKJetDOxDciC9h5JwbQGG0bwAd8rG779O7QfNGRDzY&e=}</p>

```
  {jobs.map((job, i) => (
    <Card key={i} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Unit {job.unit}</div>
          <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{job.address} · {job.scheduled}</div>
        </div>
        <Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.blue&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=SxzpME3Yl6wbKkwpJsb-2HQDAT-qEJVlkLfnBmuMYZw&e=}>🔧 In Progress</Badge>
      </div>
      <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber + "10", borderRadius: 10, padding: "12px 14px", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s1jn-7J1KgvXQ3Jjq_8HHgzyrnfSubT0C-XY9T39Uds&e=ber}33`, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Damage Noted by PM</div>
        <div style={{ fontSize: 14 }}>{job.damage}</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn variant="secondary" style={{ flex: 1, justifyContent: "center" }}>📷 Photos ({https://urldefense.proofpoint.com/v2/url?u=http-3A__job.photos&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=qbh4xKNMhFnWVKaTsTJ5o9MxfzKWcD8szJHj0KFpHm0&e=})</Btn>
        {completing === job.unit ? (
          <div style={{ flex: 1, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= + "12", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=gayEzsOVf8fuZxKnTg_lmvjDJMGJ-BzbkEoc8ZDm8fo&e=}44`, borderRadius: 10, padding: "10px", fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e=, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✅ Done — Painters notified!
          </div>
        ) : (
          <Btn onClick={() => setCompleting(job.unit)} style={{ flex: 1, justifyContent: "center" }}>✓ Mark Complete</Btn>
        )}
      </div>
    </Card>
  ))}
</div>
```

);
}

// ─── VENDOR VIEWS ─────────────────────────────────────────────────
function VendorJobs({ user }) {
const [invoiceOpen, setInvoiceOpen] = useState(null);
const [completed, setCompleted] = useState([]);
const [amount, setAmount] = useState(””);

const jobsByTrade = {
carpet: [
{ unit: “204”, address: “204 Oakwood Dr”, scheduled: “Today, Mar 13”, status: “today”, damage: false, damageNote: “”, sequenceStep: 4, sequenceTotal: 4 },
{ unit: “101”, address: “101 Oakwood Dr”, scheduled: “Mar 15”, status: “upcoming”, damage: true, damageNote: “Stained carpet section near closet — extra cleaning needed”, sequenceStep: 4, sequenceTotal: 4 },
],
paint: [
{ unit: “101”, address: “101 Oakwood Dr”, scheduled: “Today, Mar 13”, status: “today”, damage: true, damageNote: “Hole in bedroom wall needs patch before paint”, sequenceStep: 2, sequenceTotal: 4 },
],
};

const jobs = jobsByTrade[https://urldefense.proofpoint.com/v2/url?u=http-3A__user.trade&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=HD3un0K0NOBUDlUITy2-HSV9tlMTJqaydpWPM8H7Rr4&e=] || [];

return (
<div>
<h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>My Jobs</h1>
<p style={{ color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, fontSize: 14, marginBottom: 26 }}>{https://urldefense.proofpoint.com/v2/url?u=http-3A__user.company&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=BRbbKMLet17sjhJTv2IPENN5PSdDZizPTYVtADvIs6c&e=} · {https://urldefense.proofpoint.com/v2/url?u=http-3A__user.name&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=9QKJetDOxDciC9h5JwbQGG0bwAd8rG779O7QfNGRDzY&e=}</p>

```
  {jobs.length === 0 && (
    <Card style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>No jobs scheduled yet</div>
      <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginTop: 4 }}>You'll be notified via email, SMS, and here when a job is ready.</div>
    </Card>
  )}

  {jobs.map((job, i) => (
    <Card key={i} style={{ marginBottom: 16, border:https://urldefense.proofpoint.com/v2/url?u=http-3A__job.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=o1SWciAQvUlxiM8ia83-hOwwmeEFydV39hQMBFDZsCQ&e=atus === "today" ? `1px solid ${C.teal}55` : `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Unit {job.unit}</div>
          <div style={{ fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>{job.address}</div>
        </div>
        <Badge color=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bjob.st&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=MXEsegkdzlRRU22AHZwo3G0gmFzyX38FtnwQdme4mWw&e=atus === "today" ? C.teal :https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate}>
          {job.status === "today" ? "📅 Today" : "⏳ Upcoming"}
        </Badge>
      </div>

      {/* Sequence position — vendor can see where they are in the chain */}
      <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e=, borderRadius: 9, padding: "10px 14px", marginBottom: job.damage ? 12 : 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 12, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate }}>Your position in turn:</div>
        <div style={{ display: "flex", gap: 4 }}>
          {STAGE_CONFIG.filter(s => https://urldefense.proofpoint.com/v2/url?u=http-3A__s.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s-dx1uQhVxZ8nqml0XL8FnCwyJzFa2BHrhnf69dHIk0&e= !== "complete").map((s, si) => (
            <div key=https://urldefense.proofpoint.com/v2/url?u=http-3A__-7Bs.id&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QXNDOBvJnzdDMUafS0S3mXkiT1l_f6N_1toBfQiXJY0&e=} style={{ width: 26, height: 26, borderRadius: 6, background: si + 1 ===https://urldefense.proofpoint.com/v2/url?u=http-3A__job.se&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=xBsSRjP0ThN410nk5oSJGwcs5Rw1xVUP8HLzL_O-Ob4&e=quenceStep ?https://urldefense.proofpoint.com/v2/url?u=http-3A__s.co&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rd6EVV3WHwnVeqTyaeLysEet8y30Z3GGUjC3E3tat9E&e=lor :https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=ScAaDeyZHVGRJ8ihuT715rYRijWYTbp_Xpw_rv63SUg&e=rder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
              {s.icon}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>Step {job.sequenceStep} of {job.sequenceTotal}</div>
      </div>

      {job.damage && (
        <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber + "10", borderRadius: 10, padding: "12px 14px", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=s1jn-7J1KgvXQ3Jjq_8HHgzyrnfSubT0C-XY9T39Uds&e=ber}33`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.am&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=QlccAMeHBV0sLg5qcUGz3NtdcjziUIdOZ2LaDfDm7iE&e=ber, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Extra Work Noted</div>
          <div style={{ fontSize: 13 }}>{job.damageNote}</div>
        </div>
      )}

      {completed.includes(`${job.unit}-${i}`) ? (
        <div style={{ background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e= + "10", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=gayEzsOVf8fuZxKnTg_lmvjDJMGJ-BzbkEoc8ZDm8fo&e=}44`, borderRadius: 10, padding: "13px", textAlign: "center" }}>
          <div style={{ fontSize: 14, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.green&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=rKZrN2IxhbszvutYRv0-rBC367rhrM2MHZtoiNAGyPo&e=, fontWeight: 700 }}>✅ Complete — Invoice submitted!</div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" style={{ flex: 1, justifyContent: "center" }}>📷 Upload Photos</Btn>
            <Btn onClick={() => setInvoiceOpen(`${job.unit}-${i}`)} style={{ flex: 1, justifyContent: "center" }}>📄 Submit Invoice</Btn>
          </div>

          {invoiceOpen === `${job.unit}-${i}` && (
            <div style={{ marginTop: 14, background:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.bg&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=6d7oFMmZUaf7ZRQ0KlN0FEdY3TCiq0yUPj1xtRsE_5c&e=, borderRadius: 12, padding: "16px", border: `1px solid $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Submit Invoice — Unit {job.unit}</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <Input label="Amount" placeholder="$0.00" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, marginBottom: 0 }} />
                <Input label="Date" placeholder="Mar 13, 2026" style={{ flex: 1, marginBottom: 0 }} />
              </div>
              <div style={{ border: `2px dashed $https://urldefense.proofpoint.com/v2/url?u=http-3A__-7BC.bo&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=z2v3xxwR7Iv40iWbN_O0sf65sJao-KoC-O4HWvT31Q4&e=rder}`, borderRadius: 9, padding: "18px", textAlign: "center", fontSize: 13, color:https://urldefense.proofpoint.com/v2/url?u=http-3A__C.sl&d=DwIFaQ&c=euGZstcaTDllvimEN8b7jXrwqOf-v5A_CdpgnVfiiMM&r=ml5503EjItyZKI01QwVOK0Xt3TyKyfppytLsybylm4A&m=kxtv6ZKzVeAPvqzh6wVpUnVmA_VTg6UJQ38c4lQlqiqZd2LyWYTsR5LzgPaJqyij&s=8M2YUCEQkfQQzMoTxotWCXhMvggOUVjCQZkBeAarEzQ&e=ate, marginBottom: 12, marginTop: 14 }}>
                📎 Attach invoice (PDF or image)
              </div>
              <Btn variant="navy" onClick={() => { setCompleted([...completed, `${job.unit}-${i}`]); setInvoiceOpen(null); }} style={{ width: "100%", justifyContent: "center" }}>
                Submit & Mark Complete
              </Btn>
            </div>
          )}
        </>
      )}
    </Card>
  ))}
</div>
```

);
}

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function App() {
const [user, setUser] = useState(null);
const defaultView = { manager: “dashboard”, maintenance: “maint_jobs”, vendor: “vendor_jobs” };
const [activeView, setActiveView] = useState(“dashboard”);

const handleLogin = (account) => {
setUser(account);
setActiveView(defaultView[account.role]);
};

const handleLogout = () => { setUser(null); setActiveView(“dashboard”); };

const renderView = () => {
switch (activeView) {
case “dashboard”:   return <ManagerDashboard />;
case “units”:       return <UnitsView />;
case “vendors”:     return <VendorsView />;
case “invite”:      return <InviteView />;
case “reports”:     return <Card style={{ textAlign: “center”, padding: 40 }}><div style={{ fontSize: 32, marginBottom: 10 }}>📊</div><div style={{ fontSize: 16, fontWeight: 600 }}>Reports Coming Soon</div></Card>;
case “maint_jobs”:  return <MaintenanceJobs user={user} />;
case “vendor_jobs”: return <VendorJobs user={user} />;
default:            return null;
}
};

if (!user) return <><style>{FONT + GLOBAL}</style><LoginScreen onLogin={handleLogin} /></>;

return (
<>
<style>{FONT + GLOBAL}</style>
<div style={{ display: “flex”, minHeight: “100vh” }}>
<Sidebar user={user} activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
<main style={{ flex: 1, padding: “34px 38px”, overflowY: “auto”, maxWidth: 860 }}>
{renderView()}
</main>
</div>
</>
);
}
