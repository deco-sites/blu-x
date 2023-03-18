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
      <div class="max-w-[1320px] grid grid-cols-1 grid-rows-[48px_1fr] py-10 mx-auto">
        <h2 class="text-center">
          <Text variant="h3">{title}</Text>
        </h2>

        <div class="mt-10">
          <Slider
            class="gap-6"
            snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          >
            {highlights.map(({ href, src, alt }) => (
              <a
                href={href}
                class="flex flex-col gap-4 items-center min-w-[190px] relative group"
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
