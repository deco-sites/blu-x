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
      <div class="block max-w-[1320px] grid grid-cols-1 md:grid-rows-[48px_1fr] mx-auto md:px-10">
        <div>
          <Slider
            class="flex gap-2 flex-col md:flex-row "
            snap="snap-center block"
          >
            {highlights.map(({ href, src, alt }) => (
              <a
                href={href}
                class="flex items-center md:min-w-[50px] gap-4 relative group"
              >
                <Image class="px-3 w-full"
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
