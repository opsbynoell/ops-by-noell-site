/**
 * OPS BY NOELL — Telegram Bot Analytics Dashboard
 * Admin-only page showing conversion funnel, daily trends,
 * interest breakdown, contact method split, and recent leads.
 */

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { ArrowLeft, Users, TrendingUp, CheckCircle, Phone, Mail } from "lucide-react";

// ─── Brand colors ────────────────────────────────────────────────────────────
const GOLD = "#A78BFA";
const DARK = "#1A1A1A";
const MUTED = "#8A8480";
const CREAM = "#0A0A0A";
const ALT = "#2A2A2A";
const TELEGRAM_BLUE = "#6366F1";

const STEP_ORDER = [
  "start",
  "awaiting_interest",
  "awaiting_contact_method",
  "awaiting_phone",
  "awaiting_email",
  "complete",
];

const STEP_LABELS: Record<string, string> = {
  start: "Started",
  awaiting_interest: "Chose Interest",
  awaiting_contact_method: "Chose Contact",
  awaiting_phone: "Awaiting Phone",
  awaiting_email: "Awaiting Email",
  complete: "Completed",
};

const PIE_COLORS = [GOLD, TELEGRAM_BLUE, DARK, "#2A2A2A", MUTED];

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <Card
      style={{
        backgroundColor: accent ? "#A78BFA" : "#1A1A1A",
        border: `1px solid ${accent ? "transparent" : "#2A2A2A"}`,
      }}
    >
      <CardContent style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: accent ? "rgba(10,10,10,0.7)" : MUTED,
                marginBottom: "0.5rem",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2.25rem",
                fontWeight: 400,
                color: accent ? "#0A0A0A" : "#F5F0EB",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </p>
            {sub && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: accent ? "rgba(10,10,10,0.6)" : MUTED,
                  marginTop: "0.375rem",
                }}
              >
                {sub}
              </p>
            )}
          </div>
          <Icon
            size={20}
            color={accent ? GOLD : GOLD}
            style={{ marginTop: "0.25rem", flexShrink: 0 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function BotAnalytics() {
  const { user, loading } = useAuth();
  const [days] = useState(30);

  const { data: funnel = [] } = trpc.analytics.funnel.useQuery(void 0 as unknown as undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: daily = [] } = trpc.analytics.daily.useQuery(
    { days },
    { enabled: !!user && user.role === "admin" }
  );
  const { data: interests = [] } = trpc.analytics.interests.useQuery(void 0 as unknown as undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: contactMethods = [] } = trpc.analytics.contactMethods.useQuery(void 0 as unknown as undefined, {
    enabled: !!user && user.role === "admin",
  });
  const { data: recentLeads = [] } = trpc.analytics.recentLeads.useQuery(
    { limit: 50 },
    { enabled: !!user && user.role === "admin" }
  );

  // Derived stats
  const totalSessions = useMemo(
    () => funnel.reduce((sum, s) => sum + s.count, 0),
    [funnel]
  );
  const completedCount = useMemo(
    () => funnel.find((s) => s.step === "complete")?.count ?? 0,
    [funnel]
  );
  const conversionRate = useMemo(
    () => (totalSessions > 0 ? ((completedCount / totalSessions) * 100).toFixed(1) : "0"),
    [totalSessions, completedCount]
  );
  const phoneLeads = useMemo(
    () => contactMethods.find((m) => m.method === "phone")?.count ?? 0,
    [contactMethods]
  );
  const emailLeads = useMemo(
    () => contactMethods.find((m) => m.method === "email")?.count ?? 0,
    [contactMethods]
  );

  // Build ordered funnel data
  const funnelData = useMemo(() => {
    const map = Object.fromEntries(funnel.map((s) => [s.step, s.count]));
    return STEP_ORDER.map((step) => ({
      step: STEP_LABELS[step] ?? step,
      count: map[step] ?? 0,
    }));
  }, [funnel]);

  // Fill in missing days in daily data
  const dailyData = useMemo(() => {
    const map = Object.fromEntries(daily.map((d) => [d.date, d.count]));
    const result: { date: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      result.push({ date: key.slice(5), count: map[key] ?? 0 });
    }
    return result;
  }, [daily, days]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: CREAM,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", color: MUTED }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user.role !== "admin") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: CREAM,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "2rem",
            color: DARK,
          }}
        >
          Access Restricted
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", color: MUTED }}>
          This page is only available to admins.
        </p>
        <Link href="/" style={{ color: GOLD, fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* ─── Header ─── */}
      <div
        style={{
          backgroundColor: DARK,
          padding: "1.5rem 0",
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8A8480",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F0EB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A8480"; }}
          >
            <ArrowLeft size={12} />
            Back to Site
          </Link>
          <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.375rem",
                fontWeight: 400,
                color: "#F5F0EB",
                lineHeight: 1,
              }}
            >
              Bot Analytics
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                color: "#8A8480",
                letterSpacing: "0.06em",
                marginTop: "0.25rem",
              }}
            >
              Telegram Lead Qualification Flow
            </p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge
              style={{
                backgroundColor: TELEGRAM_BLUE,
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.06em",
              }}
            >
              Live
            </Badge>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "2.5rem" }}>
        {/* ─── KPI Row ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
          className="lg:grid-cols-4"
        >
          <StatCard
            label="Total Sessions"
            value={totalSessions}
            sub="All bot interactions"
            icon={Users}
            accent
          />
          <StatCard
            label="Completed Leads"
            value={completedCount}
            sub="Gave contact info"
            icon={CheckCircle}
          />
          <StatCard
            label="Conversion Rate"
            value={`${conversionRate}%`}
            sub="Started → Completed"
            icon={TrendingUp}
          />
          <StatCard
            label="Phone / Email Split"
            value={`${phoneLeads} / ${emailLeads}`}
            sub="Phone vs email leads"
            icon={Phone}
          />
        </div>

        {/* ─── Funnel + Daily ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
          className="lg:grid-cols-2"
        >
          {/* Conversion Funnel */}
          <Card style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}>
            <CardHeader style={{ paddingBottom: "0.5rem" }}>
              <CardTitle
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: DARK,
                }}
              >
                Conversion Funnel
              </CardTitle>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                Sessions at each step of the bot flow
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={funnelData} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: MUTED }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="step"
                    width={110}
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: DARK }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      backgroundColor: "#111111",
                      border: "1px solid #2A2A2A",
                      borderRadius: 0,
                    }}
                  />
                  <Bar dataKey="count" fill={GOLD} radius={[0, 2, 2, 0]} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Trend */}
          <Card style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}>
            <CardHeader style={{ paddingBottom: "0.5rem" }}>
              <CardTitle
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: DARK,
                }}
              >
                Daily Sessions
              </CardTitle>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                New bot interactions over the last {days} days
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={dailyData} margin={{ left: 0, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fill: MUTED }}
                    axisLine={false}
                    tickLine={false}
                    interval={Math.floor(dailyData.length / 6)}
                  />
                  <YAxis
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: MUTED }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      backgroundColor: "#111111",
                      border: "1px solid #2A2A2A",
                      borderRadius: 0,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={GOLD}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: GOLD }}
                    name="Sessions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ─── Interest + Contact Method ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
          className="lg:grid-cols-2"
        >
          {/* Interest Breakdown */}
          <Card style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}>
            <CardHeader style={{ paddingBottom: "0.5rem" }}>
              <CardTitle
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: DARK,
                }}
              >
                Interest Breakdown
              </CardTitle>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                What completed leads came for
              </p>
            </CardHeader>
            <CardContent>
              {interests.length === 0 ? (
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: MUTED }}>
                    No completed leads yet
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <PieChart width={160} height={160}>
                    <Pie
                      data={interests}
                      dataKey="count"
                      nameKey="interest"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                    >
                      {interests.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        backgroundColor: "#111111",
                        border: "1px solid #2A2A2A",
                        borderRadius: 0,
                      }}
                    />
                  </PieChart>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {interests.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.8125rem",
                            color: DARK,
                          }}
                        >
                          {item.interest}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "1rem",
                            color: GOLD,
                            marginLeft: "auto",
                            paddingLeft: "0.5rem",
                          }}
                        >
                          {item.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Method Split */}
          <Card style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}>
            <CardHeader style={{ paddingBottom: "0.5rem" }}>
              <CardTitle
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: DARK,
                }}
              >
                Contact Method
              </CardTitle>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: MUTED }}>
                How completed leads prefer to be reached
              </p>
            </CardHeader>
            <CardContent>
              {contactMethods.length === 0 ? (
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: MUTED }}>
                    No completed leads yet
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "0.5rem" }}>
                  {contactMethods.map((item, i) => {
                    const total = contactMethods.reduce((s, m) => s + m.count, 0);
                    const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                    const isPhone = item.method === "phone";
                    return (
                      <div key={i}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.375rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {isPhone ? (
                              <Phone size={14} color={GOLD} />
                            ) : (
                              <Mail size={14} color={TELEGRAM_BLUE} />
                            )}
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: DARK,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.method}
                            </p>
                          </div>
                          <p
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: "1.125rem",
                              color: GOLD,
                            }}
                          >
                            {item.count} <span style={{ fontSize: "0.75rem", color: MUTED }}>({pct}%)</span>
                          </p>
                        </div>
                        <div
                          style={{
                            height: "4px",
                            backgroundColor: ALT,
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              backgroundColor: isPhone ? GOLD : TELEGRAM_BLUE,
                              borderRadius: "2px",
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ─── Recent Leads Table ─── */}
        <Card style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: DARK,
              }}
            >
              Recent Completed Leads
            </CardTitle>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: MUTED }}>
              Last {recentLeads.length} leads who completed the bot flow
            </p>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            {recentLeads.length === 0 ? (
              <div
                style={{
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.5rem",
                    color: DARK,
                  }}
                >
                  No leads yet
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: MUTED }}>
                  Completed bot sessions will appear here once visitors engage with the flow.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2A2A2A" }}>
                      {["Name", "Interest", "Contact", "Value", "Source", "Date"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "0.75rem 1.25rem",
                            textAlign: "left",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: MUTED,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead, i) => (
                      <tr
                        key={lead.id}
                        style={{
                          borderBottom: i < recentLeads.length - 1 ? "1px solid #F0EBE5" : "none",
                          backgroundColor: i % 2 === 0 ? "transparent" : "rgba(232,226,218,0.3)",
                        }}
                      >
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: DARK,
                            }}
                          >
                            {lead.telegramFirstName ?? lead.telegramUsername ?? "—"}
                          </p>
                          {lead.telegramUsername && (
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.75rem",
                                color: MUTED,
                              }}
                            >
                              @{lead.telegramUsername}
                            </p>
                          )}
                        </td>
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <Badge
                            style={{
                              backgroundColor:
                                lead.interest === "Agency Services"
                                  ? "rgba(184,149,106,0.15)"
                                  : lead.interest === "Freelance Work"
                                  ? "rgba(34,158,217,0.12)"
                                  : "rgba(61,53,48,0.08)",
                              color:
                                lead.interest === "Agency Services"
                                  ? GOLD
                                  : lead.interest === "Freelance Work"
                                  ? TELEGRAM_BLUE
                                  : DARK,
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.6875rem",
                              fontWeight: 500,
                              border: "none",
                            }}
                          >
                            {lead.interest ?? "—"}
                          </Badge>
                        </td>
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            {lead.contactMethod === "phone" ? (
                              <Phone size={12} color={GOLD} />
                            ) : lead.contactMethod === "email" ? (
                              <Mail size={12} color={TELEGRAM_BLUE} />
                            ) : null}
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.8125rem",
                                color: DARK,
                                textTransform: "capitalize",
                              }}
                            >
                              {lead.contactMethod ?? "—"}
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.8125rem",
                              color: DARK,
                              fontWeight: 500,
                            }}
                          >
                            {lead.contactValue ?? "—"}
                          </p>
                        </td>
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <Badge
                            style={{
                              backgroundColor:
                                lead.source === "website"
                                  ? "rgba(184,149,106,0.12)"
                                  : "rgba(61,53,48,0.06)",
                              color: lead.source === "website" ? GOLD : MUTED,
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.6875rem",
                              border: "none",
                            }}
                          >
                            {lead.source ?? "direct"}
                          </Badge>
                        </td>
                        <td style={{ padding: "0.875rem 1.25rem" }}>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              color: MUTED,
                            }}
                          >
                            {new Date(lead.updatedAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.6875rem",
                              color: "rgba(122,111,104,0.6)",
                            }}
                          >
                            {new Date(lead.updatedAt).toLocaleTimeString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
