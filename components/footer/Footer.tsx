import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

export type Certificados = {
  image: LiveImage;
  /** @description Image's alt text */
  alt?: string;
};

export type Copyright = {
  copy_line1?: string;
  copy_line2?: string;
};

export type Atendimento = {
  email?: string;
  horario?: string;
};

export type RedesSociais = {
  facebook?: string;
  instagram?: string;
};

export type Parceiros = {
  name?: string;
  url?: string;
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-[12px] text-[#000]">
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  copyright?: Copyright;
  certificados?: Certificados[];
  atendimento?: Atendimento;
  redesSociais?: RedesSociais;
  pagamento?: Certificados[];
  parceiros: Parceiros[];
}

function Footer(
  {
    sections = [],
    copyright,
    certificados,
    atendimento,
    redesSociais,
    pagamento,
  }: Props,
) {
  return (
    <div>
      <div class="w-full flex flex-col bg-black">
        <Container class="w-full flex flex-col">
          <FooterContainer>
            <Newsletter />
          </FooterContainer>
        </Container>
      </div>

      <footer class="w-full bg-footer flex flex-col bg-[#F1F1F1]">
        <div>
          <Container class="w-full flex flex-col">
            <FooterContainer>
              {/* Desktop view */}
              <ul class="hidden sm:flex flex-row">
                {sections.map((section) => (
                  <li>
                    <div>
                      <div>
                        <span class="uppercase">
                          {section.label}
                        </span>
                      </div>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Mobile view */}
              <ul class="flex flex-col sm:hidden sm:flex-row gap-[15px]">
                {sections.map((section) => (
                  <li class="pb-[20px]">
                    <Text variant="footer" tone="title" class="uppercase">
                      <details>
                        <summary>
                          {section.label}
                        </summary>

                        <ul
                          class={`flex ${
                            isIcon(section.children[0])
                              ? "flex-row"
                              : "flex-col"
                          } gap-2`}
                        >
                          {section.children.map((item) => (
                            <li class="first:pt-[35px] mb-[20px]">
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </Text>
                  </li>
                ))}
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <details>
                      <summary>
                        Certificados
                      </summary>

                      <ul
                        class={`flex flex-wrap gap-2`}
                      >
                        {certificados?.map((certificado) => (
                          <li class="pt-[25px] mb-[20px]">
                            <Picture class="w-[75px]">
                              <img
                                class="object-cover w-[75px] h-auto"
                                loading={"lazy"}
                                src={certificado.image}
                                alt={certificado?.alt}
                              />
                            </Picture>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </Text>
                </li>
              </ul>
            </FooterContainer>
          </Container>
        </div>

        <div class="bg-[#fff]">
          <Container class="w-full">
            <FooterContainer class="w-full py-[15px] text-[10px] text-[#adb5bd] text-center">
              <div class="flex justify-center items-center mb-[15px]">
                <Text
                  class="flex items-center gap-1"
                  variant="body"
                  tone="default"
                >
                  Createdby by{" "}
                  <a
                    href="https://www.deco.cx"
                    aria-label="powered by https://www.deco.cx"
                  >
                    <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                  </a>
                </Text>
              </div>
              <div class="flex justify-center items-center mb-[15px]">
                <Text
                  class="flex items-center gap-1"
                  variant="body"
                  tone="default"
                >
                  Powered by{" "}
                  <a
                    href="https://www.deco.cx"
                    aria-label="powered by https://www.deco.cx"
                  >
                    <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                  </a>
                </Text>
              </div>
            </FooterContainer>
          </Container>
        </div>

        <div class="bg-[#fff]">
          <Container class="w-full">
            <FooterContainer class="w-full py-[15px] text-[10px] text-[#adb5bd] text-center">
              <p>
                Gaivota Branca Confecções e Comércio LTDA CNPJ:
                09.220.017/0001-29{/*copy_line1*/}
              </p>
              <p>
                Endereço: Rua Figueiredo de Magalhães 219 Loja B e sobre loja
                203 - Copacabana, Rio de Janeiro - RJ{/*copy_line2*/}
              </p>
            </FooterContainer>
          </Container>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
