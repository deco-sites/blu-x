import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface HighlightsThree {
  src: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: HighlightsThree[];
  title: string;
}

function HighlightsThree({ highlights = [], title }: Props) {
  return (
    <div>
      {/* Highlitght 3 */}
      <div class="block max-w-[1320px] grid grid-cols-1 md:grid-rows-[48px_1fr] mx-auto md:px-10">
        <h2 class="text-center">
          <Text variant="h3">{title}</Text>
        </h2>

        <div class="mt-10">
          <Slider
            class="flex gap-2 flex-col md:flex-row "
            snap="snap-center sm:snap-start block md:first:ml-6 first:ml-0 md:last:mr-6 last:mr-0"
          >
            {highlights.map(({ href, src, alt }) => (
              <a
                href={href}
                class="flex items-center md:min-w-[50px] gap-4 relative group"
              >
                <Image
                  class="px-3 w-full"
                  src={src}
                  alt={alt}
                  width={663}
                  height={950}
                />
              </a>
            ))}
          </Slider>
        </div>
        <div class="mt-12 text-center mb-32">
          <span class="text-3xl font-light">
            Segue aí <span class="font-bold">@bluxrio</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default HighlightsThree;
