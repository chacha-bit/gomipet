import { useState, useEffect, useRef, useCallback } from "react";
import "./gomipet.css";
import logoGomi from "../assets/logogomi.svg";
import logoFooter from "../assets/logofooter.svg";
import heroLetters from "../assets/letras.svg";
import heroMascot from "../assets/mascot.svg";
import heroBg from "../assets/fondohero.svg";
import fondoServicios from "../assets/fondo-servicios.svg";
import mascotaNosotros from "../assets/mascota-nosotros.svg";
import titleCuatro from "../assets/Cuatro ingredientes, cero relleno innecesario.svg";
import titlePorque from "../assets/Porque desparasitar no debería sentirse como un ca.svg";
import fondoProductos from "../assets/fondo-productos.svg";
import contactTitle from "../assets/¿Dudas sobre qué fórmula es para tu perro_ Escríbe.svg";
import productCachorro from "../assets/Image (Gomipet Cachorro).svg";
import productAdulto from "../assets/Image (Gomipet Adulto).svg";
import productSenior from "../assets/Image (Gomipet Senior).svg";
import pataIzq from "../assets/pata-izquierda.svg";
import pataDer from "../assets/pata-derecha.svg";
import titleProductos from "../assets/El mismo cariño. Una receta distinta para cada eda.svg";
import titleServicios from "../assets/Servicios pensados para que cuidar a tu perro sea.svg";

type ProductId = "cachorro" | "adulto" | "senior";

interface Product {
  name: string;
  range: string;
  price: number;
  dot: string;
  tag: string;
  desc: string;
}

const PRODUCTS: Record<ProductId, Product> = {
  cachorro: {
    name: "Gomipet Cachorro",
    range: "0 – 1 año",
    price: 39.9,
    dot: "#FF4E95",
    tag: "0 – 1 año",
    desc: "Crece fuerte, juega feliz. Acompaña el desarrollo y la digestión de tu cachorro desde sus primeros meses.",
  },
  adulto: {
    name: "Gomipet Adulto",
    range: "1 – 7 años",
    price: 44.9,
    dot: "#C64B80",
    tag: "1 – 7 años",
    desc: "Energía para cada aventura. Mantiene la salud digestiva e inmune durante sus años más activos.",
  },
  senior: {
    name: "Gomipet Senior",
    range: "7+ años",
    price: 49.9,
    dot: "#F09FBF",
    tag: "7+ años",
    desc: "Más años, más momentos juntos. Cuida la salud urinaria, articular y cognitiva en su etapa dorada.",
  },
};

const IMGS: Record<string, string> = {
  hero: "https://images.unsplash.com/photo-1773998752107-74166ce04aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  cachorro:
    "https://images.unsplash.com/photo-1689181736057-a9bad9d5a4f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  adulto:
    "https://images.unsplash.com/photo-1679067652135-324b9535d288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  senior:
    "https://images.unsplash.com/photo-1642303009699-7d7fd6d4a243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
};

// ── Mascot SVG ──────────────────────────────────────────────────────────────
function DogMascot({ color, size = 120 }: { color: string; size?: number }) {
  const h = Math.round(size * 1.2);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 144"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Floppy ears */}
      <path d="M26 60 Q4 22 20 8 Q32 -2 42 20 Z" fill={color} />
      <path d="M94 60 Q116 22 100 8 Q88 -2 78 20 Z" fill={color} />
      {/* Head */}
      <circle cx="60" cy="66" r="50" fill={color} />
      {/* Ear inner highlights */}
      <path d="M26 52 Q10 28 22 14 Q29 6 37 22 Z" fill="white" opacity="0.15" />
      <path d="M94 52 Q110 28 98 14 Q91 6 83 22 Z" fill="white" opacity="0.15" />
      {/* Eye whites */}
      <circle cx="43" cy="61" r="9.5" fill="white" />
      <circle cx="77" cy="61" r="9.5" fill="white" />
      {/* Pupils */}
      <circle cx="45" cy="62" r="6" fill="#1C1130" />
      <circle cx="79" cy="62" r="6" fill="#1C1130" />
      {/* Eye highlights */}
      <circle cx="47" cy="60" r="2.2" fill="white" />
      <circle cx="81" cy="60" r="2.2" fill="white" />
      {/* Muzzle */}
      <ellipse cx="60" cy="81" rx="22" ry="17" fill="white" opacity="0.18" />
      {/* Nose */}
      <ellipse cx="60" cy="75" rx="7.5" ry="5.5" fill="#1C1130" opacity="0.45" />
      <circle cx="57.5" cy="74" r="1.8" fill="white" opacity="0.35" />
      <circle cx="62.5" cy="74" r="1.8" fill="white" opacity="0.35" />
      {/* Smile */}
      <path
        d="M49 87 Q60 97 71 87"
        stroke="#1C1130"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.38"
      />
      {/* Tongue */}
      <ellipse cx="60" cy="94" rx="8" ry="6.5" fill="#FF8FAB" opacity="0.9" />
      <path d="M52 94 Q60 104 68 94" fill="#FF7097" opacity="0.5" />
      {/* Body */}
      <ellipse cx="60" cy="134" rx="37" ry="17" fill={color} />
      {/* Front paws */}
      <ellipse cx="40" cy="140" rx="13" ry="8.5" fill={color} />
      <ellipse cx="80" cy="140" rx="13" ry="8.5" fill={color} />
      {/* Paw highlights */}
      <ellipse cx="40" cy="142" rx="8" ry="4" fill="white" opacity="0.12" />
      <ellipse cx="80" cy="142" rx="8" ry="4" fill="white" opacity="0.12" />
    </svg>
  );
}

