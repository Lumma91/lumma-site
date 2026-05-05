import { useState, useEffect, useRef } from "react";

const C = {
  cream: "#FAF7F2",
  warmWhite: "#F5F0E8",
  paper: "#EDE8DF",
  bg: "#080808",
  surface: "#111111",
  card: "#161616",
  warm: "#1C1A18",
  green: "#CCFF00",
  pink: "#E6007E",
  pinkPastel: "#FF7EB3",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textMid: "#4A4A4A",
  textLight: "#D4D0CA",
  gray: "#999999",
  dim: "#777777",
  dimmer: "#2a2a2a",
  border: "#E0D8CC",
};

function LogoFull({ dark }) {
  const fg = dark ? C.white : C.textDark;
  return (
    <svg width={120} height={26} viewBox="0 0 320 60">
      <circle cx="20" cy="30" r="13" fill={C.green} />
      <circle cx="42" cy="30" r="13" fill={C.pink} />
      <circle cx="31" cy="30" r="5.5" fill={dark ? C.bg : C.cream} />
      <text x="72" y="44" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="42" fontWeight="700" letterSpacing="6" fill={fg}>LUMMA</text>
    </svg>
  );
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* Tag with dark pill background so green #CCFF00 is always legible */
function SectionTag({ text }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 11, fontWeight: 700, letterSpacing: 3,
      color: C.green,
      backgroundColor: C.bg,
      padding: "5px 12px",
      borderRadius: 6,
      marginBottom: 8,
    }}>
      {text}
    </span>
  );
}

/* Serif italic accent with subtle text shadow for legibility on light bg */
function AccentSerif({ children, color = C.pink }) {
  return (
    <span style={{
      fontFamily: "'Instrument Serif',serif",
      fontStyle: "italic",
      fontWeight: 400,
      color,
    }}>
      {children}
    </span>
  );
}

function FormModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 440, maxHeight: "92vh", overflowY: "auto", backgroundColor: C.cream, borderRadius: "20px 20px 0 0" }}>
        {!submitted ? (
          <div style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: C.textDark, lineHeight: 1.3 }}>
                  Cuéntanos sobre tu{" "}
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>proyecto</span>
                </p>
                <p style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Te contactamos en menos de 24 horas.</p>
              </div>
              <button onClick={onClose} style={{ fontSize: 18, color: C.dim, background: "none", border: "none", cursor: "pointer", padding: 4 }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Nombre", placeholder: "Tu nombre", type: "text" },
                { label: "Email", placeholder: "tu@email.com", type: "email" },
                { label: "Teléfono", placeholder: "+1 (786) 000-0000", type: "tel" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, display: "block", marginBottom: 4 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, border: `1px solid ${C.border}`, backgroundColor: C.white, color: C.textDark, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, display: "block", marginBottom: 4 }}>¿Qué servicio te interesa?</label>
                <select style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, border: `1px solid ${C.border}`, backgroundColor: C.white, color: C.textMid, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", appearance: "none", boxSizing: "border-box" }}>
                  <option>Selecciona una opción</option>
                  <option>Branding + Landing Page</option>
                  <option>Social Media</option>
                  <option>Producción Audiovisual</option>
                  <option>Varios servicios</option>
                  <option>No estoy seguro/a</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, display: "block", marginBottom: 4 }}>¿A qué se dedica tu empresa?</label>
                <input type="text" placeholder="Ej: Restaurante, coaching, bienes raíces..." style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, border: `1px solid ${C.border}`, backgroundColor: C.white, color: C.textDark, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid, display: "block", marginBottom: 4 }}>Instagram (opcional)</label>
                <input type="text" placeholder="@tuproyecto" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 14, border: `1px solid ${C.border}`, backgroundColor: C.white, color: C.textDark, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, backgroundColor: C.bg, color: C.green, border: "none", cursor: "pointer", marginTop: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Enviar solicitud →
              </button>
              <p style={{ fontSize: 11, textAlign: "center", color: C.dim }}>Sin compromiso. Solo una conversación.</p>
            </div>
          </div>
        ) : (
          <div style={{ padding: 40, textAlign: "center" }}>
            <svg width={60} height={40} viewBox="0 0 60 60" style={{ margin: "0 auto 16px" }}>
              <circle cx="22" cy="30" r="14" fill={C.green} /><circle cx="38" cy="30" r="14" fill={C.pink} /><circle cx="30" cy="30" r="6" fill={C.cream} />
            </svg>
            <p style={{ fontSize: 22, fontWeight: 700, color: C.textDark, marginBottom: 8 }}>¡Recibido! ✦</p>
            <p style={{ fontSize: 14, color: C.textMid, marginBottom: 16 }}>Te contactamos en menos de 24 horas.</p>
            <p style={{ fontSize: 13, color: C.textDark }}>Síguenos en <span style={{ color: C.pink, fontWeight: 600 }}>@lummastudio_</span></p>
            <button onClick={onClose} style={{ marginTop: 24, padding: "10px 24px", borderRadius: 10, fontSize: 12, backgroundColor: C.paper, color: C.textMid, border: "none", cursor: "pointer" }}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LummaLP() {
  const [formOpen, setFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.fbq) {
      const f = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
      window.fbq = f; f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
      const s = document.createElement("script"); s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
      window.fbq("init", "1023247670057801");
      window.fbq("track", "PageView");
    }
  }, []);

  const CTA = ({ text = "Quiero empezar →", dark, full = true }) => (
    <button onClick={() => { setFormOpen(true); if (window.fbq) window.fbq("track", "Lead"); }} style={{
      width: full ? "100%" : "auto",
      padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none",
      backgroundColor: dark ? C.green : C.bg,
      color: dark ? C.bg : C.green,
      fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>{text}</button>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <FormModal open={formOpen} onClose={() => setFormOpen(false)} />

      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", backgroundColor: C.cream }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 40, padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: scrolled ? "rgba(250,247,242,0.92)" : C.cream,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all 0.3s",
        }}>
          <LogoFull />
          <button onClick={() => setFormOpen(true)} style={{
            fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 20,
            backgroundColor: C.bg, color: C.green, border: "none", cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
          }}>Hablemos</button>
        </nav>

        {/* HERO */}
        <section style={{ padding: "48px 20px 40px", backgroundColor: C.cream }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.pink, marginBottom: 16 }}>AGENCIA CREATIVA · MIAMI</p>
            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, color: C.textDark, marginBottom: 8 }}>
              Tu marca tiene una
            </h1>
            <h1 style={{ fontSize: 36, lineHeight: 1.15, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>historia increíble.</span>
            </h1>
            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, color: C.textDark, marginBottom: 24 }}>
              Vamos a <AccentSerif>contarla.</AccentSerif>
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textMid, marginBottom: 24 }}>
              Contenido con intención, estrategia y estética para marcas que quieren conectar. Branding, social media y producción audiovisual — todo desde Miami.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "9/16", backgroundColor: C.bg }}>
              <iframe
                src="https://www.youtube.com/embed/QHWUJJcxYgs"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Lumma — Light your brand"
              />
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ marginTop: 24 }}><CTA /></div>
            <p style={{ fontSize: 11, textAlign: "center", color: C.dim, marginTop: 10 }}>Sin compromiso. Solo una conversación.</p>
          </FadeIn>
        </section>

        {/* SOCIAL PROOF BAR */}
        <section style={{ padding: "24px 20px", backgroundColor: C.bg }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[{ num: "+10", label: "años de experiencia" }, { num: "3", label: "servicios integrados" }, { num: "∞", label: "compromiso con tu marca" }].map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: C.green }}>{s.num}</p>
                  <p style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* SERVICIOS */}
        <section style={{ padding: "56px 20px", backgroundColor: C.cream }}>
          <FadeIn>
            <SectionTag text="LO QUE HACEMOS" />
            <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, color: C.textDark, marginBottom: 32, marginTop: 8 }}>
              Tres caminos para hacer{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>brillar</span>{" "}
              lo que haces
            </h2>
          </FadeIn>

          {[
            {
              icon: "✦", name: "Branding", accentBar: C.green,
              desc: "La base de todo. Identidad visual, estrategia de marca y presencia web para que salgas al mundo con confianza desde el día uno.",
              detail: "Logo · Paleta · Tipografía · Aplicaciones · Landing page · Guía de marca",
              spark: "$699", blaze: "$1,500",
            },
            {
              icon: "📱", name: "Social Media", accentBar: C.pinkPastel,
              desc: "Estrategia, creación y gestión completa de contenido. Desde la idea hasta la publicación — todo para que tu marca conecte cada mes.",
              detail: "Estrategia · Content day · 18–26 piezas · Publicación · Gestión · Reporte",
              spark: "$1,800/mes", blaze: "$2,500/mes",
            },
          ].map(svc => (
            <FadeIn key={svc.name}>
              <div style={{ marginBottom: 20, padding: 24, borderRadius: 16, backgroundColor: C.white, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: svc.accentBar }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>{svc.icon}</span>
                  <p style={{ fontSize: 18, fontWeight: 700, color: C.textDark }}>{svc.name}</p>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: C.textMid, marginBottom: 12 }}>{svc.desc}</p>
                <p style={{ fontSize: 11, color: C.dim, marginBottom: 16, lineHeight: 1.5 }}>{svc.detail}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, padding: "14px 12px", borderRadius: 12, textAlign: "center", backgroundColor: C.bg }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4 }}>SPARK</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: C.white }}>{svc.spark}</p>
                  </div>
                  <div style={{ flex: 1, padding: "14px 12px", borderRadius: 12, textAlign: "center", backgroundColor: C.warm }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: C.pinkPastel, marginBottom: 4 }}>BLAZE</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: C.white }}>{svc.blaze}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <div style={{ padding: 24, borderRadius: 16, backgroundColor: C.white, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.green}, ${C.pink})` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>🎬</span>
                <p style={{ fontSize: 18, fontWeight: 700, color: C.textDark }}>
                  Lumma <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>Films</span>
                </p>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: C.textMid, marginBottom: 12 }}>
                Producción audiovisual que revela la esencia de lo que haces. Brand films, content days, testimoniales cinematográficos y cobertura de eventos.
              </p>
              <div style={{ padding: "14px 16px", borderRadius: 12, textAlign: "center", backgroundColor: C.cream, border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 13, color: C.textMid }}>Cada proyecto es único</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.pink, marginTop: 4 }}>Cotización personalizada →</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn><div style={{ marginTop: 24 }}><CTA /></div></FadeIn>
        </section>

        {/* TESTIMONIOS */}
        <section style={{ padding: "56px 20px", backgroundColor: C.bg }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.pinkPastel, marginBottom: 8 }}>RESULTADOS QUE SE SIENTEN</p>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 28 }}>
              Lo que dicen quienes ya{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pinkPastel }}>brillan</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { quote: "Lumma entendió nuestra visión desde el primer día. El contenido que creamos juntos genera resultados reales.", tag: "Social Media · Miami", accent: C.green },
                { quote: "Por fin tenemos una identidad que nos representa. Cada vez que alguien ve nuestra marca, nos dicen: se ve profesional.", tag: "Branding · Doral", accent: C.pinkPastel },
                { quote: "El brand film capturó exactamente lo que somos. Fue un antes y un después para nuestra comunicación.", tag: "Lumma Films · Brickell", accent: C.green },
              ].map((t, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 14, backgroundColor: C.card, borderLeft: `3px solid ${t.accent}` }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: C.textLight, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", marginBottom: 10 }}>"{t.quote}"</p>
                  <p style={{ fontSize: 11, color: C.dim }}>{t.tag}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* PROCESO */}
        <section style={{ padding: "56px 20px", backgroundColor: C.warmWhite }}>
          <FadeIn>
            <SectionTag text="EL CAMINO JUNTOS" />
            <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, color: C.textDark, marginBottom: 28, marginTop: 8 }}>
              4 pasos para{" "}
              <AccentSerif>encender</AccentSerif>{" "}
              lo que construyes
            </h2>
          </FadeIn>
          {[
            { num: "01", title: "Conversamos", desc: "Nos cuentas tu visión. Entendemos lo que haces, tu audiencia y tus metas.", color: C.pink },
            { num: "02", title: "Diseñamos juntos", desc: "Co-creamos la estrategia y el plan de contenido alineado a tus objetivos.", color: C.pinkPastel },
            { num: "03", title: "Producimos", desc: "Cada pieza con intención, estética y calidad. Tú apruebas, nosotros ejecutamos.", color: C.pink },
            { num: "04", title: "Crecemos", desc: "Medimos resultados, aprendemos y escalamos lo que funciona. Siempre juntos.", color: C.pinkPastel },
          ].map((step, i) => (
            <FadeIn key={step.num} delay={i * 60}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 16, marginBottom: 10, borderRadius: 14, backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 28, fontWeight: 800, flexShrink: 0, color: step.color }}>{step.num}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.textDark, marginBottom: 4 }}>{step.title}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: C.textMid }}>{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* ABOUT + TEAM PHOTO */}
        <section style={{ padding: "56px 20px", backgroundColor: C.cream }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.pink, marginBottom: 8 }}>SOBRE LUMMA</p>
            <p style={{ fontSize: 11, letterSpacing: 2, color: C.dim, marginBottom: 20 }}>ESTUDIO CREATIVO · MIAMI, FL</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ marginBottom: 20, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
              {/* Team photo - replace src with your hosted image path for production */}
              <img
                src="/images/team-lumma.jpg"
                alt="Equipo Lumma Studio"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textMid, marginBottom: 14 }}>
              Lumma nació de una convicción: todo proyecto — sin importar su tamaño — merece contenido que lo represente con orgullo.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textMid, marginBottom: 14 }}>
              Con más de 10 años de experiencia en marketing, producción audiovisual y estrategia digital, acompañamos a marcas a encontrar su voz, contar su historia y conectar con las personas correctas.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textMid, marginBottom: 24 }}>
              Combinamos creatividad humana con tecnología de vanguardia. Usamos IA, automatización y procesos inteligentes para entregar resultados profesionales con agilidad. Toda esa expertise se pone al servicio de cada cliente.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ padding: 20, borderRadius: 14, backgroundColor: C.bg, borderLeft: `3px solid ${C.green}` }}>
              <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: C.white }}>La luz ya está en tu marca.</p>
              <p style={{ fontSize: 20, lineHeight: 1.3 }}>
                <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>Vamos a encenderla.</span>
              </p>
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section style={{ padding: "56px 20px", backgroundColor: C.warmWhite }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.pink, marginBottom: 8 }}>PREGUNTAS FRECUENTES</p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.textDark, marginBottom: 24 }}>
              Lo que probablemente te estás{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>preguntando</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { q: "¿Trabajan solo con empresas grandes?", a: "No. Trabajamos con proyectos de todos los tamaños. Lo que importa es que valores el contenido como herramienta de crecimiento." },
                { q: "¿Puedo empezar solo con un servicio?", a: "Claro. Muchos clientes empiezan con branding y luego suman social media o producción audiovisual cuando están listos." },
                { q: "¿Cuánto tiempo toma ver resultados?", a: "Los primeros 30 días son de construcción. Entre el mes 2 y 3 empiezas a ver consistencia en tu presencia y los primeros leads." },
                { q: "¿Qué incluye el branding?", a: "Estrategia de marca, logo, paleta, tipografía, aplicaciones para redes y papelería, landing page y guía de marca completa." },
              ].map((faq, i) => (
                <div key={i} style={{ padding: 18, borderRadius: 14, backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 6 }}>{faq.q}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: C.textMid }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* CTA FINAL */}
        <section style={{ padding: "64px 20px", backgroundColor: C.bg, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${C.green}08 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, ${C.pink}06 0%, transparent 50%)` }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <FadeIn>
              <svg width={60} height={40} viewBox="0 0 60 60" style={{ margin: "0 auto 20px" }}>
                <circle cx="22" cy="30" r="14" fill={C.green} /><circle cx="38" cy="30" r="14" fill={C.pink} /><circle cx="30" cy="30" r="6" fill={C.bg} />
              </svg>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 8, lineHeight: 1.25 }}>
                Lo que construyes merece{" "}
                <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>brillar.</span>
              </h2>
              <p style={{ fontSize: 14, color: C.textLight, maxWidth: 360, margin: "0 auto 28px" }}>
                El primer paso es contarnos sobre lo que haces. Sin compromiso, sin presión. Solo queremos conocer tu historia.
              </p>
              <CTA text="Comencemos juntos →" dark />
              <p style={{ fontSize: 11, color: C.dim, marginTop: 12 }}>También puedes escribirnos en @lummastudio_</p>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: "28px 20px", textAlign: "center", backgroundColor: C.cream, borderTop: `1px solid ${C.border}` }}>
          <LogoFull />
          <p style={{ fontSize: 11, color: C.dim, marginTop: 10 }}>Miami, FL · sonia@lummacreative.com</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10 }}>
            {["Instagram", "WhatsApp", "Email"].map(l => (
              <span key={l} style={{ fontSize: 11, color: C.textMid, cursor: "pointer" }}>{l}</span>
            ))}
          </div>
          <p style={{ fontSize: 10, color: C.dim, marginTop: 14 }}>© 2026 Lumma Studio. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
