import { useState } from "react";

// ─── Design Tokens ───────────────────────────────────────────────
const C = {
  navy: "#0F1F3D", navyLight: "#1A3260",
  teal: "#00C2A8", tealDark: "#009E88",
  amber: "#F59E0B", red: "#EF4444",
  green: "#22C55E", blue: "#3B82F6",
  purple: "#8B5CF6", pink: "#EC4899",
  slate: "#64748B", slateLight: "#94A3B8",
  bg: "#F0F4F8", white: "#FFFFFF",
  border: "#E2E8F0",
};

const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap');`;
const GLOBAL = `* { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.navy}; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } input, textarea, select { font-family: 'DM Sans', sans-serif; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }`;

// ─── Demo Accounts ────────────────────────────────────────────────
const ACCOUNTS = [
  { email: "manager@oakwood.com",     password: "demo123", role: "manager",     name: "Jordan Ellis",   property: "Oakwood Apartments" },
  { email: "maintenance@oakwood.com", password: "demo123", role: "maintenance", name: "Carlos Rivera",  property: "Oakwood Apartments" },
  { email: "carpet@turnclean.com",    password: "demo123", role: "vendor",      name: "Ray Vega",       company: "TurnClean Carpet",    trade: "carpet" },
  { email: "paint@freshcoat.com",     password: "demo123", role: "vendor",      name: "Lisa Huang",     company: "Fresh Coat Painters", trade: "paint" },
];

// ─── App Data ─────────────────────────────────────────────────────
const STAGE_CONFIG = [
  { id: "maintenance", label: "Maintenance", days: "5–7 days", color: C.blue,   icon: "🔧" },
  { id: "paint",       label: "Paint",       days: "2 days",   color: C.purple, icon: "🎨" },
  { id: "clean",       label: "Clean",       days: "1 day",    color: C.pink,   icon: "🧹" },
  { id: "carpet",      label: "Carpet",      days: "1 day",    color: C.teal,   icon: "🏠" },
  { id: "complete",    label: "Complete",    days: "",          color: C.green,  icon: "✅" },
];

const UNITS = [
  { id: "101", tenant: "Sarah Mitchell", moveOut: "Mar 10", stageIndex: 1, damage: true,  damageNote: "Hole in bedroom wall, stained carpet section near closet" },
  { id: "204", tenant: "James Ortega",   moveOut: "Mar 8",  stageIndex: 3, damage: false, damageNote: "" },
  { id: "312", tenant: "Priya Nair",     moveOut: "Mar 12", stageIndex: 0, damage: true,  damageNote: "Broken cabinet door, damaged window blinds" },
  { id: "115", tenant: "Tom Weller",     moveOut: "Mar 6",  stageIndex: 4, damage: false, damageNote: "" },
  { id: "222", tenant: "Angela Brooks",  moveOut: "Mar 13", stageIndex: 2, damage: false, damageNote: "" },
  { id: "408", tenant: "Derek Kim",      moveOut: "Mar 11", stageIndex: 0, damage: true,  damageNote: "Water damage under sink, needs subfloor inspection" },
];

const VENDORS_LIST = [
  { id: "maint",  trade: "maintenance", company: "Pro Maintenance Co.", contact: "Mike Torres", phone: "(555) 210-4400", email: "maint@promaint.com", status: "active" },
  { id: "paint",  trade: "paint",       company: "Fresh Coat Painters", contact: "Lisa Huang",  phone: "(555) 340-9911", email: "paint@freshcoat.com", status: "active" },
  { id: "clean",  trade: "clean",       company: "Sparkle Clean LLC",   contact: "Dana Willis", phone: "(555) 884-2230", email: "clean@sparkle.com", status: "active" },
  { id: "carpet", trade: "carpet",      company: "TurnClean Carpet",    contact: "Ray Vega",    phone: "(555) 990-1122", email: "carpet@turnclean.com", status: "active" },
];

