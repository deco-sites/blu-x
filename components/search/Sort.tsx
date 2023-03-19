import { useMemo } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

// TODO: The search query should also be from a commerce schema
const options = [
  { value: "", label: "Ordernar por" },
  { value: "price:desc", label: "Maior Preço" },
  { value: "price:asc", label: "Menor Preço" },
  { value: "orders:desc", label: "Mais Pedidos" },
  { value: "name:asc", label: "Nome (A -> Z)" },
  { value: "name:desc", label: "Nome (Z -> A)" },
  { value: "release:desc", label: "Lançamentos" },
  { value: "discount:desc", label: "Maior Desconto" },
];

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  console.log(e.currentTarget.value);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

function Sort() {
  const sort = useSort();

  return (
    <div class="relative">
      <Icon
        class="text-[#fff] lg:hidden absolute top-[50%] left-[18px] -translate-y-[50%] rotate-[90deg]"
        id="ArrowsFilter"
        size={15}
        strokeWidth={1}
      />

      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="bg-[#000] px-[15px] cursor-pointer text-[#fff] py-[10px] text-[11px] text-semibold min-w-[140px] sm:min-w-[230px] lg:bg-[#fff] lg:border lg:border-[#dee2e6] lg:px-4 lg:min-w-[160px] lg:text-[#909090] lg:text-left text-center appearance-none"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <Text class="px-2" variant="caption">{label}</Text>
          </option>
        ))}
      </select>

      <Icon
        class="text-[#000] hidden lg:block absolute top-[50%] right-[15px] -translate-y-[50%]"
        id="ChevronDown"
        size={20}
        strokeWidth={1}
      />
    </div>
  );
}

export default Sort;
