import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const filters = page?.filters;

  return (
    <Container class="flex flex-col justify-between mb-4 p-4 mt-[40px]">
      <div class="flex items-center justify-between sm:justify-center lg:justify-between sm:gap-[60px]">
        <button
          class="min-w-[140px] lg:hidden sm:min-w-[230px] flex items-center justify-center bg-badge py-[10px] text-[#fff] text-[11px] text-semibold"
          onClick={() => {
            open.value = true;
          }}
        >
          <Icon id="FilterList" width={16} height={16} />
          Filtros
        </button>
        <div class="lg:block hidden">
          <Filters filters={filters} />
        </div>
        <Sort />
      </div>

      <Modal
        title="Filtros"
        mode="filter"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </Container>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
