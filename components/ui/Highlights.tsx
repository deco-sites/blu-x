import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { tw } from "twind/css";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import ContainerCustom from "$store/components/ui/ContainerCustom.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
  interval?: number;
}

function Dots(
  { highlights, interval = 0 }: { highlights: Highlight[]; interval: number },
) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>
      <ol class="flex items-center justify-center col-span-full gap-4 z-10 pt-[20px] lg:hidden">
        {highlights?.map((_, index) => (
          <li>
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="rounded focus:outline-none group"
            >
              <div
                class={tw`w-16 h-2 w-2 rounded-full bg-black block group-disabled:bg-badge`}
              />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Highlights({ highlights = [], title, interval = 5 }: Props) {
  const id = useId() + 6;

  return (
    <ContainerCustom class="px-2">
      {/* Highlitght 1 */}
      <div
        id={id}
        class="max-w-full grid grid-cols-1 grid-rows-[48px_1fr] py-10"
      >
        <h2 class="text-center md:text-sm">
          <Text variant="h3" class="md:text-[40px]">{title}</Text>
        </h2>

        <div class="mt-10">
          <Slider
            class="gap-6 overflow-x-hidden"
            snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          >
            {highlights?.map(({ href, src, alt }) => (
              <a
                href={href}
                class="flex flex-col gap-4 items-center min-w-max md:min-w-[190px] relative group"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={400}
                />

                <span class="hidden group-hover:block bg-badge text-white font-semibold py-2 px-6 rounded-[50px] absolute top-[75%] left-1/2 -translate-1/2 z-20">
                  Conferir
                </span>
              </a>
            ))}
          </Slider>

          <>
            <div class="hidden">
              <Button
                class="h-[40px] w-[40px] p-[10px] bg-default border-1 border-[#000]"
                variant="iconArrow"
                data-slide="prev"
                aria-label="Previous item"
              >
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
              </Button>
            </div>
            <div class="hidden">
              <Button
                class="h-[40px] w-[40px] p-[10px] bg-default border-1 border-[#000]"
                variant="iconArrow"
                data-slide="next"
                aria-label="Next item"
              >
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Button>
            </div>
          </>

          <Dots highlights={highlights} interval={interval} />

          <SliderControllerJS
            rootId={id}
            interval={interval && interval * 1e3}
          />
        </div>
      </div>
    </ContainerCustom>
  );
}

export default Highlights;
