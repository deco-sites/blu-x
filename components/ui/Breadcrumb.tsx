import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Item(
  { name, item, lastChild }: {
    name?: string;
    item?: string;
    lastChild?: boolean;
  },
) {
  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis group">
      <a href={item} class="hover:no-underline">
        <span
          class={`font-extralight uppercase ${lastChild ? "text-badge" : ""}`}
        >
          {name}
        </span>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="text-[10px] flex justify-center mt-4 pb-2 -mb-2 flex-row gap-2 items-center w-full lg:justify-start lg:pl-4 last:text-badge">
      <Item name="Home" item="/" />
      {itemListElement.map((item, i, itemListElement) => (
        <>
          <li class="mt-0.5">
            |
          </li>
          <Item
            name={item.name}
            item={item.item}
            lastChild={i + 1 == itemListElement.length}
          />
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