// ── Icon helpers ─────────────────────────────────────────────────────────────
function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1.2 11.5a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9L6 8z" />
      <path d="M9 8a3 3 0 1 1 6 0" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10c0-1 1-2 2-2s2 1 2 2-1 3-2 3-2-2-2-3z" />
      <path d="M16 10c0-1 1-2 2-2s2 1 2 2-1 3-2 3-2-2-2-3z" />
      <path d="M8 7c0-1.2.9-3 2-3s2 1.8 2 3-1 3.5-2 3.5S8 8.2 8 7z" />
      <path d="M14 7c0-1.2.9-3 2-3s2 1.8 2 3-1 3.5-2 3.5S14 8.2 14 7z" />
      <path d="M12 12c2.8 0 5.5 1.7 5.5 4.2 0 2-1.7 3.3-3.6 2.7-1-.3-1.3-.9-1.9-.9s-.9.6-1.9.9c-1.9.6-3.6-.7-3.6-2.7C6.5 13.7 9.2 12 12 12z" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [cart, setCart] = useState<Partial<Record<ProductId, number>>>({});
  const [pendingQty, setPendingQty] = useState<Record<ProductId, number>>({
    cachorro: 1,
    adulto: 1,
    senior: 1,
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [formDone, setFormDone] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  // Nav scroll shadow
  useEffect(() => {
    const lastY = { value: 0 };
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 8);
      const delta = y - lastY.value;
      // hide when scrolling down, show when scrolling up
      if (delta > 10 && y > 120) {
        setNavOpen((o) => o); // no-op to avoid lint
        // via state setter below (we need closure), use custom event
        // we'll use a dedicated state setter by dispatching on window
        const ev = new CustomEvent('gp:scroll:down');
        window.dispatchEvent(ev);
      } else if (delta < -10) {
        const ev = new CustomEvent('gp:scroll:up');
        window.dispatchEvent(ev);
      }
      lastY.value = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen to custom scroll direction events to toggle nav hidden
  useEffect(() => {
    const onDown = () => setNavHidden(true);
    const onUp = () => setNavHidden(false);
    window.addEventListener('gp:scroll:down', onDown as EventListener);
    window.addEventListener('gp:scroll:up', onUp as EventListener);
    return () => {
      window.removeEventListener('gp:scroll:down', onDown as EventListener);
      window.removeEventListener('gp:scroll:up', onUp as EventListener);
    };
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.classList.remove("out");
          } else {
            e.target.classList.add("out");
            e.target.classList.remove("in");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimer.current);
    setToast({ show: true, msg });
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: "" }), 3200);
  }, []);

  const totalQty = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const subtotal = (Object.keys(cart) as ProductId[]).reduce(
    (s, id) => s + (cart[id] || 0) * PRODUCTS[id].price,
    0
  );
  const cartIds = (Object.keys(cart) as ProductId[]).filter((id) => (cart[id] || 0) > 0);

  const addToCart = (id: ProductId) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + pendingQty[id] }));
    setPendingQty((q) => ({ ...q, [id]: 1 }));
    showToast(`${PRODUCTS[id].name} se agregó al carrito`);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  };

  const updateCartQty = (id: ProductId, delta: number) => {
    setCart((c) => {
      const next = (c[id] || 0) + delta;
      if (next <= 0) {
        const r = { ...c };
        delete r[id];
        return r;
      }
      return { ...c, [id]: next };
    });
  };

  const removeFromCart = (id: ProductId) => {
    setCart((c) => {
      const r = { ...c };
      delete r[id];
      return r;
    });
  };

  const closeNav = () => setNavOpen(false);

  return (
    <div className="gp-root">
      {/* ═══════════════ NAV ═══════════════ */}
      <header className={`nav${navScrolled ? " scrolled" : ""}${navHidden && !navOpen ? ' hidden' : ''}`}>
        <div className="container nav-inner">
          <a href="#inicio" className="logo" onClick={closeNav}>
            <img src={logoGomi} alt="GomiPet" className="logo-img" />
          </a>

          <nav className={`nav-links${navOpen ? " open" : ""}`}>
            {(
              [
                ["inicio", "Inicio"],
                ["nosotros", "Nosotros"],
                ["productos", "Productos"],
                ["servicios", "Servicios"],
                ["contacto", "Contáctanos"],
              ] as [string, string][]
            ).map(([id, label]) => (
              <a key={id} href={`#${id}`} className="nav-link" onClick={closeNav}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className={`icon-btn${cartBounce ? " bounce" : ""}`}
              aria-label="Abrir carrito de compras"
              onClick={() => setCartOpen(true)}
            >
              <CartIcon />
              <span className={`cart-badge${totalQty > 0 ? " show" : ""}`}>{totalQty}</span>
            </button>
            <button
              className={`nav-toggle${navOpen ? " open" : ""}`}
              aria-label="Abrir menú"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero" id="inicio" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="container hero-inner">
          <div className="hero-copy reveal in">
            <span className="eyebrow">🐾 100% natural · hecho con amor</span>
            <img
              src={heroLetters}
              alt="Gomitas que tu perro pide y tú apruebas"
              className="hero-title-img"
            />
            <p className="hero-sub">
              Gomipet combina semilla de calabaza, aceite de coco, romero y polvo de hígado en una
              gomita masticable pensada para acompañar la rutina de desparasitación de tu perro, en
              cada etapa de su vida.
            </p>
            <div className="hero-cta">
              <a href="#productos" className="btn btn-primary">
                <CartIcon size={18} /> Ver productos
              </a>
              <a href="#nosotros" className="btn btn-ghost">
                Conoce la marca
              </a>
            </div>
            <ul className="hero-trust">
              <li>Sin químicos agresivos</li>
              <li>3 fórmulas por etapa de vida</li>
              <li>Sabor que enamora</li>
            </ul>
          </div>

          <div className="hero-art">
            <img
              src={IMGS.hero}
              alt="Perro feliz con su dueño en el jardín"
              className="hero-photo"
            />
            <span className="hero-mascot">
              <img src={heroMascot} alt="Mascota Gomipet" />
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════ NOSOTROS ═══════════════ */}
      <section className="section about pattern" id="nosotros">
        <div className="container">
          <div className="about-inner">
            <div className="about-art reveal">
              <img src={mascotaNosotros} className="mascota-nosotros" alt="mascota" />
            </div>
            <div className="about-copy reveal">
              <span className="eyebrow">Nuestra historia</span>
              <img src={titlePorque} className="about-heading-img" alt="Porque desparasitar" />
              <p>
                Gomipet nació de algo que cualquier dueño reconoce: esa pelea mensual para que tu
                perro acepte la pastilla. Pensamos que el cuidado preventivo podía ser parte de su
                momento favorito del día, no una negociación.
              </p>
              <p>
                Por eso formulamos gomitas masticables con ingredientes reconocibles nada de
                relleno ni químicos agresivos y separamos la fórmula según la edad de tu perro,
                porque un cachorro y un perro senior no necesitan lo mismo.
              </p>
              <div className="value-chips">
                <span className="value-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M12 21s-7-4.4-9.5-9C.7 8 2 4 6 4c2.5 0 4 1.6 4.5 3.5C11 5.6 12.5 4 15 4c4 0 5.3 4 3.5 8C19 16.6 12 21 12 21z" />
                  </svg>
                  Ingredientes naturales
                </span>
                <span className="value-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M12 3l7 3v6c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  Sin químicos agresivos
                </span>
                <span className="value-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 13c0 2 1.8 3 4 3s4-1 4-3" />
                    <path d="M9 9h.01M15 9h.01" />
                  </svg>
                  Sabor que enamora
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="ingredients-head reveal">
            <span
              className="eyebrow"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Lo que hay dentro
            </span>
            <div className="center">
              <img src={titleCuatro} className="about-title-img" alt="Cuatro ingredientes" />
            </div>
          </div>
          <div className="ingredient-grid reveal">
            {[
              {
                cls: "ing-1",
                title: "Semilla de calabaza",
                desc: "Apoya el crecimiento y la digestión saludable.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path d="M24 6C32 14 36 22 36 28a12 12 0 0 1-24 0c0-6 4-14 12-22z" />
                    <rect x="22.6" y="14" width="2.8" height="22" fill="#fff" opacity=".55" rx="1.4" />
                  </svg>
                ),
              },
              {
                cls: "ing-2",
                title: "Aceite de coco",
                desc: "Piel sana, pelaje brillante y energía saludable.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <circle cx="24" cy="27" r="13" />
                    <circle cx="18" cy="14" r="3.2" />
                    <circle cx="30" cy="14" r="3.2" />
                  </svg>
                ),
              },
              {
                cls: "ing-3",
                title: "Romero",
                desc: "Antioxidante natural que refresca el aliento.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <rect x="22.4" y="6" width="3.2" height="34" rx="1.6" />
                    <ellipse cx="13.5" cy="14" rx="6.2" ry="3.1" transform="rotate(-25 13.5 14)" />
                    <ellipse cx="34.5" cy="14" rx="6.2" ry="3.1" transform="rotate(25 34.5 14)" />
                    <ellipse cx="12.5" cy="24" rx="6.2" ry="3.1" transform="rotate(-25 12.5 24)" />
                    <ellipse cx="35.5" cy="24" rx="6.2" ry="3.1" transform="rotate(25 35.5 24)" />
                    <ellipse cx="13.5" cy="34" rx="5.4" ry="2.7" transform="rotate(-25 13.5 34)" />
                    <ellipse cx="34.5" cy="34" rx="5.4" ry="2.7" transform="rotate(25 34.5 34)" />
                  </svg>
                ),
              },
              {
                cls: "ing-4",
                title: "Polvo de hígado",
                desc: "Proteína y sabor natural irresistible para tu perro.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <ellipse cx="24" cy="33" rx="10" ry="8" />
                    <ellipse cx="11" cy="20" rx="5" ry="6" />
                    <ellipse cx="20" cy="13" rx="5" ry="6.5" />
                    <ellipse cx="28" cy="13" rx="5" ry="6.5" />
                    <ellipse cx="37" cy="20" rx="5" ry="6" />
                  </svg>
                ),
              },
            ].map((ing) => (
              <div key={ing.cls} className={`ingredient-card ${ing.cls}`}>
                <div className="ing-icon">{ing.icon}</div>
                <h3>{ing.title}</h3>
                <p>{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCTOS ═══════════════ */}
      <section className="section products pattern" id="productos">
        <div className="container">
          <div className="section-head center reveal">
            <span
              className="eyebrow"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Una fórmula para cada etapa
            </span>
            <img src={titleProductos} className="products-heading-img" alt="El mismo cariño" />
            <p>
              Tres fórmulas pensadas junto al crecimiento de tu perro, desde su primer año hasta
              su etapa dorada.
            </p>
          </div>

          {/* Stage timeline */}
          <div className="stage-path reveal">
            {(
              [
                ["var(--teal-700)", "var(--teal-pale)", "Cachorro", "0 – 1 año"],
                ["var(--purple)", "var(--purple-pale)", "Adulto", "1 – 7 años"],
                ["var(--lavender-700)", "var(--lavender-pale)", "Senior", "7+ años"],
              ] as [string, string, string, string][]
            ).map(([c, cp, label, range], i) => (
              <div key={label} style={{ display: "contents" }}>
                <div
                  className="stage-node"
                  style={{ "--c": c, "--c-pale": cp } as React.CSSProperties}
                >
                  <span className="stage-dot" />
                  <span className="stage-label">
                    {label}
                    <small>{range}</small>
                  </span>
                </div>
                {i < 2 && <div className={`stage-line l${i + 1}`} />}
              </div>
            ))}
          </div>

          {/* Product cards */}
          <div className="product-grid">
            {(["cachorro", "adulto", "senior"] as ProductId[]).map((id) => {
              const p = PRODUCTS[id];
              const qty = pendingQty[id];
              return (
                <article key={id} className="product-card reveal" data-stage={id}>
                  <div className="product-photo">
                    <img
                      src={id === "cachorro" ? productCachorro : id === "adulto" ? productAdulto : productSenior}
                      alt={p.name}
                    />
                  </div>
                  <div className="product-body">
                    <span className="product-tag">{p.tag}</span>
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
                    <div className="product-foot">
                      <span className="price">
                        S/ {p.price.toFixed(2)}
                        <small>Caja x30 gomitas</small>
                      </span>
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          aria-label="Reducir cantidad"
                          onClick={() =>
                            setPendingQty((q) => ({ ...q, [id]: Math.max(1, q[id] - 1) }))
                          }
                        >
                          −
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          className="qty-btn"
                          aria-label="Aumentar cantidad"
                          onClick={() =>
                            setPendingQty((q) => ({ ...q, [id]: Math.min(10, q[id] + 1) }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button className="btn-add" onClick={() => addToCart(id)}>
                      <CartIcon size={16} /> Agregar al carrito
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="products-note">
            Gomipet es un complemento natural y no sustituye el tratamiento antiparasitario
            indicado por tu veterinario.
          </p>
        </div>
      </section>

      {/* ═══════════════ SERVICIOS ═══════════════ */}
      <section 
        className="section services pattern" 
        id="servicios"
        style={{ backgroundImage: `url(${fondoServicios})` }}
      >
        <div className="container">
          <div className="section-head center reveal">
            <span
              className="eyebrow"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Más que gomitas
            </span>
            <img src={titleServicios} alt="Servicios pensados para que cuidar a tu perro sea más fácil" className="services-heading-img" />
            <p>Acompañamos cada caja con soporte real, no solo con el producto.</p>
          </div>
          <div className="service-grid reveal">
            {[
              {
                title: "Asesoría gratuita",
                desc: "Escríbenos y un especialista te ayuda a elegir la fórmula correcta para tu perro.",
                color: "#FF4E95",
                icon: (
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 12h32v20H22l-8 7v-7H8z" />
                    <circle cx="18" cy="22" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="24" cy="22" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="30" cy="22" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                title: "Plan de suscripción",
                desc: "Recibe tu caja cada mes con 15% de descuento, sin permanencia obligatoria.",
                color: "#C64B80",
                icon: (
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M38 14a16 16 0 0 0-27-3" />
                    <path d="M11 6v8h8" />
                    <path d="M10 34a16 16 0 0 0 27 3" />
                    <path d="M37 42v-8h-8" />
                  </svg>
                ),
              },
              {
                title: "Envío a todo el Perú",
                desc: "24–48 horas en Lima y hasta 5 días útiles en provincias.",
                color: "#F09FBF",
                icon: (
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 16l18-9 18 9-18 9z" />
                    <path d="M6 16v18l18 9 18-9V16" />
                    <path d="M24 25v18" />
                  </svg>
                ),
              },
              {
                title: "Garantía de satisfacción",
                desc: "Si a tu perro no le gustan, te devolvemos tu dinero dentro de los primeros 15 días.",
                color: "#FF4E95",
                icon: (
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M24 6l16 6v12c0 11-7 17-16 20-9-3-16-9-16-20V12z" />
                    <path d="M17 24l6 6 9-11" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.title} className="service-card" style={{ "--service-color": s.color } as React.CSSProperties}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACTO ═══════════════ */}
      <section className="section contact" id="contacto">
        <div className="container contact-inner">
          <div className="contact-copy reveal">
            <span className="eyebrow">Hablemos</span>
            <img src={contactTitle} alt="¿Dudas sobre qué fórmula es para tu perro? Escríbenos" className="contact-title-img" />
            <p>
              Cuéntanos la edad, tamaño y necesidades de tu perro y te ayudamos a elegir la
              gomita correcta.
            </p>
            <a
              href="https://wa.me/51915192583"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ marginBottom: 24 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
            <ul className="contact-info">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                Lima, Perú
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                gomipet@gmail.com
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
                Lun – Sáb, 9am a 7pm
              </li>
            </ul>
            <div className="socials">
              {[
                {
                  label: "Instagram",
                  url: "https://www.instagram.com/gomi.petpe/",
                  icon: (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.2" cy="6.8" r="1" />
                    </>
                  ),
                },
                {
                  label: "Facebook",
                  url: "https://www.facebook.com/people/GomiPet-Per%C3%BA/61590904557488/",
                  icon: (
                    <path d="M14 8.5h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6H14v-6h2.3l.4-3H14V9c0-.3.2-.5.5-.5z" />
                  ),
                },
                {
                  label: "TikTok",
                  url: "https://www.tiktok.com/@gomipet.per",
                  icon: (
                    <>
                      <path d="M10 4v11.5a2.8 2.8 0 1 1-2-2.7" />
                      <path d="M10 4c.3 2.5 2 4.2 4.5 4.5" />
                    </>
                  ),
                },
              ].map(({ label, icon, url }) => (
                <a key={label} href={url} className={`social-link ${label === 'TikTok' ? 'tiktok' : ''}`} aria-label={label} target="_blank" rel="noopener noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="19"
                    height="19"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <form
            className="contact-form reveal"
            onSubmit={(e) => {
              e.preventDefault();
              setFormDone(true);
            }}
          >
            {!formDone ? (
              <>
                {[
                  { id: "nombre", label: "Nombre", type: "text", placeholder: "¿Cómo te llamas?" },
                  { id: "correo", label: "Correo", type: "email", placeholder: "tu@correo.com" },
                ].map((f) => (
                  <div key={f.id} className="form-row">
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      type={f.type}
                      id={f.id}
                      name={f.id}
                      placeholder={f.placeholder}
                      required
                    />
                  </div>
                ))}
                <div className="form-row">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Cuéntanos sobre tu perro..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Enviar mensaje
                </button>
              </>
            ) : (
              <div className="form-success">
                <CheckCircleIcon />
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por escribirnos. Te responderemos muy pronto.</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src={logoFooter} alt="Gomipet" className="logo-footer-img" />
            <p>
              Gomitas naturales formuladas por etapa de vida, para que cuidar a tu perro sea parte
              de su momento favorito del día.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                {[
                  ["nosotros", "Nosotros"],
                  ["productos", "Productos"],
                  ["servicios", "Servicios"],
                  ["contacto", "Contáctanos"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Productos</h4>
              <ul>
                {["Gomipet Cachorro", "Gomipet Adulto", "Gomipet Senior"].map((name) => (
                  <li key={name}>
                    <a href="#productos">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 Gomipet. Todos los derechos reservados.</p>
          <p className="disclaimer">
            Gomipet es un complemento natural y no sustituye el tratamiento antiparasitario
            indicado por tu veterinario.
          </p>
        </div>
      </footer>

      {/* ═══════════════ CART DRAWER ═══════════════ */}
      <div
        className={`cart-overlay${cartOpen ? " open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`cart-drawer${cartOpen ? " open" : ""}`} aria-label="Carrito de compras">
        <div className="cart-head">
          <h3>Tu carrito</h3>
          <button
            className="cart-close"
            aria-label="Cerrar carrito"
            onClick={() => setCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-items">
          {cartIds.length === 0 ? (
            <div className="cart-empty">
              <CartIcon size={48} />
              <p>
                Tu carrito está vacío.
                <br />
                Elige la fórmula ideal para tu perro.
              </p>
            </div>
          ) : (
            cartIds.map((id) => {
              const p = PRODUCTS[id];
              const qty = cart[id] || 0;
              return (
                <div key={id} className="cart-item">
                  <span className="cart-item-dot" style={{ background: p.dot }} />
                  <div className="cart-item-info">
                    <h4>{p.name}</h4>
                    <span className="range">
                      {p.range} · S/ {p.price.toFixed(2)} c/u
                    </span>
                    <div className="cart-item-row">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          aria-label="Reducir"
                          onClick={() => updateCartQty(id, -1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          className="qty-btn"
                          aria-label="Aumentar"
                          onClick={() => updateCartQty(id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <strong>S/ {(p.price * qty).toFixed(2)}</strong>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              if (cartIds.length === 0) {
                showToast("Agrega al menos un producto para continuar");
              } else {
                showToast(
                  "Vista demo: conecta una pasarela de pago para procesar compras reales"
                );
              }
            }}
          >
            Proceder al pago
          </button>
          <p className="cart-note">El envío se calcula en el siguiente paso.</p>
        </div>
      </aside>

      {/* ═══════════════ TOAST ═══════════════ */}
      <div className={`toast${toast.show ? " show" : ""}`} role="status" aria-live="polite">
        <CheckCircleIcon />
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}
