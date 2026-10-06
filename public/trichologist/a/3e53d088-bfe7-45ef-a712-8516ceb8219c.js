/* @ds-bundle: {"format":4,"namespace":"NinaRossHairTherapy_8ca16b","components":[{"name":"BadgeMark","sourcePath":"components/brand/BadgeMark.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"FeatureCard","sourcePath":"components/cards/FeatureCard.jsx"},{"name":"QuoteCard","sourcePath":"components/cards/QuoteCard.jsx"},{"name":"ResultCard","sourcePath":"components/cards/ResultCard.jsx"},{"name":"StatBlock","sourcePath":"components/cards/StatBlock.jsx"},{"name":"TrustBadge","sourcePath":"components/cards/TrustBadge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"}],"sourceHashes":{"components/brand/BadgeMark.jsx":"f228e97e4ad4","components/brand/Logo.jsx":"3ac28d8e1952","components/cards/FeatureCard.jsx":"1db0a1b94f72","components/cards/QuoteCard.jsx":"4206bc2e8c63","components/cards/ResultCard.jsx":"12584f9f73db","components/cards/StatBlock.jsx":"23652a0943f8","components/cards/TrustBadge.jsx":"990d13f5fa31","components/core/Button.jsx":"d5bf746f3ec5","components/core/Eyebrow.jsx":"6273b4f115d2","components/core/TextLink.jsx":"fa2c42cc03f2","components/feedback/Accordion.jsx":"3060080a4492","components/forms/Input.jsx":"725e5c6fadfe","components/icons/Icon.jsx":"03ad2929f9c1","ui_kits/website/Header.jsx":"1c12ac93b958","ui_kits/website/SectionsPlan.jsx":"d0aa1e8fb8e7","ui_kits/website/SectionsProof.jsx":"4f4a5eca4327","ui_kits/website/SectionsTrust.jsx":"45bbd8d1c28c","ui_kits/website/data.jsx":"7baaf8a5421a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NinaRossHairTherapy_8ca16b = window.NinaRossHairTherapy_8ca16b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BadgeMark.jsx
try { (() => {
function BadgeMark({
  variant = "badge",
  size = 132,
  className = "",
  style
}) {
  const mono = variant === "monogram";
  return /*#__PURE__*/React.createElement("span", {
    className: `nr-badge ${mono ? "nr-badge--plain" : ""} ${className}`,
    style: {
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-badge__monogram",
    style: {
      fontSize: Math.round(size * 0.27)
    }
  }, "NR"), !mono && /*#__PURE__*/React.createElement("small", {
    className: "nr-badge__text",
    style: {
      fontSize: Math.max(6, Math.round(size * 0.053))
    }
  }, "STRONGER HAIR.", /*#__PURE__*/React.createElement("br", null), "STRONGER YOU."));
}
Object.assign(__ds_scope, { BadgeMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BadgeMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function Logo({
  light = false,
  size = 23,
  sub = "HAIR THERAPY",
  className = ""
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `nr-logo ${light ? "nr-logo--light" : ""} ${className}`,
    style: {
      fontSize: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-logo__main"
  }, "NINA ROSS"), /*#__PURE__*/React.createElement("span", {
    className: "nr-logo__sub"
  }, /*#__PURE__*/React.createElement("i", null), sub, /*#__PURE__*/React.createElement("i", null)));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureCard.jsx
try { (() => {
function FeatureCard({
  image,
  imageAlt = "",
  icon,
  title,
  text,
  linkLabel,
  href = "#",
  gold = false,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: `nr-feature-card ${icon && !image ? "nr-feature-card--icon" : ""} ${className}`,
    style: style
  }, image ? /*#__PURE__*/React.createElement("div", {
    className: "nr-feature-card__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt
  })) : icon ? /*#__PURE__*/React.createElement("div", {
    className: "nr-feature-card__icon"
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    className: "nr-feature-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "nr-feature-card__title"
  }, title), text && /*#__PURE__*/React.createElement("p", {
    className: "nr-feature-card__text"
  }, text), linkLabel && /*#__PURE__*/React.createElement("a", {
    className: `nr-text-link ${gold ? "nr-text-link--gold" : ""}`,
    href: href
  }, linkLabel, " \u2192")));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/QuoteCard.jsx
try { (() => {
function QuoteCard({
  quote,
  tone = "bone",
  showBrand = true,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    className: `nr-quote-card nr-quote-card--${tone} ${className}`,
    style: {
      margin: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    className: "nr-quote-card__text",
    style: {
      margin: 0
    }
  }, quote), showBrand && /*#__PURE__*/React.createElement("figcaption", {
    className: "nr-quote-card__brand"
  }, "NINA ROSS", /*#__PURE__*/React.createElement("small", null, "\u2014 HAIR THERAPY \u2014")));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ResultCard.jsx
try { (() => {
function ResultCard({
  story,
  featured = false,
  className = "",
  style
}) {
  const f = featured || story.featured;
  return /*#__PURE__*/React.createElement("article", {
    className: `nr-result-card ${f ? "nr-result-card--featured" : ""} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-result-images"
  }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
    src: story.before,
    alt: `Before treatment view for ${story.condition}`
  }), /*#__PURE__*/React.createElement("figcaption", null, "BEFORE")), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
    src: story.after,
    alt: `After treatment view for ${story.condition}`
  }), /*#__PURE__*/React.createElement("figcaption", null, "AFTER"))), /*#__PURE__*/React.createElement("div", {
    className: "nr-result-copy"
  }, story.eyebrow && /*#__PURE__*/React.createElement("p", {
    className: "nr-result-eyebrow"
  }, story.eyebrow), /*#__PURE__*/React.createElement("h3", null, story.condition), story.timeframe && /*#__PURE__*/React.createElement("p", {
    className: "nr-result-time"
  }, story.timeframe), story.note && /*#__PURE__*/React.createElement("p", {
    className: "nr-result-note"
  }, story.note), story.quote ? /*#__PURE__*/React.createElement("blockquote", null, "\u201C", story.quote, "\u201D") : null));
}
Object.assign(__ds_scope, { ResultCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ResultCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatBlock.jsx
try { (() => {
function StatBlock({
  value,
  label,
  caption,
  light = false,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `nr-stat ${light ? "nr-stat--light" : ""} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-stat__value"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "nr-stat__label"
  }, label), caption && /*#__PURE__*/React.createElement("span", {
    className: "nr-stat__caption"
  }, caption));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/cards/TrustBadge.jsx
try { (() => {
function TrustBadge({
  icon,
  label,
  tone = "dark",
  className = "",
  style
}) {
  const mod = tone === "light" ? "nr-trust--light" : tone === "gold" ? "nr-trust--gold" : "";
  return /*#__PURE__*/React.createElement("div", {
    className: `nr-trust ${mod} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-trust__ring"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "nr-trust__label"
  }, label));
}
Object.assign(__ds_scope, { TrustBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TrustBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  href = "#",
  variant = "gold",
  arrow = true,
  disabled = false,
  onClick,
  className = "",
  style
}) {
  const cls = `nr-btn nr-btn--${variant} ${disabled ? "is-disabled" : ""} ${className}`;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, children), arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"));
  if (href === null) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: cls,
      style: style,
      onClick: onClick,
      disabled: disabled
    }, inner);
  }
  return /*#__PURE__*/React.createElement("a", {
    className: cls,
    style: style,
    href: disabled ? undefined : href,
    onClick: onClick,
    "aria-disabled": disabled || undefined
  }, inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  gold = false,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: `nr-eyebrow ${gold ? "nr-gold" : ""} ${className}`,
    style: style
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
function TextLink({
  children,
  href = "#",
  gold = false,
  arrow = true,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: `nr-text-link ${gold ? "nr-text-link--gold" : ""} ${className}`,
    href: href,
    style: style
  }, children, arrow ? " →" : "");
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  items,
  defaultOpen = 0,
  light = false,
  className = "",
  style
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: `nr-faq-list ${light ? "nr-faq-list--light" : ""} ${className}`,
    style: style
  }, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: item.q,
    className: `nr-faq-item ${open === i ? "is-open" : ""}`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(open === i ? -1 : i),
    "aria-expanded": open === i
  }, /*#__PURE__*/React.createElement("span", null, item.q), /*#__PURE__*/React.createElement("span", {
    className: "nr-faq-plus",
    "aria-hidden": "true"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "nr-faq-answer",
    "aria-hidden": open !== i
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, item.a))))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  error,
  filled = false,
  multiline = false,
  className = "",
  style,
  ...rest
}) {
  const cls = `nr-input ${filled ? "is-filled" : ""} ${error ? "is-error" : ""}`;
  return /*#__PURE__*/React.createElement("label", {
    className: `nr-field ${className}`,
    style: style
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "nr-field__label"
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    className: cls,
    rows: 4
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    className: cls
  }, rest)), typeof error === "string" && error ? /*#__PURE__*/React.createElement("span", {
    className: "nr-field__error"
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
const PATHS = {
  spark: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 14l.8 2.8L22 18l-2.2 1.2L19 22l-.8-2.8L16 18l2.2-1.2L19 14Z"
  })),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.6 5.6 0 0 0-7.9 0L12 5.5l-.9-.9a5.6 5.6 0 0 0-7.9 7.9l.9.9L12 21l7.9-7.6.9-.9a5.6 5.6 0 0 0 0-7.9Z"
  }),
  drop: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2s6 6.7 6 12a6 6 0 1 1-12 0C6 8.7 12 2 12 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.3 14.4a2.8 2.8 0 0 0 2.7 2.3"
  })),
  light: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9 18h6M10 22h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A6 6 0 1 1 15.5 5a6 6 0 0 1 0 9.5c-.8.6-1.5 1.6-1.5 2.5h-4c0-.9-.7-1.9-1.5-2.5Z"
  })),
  scalp: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 13c0-6 4-10 8-10s8 4 8 10c0 4-2 7-5 8v-4H9v4c-3-1-5-4-5-8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9c.8-1.2 1.8-2 3-2s2.2.8 3 2"
  })),
  flask: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9 2h6M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15h8"
  })),
  scope: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "10",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 14 5 5M8 10h6M11 7v6"
  })),
  chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 20V10M10 20V4M16 20v-7M22 20V7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 20h22"
  })),
  crown: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 8l4 4 5-8 5 8 4-4-2 11H5L3 8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 22h12"
  }))
};
function Icon({
  type = "spark",
  size,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: `nr-icon ${className}`,
    style: size ? {
      width: size,
      height: size,
      ...style
    } : style,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.55",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, PATHS[type] || PATHS.spark);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
const {
  Logo,
  Button,
  Icon,
  BadgeMark
} = window.NinaRossHairTherapy_8ca16b;
function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "nr-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-topbar"
  }, "THE AUTHORITY ON TEXTURED HAIR RESTORATION."), /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-nav-wrap"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "nr-logo-link",
    "aria-label": "Nina Ross Hair Therapy home"
  }, /*#__PURE__*/React.createElement(Logo, {
    light: true
  })), /*#__PURE__*/React.createElement("nav", {
    className: `nr-main-nav ${mobileOpen ? "is-open" : ""}`,
    "aria-label": "Primary navigation"
  }, NAV.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href,
    onClick: () => setMobileOpen(false)
  }, item.label))), /*#__PURE__*/React.createElement("div", {
    className: "nr-nav-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#book"
  }, "Book My $99 Hair & Body Discovery"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nr-menu-btn",
    onClick: () => setMobileOpen(v => !v),
    "aria-label": "Toggle navigation",
    "aria-expanded": mobileOpen
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__texture",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-hero__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__copy"
  }, /*#__PURE__*/React.createElement("p", {
    className: "nr-eyebrow nr-gold"
  }, "WHOLE-BODY HAIR RESTORATION \u2022 ATLANTA"), /*#__PURE__*/React.createElement("h1", null, "HAIR LOSS IS A", /*#__PURE__*/React.createElement("br", null), "HEALTH ISSUE.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "WE TREAT IT THAT WAY.")), /*#__PURE__*/React.createElement("p", {
    className: "nr-hero__lead"
  }, "Textured hair restoration that looks beyond the surface."), /*#__PURE__*/React.createElement("p", {
    className: "nr-hero__body"
  }, "Nina Ross Hair Therapy combines targeted scalp treatments with a whole-body approach, including lab-guided support, IV Therapy and Red Light Therapy when appropriate."), /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__buttons"
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#book"
  }, "Book My $99 Hair & Body Discovery"), /*#__PURE__*/React.createElement(Button, {
    href: "#results",
    variant: "outlineLight"
  }, "See Real Client Results")), /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__authority"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-authority-mark"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "crown"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "LED BY DR. NINA ROSS"), /*#__PURE__*/React.createElement("span", null, "Double Board Certified Trichologist \u2022 Textured Hair Specialist")))), /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__visual"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + "hero-portrait.png",
    alt: "Dr. Nina Ross at Nina Ross Hair Therapy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__badge-pos"
  }, /*#__PURE__*/React.createElement(BadgeMark, {
    size: 132
  })), /*#__PURE__*/React.createElement("div", {
    className: "nr-hero__statement"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-hero__statement-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "scalp",
    size: 38
  })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "WE TREAT THE WHY,"), /*#__PURE__*/React.createElement("br", null), "not just the symptoms.")))));
}
Object.assign(window, {
  Header,
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsPlan.jsx
try { (() => {
const {
  Eyebrow: Eyebrow2,
  TextLink: TextLink2,
  Button: Button2,
  Icon: Icon2
} = window.NinaRossHairTherapy_8ca16b;
const MODALITIES = [{
  tone: "black",
  img: IMG + "treatment-hands.png",
  alt: "Targeted scalp treatment at Nina Ross Hair Therapy",
  num: "01",
  icon: "scalp",
  kicker: "TARGET THE SCALP",
  title: "TOPICAL + IN-CLINIC TREATMENTS",
  text: "Targeted topical care, growth factors, microneedling and other therapies can be selected based on the scalp condition and goals."
}, {
  tone: "wine",
  img: IMG + "botanicals.png",
  alt: "IV Therapy and lab-guided support at Nina Ross Hair Therapy",
  num: "02",
  icon: "drop",
  kicker: "SUPPORT THE BODY",
  title: "IV THERAPY + LAB-GUIDED SUPPORT",
  text: "When appropriate, IV Therapy and nutrient support can be integrated into a broader plan informed by the client's evaluation and health context."
}, {
  tone: "olive",
  img: IMG + "clinic-interior.png",
  alt: "Red Light Therapy at Nina Ross Hair Therapy",
  num: "03",
  icon: "light",
  kicker: "SUPPORT THE FOLLICLE ENVIRONMENT",
  title: "RED LIGHT + INFRARED THERAPY",
  text: "Red Light and infrared therapies can be used as part of a larger plan designed to support the scalp environment and circulation."
}];
function ModalitiesSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-modalities"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-section-head nr-section-head--center"
  }, /*#__PURE__*/React.createElement(Eyebrow2, null, "ONE PLAN. MULTIPLE ANGLES."), /*#__PURE__*/React.createElement("h2", null, "OUTSIDE.", /*#__PURE__*/React.createElement("br", null), "INSIDE.", /*#__PURE__*/React.createElement("br", null), "WORKING TOGETHER."), /*#__PURE__*/React.createElement("p", null, "Three parts of the Nina Ross treatment philosophy, used only when they fit the individual client.")), /*#__PURE__*/React.createElement("div", {
    className: "nr-modality-grid"
  }, MODALITIES.map(m => /*#__PURE__*/React.createElement("article", {
    key: m.num,
    className: `nr-modality-card nr-modality-card--${m.tone}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-modality-card__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: m.img,
    alt: m.alt,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nr-modality-card__body"
  }, /*#__PURE__*/React.createElement("span", null, m.num), /*#__PURE__*/React.createElement(Icon2, {
    type: m.icon
  }), /*#__PURE__*/React.createElement("p", {
    className: "nr-card-kicker"
  }, m.kicker), /*#__PURE__*/React.createElement("h3", null, m.title), /*#__PURE__*/React.createElement("p", null, m.text))))), /*#__PURE__*/React.createElement("div", {
    className: "nr-modalities__note"
  }, /*#__PURE__*/React.createElement("strong", null, "THE DIFFERENCE IS THE PLAN."), /*#__PURE__*/React.createElement("p", null, "These are not three disconnected services. They are tools that may work together inside one personalized hair-restoration strategy."))));
}
function ProgramSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-program",
    id: "program"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-program__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-program__visual"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + "consult.png",
    alt: "Comprehensive scalp analysis at Nina Ross Hair Therapy",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nr-program__scope"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + "treatment-scalp.png",
    alt: "Magnified scalp view",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "nr-program__copy"
  }, /*#__PURE__*/React.createElement(Eyebrow2, null, "THE RESTORATIVE THERAPY PROGRAM"), /*#__PURE__*/React.createElement("h2", null, "WE CAN'T FIX WHAT", /*#__PURE__*/React.createElement("br", null), "WE DON'T FULLY UNDERSTAND."), /*#__PURE__*/React.createElement("p", {
    className: "nr-program__lead"
  }, "Your journey starts with a comprehensive scalp and hair evaluation, then expands into a plan built around what we actually find."), /*#__PURE__*/React.createElement("div", {
    className: "nr-program-phases"
  }, PROGRAM_PHASES.map(phase => /*#__PURE__*/React.createElement("article", {
    key: phase.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-program-phases__icon"
  }, /*#__PURE__*/React.createElement(Icon2, {
    type: phase.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, phase.title), /*#__PURE__*/React.createElement("p", null, phase.text))))), /*#__PURE__*/React.createElement("div", {
    className: "nr-program__actions"
  }, /*#__PURE__*/React.createElement(Button2, {
    href: "#book"
  }, "See If You're A Candidate"), /*#__PURE__*/React.createElement(TextLink2, {
    href: "/services"
  }, "See everything included")))));
}
function ConditionsSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-conditions",
    id: "conditions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-section-head nr-section-head--split"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow2, {
    gold: true
  }, "TEXTURED HAIR EXPERTISE"), /*#__PURE__*/React.createElement("h2", null, "WHEN THE CONDITION IS COMPLEX,", /*#__PURE__*/React.createElement("br", null), "EXPERIENCE MATTERS.")), /*#__PURE__*/React.createElement("p", null, "We focus on textured-hair and scalp concerns, including inflammatory and scarring forms of hair loss where early recognition and a thoughtful plan matter.")), /*#__PURE__*/React.createElement("div", {
    className: "nr-condition-grid"
  }, CONDITIONS.map((condition, index) => /*#__PURE__*/React.createElement("a", {
    key: condition.label,
    href: condition.href
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-condition-grid__number"
  }, String(index + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, condition.label), /*#__PURE__*/React.createElement("small", null, condition.detail)), /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true"
  }, "\u2192"))))));
}
Object.assign(window, {
  ModalitiesSection,
  ProgramSection,
  ConditionsSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsPlan.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsProof.jsx
try { (() => {
const {
  Eyebrow,
  TextLink,
  ResultCard,
  Icon
} = window.NinaRossHairTherapy_8ca16b;
function ResultsSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-results",
    id: "results"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-section-head nr-section-head--split"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "REAL PEOPLE. REAL RESULTS."), /*#__PURE__*/React.createElement("h2", null, "PROOF BEFORE", /*#__PURE__*/React.createElement("br", null), "PROMISES.")), /*#__PURE__*/React.createElement("div", {
    className: "nr-section-head__copy"
  }, /*#__PURE__*/React.createElement("p", null, "We document progress over time so clients can see what is changing in density, scalp health and overall hair quality."), /*#__PURE__*/React.createElement(TextLink, {
    href: "/results"
  }, "View more client results"))), /*#__PURE__*/React.createElement("div", {
    className: "nr-results-layout"
  }, /*#__PURE__*/React.createElement(ResultCard, {
    story: RESULT_STORIES[0]
  }), /*#__PURE__*/React.createElement("div", {
    className: "nr-results-stack"
  }, /*#__PURE__*/React.createElement(ResultCard, {
    story: RESULT_STORIES[1]
  }), /*#__PURE__*/React.createElement(ResultCard, {
    story: RESULT_STORIES[2]
  }))), /*#__PURE__*/React.createElement("p", {
    className: "nr-disclaimer"
  }, "Individual results vary. Replace all placeholder result copy, images and timelines with verified client information and your approved disclosures.")));
}
function EmotionalBridge() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-emotional-bridge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-emotional-bridge__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    gold: true
  }, "LISTEN TO WHAT YOUR HAIR IS TELLING YOU."), /*#__PURE__*/React.createElement("h2", null, "YOUR HAIR IS PART OF YOUR HEALTH."), /*#__PURE__*/React.createElement("p", null, "Shedding. Burning. Itching. A widening part. Crown thinning. Edges disappearing. Sometimes the scalp is one of the places your body shows that something needs attention.")));
}
function HealthSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-health",
    id: "approach"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-health__intro"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    gold: true
  }, "THE NINA ROSS APPROACH"), /*#__PURE__*/React.createElement("h2", null, "WE DON'T CHOOSE BETWEEN", /*#__PURE__*/React.createElement("br", null), "THE SCALP AND THE BODY.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "nr-health__lead"
  }, "Hair loss can have more than one contributor. That is why our approach works from multiple angles."), /*#__PURE__*/React.createElement("p", null, "We evaluate what is happening at the scalp, investigate health factors when appropriate, and build a plan that may combine in-clinic scalp care, internal support and technologies such as Red Light Therapy."))), /*#__PURE__*/React.createElement("div", {
    className: "nr-approach-grid"
  }, APPROACH_STEPS.map(step => /*#__PURE__*/React.createElement("article", {
    key: step.number,
    className: "nr-approach-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nr-approach-card__number"
  }, step.number), /*#__PURE__*/React.createElement("div", {
    className: "nr-approach-card__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: step.icon
  })), /*#__PURE__*/React.createElement("h3", null, step.title), /*#__PURE__*/React.createElement("p", null, step.text)))), /*#__PURE__*/React.createElement("div", {
    className: "nr-health__bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-health__bottom-mark"
  }, "NR"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "ONE BODY. ONE HAIR HEALTH PLAN."), /*#__PURE__*/React.createElement("p", null, "Not every client needs every therapy. That is the point. Your evaluation determines your plan.")))));
}
Object.assign(window, {
  ResultsSection,
  EmotionalBridge,
  HealthSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsProof.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsTrust.jsx
try { (() => {
const {
  Eyebrow: Eyebrow3,
  Button: Button3,
  Icon: Icon3,
  Logo: Logo3,
  Accordion: Accordion3
} = window.NinaRossHairTherapy_8ca16b;
function AuthoritySection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-authority",
    id: "dr-nina"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-authority__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-authority__copy"
  }, /*#__PURE__*/React.createElement(Eyebrow3, null, "EXPERT-LED CARE"), /*#__PURE__*/React.createElement("h2", null, "THE EXPERTISE", /*#__PURE__*/React.createElement("br", null), "YOUR HAIR DESERVES."), /*#__PURE__*/React.createElement("p", null, "Led by Dr. Nina Ross, Nina Ross Hair Therapy combines trichology, whole-body health thinking and a deep understanding of textured hair. The goal is not a one-size-fits-all routine. It is a care plan grounded in your scalp, your health history and your goals."), /*#__PURE__*/React.createElement("div", {
    className: "nr-credentials"
  }, /*#__PURE__*/React.createElement("span", null, "DOUBLE BOARD CERTIFIED", /*#__PURE__*/React.createElement("br", null), "TRICHOLOGIST"), /*#__PURE__*/React.createElement("span", null, "HOLISTIC HEALTH", /*#__PURE__*/React.createElement("br", null), "PRACTITIONER"), /*#__PURE__*/React.createElement("span", null, "MASTER", /*#__PURE__*/React.createElement("br", null), "COSMETOLOGIST")), /*#__PURE__*/React.createElement(Button3, {
    href: "/about",
    variant: "dark"
  }, "Meet Dr. Nina")), /*#__PURE__*/React.createElement("div", {
    className: "nr-authority__image"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + "hero-portrait.png",
    alt: "Dr. Nina Ross",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nr-authority__tag"
  }, "SCIENCE.", /*#__PURE__*/React.createElement("br", null), "EXPERTISE.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "EMPOWERMENT.")))));
}
function JourneySection() {
  const steps = [["01", "scope", "Evaluate", "Scalp imaging, hair-loss pattern review, shedding history and relevant health context."], ["02", "flask", "Investigate", "Deeper assessment and functional labs when internal contributors need to be explored."], ["03", "spark", "Treat", "A personalized combination of scalp treatment, whole-body support and home care."], ["04", "chart", "Track", "Photos, metrics and plan adjustments so progress can be seen and measured over time."]];
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-journey"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-section-head nr-section-head--center"
  }, /*#__PURE__*/React.createElement(Eyebrow3, null, "YOUR JOURNEY"), /*#__PURE__*/React.createElement("h2", null, "ANSWERS FIRST.", /*#__PURE__*/React.createElement("br", null), "THEN A PLAN.")), /*#__PURE__*/React.createElement("div", {
    className: "nr-journey-grid"
  }, steps.map(([number, icon, title, text]) => /*#__PURE__*/React.createElement("article", {
    key: number
  }, /*#__PURE__*/React.createElement("span", null, number), /*#__PURE__*/React.createElement(Icon3, {
    type: icon
  }), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, text))))));
}
function FaqSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-faq",
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-faq__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-faq__intro"
  }, /*#__PURE__*/React.createElement(Eyebrow3, {
    gold: true
  }, "QUESTIONS, ANSWERED."), /*#__PURE__*/React.createElement("h2", null, "YOU DESERVE CLARITY", /*#__PURE__*/React.createElement("br", null), "BEFORE YOU COMMIT."), /*#__PURE__*/React.createElement("p", null, "Hair loss is personal. Your care should feel clear, respectful and grounded in what we can actually learn about your scalp and your health.")), /*#__PURE__*/React.createElement(Accordion3, {
    items: FAQS,
    defaultOpen: 0
  })));
}
function FinalCtaSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "nr-final-cta",
    id: "book"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-final-cta__inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow3, {
    gold: true
  }, "READY FOR REAL ANSWERS?"), /*#__PURE__*/React.createElement("h2", null, "START WITH YOUR SCALP.", /*#__PURE__*/React.createElement("br", null), "LOOK AT THE WHOLE BODY."), /*#__PURE__*/React.createElement("p", null, "Book your evaluation and let us build a clearer picture of what may be contributing to your hair loss and what your next step should be.")), /*#__PURE__*/React.createElement("div", {
    className: "nr-final-cta__action"
  }, /*#__PURE__*/React.createElement(Button3, {
    href: "/book"
  }, "Book Your Evaluation"), /*#__PURE__*/React.createElement("small", null, "Atlanta, Georgia"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "nr-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-footer__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo3, {
    light: true
  }), /*#__PURE__*/React.createElement("p", null, "Whole-body care for lasting hair restoration.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "EXPLORE"), /*#__PURE__*/React.createElement("a", {
    href: "/services"
  }, "Services"), /*#__PURE__*/React.createElement("a", {
    href: "#conditions"
  }, "Conditions"), /*#__PURE__*/React.createElement("a", {
    href: "/results"
  }, "Results"), /*#__PURE__*/React.createElement("a", {
    href: "/blog"
  }, "Education")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "ABOUT"), /*#__PURE__*/React.createElement("a", {
    href: "/about"
  }, "Dr. Nina Ross"), /*#__PURE__*/React.createElement("a", {
    href: "/about"
  }, "About Us"), /*#__PURE__*/React.createElement("a", {
    href: "/contact"
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#book"
  }, "Book My $99 Hair & Body Discovery")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "FOLLOW"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "YouTube"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Facebook"))), /*#__PURE__*/React.createElement("div", {
    className: "nr-container nr-footer__bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Nina Ross Hair Therapy"), /*#__PURE__*/React.createElement("span", null, "Stronger Hair. Stronger You.")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "nr-site",
    id: "top"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(ResultsSection, null), /*#__PURE__*/React.createElement(EmotionalBridge, null), /*#__PURE__*/React.createElement(HealthSection, null), /*#__PURE__*/React.createElement(ModalitiesSection, null), /*#__PURE__*/React.createElement(ProgramSection, null), /*#__PURE__*/React.createElement(ConditionsSection, null), /*#__PURE__*/React.createElement(AuthoritySection, null), /*#__PURE__*/React.createElement(JourneySection, null), /*#__PURE__*/React.createElement(FaqSection, null), /*#__PURE__*/React.createElement(FinalCtaSection, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("a", {
    className: "nr-mobile-cta",
    href: "#book"
  }, /*#__PURE__*/React.createElement("span", null, "BOOK MY $99 HAIR & BODY DISCOVERY"), /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true"
  }, "\u2192")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsTrust.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.jsx
