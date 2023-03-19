import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductSize from "$store/components/ui/ProductSize.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <ProductSize
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  news?: string;
  /** Preload card image */
  preload?: boolean;
}

function ProductCard({ product, preload, news }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller, installments } = useOffer(offers);

  return (
    <div
      id={`product-card-${productID}`}
      class="w-full group"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={339}
            height={501}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={339}
            height={501}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {news == "Novidades" && (
            <div class="uppercase tracking-[2px] absolute h-10 w-10 top-2 left-2 bg-black overflow-y-hidden">
              <div class="text-white text-[8px] break-words px-[5px] py-[8px]">
                {news.substring(0,8)}
              </div>
            </div>
          )}

          {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
              <Button variant="primary" as="a" href={product.url}>
                Comprar
              </Button>
            </div>
          )}
        </div>

        <div class="flex flex-col gap-2 py-2 text-center my-2">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap"
            variant="caption"
          >
            {product.isVariantOf?.name}
          </Text>
          <div class="flex items-center gap-2 justify-center">
            <Text
              class="text-center line-through"
              variant="list-price"
              tone="subdued"
            >
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </Text>
            <Text class="text-center" variant="caption" tone="price">
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
          </div>
          <Text class="block" tone="subdued" variant="caption">
            ou {installments}
          </Text>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
