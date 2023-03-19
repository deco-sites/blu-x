import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type {
  ImageObject,
  ProductDetailsPage,
} from "deco-sites/std/commerce/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import { animation, keyframes, tw } from "twind/css";

import ProductSelector from "./ProductVariantSelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

interface Dots {
  interval?: number;
  imagesProduct?: ImageObject[];
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Dots({ imagesProduct, interval = 0 }: Dots) {
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
      <ol class="flex items-center justify-center col-span-full gap-4 z-10 row-start-4 lg:flex-col lg:z-0 lg:justify-start lg:mt-[30px]">
        {imagesProduct?.map((_: ImageObject, index: number) => (
          <li class="h-full lg:h-auto">
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="h-full rounded focus:outline-none group"
            >
              <div
                class={tw`w-16 h-2 w-2 rounded-full bg-black block lg:hidden`}
              />
              <Image
                style={{ aspectRatio: "360 / 500" }}
                class="snap-center min-w-[84px] hidden lg:block"
                sizes="(max-width: 84px) 100vw, 30vw"
                src={_.url!}
                alt={_.alternateName}
                width={84}
                height={125}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="items-center justify-center z-10 absolute top-1/2 left-[15px] md:left-[5%] -translate-y-[50%] hidden">
        <Button
          class="h-[60px] w-[60px] p-[10px] bg-bgArrow border-1 border-default"
          variant="iconArrow"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-default-inverse"
            size={40}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Button>
      </div>
      <div class="items-center justify-center z-10 absolute top-1/2 right-[15px] md:right-[5%] -translate-y-[50%] hidden">
        <Button
          class="h-[60px] w-[60px] p-[10px] bg-bgArrow border-1 border-default"
          variant="iconArrow"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-default-inverse"
            size={40}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Button>
      </div>
    </>
  );
}

function Details(
  { page, interval = 3 }: { page: ProductDetailsPage; interval: number },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];
  const id = useId() + 2;

  return (
    <Container class="py-0 sm:py-10">
      <div
        class="flex flex-col gap-4 mt-[98px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto"
        id={id}
      >
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        {/* Image Gallery */}
        <div class="lg:flex lg:justify-between lg:gap-[8%]">
          <div class="lg:flex lg:flex-row-reverse lg:justify-between lg:gap-[15px]">
            <Slider class="col-span-full row-span-full scrollbar-none gap-6 lg:max-w-[380px] xl:max-w-[480px] 2xl:max-w-[550px] 2xl:mt-[30px]">
              {[front, back ?? front].map((img, index) => (
                <Image
                  style={{ aspectRatio: "360 / 500" }}
                  class="snap-center min-w-[100vw] lg:min-w-[380px] xl:min-w-[480px] 2xl:min-w-[550px]"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={img.url!}
                  alt={img.alternateName}
                  width={360}
                  height={500}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </Slider>
            <Dots imagesProduct={[front, back ?? front]} interval={interval} />
            <Controls />
            <SliderControllerJS
              rootId={id}
              interval={interval && interval * 1e3}
            />
          </div>
          {/* Product Info */}
          <div class="flex-auto px-4 sm:px-0 lg:max-w-[400px] xl:max-w-[500px] lg:mt-[30px]">
            {/* Code and name */}
            <div class="mt-4 lg:mt-0">
              <h1>
                <Text variant="heading-3">{isVariantOf?.name}</Text>
              </h1>
              <div>
                <Text tone="subdued" variant="caption">
                  Código: {gtin}
                </Text>
              </div>
            </div>
            {/* Prices */}
            <div class="mt-4">
              <Text
                class="line-through block"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text class="block text-badge" tone="price" variant="heading-3">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
              <Text class="block" tone="subdued" variant="caption">
                ou {installments}
              </Text>
            </div>
            {/* Sku Selector */}
            <div class="mt-4 sm:mt-6 lg:flex lg:justify-between lg:items-center">
              <ProductSelector product={product} />
              <div class="mt-4 flex justify-content items-center">
                <Icon class="mr-[10px]" id="Meansure" width={28} height={22} />
                <span class="text-uppercase text-[0.75rem] text-[#909090]">
                  Guia de medidas
                </span>
              </div>
            </div>
            {/* Add to Cart and Favorites button */}
            <div class="fixed bottom-0 z-50 left-0 min-w-full bg-default shadow-md lg:relative lg:shadow-none">
              <div class="flex justify-between items-center px-2 py-4">
                <Text
                  class="block text-badge lg:hidden"
                  tone="price"
                  variant="small-text"
                >
                  {formatPrice(price, offers!.priceCurrency!)}
                </Text>
                <Text
                  class="block lg:hidden"
                  tone="subdued"
                  variant="small-text"
                >
                  ou {installments}
                </Text>
              </div>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
              )}
            </div>
            {/* Consulte prazo de entrega */}
            <div class="pt-4">
              <Text class="text-uppercase">
                Consulte prazo de entrega e frete
              </Text>
              <span class="text-[12px] hidden md:block mt-[12px]">
                Insira seu CEP
              </span>
              <div class="block md:flex justify-center items-center md:gap-6 md:justify-between lg:flex-wrap lg:gap-x-6 lg:gap-y-0">
                <input
                  class="md:max-w-[320px] border-b-[2px] mt-2 border-frete w-full bg-default tracking-[2px] text-uppercase pt-4 lg:max-w-[200px] xl:max-w-[280px]"
                  type="tel"
                />
                <Button
                  variant="tertiary"
                  class="md:max-w-[135px] border-[1px] border-black bg-transparent mt-2 border-frete w-full bg-default tracking-[2px] text-uppercase py-6 text-default"
                >
                  Calcular
                </Button>
                <a
                  class="text-[10px] text-underline font-strong md:max-w-[85px] lg:block"
                  href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                >
                  Não sei meu CEP
                </a>
              </div>
            </div>

            {/* Description card */}
            <div class="mt-10 mb-20 md:mt-20">
              <Text variant="caption">
                {description && (
                  <details>
                    <summary class="cursor-pointer text-uppercase pb-2 border-b-1 border-black">
                      Sobre essa peça
                    </summary>
                    <div class="ml-2 mt-2">{description}</div>
                  </details>
                )}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} interval={3} />;
  }

  return <NotFound />;
}

export default ProductDetails;