try { (() => {
const IMG = "../../assets/photos/";
const NAV = [{
  label: "Services",
  href: "/services"
}, {
  label: "Conditions",
  href: "#conditions"
}, {
  label: "About",
  href: "/about"
}, {
  label: "Results",
  href: "/results"
}, {
  label: "Blog",
  href: "/blog"
}];
const RESULT_STORIES = [{
  id: "featured",
  eyebrow: "FEATURED CLIENT JOURNEY",
  condition: "CCCA / Crown Thinning",
  timeframe: "Replace with verified timeline",
  note: "Replace with a concise, factual result summary.",
  before: IMG + "ba-featured-before.png",
  after: IMG + "ba-featured-after.png",
  quote: "Replace with an approved client quote.",
  featured: true
}, {
  id: "edges",
  eyebrow: "CLIENT PROGRESS",
  condition: "Edges + Temples",
  timeframe: "Replace with verified timeline",
  note: "Replace with a concise, factual result summary.",
  before: IMG + "ba-6mo-before.png",
  after: IMG + "ba-6mo-after.png",
  quote: ""
}, {
  id: "scalp",
  eyebrow: "CLIENT PROGRESS",
  condition: "Scalp Inflammation",
  timeframe: "Replace with verified timeline",
  note: "Replace with a concise, factual result summary.",
  before: IMG + "treatment-scalp.png",
  after: IMG + "client-smile.png",
  quote: ""
}];
const APPROACH_STEPS = [{
  number: "01",
  icon: "scalp",
  title: "Treat the scalp",
  text: "Targeted topical and in-clinic care may include growth factors, microneedling, laser-based therapies and protocols selected for your scalp condition."
}, {
  number: "02",
  icon: "flask",
  title: "Investigate the body",
  text: "Your hair does not grow in isolation. We look at health history, scalp findings and, when appropriate, labs that can help uncover internal contributors."
}, {
  number: "03",
  icon: "drop",
  title: "Support from within",
  text: "Lab-guided nutrient support and IV Therapy may be incorporated when they fit your individualized plan."
}, {
  number: "04",
  icon: "light",
  title: "Support the follicle environment",
  text: "Red Light and infrared therapies can be integrated into the larger plan to support the scalp environment and circulation."
}];
const PROGRAM_PHASES = [{
  icon: "scope",
  title: "Diagnose",
  text: "Scalp imaging, hair-loss pattern review, health history and deeper investigation when needed."
}, {
  icon: "scalp",
  title: "Treat",
  text: "A personalized combination of in-clinic scalp therapies selected for your condition and goals."
}, {
  icon: "drop",
  title: "Restore",
  text: "Whole-body support that may include lab-guided nutrients, IV Therapy, home care and lifestyle guidance."
}, {
  icon: "chart",
  title: "Track",
  text: "Standardized photos, progress metrics and plan adjustments so changes can be seen over time."
}];
const CONDITIONS = [{
  label: "CCCA",
  detail: "Central centrifugal cicatricial alopecia",
  href: "/blogs/hair-loss/ccca-hair-loss"
}, {
  label: "Traction Alopecia",
  detail: "Hair loss associated with repeated tension",
  href: "/traction-alopecia-treatment-atlanta"
}, {
  label: "Alopecia Areata",
  detail: "Patchy autoimmune-related hair loss",
  href: "/alopecia-areata-doctor-atlanta"
}, {
  label: "LPP / FFA",
  detail: "Inflammatory and scarring forms of hair loss",
  href: "#book"
}, {
  label: "Telogen Effluvium",
  detail: "Diffuse shedding and hair-cycle disruption",
  href: "#book"
}, {
  label: "Hormonal Hair Loss",
  detail: "Hair changes associated with hormone shifts",
  href: "#book"
}, {
  label: "Folliculitis",
  detail: "Scalp inflammation around the follicles",
  href: "#book"
}, {
  label: "Thinning + Shedding",
  detail: "Unexplained density loss and active shedding",
  href: "#book"
}];
const FAQS = [{
  q: "Why do you approach hair loss like a health issue?",
  a: "Because the scalp is part of the body. Hair growth can be influenced by scalp inflammation, nutrient status, hormone shifts, stress, circulation, immune activity and other health factors. Our job is to look at the whole picture, not just the visible thinning, and then build a plan around what we actually find."
}, {
  q: "Does every client get IV Therapy and Red Light Therapy?",
  a: "No. Not every client needs every therapy. Your evaluation helps determine which treatments and support options are appropriate for your scalp findings, health history and goals."
}, {
  q: "Do you only work with Black women?",
  a: "Black women and textured hair are at the center of our expertise, especially conditions that disproportionately affect this community. We also welcome men and others seeking expert-led care for textured hair and scalp concerns."
}, {
  q: "What happens at the first evaluation?",
  a: "The first visit is designed to help us understand your hair-loss pattern, scalp condition, shedding history and relevant health context. Scalp imaging and other assessment tools may be used, and additional lab work may be recommended when deeper investigation is needed."
}, {
  q: "How quickly will I see results?",
  a: "Hair restoration takes time and outcomes vary based on diagnosis, severity, follicle viability, consistency and internal health factors. Progress is tracked with photos and other measures so your care plan can be adjusted over time."
}];
Object.assign(window, {
  IMG,
  NAV,
  RESULT_STORIES,
  APPROACH_STEPS,
  PROGRAM_PHASES,
  CONDITIONS,
  FAQS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BadgeMark = __ds_scope.BadgeMark;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.ResultCard = __ds_scope.ResultCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TrustBadge = __ds_scope.TrustBadge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Icon = __ds_scope.Icon;

})();
