import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { navbarHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center relative h-full">
      <a href={href} class="px-4 py-3">
        <Text
          class="group-hover:border-black border-solid border-b border-white text-nav-bar text-uppercase tracking-[2px]"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`absolute ease-out duration-500 opacity-0 group-hover:opacity-100 invisible hover:visible group-hover:visible bg-default z-50 gap-6 border-t-1 border-b-2 border-default max-w-max mt-[${navbarHeight}]`}
            style={{ top: "0px", left: "0px" }}
          >
            <ul class="gap-0 py-5">
              {children.map((node) => (
                <li class="px-5 py-0.5">
                  <a class="text-left hover:underline" href={node.href}>
                    <span class="pr-40 text-[12px] font-menu">
                      {node.label}
                    </span>
                  </a>
                  {node.children
                    ? (
                      <ul class="flex flex-col gap-1 mt-4 text-left">
                        {node.children?.map((leaf) => (
                          <li>
                            <a class="hover:underline" href={leaf.href}>
                              <Text variant="caption">{leaf.label}</Text>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
