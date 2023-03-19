/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import { useEffect, useRef } from "preact/compat";

import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import useAutocomplete from "deco-sites/std/commerce/vtex/hooks/useAutocomplete.ts";
import SearchTermList from "./SearchTermList.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import ProductSearch from "$store/components/product/ProductSearch.tsx";

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon id="XMark" width={20} height={20} strokeWidth={2} />
    </Button>
  );
}

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default Pesquise por...
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on searchs
   */
  products?: Product[] | null;
  suggestions?: Suggestion | null;

  /** used for autocomplete */
  configVTEX?: ClientConfigVTEX;

  variant?: "desktop" | "mobile";
};

function Searchbar({
  placeholder = "Pesquise por...",
  action = "/s",
  name = "q",
  query,
  products,
  suggestions: _suggestions,
  configVTEX,
  variant = "mobile",
}: Props) {
  const searches = _suggestions?.searches;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions } = useAutocomplete({
    configVTEX,
  });

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  const hasSuggestions = !!suggestions.value;
  const emptySuggestions = suggestions.value?.searches?.length === 0;
  const _products = suggestions.value?.products &&
      suggestions.value?.products?.length !== 0
    ? suggestions.value.products
    : products;

  return (
    <div
      class={`${
        variant === "desktop"
          ? "md:w-[350px] lg:w-[400px] absolute left-0 top-50 z-50 -translate-y-2/4 -translate-x-[90%] bg-default"
          : "flex flex-col p-4 md:(py-6 px-20)"
      }`}
    >
      <div class="flex gap-4">
        <form
          id="searchbar"
          action={action}
          class="flex-grow flex gap-3 px-3 py-2 border border-default max-w-full md:scrollbar-none relative"
        >
          <div class="absolute right-[5px]">
            <Button
              variant="icon"
              aria-label="Search"
              htmlFor="searchbar"
              tabIndex={-1}
            >
              <Icon
                class="text-subdued"
                id="MagnifyingGlass"
                width={20}
                height={20}
                strokeWidth={0.01}
              />
            </Button>
          </div>
          <input
            ref={searchInputRef}
            id="search-input"
            class="flex-grow outline-none placeholder-shown:sibling:hidden max-w-[60%] md:max-w-[75%]"
            name={name}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              setSearch(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <button
            type="button"
            aria-label="Clean search"
            class="focus:outline-none absolute right-[30px]"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              setSearch("");
            }}
          >
            <Text variant="caption" tone="default">limpar</Text>
          </button>
        </form>
        {variant === "desktop" && <CloseButton />}
      </div>
      <div class="flex flex-col gap-6 divide-y divide-default 
                  empty:mt-0 md:absolute md:bottom-0 md:left-[50%] 
                  md:translate-y-full md:-translate-x-2/4 md:bg-default
                  md:px-2 md:min-w-full md:max-h-[500px] md:overflow-scroll md:scrollbar-none">
        {searches && searches.length > 0 && !hasSuggestions && (
          <SearchTermList title="Mais buscados" terms={searches} />
        )}
        {hasSuggestions && !emptySuggestions && (
          <SearchTermList
            id="search-suggestion"
            title=""
            terms={suggestions.value.searches!}
          />
        )}
        {hasSuggestions && emptySuggestions && (
          <div class="py-16 md:(py-6!) flex flex-col gap-4 w-full mt-6 mb-10">
            <Text
              variant="heading-3"
              class="text-center"
              role="heading"
              aria-level="3"
            >
              Nenhum resultado encontrado
            </Text>
            <Text variant="body" tone="subdued" class="text-center">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </Text>
          </div>
        )}
        {_products && !emptySuggestions && (
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden pt-6 pb-10">
            {_products.map((
              product,
              index,
            ) => <ProductSearch product={product} key={index} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
