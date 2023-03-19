import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { tw } from "twind/css";

export interface Props {
  title: string;
  url?: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
  interval?: number;
}

function Dots(
  { products, interval = 0 }: { products: Product[]; interval: number },
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
      <ol class="flex items-center justify-center col-span-full gap-4 z-10 pt-[20px] mb-10">
        {products?.map((_, index) => (
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

function ProductShelf({
  title,
  products,
  interval = 3,
  url,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="w-full grid grid-cols-[80px_1fr_48px] lg:grid-cols-[150px_1fr_48px] grid-rows-[80px_1fr_48px_1fr] lg:grid-rows-[150px_1fr_48px_1fr] relative mt-[60px]"
    >
      <h2 class="text-center row-start-1 col-span-full text-[23px] font-light lg:text-[40px]">
        <span>{title}</span>
        {url
          ? (
            <a
              href={url}
              class="block text-center text-[12px] lg:text-[14px] text-underline text-uppercase text-[#adb5bd] mt-[8px] mb-[20px]"
            >
              ver tudo
            </a>
          )
          : ""}
      </h2>

      <Slider
        class="gap-6 col-span-full row-start-2 row-end-5 scrollbar-none max-w-[216px] md:max-w-[440px] lg:max-w-[872px] xl:max-w-[1072px] 2xl:max-w-[1240px] mx-auto"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="min-w-[200px] xl:min-w-[250px] 2xl:min-w-[292px]">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>

      <Dots products={products} interval={interval} />

      <>
        <div class="hidden absolute md:block z-10 left-[5%] top-2/4 -translate-y-[50%] xl:hidden">
          <Button
            class="h-[40px] w-[40px] p-[10px] bg-default border-1 border-[#000]"
            variant="iconArrow"
            data-slide="prev"
            aria-label="Previous item"
          >
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Button>
        </div>
        <div class="hidden absolute right-[5%] top-2/4 -translate-y-[50%] md:block z-10 xl:hidden">
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

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default ProductShelf;
