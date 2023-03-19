import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center" | "sidebar-top" | "filter";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
};

const styles = {
  "sidebar-right":
    "animate-slide-left sm:ml-auto min-w-full max-h-full h-full backdrop md:max-w-[400px] md:min-w-[400px]",
  "sidebar-left":
    "animate-slide-right max-h-full h-full backdrop min-w-[250px]",
  center: "",
  "sidebar-top":
    "animate-slide-top min-w-full z-40 relative top-[98px] backdropSearch",
  "filter": "animate-slide-right max-h-full h-full backdrop min-w-[250px]",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);
  const variant = `p-0 m-0 max-w-full sm:max-w-lg ${styles[mode]}`;

  useEffect(() => {
    if (ref.current?.open === true && open === false) {
      document.getElementsByTagName("body").item(0)?.removeAttribute(
        "no-scroll",
      );
      ref.current.close();
    } else if (ref.current?.open === false && open === true) {
      document.getElementsByTagName("body").item(0)?.setAttribute(
        "no-scroll",
        "",
      );
      ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`${variant} ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "DIALOG" && onClose?.()}
    >
      <section
        class={`${
          mode === "filter" ? "" : "pt-4"
        } h-full bg-default flex flex-col`}
      >
        {title
          ? (
            <header
              class={`flex px-4 justify-between items-center pb-4 border-b-1 border-default ${
                mode === "filter" ? "pt-4 bg-[#f2f2f2]" : ""
              }`}
            >
              <h1 class="flex flex-start items-center">
                <Button
                  as="a"
                  variant="icon"
                  href="/login"
                  aria-label="Log in"
                >
                  {mode === "sidebar-left"
                    ? (
                      <Icon
                        id="User"
                        width={20}
                        height={20}
                        strokeWidth={0.4}
                      />
                    )
                    : ""}
                </Button>
                <Text
                  variant="small-text"
                  class={`${
                    mode === "filter"
                      ? "text-uppercase text-badge text-semibold"
                      : ""
                  }`}
                >
                  {title}
                </Text>
              </h1>
              <Button variant="icon" onClick={onClose}>
                <Icon id="XMark" width={15} height={15} strokeWidth={2} />
              </Button>
            </header>
          )
          : ""}
        <div class="overflow-y-auto h-full flex flex-col">
          {loading === "lazy" ? lazy.value && children : children}
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
