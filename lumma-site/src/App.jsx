import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  card: "#161616",
  warm: "#1c1a18",
  cream: "#f5f0e8",
  creamDark: "#e8e0d3",
  grayBg: "#141414",
  green: "#CCFF00",
  pink: "#E6007E",
  pinkPastel: "#FF7EB3",
  pinkSoft: "#ff5da020",
  white: "#FFFFFF",
  offWhite: "#F0EDE8",
  textLight: "#d4d0ca",
  gray: "#999999",
  dim: "#555555",
  dimmer: "#2a2a2a",
};

function LogoFull() {
  return (
    <svg width={130} height={28} viewBox="0 0 320 60">
      <circle cx="20" cy="30" r="13" fill={C.green} />
      <circle cx="42" cy="30" r="13" fill={C.pink} />
      <circle cx="31" cy="30" r="5.5" fill={C.bg} />
      <text x="72" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="42" fontWeight="700" letterSpacing="6" fill={C.white}>LUMMA</text>
    </svg>
  );
}

function DecorCircles({ style, opacity = 0.06 }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        <circle cx="35" cy="40" r="28" fill={C.green} opacity={opacity} />
        <circle cx="75" cy="40" r="28" fill={C.pink} opacity={opacity} />
        <circle cx="55" cy="40" r="12" fill={C.bg} opacity={opacity * 3} />
      </svg>
    </div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-700" style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function FormModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.75)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-y-auto" style={{ backgroundColor: C.cream, maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
        {!submitted ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>
                  Cuéntanos sobre tu{" "}
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>proyecto</span>
                </p>
                <p className="text-xs mt-1" style={{ color: "#777" }}>Te contactamos en menos de 24 horas.</p>
              </div>
              <button onClick={onClose} className="text-lg" style={{ color: "#999" }}>✕</button>
            </div>

            <div className="space-y-3">
              {[
                { label: "Nombre", placeholder: "Tu nombre", type: "text" },
                { label: "Email", placeholder: "tu@email.com", type: "email" },
                { label: "Teléfono", placeholder: "+1 (305) 000-0000", type: "tel" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-medium block mb-1" style={{ color: "#555" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: "#FFFFFF", color: "#1a1a1a", border: "1px solid #ddd" }} />
                </div>
              ))}

              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#555" }}>¿Qué servicio te interesa?</label>
                <select className="w-full px-3 py-2.5 rounded-lg text-sm outline-none appearance-none" style={{ backgroundColor: "#FFFFFF", color: "#555", border: "1px solid #ddd" }}>
                  <option>Selecciona una opción</option>
                  <option>Branding</option>
                  <option>Social Media</option>
                  <option>Producción Audiovisual</option>
                  <option>Varios servicios</option>
                  <option>No estoy seguro/a todavía</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#555" }}>Presupuesto estimado</label>
                <select className="w-full px-3 py-2.5 rounded-lg text-sm outline-none appearance-none" style={{ backgroundColor: "#FFFFFF", color: "#555", border: "1px solid #ddd" }}>
                  <option>Selecciona un rango</option>
                  <option>Menos de $1,000</option>
                  <option>$1,000 – $2,500</option>
                  <option>$2,500 – $5,000</option>
                  <option>Más de $5,000</option>
                  <option>Prefiero conversarlo</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#555" }}>¿A qué se dedica tu negocio?</label>
                <input type="text" placeholder="Ej: Restaurante, coaching, bienes raíces..." className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: "#FFFFFF", color: "#1a1a1a", border: "1px solid #ddd" }} />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#555" }}>Instagram o red social (opcional)</label>
                <input type="text" placeholder="@tunegocio" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: "#FFFFFF", color: "#1a1a1a", border: "1px solid #ddd" }} />
              </div>

              <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl text-sm font-bold mt-2 active:scale-95 transition-transform" style={{ backgroundColor: C.green, color: C.bg }}>
                Enviar solicitud →
              </button>

              <p className="text-xs text-center" style={{ color: "#999" }}>Sin compromiso. Sin spam. Solo una conversación.</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4">
              <svg width={60} height={40} viewBox="0 0 60 60" className="mx-auto">
                <circle cx="22" cy="30" r="14" fill={C.green} />
                <circle cx="38" cy="30" r="14" fill={C.pink} />
                <circle cx="30" cy="30" r="6" fill={C.cream} />
              </svg>
            </div>
            <p className="text-xl font-bold mb-2" style={{ color: "#1a1a1a" }}>¡Recibido! ✦</p>
            <p className="text-sm mb-4" style={{ color: "#555" }}>Te contactamos en menos de 24 horas para conocer más sobre lo que haces.</p>
            <p className="text-sm" style={{ color: "#333" }}>
              Mientras tanto, síguenos en{" "}
              <span style={{ color: C.pink, fontWeight: 600 }}>@lummastudio_</span>
            </p>
            <button onClick={onClose} className="mt-6 px-6 py-2 rounded-lg text-xs" style={{ backgroundColor: "#e8e0d3", color: "#555" }}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LummaLP() {
  const [formOpen, setFormOpen] = useState(false);
  const CTA = ({ text = "Quiero empezar →", secondary }) => (
    <button onClick={() => setFormOpen(true)} className="w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-95" style={{
      backgroundColor: secondary ? "transparent" : C.green,
      color: secondary ? C.green : C.bg,
      border: secondary ? `1px solid ${C.green}30` : "none",
    }}>
      {text}
    </button>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <FormModal open={formOpen} onClose={() => setFormOpen(false)} />

      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ===== NAV ===== */}
        <nav className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.dimmer}` }}>
          <LogoFull />
          <button onClick={() => setFormOpen(true)} className="text-xs font-bold px-4 py-2 rounded-full" style={{ backgroundColor: C.green, color: C.bg }}>
            Empezar
          </button>
        </nav>

        {/* ===== HERO — Dark ===== */}
        <section className="px-5 pt-16 pb-14 relative" style={{ backgroundColor: C.bg }}>
          <DecorCircles style={{ top: 20, right: -20 }} opacity={0.04} />
          <DecorCircles style={{ bottom: 40, left: -30 }} opacity={0.03} />
          <div className="relative z-10">
            <FadeIn>
              <h1 className="text-4xl font-extrabold leading-tight mb-2" style={{ color: C.white }}>
                Tu marca tiene una
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-4xl font-extrabold leading-tight mb-2">
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                  historia increíble.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <h1 className="text-4xl font-extrabold leading-tight mb-6" style={{ color: C.white }}>
                Vamos a{" "}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pinkPastel }}>
                  contarla.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-sm leading-relaxed mb-8" style={{ color: C.textLight }}>
                Contenido con intención, estrategia y estética para quienes quieren brillar. Producción audiovisual, social media y branding — todo desde Miami.
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <CTA />
            </FadeIn>
          </div>
        </section>

        {/* ===== IMAGINA ESTO — Cream ===== */}
        <section className="px-5 py-14 relative" style={{ backgroundColor: C.cream }}>
          <DecorCircles style={{ top: -10, right: 10 }} opacity={0.08} />
          <FadeIn>
            <p className="text-xs tracking-widest mb-4 font-bold" style={{ color: C.pink }}>IMAGINA ESTO ✦</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-3">
              {[
                "Tu feed se ve profesional, coherente, con personalidad desde el primer scroll.",
                "Cada pieza de contenido cuenta algo — y la gente se detiene a mirar.",
                "Tus clientes te dicen: \"te encontré en redes y supe que eras la indicada.\"",
                "No tienes que pensar qué publicar cada semana. Ya está resuelto.",
                "Tu presencia digital refleja, por fin, todo lo que estás construyendo.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                  <span className="flex-shrink-0 text-sm" style={{ color: C.pink }}>✦</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#3a3a3a" }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl font-bold mt-8 leading-snug" style={{ color: "#1a1a1a" }}>
              Eso no es un sueño.{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>
                Es un plan.
              </span>
            </p>
          </FadeIn>
        </section>

        {/* ===== QUIÉNES SOMOS — Dark warm ===== */}
        <section className="px-5 py-14 relative" style={{ backgroundColor: C.warm }}>
          <DecorCircles style={{ bottom: 10, right: -20 }} opacity={0.03} />
          <FadeIn>
            <p className="text-xs tracking-widest mb-4" style={{ color: C.pinkPastel }}>SOBRE LUMMA</p>
            <p className="text-xs tracking-widest mb-6" style={{ color: C.green }}>Estudio creativo · Miami, FL</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.textLight }}>
              Lumma nació de una convicción: todo proyecto — sin importar su tamaño — merece contenido que lo represente con orgullo.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.textLight }}>
              Con más de 10 años de experiencia en marketing, producción audiovisual y estrategia digital, hemos acompañado a empresas a encontrar su voz, contar su historia y conectar con las personas correctas.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.textLight }}>
              Cada proyecto es un trabajo en equipo. Tú traes la visión y la pasión por lo que haces. Juntos le damos forma, estética y estrategia para que el mundo lo vea como merece.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="p-5 rounded-xl" style={{ backgroundColor: C.bg, borderLeft: `3px solid ${C.green}` }}>
              <p className="text-lg font-bold leading-snug" style={{ color: C.white }}>
                La luz ya está en tu marca.
              </p>
              <p className="text-lg font-bold leading-snug" style={{ color: C.white }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                  Vamos a encenderla.
                </span>
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ===== SERVICIOS — Dark with accents ===== */}
        <section className="px-5 py-14" style={{ backgroundColor: C.grayBg }}>
          <FadeIn>
            <p className="text-xs tracking-widest mb-2 font-bold" style={{ color: C.green }}>LO QUE CONSTRUIMOS JUNTOS</p>
            <h2 className="text-2xl font-bold mb-8" style={{ color: C.white }}>
              Tres caminos para hacer{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>brillar</span>
              {" "}lo que haces
            </h2>
          </FadeIn>

          <div className="space-y-5">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: C.card, border: `1px solid ${C.green}18` }}>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${C.green}, ${C.green}50)` }} />
                <div className="p-6 pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">✦</span>
                    <p className="text-base font-bold" style={{ color: C.white }}>Branding</p>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: C.textLight }}>
                    La identidad visual y verbal que tu proyecto merece. Juntos definimos cómo se ve, cómo suena y cómo se siente para que te reconozcan y te recuerden.
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #0f0f0f 100%)`, border: `1px solid ${C.green}25` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: C.green }}>SPARK</p>
                      <p className="text-2xl font-extrabold" style={{ color: C.white }}>$699</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #120810 100%)`, border: `1px solid ${C.pinkPastel}25` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: C.pinkPastel }}>BLAZE</p>
                      <p className="text-2xl font-extrabold" style={{ color: C.white }}>$1,500</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: C.card, border: `1px solid ${C.pinkPastel}15` }}>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${C.pinkPastel}, ${C.pinkPastel}50)` }} />
                <div className="p-6 pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">📱</span>
                    <p className="text-base font-bold" style={{ color: C.white }}>Social Media</p>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: C.textLight }}>
                    Estrategia, creación y gestión de contenido para tus redes. Desde la idea hasta la publicación — video, diseño, copy y análisis. Todo para crecer con consistencia.
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #0f0f0f 100%)`, border: `1px solid ${C.green}25` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: C.green }}>SPARK</p>
                      <p className="text-2xl font-extrabold" style={{ color: C.white }}>$1,800</p>
                      <p className="text-xs" style={{ color: C.dim }}>/mes</p>
                    </div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #120810 100%)`, border: `1px solid ${C.pinkPastel}25` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: C.pinkPastel }}>BLAZE</p>
                      <p className="text-2xl font-extrabold" style={{ color: C.white }}>$2,500</p>
                      <p className="text-xs" style={{ color: C.dim }}>/mes</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: C.card, border: `1px solid ${C.dimmer}` }}>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${C.green}, ${C.pink})` }} />
                <div className="p-6 pt-5">
                  <DecorCircles style={{ top: -15, right: -15 }} opacity={0.04} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🎬</span>
                      <p className="text-base font-bold" style={{ color: C.white }}>
                        Lumma{" "}
                        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pinkPastel }}>Films</span>
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: C.textLight }}>
                      Producción audiovisual que revela la esencia de lo que haces. Brand films, content days, testimoniales cinematográficos — cada proyecto diseñado para contar tu historia como se merece.
                    </p>
                    <div className="p-4 rounded-xl text-center" style={{ background: `linear-gradient(135deg, ${C.bg} 0%, #0c0c10 100%)`, border: `1px solid ${C.dimmer}` }}>
                      <p className="text-sm" style={{ color: C.textLight }}>Cada proyecto es único</p>
                      <p className="text-sm font-bold mt-1" style={{ color: C.pinkPastel }}>Cotización personalizada →</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="mt-8">
              <CTA text="Quiero empezar →" />
            </div>
          </FadeIn>
        </section>

        {/* ===== ESTO ES PARA TI — Cream ===== */}
        <section className="px-5 py-14" style={{ backgroundColor: C.cream }}>
          <FadeIn>
            <p className="text-xs tracking-widest mb-4 font-bold" style={{ color: C.pink }}>ESTO ES PARA TI SI...</p>
            <div className="space-y-3">
              {[
                "Tienes un proyecto que ya funciona y quieres dar el siguiente paso en tu presencia digital.",
                "Sabes que lo que ofreces merece mejor contenido pero no tienes el tiempo ni el equipo para hacerlo.",
                "Buscas un equipo creativo que entienda tu visión y trabaje contigo, no solo para ti.",
                "Valoras la calidad, la estrategia y la consistencia por encima de la cantidad.",
                "Estás en Miami y buscas alguien que hable tu idioma — en todos los sentidos.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                  <span className="flex-shrink-0 text-xs font-bold" style={{ color: C.pink }}>✓</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#3a3a3a" }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ===== PROCESO — Dark ===== */}
        <section className="px-5 py-14" style={{ backgroundColor: C.bg }}>
          <FadeIn>
            <p className="text-xs tracking-widest mb-2" style={{ color: C.green }}>EL CAMINO JUNTOS</p>
            <h2 className="text-2xl font-bold mb-8" style={{ color: C.white }}>
              4 pasos para{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pinkPastel }}>encender</span>
              {" "}lo que construyes
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {[
              { num: "01", title: "Conversamos", desc: "Nos cuentas tu visión. Entendemos lo que haces, tu audiencia y tus metas.", color: C.green },
              { num: "02", title: "Diseñamos juntos", desc: "Co-creamos la estrategia y el plan de contenido alineado a tus objetivos.", color: C.pinkPastel },
              { num: "03", title: "Producimos", desc: "Cada pieza con intención, estética y calidad. Tú apruebas, nosotros ejecutamos.", color: C.green },
              { num: "04", title: "Crecemos", desc: "Medimos resultados, aprendemos y escalamos lo que funciona. Siempre juntos.", color: C.pinkPastel },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: C.card }}>
                  <span className="text-2xl font-extrabold flex-shrink-0" style={{ color: step.color }}>{step.num}</span>
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ color: C.white }}>{step.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: C.textLight }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS — Warm ===== */}
        <section className="px-5 py-14" style={{ backgroundColor: C.warm }}>
          <FadeIn>
            <p className="text-xs tracking-widest mb-6" style={{ color: C.pinkPastel }}>HISTORIAS REALES</p>
            <div className="space-y-4">
              {[
                { quote: "Lumma entendió nuestra visión desde el primer día. El contenido que creamos juntos genera resultados reales.", name: "— Social Media · Miami", border: C.green },
                { quote: "Por fin tenemos una identidad que nos representa. Cada vez que alguien ve nuestra marca, nos dicen: se ve profesional.", name: "— Branding · Doral", border: C.pinkPastel },
                { quote: "El brand film capturó exactamente lo que somos y lo que hacemos. Fue un antes y un después para nuestra comunicación.", name: "— Lumma Films · Brickell", border: C.green },
              ].map((t, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: C.card, borderLeft: `2px solid ${t.border}` }}>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: C.textLight, fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
                    "{t.quote}"
                  </p>
                  <p className="text-xs" style={{ color: C.dim }}>{t.name}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ===== FINAL CTA — Dark with gradient ===== */}
        <section className="px-5 py-16 relative" style={{ backgroundColor: C.bg }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 40% 40%, ${C.green}06 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, ${C.pink}05 0%, transparent 50%)` }} />
          <DecorCircles style={{ bottom: 20, left: "50%", transform: "translateX(-50%)" }} opacity={0.04} />
          <div className="relative z-10 text-center">
            <FadeIn>
              <svg width={60} height={40} viewBox="0 0 60 60" className="mx-auto mb-5">
                <circle cx="22" cy="30" r="14" fill={C.green} />
                <circle cx="38" cy="30" r="14" fill={C.pink} />
                <circle cx="30" cy="30" r="6" fill={C.bg} />
              </svg>
              <h2 className="text-2xl font-bold mb-2" style={{ color: C.white }}>
                Lo que construyes merece{" "}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                  brillar.
                </span>
              </h2>
              <p className="text-sm mb-6" style={{ color: C.textLight }}>
                El primer paso es contarnos sobre lo que haces. Sin compromiso, sin presión. Solo queremos conocer tu historia.
              </p>
              <CTA text="Comencemos juntos →" />
              <p className="text-xs mt-4" style={{ color: C.dim }}>
                También puedes escribirnos en @lummastudio_
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="px-5 py-8 text-center" style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.dimmer}` }}>
          <LogoFull />
          <p className="text-xs mt-3" style={{ color: C.dim }}>Miami, FL · hola@lumma.studio</p>
          <div className="flex justify-center gap-4 mt-3">
            <span className="text-xs" style={{ color: C.gray }}>Instagram</span>
            <span className="text-xs" style={{ color: C.gray }}>WhatsApp</span>
            <span className="text-xs" style={{ color: C.gray }}>Email</span>
          </div>
          <p className="text-xs mt-4" style={{ color: C.dim }}>© 2026 Lumma Studio. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
