import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex flex-wrap gap-2 lg:border-[#e9ecef] lg:border lg:absolute lg:w-full lg:left-0 lg:bg-[#fff] lg:p-2 lg:z-50 ${flexDirection}`}
    >
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2 group">
            <input type="checkbox" checked={selected} class="hidden" />
            <span class="text-[#495057] text-[11px] group-hover:text-underline">
              {label}
            </span>
            <span class="text-[#495057] text-[11px]">
              ({quantity})
            </span>
          </a>
        );
      })}
    </ul>
  );
}

export default function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col p-4 lg:flex-row lg:gap-[10px] lg:p-0">
      {filters
        .filter(isToggle)
        .map((filter) => {
          const open = useSignal(false);
          return (
            <li
              class="flex flex-col gap-4 relative lg:max-w-[120px] lg:min-w-[120px] lg:gap-0 lg:cursor-pointer"
              onClick={() => {
                open.value = !open.value;
              }}
            >
              <h5 class="border-[#e9ecef] border-b lg:border py-[10px] pr-[20px] text-[11px] text-[#909090] lg:pl-[10px]">
                {filter.label}
              </h5>
              <Icon
                class={`duration-500 ease-out absolute right-[10px] top-[15px] lg:top-[50%] lg:-translate-y-[50%] ${
                  open.value === true ? "-scale-y-100" : ""
                }`}
                id="ChevronDown"
                height={15}
                width={15}
                strokeWidth={1.5}
              />
              <div
                class={`${
                  open.value === true
                    ? "flex max-h-full py-2 px-2 lg:block lg:py-0 lg:py-0"
                    : "max-h-0 lg:hidden"
                } overflow-hidden`}
              >
                <FilterValues {...filter} />
              </div>
            </li>
          );
        })}
    </ul>
  );
}
