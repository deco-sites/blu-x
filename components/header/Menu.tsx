import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const title = (
    <Text
      class={`flex-grow min-h-[40px] flex items-center justify-start hover:text-badge hover:text-underline ${
        level === 0 ? "text-uppercase" : ""
      }`}
      variant="menu"
    >
      {item.label}
    </Text>
  );

  return (
    <li>
      <div
        class={`flex justify-between items-center w-full py-1 ${
          level > 0 ? "pl-2" : ""
        }`}
        onClick={() => {
          if (hasChildren) open.value = !open.value;
        }}
      >
        {hasChildren
          ? title
          : <a class="w-full inline-block" href={item.href}>{title}</a>}

        {hasChildren && (
          <Button variant="icon">
            <Icon
              class={`duration-300 ease-out ${
                open.value === true ? "-scale-y-100" : ""
              }`}
              id="ChevronDown"
              height={15}
              width={15}
              strokeWidth={1.5}
            />
          </Button>
        )}
      </div>

      {hasChildren && (
        <ul
          class={`flex-col ${
            open.value === true ? "flex max-h-full p-2" : "max-h-0"
          } bg-subMenu -mx-3 ease-out duration-500 overflow-hidden`}
        >
          {item.children!.map((node) => (
            <MenuItem
              item={node}
              level={level + 1}
            />
          ))}
          <li>
            <a href={item.href} class="w-full py-2 pl-2 inline-block">
              <Text class="underline" variant="menu">
                Ver todos
              </Text>
            </a>
          </li>
        </ul>
      )}
    </li>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="px-3 flex-grow flex flex-col">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>

      {
        /* <ul class="flex flex-col py-2 bg-hover">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Lista de desejos</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Nossas lojas</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Fale conosco</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Minha conta</Text>
          </a>
        </li>
      </ul> */
      }
    </>
  );
}

export default Menu;
