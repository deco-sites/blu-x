import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="max-w-full grid grid-cols-1 grid-rows-[48px_1fr] py-10">
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
                width={400}
                height={400}
              />

              <span class="hidden group-hover:block bg-badge text-white font-semibold py-2 px-6 rounded-[50px] absolute top-[60%] left-1/2 -translate-1/2 z-20">Conferir</span>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Highlights;
