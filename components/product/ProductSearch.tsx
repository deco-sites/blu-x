import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
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
  /** Preload card image */
  preload?: boolean;
}

function ProductSearch({ product, preload }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      id={`product-card-${productID}`}
      class="group"
    >
      <a
        class="flex items-center justify-center gap-2"
        href={url}
        aria-label="product link"
      >
        <div class="relative">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={50}
            height={50}
            class="rounded group-hover:hidden min-w-[50px]"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={50}
            height={50}
            class="rounded hidden group-hover:block min-w-[50px]"
          />
        </div>

        <div class="flex flex-col gap-1 py-2 max-w-[70%] flex-1">
          <Text variant="caption">
            {name}
          </Text>
          <div class="flex items-center gap-2">
            <Text
              class="line-through"
              variant="list-price"
              tone="subdued"
            >
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </Text>
            <Text variant="caption" tone="price">
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
          </div>
          <Button as="a" href={product.url}>Visualizar</Button>
        </div>
      </a>
    </div>
  );
}

export default ProductSearch;