// ─── Shared Components ────────────────────────────────────────────
const Badge = ({ color, children, small }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: color + "18", color, border: `1px solid ${color}33`, borderRadius: 6, padding: small ? "1px 8px" : "3px 10px", fontSize: small ? 11 : 12, fontWeight: 600, letterSpacing: 0.2, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, variant = "primary", style = {}, disabled }) => {
  const variants = {
    primary:   { background: C.teal,  color: C.white, border: "none" },
    secondary: { background: C.bg,    color: C.navy,  border: `1px solid ${C.border}` },
    danger:    { background: C.red,   color: C.white, border: "none" },
    navy:      { background: C.navy,  color: C.white, border: "none" },
    ghost:     { background: "transparent", color: C.slate, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...variants[variant], borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7, transition: "opacity 0.15s", opacity: disabled ? 0.5 : 1, ...style }}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder, style = {} }) => (
  <div style={{ marginBottom: 14, ...style }}>
    {label && <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", background: C.white, color: C.navy }} />
  </div>
);

const StageBar = ({ stageIndex }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {STAGE_CONFIG.map((s, i) => (
      <div key={s.id} style={{ height: 5, flex: 1, borderRadius: 99, background: i <= stageIndex ? s.color : C.border }} />
    ))}
  </div>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const account = ACCOUNTS.find(a => a.email === email && a.password === password);
      if (account) { onLogin(account); }
      else { setError("Invalid email or password. Try a demo account below."); }
      setLoading(false);
    }, 600);
  };

  const demoAccounts = [
    { label: "Property Manager", email: "manager@oakwood.com", color: C.navy },
    { label: "Maintenance Staff", email: "maintenance@oakwood.com", color: C.blue },
    { label: "Carpet Vendor", email: "carpet@turnclean.com", color: C.teal },
    { label: "Paint Vendor", email: "paint@freshcoat.com", color: C.purple },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 60%, #1e4d7b 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1 }}>
            Turn<span style={{ color: C.teal }}>Genie</span>
          </div>
          <div style={{ fontSize: 13, color: C.slateLight, marginTop: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>Smarter Unit Turns</div>
        </div>

        {/* Login Card */}
        <div style={{ background: C.white, borderRadius: 20, padding: "32px 32px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Welcome back</div>
          <div style={{ fontSize: 14, color: C.slate, marginBottom: 24 }}>Sign in to your account</div>

          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />

          {error && <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 9, padding: "10px 14px", fontSize: 13, color: C.red, marginBottom: 14 }}>{error}</div>}

          <button onClick={handleLogin} disabled={loading}
            style={{ width: "100%", background: C.teal, color: C.white, border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 700, marginBottom: 8, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div style={{ textAlign: "center", fontSize: 13, color: C.slate, marginTop: 4 }}>
            <a href="#" style={{ color: C.teal, textDecoration: "none" }}>Forgot password?</a>
          </div>
        </div>

        {/* Demo accounts */}
        <div style={{ marginTop: 24 }}>
          <div style={{ textAlign: "center", fontSize: 12, color: C.slateLight, marginBottom: 14, letterSpacing: 0.5 }}>— DEMO ACCOUNTS (password: demo123) —</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {demoAccounts.map(a => (
              <button key={a.email} onClick={() => { setEmail(a.email); setPassword("demo123"); }}
                style={{ background: a.color + "22", border: `1px solid ${a.color}44`, borderRadius: 10, padding: "10px 12px", textAlign: "left", color: C.white }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.label}</div>
                <div style={{ fontSize: 11, color: C.slateLight, marginTop: 2 }}>{a.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────
function Sidebar({ user, activeView, setActiveView, onLogout }) {
  const navMap = {
    manager:     [{ id: "dashboard", icon: "⊞", label: "Dashboard" }, { id: "units", icon: "🏢", label: "Units" }, { id: "vendors", icon: "👥", label: "Vendors" }, { id: "invite", icon: "✉️", label: "Invite Vendors" }, { id: "reports", icon: "📊", label: "Reports" }],
    maintenance: [{ id: "maint_jobs", icon: "🔧", label: "My Jobs" }],
    vendor:      [{ id: "vendor_jobs", icon: "📋", label: "My Jobs" }],
  };
  const nav = navMap[user.role] || [];

  const roleColor = { manager: C.teal, maintenance: C.blue, vendor: C.purple }[user.role];
  const roleLabel = { manager: "Property Manager", maintenance: "Maintenance", vendor: "Vendor" }[user.role];

  return (
    <div style={{ width: 230, minHeight: "100vh", background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "26px 22px 18px", borderBottom: "1px solid #ffffff12" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.white, letterSpacing: -0.5 }}>
          Turn<span style={{ color: C.teal }}>Genie</span>
        </div>
        <div style={{ fontSize: 10, color: C.slateLight, marginTop: 2, letterSpacing: 1.2, textTransform: "uppercase" }}>Smarter Unit Turns</div>
      </div>

      {/* User badge */}
      <div style={{ padding: "16px 18px", borderBottom: "1px solid #ffffff12" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: roleColor + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: roleColor, flexShrink: 0 }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <Badge color={roleColor} small>{roleLabel}</Badge>
          </div>
        </div>
        {user.property && <div style={{ fontSize: 11, color: C.slateLight, marginTop: 10 }}>🏢 {user.property}</div>}
        {user.company && <div style={{ fontSize: 11, color: C.slateLight, marginTop: 10 }}>🚚 {user.company}</div>}
      </div>

      {/* Nav */}
      <nav style={{ padding: "14px 12px", flex: 1 }}>
        {nav.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 9, border: "none", marginBottom: 3, background: activeView === item.id ? roleColor + "22" : "transparent", color: activeView === item.id ? roleColor : "#94A3B8", fontSize: 14, fontWeight: activeView === item.id ? 600 : 400, textAlign: "left" }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0 12px 20px" }}>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 9, border: "none", background: "transparent", color: C.slateLight, fontSize: 13, textAlign: "left" }}>
          <span>⬅</span> Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── MANAGER VIEWS ────────────────────────────────────────────────
function ManagerDashboard() {
  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Dashboard</h1>
        <p style={{ color: C.slate, fontSize: 14, marginTop: 3 }}>Friday, March 13 · Oakwood Apartments</p>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 26 }}>
        {[
          { label: "Active Turns", value: "6", sub: "Units in progress", color: C.teal },
          { label: "Avg. Turn Time", value: "8.2d", sub: "Last 30 days", color: C.navy },
          { label: "Pending Invoices", value: "3", sub: "Awaiting review", color: C.amber },
          { label: "Completed (Mar)", value: "4", sub: "This month", color: C.green },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, padding: "18px 20px" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: C.slate }}>{s.sub}</div>
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
              <div key={stage.id} style={{ flex: 1, minWidth: 130 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 10, borderBottom: `2px solid ${stage.color}44` }}>
                  <span>{stage.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: stage.color }}>{stage.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, background: stage.color + "18", color: stage.color, borderRadius: 99, padding: "0px 7px", fontWeight: 700 }}>{units.length}</span>
                </div>
                {units.map(u => (
                  <div key={u.id} style={{ background: C.bg, borderRadius: 9, padding: "10px 11px", marginBottom: 7, border: u.damage ? `1px solid ${C.amber}55` : `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Unit {u.id}</div>
                    <div style={{ fontSize: 11, color: C.slate, marginTop: 1 }}>{u.tenant}</div>
                    {u.damage && <div style={{ fontSize: 11, color: C.amber, marginTop: 5, fontWeight: 600 }}>⚠ Damage noted</div>}
                  </div>
                ))}
                {units.length === 0 && <div style={{ fontSize: 12, color: C.slateLight, fontStyle: "italic", padding: "6px 0" }}>Empty</div>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Activity</div>
        {[
          { time: "9:14 AM", text: "TurnClean Carpet marked Unit 204 complete", icon: "✅", color: C.green },
          { time: "Yesterday", text: "Fresh Coat Painters uploaded 4 completion photos for Unit 101", icon: "📷", color: C.teal },
          { time: "Yesterday", text: "Invoice submitted by Sparkle Clean LLC for Unit 222 — $185", icon: "📄", color: C.amber },
          { time: "Mar 11", text: "Damage flagged on Unit 408 — water damage under sink", icon: "⚠️", color: C.red },
        ].map((a, i, arr) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 14, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</div>
            <div>
              <div style={{ fontSize: 13 }}>{a.text}</div>
              <div style={{ fontSize: 11, color: C.slateLight, marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function UnitsView() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const unit = UNITS.find(u => u.id === selected);
    const stage = STAGE_CONFIG[unit.stageIndex];
    const vendor = VENDORS_LIST.find(v => v.trade === stage.id);

    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.teal, fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>← Back to Units</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Unit {unit.id}</h1>
          <Badge color={stage.color}>{stage.icon} {stage.label}</Badge>
          {unit.damage && <Badge color={C.amber}>⚠ Damage</Badge>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: C.slate, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Tenant</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{unit.tenant}</div>
            <div style={{ fontSize: 13, color: C.slate, marginTop: 4 }}>Moved out: {unit.moveOut}</div>
          </Card>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: C.slate, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>Current Vendor</div>
            {vendor ? (<>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{vendor.company}</div>
              <div style={{ fontSize: 13, color: C.slate, marginTop: 4 }}>{vendor.contact} · {vendor.phone}</div>
            </>) : <div style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>✅ Turn complete</div>}
          </Card>
        </div>

        {/* Progress stepper */}
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20 }}>Turn Progress</div>
          <div style={{ display: "flex", position: "relative" }}>
            {STAGE_CONFIG.map((s, i) => (
              <div key={s.id} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
                {i < STAGE_CONFIG.length - 1 && (
                  <div style={{ position: "absolute", top: 16, left: "50%", right: "-50%", height: 2, background: i < unit.stageIndex ? C.green : C.border, zIndex: 0 }} />
                )}
                <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto 8px", background: i < unit.stageIndex ? C.green : i === unit.stageIndex ? s.color : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, position: "relative", zIndex: 1, boxShadow: i === unit.stageIndex ? `0 0 0 4px ${s.color}33` : "none" }}>
                  {i < unit.stageIndex ? "✓" : s.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: i === unit.stageIndex ? 700 : 400, color: i === unit.stageIndex ? s.color : C.slate }}>{s.label}</div>
                {s.days && <div style={{ fontSize: 10, color: C.slateLight }}>{s.days}</div>}
              </div>
            ))}
          </div>
        </Card>

        {unit.damage && (
          <Card style={{ border: `1px solid ${C.amber}44`, background: C.amber + "08", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, marginBottom: 8 }}>⚠ Damage Notes</div>
            <div style={{ fontSize: 14, marginBottom: 14 }}>{unit.damageNote}</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[1, 2].map(n => (
                <div key={n} style={{ flex: 1, background: C.white, borderRadius: 10, padding: "28px", border: `1px dashed ${C.border}`, fontSize: 12, color: C.slate, textAlign: "center" }}>📷<br />Photo {n}</div>
              ))}
              <div style={{ flex: 1, background: C.teal + "10", borderRadius: 10, padding: "28px", border: `2px dashed ${C.teal}55`, fontSize: 12, color: C.teal, textAlign: "center" }}>+<br />Add Photo</div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Units</h1>
        <Btn>+ Add Unit</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {UNITS.map(unit => {
          const stage = STAGE_CONFIG[unit.stageIndex];
          return (
            <button key={unit.id} onClick={() => setSelected(unit.id)} style={{ background: C.white, borderRadius: 14, padding: "18px 20px", border: `1px solid ${unit.damage ? C.amber + "66" : C.border}`, textAlign: "left", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>Unit {unit.id}</div>
                <Badge color={stage.color}>{stage.icon} {stage.label}</Badge>
              </div>
              <div style={{ fontSize: 13, color: C.slate, marginBottom: 12 }}>{unit.tenant} · {unit.moveOut}</div>
              <StageBar stageIndex={unit.stageIndex} />
              {unit.damage && <div style={{ fontSize: 11, color: C.amber, marginTop: 8, fontWeight: 600 }}>⚠ Damage noted</div>}
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Vendors</h1>
      </div>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Turn Sequence</div>
        <div style={{ fontSize: 13, color: C.slate, marginBottom: 16 }}>Vendors are automatically scheduled in this order. Drag to reorder.</div>
        {STAGE_CONFIG.filter(s => s.id !== "complete").map((stage, i) => {
          const vendor = VENDORS_LIST.find(v => v.trade === stage.id);
          return (
            <div key={stage.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 10, marginBottom: 8, border: `1px solid ${C.border}`, background: C.bg }}>
              <div style={{ color: C.slateLight, fontSize: 18, cursor: "grab" }}>⠿</div>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: stage.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{stage.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: stage.color }}>Step {i + 1}: {stage.label}</div>
                <div style={{ fontSize: 12, color: C.slate }}>{vendor?.company} · {vendor?.contact}</div>
              </div>
              <div style={{ fontSize: 12, color: C.slate, background: C.white, padding: "3px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>{stage.days}</div>
              <Btn variant="secondary" style={{ padding: "5px 12px", fontSize: 12 }}>Edit</Btn>
            </div>
          );
        })}
      </Card>

      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Notification Settings</div>
        {["Email notifications to vendors when scheduled", "SMS text when it's their turn", "In-app notification on job assignment"].map((label, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontSize: 13 }}>{label}</div>
            <div style={{ width: 42, height: 23, borderRadius: 99, background: C.teal, position: "relative", flexShrink: 0 }}>
              <div style={{ width: 17, height: 17, borderRadius: "50%", background: C.white, position: "absolute", top: 3, right: 3 }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function InviteView() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [trade, setTrade] = useState("carpet");

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Invite Vendors</h1>
      <p style={{ color: C.slate, fontSize: 14, marginBottom: 26 }}>Send a secure invite link — vendors set their own password on signup.</p>

      <Card style={{ maxWidth: 500, marginBottom: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Send Invite</div>
        <Input label="Vendor Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vendor@company.com" />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.slate, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Trade / Role</div>
          <select value={trade} onChange={e => setTrade(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, color: C.navy, background: C.white }}>
            <option value="maintenance">Maintenance</option>
            <option value="paint">Painter</option>
            <option value="clean">Cleaner</option>
            <option value="carpet">Carpet Cleaner</option>
            <option value="other">Other</option>
          </select>
        </div>

        {sent ? (
          <div style={{ background: C.green + "10", border: `1px solid ${C.green}44`, borderRadius: 10, padding: "13px 16px", fontSize: 14, color: C.green, fontWeight: 600 }}>
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
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{inv.email}</div>
              <div style={{ fontSize: 12, color: C.slate }}>{inv.trade} · Sent {inv.sent}</div>
            </div>
            <Badge color={inv.status === "accepted" ? C.green : C.amber}>
              {inv.status === "accepted" ? "✓ Accepted" : "⏳ Pending"}
            </Badge>
            {inv.status === "pending" && <Btn variant="secondary" style={{ padding: "5px 12px", fontSize: 12 }}>Resend</Btn>}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── MAINTENANCE VIEWS ────────────────────────────────────────────
function MaintenanceJobs({ user }) {
  const [completing, setCompleting] = useState(null);
  const jobs = [
    { unit: "312", address: "312 Oakwood Dr", scheduled: "Mar 12 – Mar 18", damage: "Broken cabinet door, damaged window blinds", photos: 2 },
    { unit: "408", address: "408 Oakwood Dr", scheduled: "Mar 13 – Mar 19", damage: "Water damage under sink, needs subfloor inspection", photos: 0 },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>My Jobs</h1>
      <p style={{ color: C.slate, fontSize: 14, marginBottom: 26 }}>Oakwood Apartments · {user.name}</p>

      {jobs.map((job, i) => (
        <Card key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Unit {job.unit}</div>
              <div style={{ fontSize: 13, color: C.slate }}>{job.address} · {job.scheduled}</div>
            </div>
            <Badge color={C.blue}>🔧 In Progress</Badge>
          </div>
          <div style={{ background: C.amber + "10", borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.amber}33`, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Damage Noted by PM</div>
            <div style={{ fontSize: 14 }}>{job.damage}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" style={{ flex: 1, justifyContent: "center" }}>📷 Photos ({job.photos})</Btn>
            {completing === job.unit ? (
              <div style={{ flex: 1, background: C.green + "12", border: `1px solid ${C.green}44`, borderRadius: 10, padding: "10px", fontSize: 13, color: C.green, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✅ Done — Painters notified!
              </div>
            ) : (
              <Btn onClick={() => setCompleting(job.unit)} style={{ flex: 1, justifyContent: "center" }}>✓ Mark Complete</Btn>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── VENDOR VIEWS ─────────────────────────────────────────────────
function VendorJobs({ user }) {
  const [invoiceOpen, setInvoiceOpen] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [amount, setAmount] = useState("");

  const jobsByTrade = {
    carpet: [
      { unit: "204", address: "204 Oakwood Dr", scheduled: "Today, Mar 13", status: "today", damage: false, damageNote: "", sequenceStep: 4, sequenceTotal: 4 },
      { unit: "101", address: "101 Oakwood Dr", scheduled: "Mar 15", status: "upcoming", damage: true, damageNote: "Stained carpet section near closet — extra cleaning needed", sequenceStep: 4, sequenceTotal: 4 },
    ],
    paint: [
      { unit: "101", address: "101 Oakwood Dr", scheduled: "Today, Mar 13", status: "today", damage: true, damageNote: "Hole in bedroom wall needs patch before paint", sequenceStep: 2, sequenceTotal: 4 },
    ],
  };

  const jobs = jobsByTrade[user.trade] || [];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>My Jobs</h1>
      <p style={{ color: C.slate, fontSize: 14, marginBottom: 26 }}>{user.company} · {user.name}</p>

      {jobs.length === 0 && (
        <Card style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>No jobs scheduled yet</div>
          <div style={{ fontSize: 13, color: C.slate, marginTop: 4 }}>You'll be notified via email, SMS, and here when a job is ready.</div>
        </Card>
      )}

      {jobs.map((job, i) => (
        <Card key={i} style={{ marginBottom: 16, border: job.status === "today" ? `1px solid ${C.teal}55` : `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Unit {job.unit}</div>
              <div style={{ fontSize: 13, color: C.slate }}>{job.address}</div>
            </div>
            <Badge color={job.status === "today" ? C.teal : C.slate}>
              {job.status === "today" ? "📅 Today" : "⏳ Upcoming"}
            </Badge>
          </div>

          {/* Sequence position — vendor can see where they are in the chain */}
          <div style={{ background: C.bg, borderRadius: 9, padding: "10px 14px", marginBottom: job.damage ? 12 : 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: C.slate }}>Your position in turn:</div>
            <div style={{ display: "flex", gap: 4 }}>
              {STAGE_CONFIG.filter(s => s.id !== "complete").map((s, si) => (
                <div key={s.id} style={{ width: 26, height: 26, borderRadius: 6, background: si + 1 === job.sequenceStep ? s.color : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                  {s.icon}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>Step {job.sequenceStep} of {job.sequenceTotal}</div>
          </div>

          {job.damage && (
            <div style={{ background: C.amber + "10", borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.amber}33`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Extra Work Noted</div>
              <div style={{ fontSize: 13 }}>{job.damageNote}</div>
            </div>
          )}

          {completed.includes(`${job.unit}-${i}`) ? (
            <div style={{ background: C.green + "10", border: `1px solid ${C.green}44`, borderRadius: 10, padding: "13px", textAlign: "center" }}>
              <div style={{ fontSize: 14, color: C.green, fontWeight: 700 }}>✅ Complete — Invoice submitted!</div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="secondary" style={{ flex: 1, justifyContent: "center" }}>📷 Upload Photos</Btn>
                <Btn onClick={() => setInvoiceOpen(`${job.unit}-${i}`)} style={{ flex: 1, justifyContent: "center" }}>📄 Submit Invoice</Btn>
              </div>

              {invoiceOpen === `${job.unit}-${i}` && (
                <div style={{ marginTop: 14, background: C.bg, borderRadius: 12, padding: "16px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Submit Invoice — Unit {job.unit}</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <Input label="Amount" placeholder="$0.00" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, marginBottom: 0 }} />
                    <Input label="Date" placeholder="Mar 13, 2026" style={{ flex: 1, marginBottom: 0 }} />
                  </div>
                  <div style={{ border: `2px dashed ${C.border}`, borderRadius: 9, padding: "18px", textAlign: "center", fontSize: 13, color: C.slate, marginBottom: 12, marginTop: 14 }}>
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
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const defaultView = { manager: "dashboard", maintenance: "maint_jobs", vendor: "vendor_jobs" };
  const [activeView, setActiveView] = useState("dashboard");

  const handleLogin = (account) => {
    setUser(account);
    setActiveView(defaultView[account.role]);
  };

  const handleLogout = () => { setUser(null); setActiveView("dashboard"); };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":   return <ManagerDashboard />;
      case "units":       return <UnitsView />;
      case "vendors":     return <VendorsView />;
      case "invite":      return <InviteView />;
      case "reports":     return <Card style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 32, marginBottom: 10 }}>📊</div><div style={{ fontSize: 16, fontWeight: 600 }}>Reports Coming Soon</div></Card>;
      case "maint_jobs":  return <MaintenanceJobs user={user} />;
      case "vendor_jobs": return <VendorJobs user={user} />;
      default:            return null;
    }
  };

  if (!user) return <><style>{FONT + GLOBAL}</style><LoginScreen onLogin={handleLogin} /></>;

  return (
    <>
      <style>{FONT + GLOBAL}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar user={user} activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
        <main style={{ flex: 1, padding: "34px 38px", overflowY: "auto", maxWidth: 860 }}>
          {renderView()}
        </main>
      </div>
    </>
  );
}
