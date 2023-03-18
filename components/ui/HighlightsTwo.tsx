import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface HighlightsTwo {
  src: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: HighlightsTwo[];
  title: string;
}

function HighlightsTwo({ highlights = [], title }: Props) {
  return (
    <div>
      {/* Highlitght 2 */}
      <div class="max-w-[1320px] grid grid-cols-1 grid-rows-[48px_1fr] py-10 mx-auto px-10">
        <h2 class="text-center">
          <Text variant="h3">{title}</Text>
        </h2>

        <div class="mt-10">
          <Slider
            class="gap-0"
            snap="snap-center sm:snap-start block"
          >
            {highlights.map(({ href, src, alt }) => (
              <a
                href={href}
                class="flex flex-col gap-1 items-center w-full min-w-[50px] gap-4 relative group"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={352}
                  height={501}
                />
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default HighlightsTwo;
