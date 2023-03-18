/**
 * WARNING: DO NOT USE ANY TWIND FUNCTIONS in here otherwise the
 * vscode-twind-intellisense plugin may stop working. To overcome
 * this issue, use animations and keyframes intead of twind's animation
 * function.
 */
import type { Options } from "$fresh/plugins/twind.ts";

const gridCols = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-columns": template,
  };
};

const gridRows = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-rows": template,
  };
};

const options: Omit<Options, "selfURL"> = {
  theme: {
    extend: {
      colors: {
        "default": "#FFF",
        "header": "#000",
        "badge": "#ff5100", // shopping cart tem isso tambem
        "footer": "#ffffff",
        "interactive": "#161616",
        "interactive-inverse": "#FFFFFF",
        "subMenu": "#F1F1F1",
        "hover": "rgba(0, 0, 0, 0.04)",
        "hover-inverse": "rgba(255, 255, 255, 0.4)",
        "bgArrow": "rgba(0, 0, 0, 0.25)",
      },
      textColor: {
        "default": "#000",
        "title": "#ff5100",
        "default-inverse": "#FFFFFF",
        "subdued": "#66736C",
        "subdued-inverse": "#C6C6C6",
        "price": "#000",
        "old-price": "#b5b5b5",
        "section-title": "#1D1D1D",
        "positive": "#1A7346",
        "critical": "#B44125",
      },
      borderColor: {
        "default": "#D4DBD7",
        "default-inverse": "#FFFFFF",
        "interactive": "#161616",
        "focus": "#3379EF",
        "positive": "#1A7346",
        "critical": "#B44125",
      },
      outline: {
        interactive: ["2px solid #3379EF", "2px"],
      },
      fontSize: {
        "heading-1": ["30px", "67.2px"],
        "heading-2": ["24px", "28.8px"],
        "heading-3": ["20px", "24px"],
        "h3": ["40px", "20px"],
        "menu": ["11px", "20px"],
        "button": ["14px", "18px"],
        "body": ["16px", "20px"],
        "caption": ["13px", "16px"],
        "list-price": ["10px", "20px"],
        "footer": ["0.75rem", "0.75rem"],
        "small-text": ["12px", "14px"],
        "nav-bar": ["14px", "14px"],
      },
      fontWeight: {
        "heading-1": "500",
        "heading-2": "500",
        "heading-3": "500",
        "menu": "400",
        "button": "700",
        "body": "400",
        "caption": "400",
        "list-price": "400",
        "newsletter": "300",
        "h3": "300",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        "slide-top": "slide-top-frame 0.4s ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-top-frame": {
          from: { transform: "translateY(-140%)" },
          to: { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        sm: "0px 1px 3px 0px #00000014",
        default: "0px 1px 4px 0px #0000001F",
        md: "0px 1px 5px 0px #00000024",
        lg: "0px 4px 10px 0px #0000001F",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["inherit", "serif"],
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
  preflight: (preflight) => ({
    ...preflight,

    // Stick footer to the bottom of the page
    body: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    'section[data-manifest-key="./sections/Footer.tsx"]': {
      marginTop: "auto",
    },

    // Prevent scroll when modal is open
    "body[no-scroll]": {
      overflow: "hidden",
      height: "100vh",
    },
  }),
  plugins: {
    backdrop: {
      "&::backdrop": {
        background: "rgba(0, 0, 0, 0.5)",
      },
    },
    backdropSearch: {
      "&::backdrop": {
        top: "188px",
        height: "calc(100% - 188px)",
        background: "rgba(0, 0, 0, 0.5)",
      },
    },
    "scroll-snap-center": {
      "scroll-snap-align": "center",
    },
    "scroll-x-mandatory": {
      "scroll-snap-type": "x mandatory",
    },
    "snap-x": {
      "scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
    },
    "snap-mandatory": {
      "--tw-scroll-snap-strictness": "mandatory",
    },
    "fill": (parts) => ({ "fill": parts.join("-") }),
    "max-h-min": {
      "max-height": "min-content",
    },
    "snap": ([mod]) => ({ "scroll-snap-align": mod }),
    "grid-cols": gridCols,
    "grid-rows": gridRows,
    "scroll-smooth": {
      "scroll-behavior": "smooth",
      "-webkit-overflow-scrolling": "touch",
    },
    "scrollbar-none": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
};

export default options;
