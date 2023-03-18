import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";

import NavItem from "./NavItem.tsx";
import Text from "$store/components/ui/Text.tsx";
import { headerMobileHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const { cart, loading } = useCart();
  const itensCarrinho = cart.value?.items.length;
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${headerMobileHeight}] border-b-1 border-default w-full gap-[32px] px-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center`}
          aria-label="Store logo"
        >
          <Icon id="LogoMobile" width={97} height={29} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
          <span
            class={`rounded-full bg-badge px-1 w-[20px] h-[20px] text-default-inverse text-xs text-center leading-5`}
          >
            {itensCarrinho && itensCarrinho >= 0 ? itensCarrinho : 0}
          </span>
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:block border-b-1 border-default w-full">
        <div class="md:flex flex-row justify-between items-center w-full max-w-[1400px] mx-auto pl-2 pr-3">
          <div class="flex-none w-44">
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px]"
            >
              <Icon id="Logo" width={149} height={47} />
            </a>
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <HeaderButton variant="search" />
            <HeaderSearchMenu searchbar={searchbar} />
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
              <Text variant="caption" tone="default">Login</Text>
            </Button>
            <HeaderButton variant="cart" />
            <span
              class={`rounded-full bg-badge px-1 w-[20px] h-[20px] text-default-inverse text-xs text-center leading-5`}
            >
              {itensCarrinho && itensCarrinho >= 0 ? itensCarrinho : 0}
            </span>
          </div>
        </div>
      </div>
      <div
        class={`flex-auto hidden md:flex justify-around items-center h-[${navbarHeight}] max-w-[936px] m-auto`}
      >
        {items.map((item) => <NavItem item={item} />)}
      </div>
    </>
  );
}

export default Navbar;
