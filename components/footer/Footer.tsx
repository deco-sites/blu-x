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
    parceiros,
  }: Props,
) {
  return (
    <div>
      <a
        class="block fixed bottom-[90px] right-[25px] z-100 w-[54px] bg-[#000] pb-2"
        href="#toTheTop"
      >
        <Icon
          class="-rotate-90 mx-auto my-2"
          id="ArrowUp"
          width={25}
          height={25}
        />
        <p class="text-[#fff] text-center text-[9px]">Voltar ao topo</p>
      </a>

      <div class="w-full flex flex-col bg-black">
        <Container class="w-full flex flex-col">
          <FooterContainer>
            <Newsletter />
          </FooterContainer>
        </Container>
      </div>

      <footer class="w-full bg-footer flex flex-col bg-[#F1F1F1] lg:bg-[#fff]">
        <div>
          <Container class="w-full flex flex-col">
            <FooterContainer>
              {/* Desktop view */}
              <ul class="hidden lg:flex flex-row justify-between max-w-[960px] xl:max-w-[1300px] mx-auto px-[12px]">
                {sections.map((section) => (
                  <li>
                    <Text variant="footer" tone="title" class="uppercase">
                      <span>
                        {section.label}
                      </span>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li class="first:pt-[25px] mb-[20px]">
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </Text>
                  </li>
                ))}
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <span>
                      Certificados
                    </span>

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
                  </Text>
                </li>
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <span>
                      Parceiros
                    </span>

                    <ul
                      class={`flex flex-col gap-2`}
                    >
                      {parceiros?.map((parceiro) => (
                        <li class="pt-[25px] mb-[20px]">
                          <a
                            class="text-[#000] text-[12px] hover:text-underline"
                            href={parceiro.url}
                          >
                            {parceiro.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Text>
                </li>
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <span>
                      Atendimento
                    </span>

                    <ul
                      class={`flex flex-col gap-2`}
                    >
                      <li class="pt-[25px] mb-[20px]">
                        <div class="flex items-center justify-start gap-2 mb-[5px]">
                          <Icon
                            class="text-badge"
                            id="Email"
                            width={25}
                            height={25}
                          />
                          <p class="text-[10px] text-[#000]">
                            {atendimento?.email}
                          </p>
                        </div>
                        <span class="text-[10px] text-[#000]">
                          {atendimento?.horario}
                        </span>
                      </li>
                    </ul>
                  </Text>
                </li>
              </ul>

              <div class="border-b border-[#F2F2F2] w-full my-[30px]"></div>

              <ul class="hidden lg:flex flex-row justify-start xl:justify-between max-w-[960px] xl:max-w-[1300px] mx-auto px-[12px] gap-[30px]">
                <li class="pb-[20px] min-w-[205px] xl:min-w-[296px] 2xl:min-w-[386px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <span>
                      Redes Sociais
                    </span>

                    <ul
                      class={``}
                    >
                      <li class="pt-[25px] mb-[20px] flex items-center  gap-6">
                        <a href={redesSociais?.facebook}>
                          <Icon id="Facebook" width={25} height={25} />
                        </a>
                        <a href={redesSociais?.instagram}>
                          <Icon id="Instagram" width={25} height={25} />
                        </a>
                      </li>
                    </ul>
                  </Text>
                </li>
                <li class="pb-[20px] min-w-[406px] xl:min-w-[463px] 2xl:min-w-[493px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <span>
                      Formas de Pagamento
                    </span>

                    <ul
                      class={`flex flex-wrap gap-2 items-center`}
                    >
                      {pagamento?.map((pagamento) => (
                        <li class="pt-[25px] mb-[20px]">
                          <Picture class="w-[45px]">
                            <img
                              class="object-cover w-[45px] h-auto"
                              loading={"lazy"}
                              src={pagamento.image}
                              alt={pagamento?.alt}
                            />
                          </Picture>
                        </li>
                      ))}
                    </ul>
                  </Text>
                </li>
                <li class="flex justify-center gap-6">
                  <div class="flex justify-center items-start mb-[15px]">
                    <div class="text-[11px] ">
                      Created by{" "}
                      <a
                        href="https://www.deco.cx"
                        aria-label="powered by https://www.deco.cx"
                      >
                        <Icon
                          id="Deco"
                          height={20}
                          width={60}
                          strokeWidth={0.01}
                        />
                      </a>
                    </div>
                  </div>
                  <div class="flex justify-center items-start mb-[15px]">
                    <div class="text-[11px] ">
                      Powered by{" "}
                      <a
                        href="https://www.deco.cx"
                        aria-label="powered by https://www.deco.cx"
                      >
                        <Icon
                          id="Deco"
                          height={20}
                          width={60}
                          strokeWidth={0.01}
                        />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Mobile view */}
              <ul class="flex flex-col lg:hidden gap-[15px] sm:px-6">
                {sections.map((section) => (
                  <li class="pb-[20px]">
                    <Text variant="footer" tone="title" class="uppercase">
                      <details>
                        <summary class="list-none flex justify-between items-center">
                          {section.label}
                          <Icon
                            class="text-[#000]"
                            id="ChevronDown"
                            size={20}
                            strokeWidth={1}
                          />
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
                      <summary class="list-none flex justify-between items-center">
                        Certificados
                        <Icon
                          class="text-[#000]"
                          id="ChevronDown"
                          size={20}
                          strokeWidth={1}
                        />
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
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <details>
                      <summary class="list-none flex justify-between items-center">
                        Parceiros
                        <Icon
                          class="text-[#000]"
                          id="ChevronDown"
                          size={20}
                          strokeWidth={1}
                        />
                      </summary>

                      <ul
                        class={`flex flex-col gap-2`}
                      >
                        {parceiros?.map((parceiro) => (
                          <li class="pt-[25px] mb-[20px]">
                            <a
                              class="text-[#000] text-[12px] hover:text-underline"
                              href={parceiro.url}
                            >
                              {parceiro.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </Text>
                </li>
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <details>
                      <summary class="list-none flex justify-between items-center">
                        Atendimentos
                        <Icon
                          class="text-[#000]"
                          id="ChevronDown"
                          size={20}
                          strokeWidth={1}
                        />
                      </summary>

                      <ul
                        class={`flex flex-col gap-2`}
                      >
                        <li class="pt-[25px] mb-[20px]">
                          <div class="flex items-center justify-start gap-2 mb-[5px]">
                            <Icon
                              class="text-badge"
                              id="Email"
                              width={25}
                              height={25}
                            />
                            <span class="text-[10px] text-[#000]">
                              {atendimento?.email}
                            </span>
                          </div>
                          <span class="text-[10px] text-[#000]">
                            {atendimento?.horario}
                          </span>
                        </li>
                      </ul>
                    </details>
                  </Text>
                </li>
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <details>
                      <summary class="list-none flex justify-between items-center">
                        Redes sociais
                        <Icon
                          class="text-[#000]"
                          id="ChevronDown"
                          size={20}
                          strokeWidth={1}
                        />
                      </summary>

                      <div
                        class={`flex flex-wrap items-center gap-4 pt-6`}
                      >
                        <a href={redesSociais?.facebook}>
                          <Icon id="Facebook" width={25} height={25} />
                        </a>
                        <a href={redesSociais?.instagram}>
                          <Icon id="Instagram" width={25} height={25} />
                        </a>
                      </div>
                    </details>
                  </Text>
                </li>
                <li class="pb-[20px]">
                  <Text variant="footer" tone="title" class="uppercase">
                    <details>
                      <summary class="list-none flex justify-between items-center">
                        Formas de pagamento
                        <Icon
                          class="text-[#000]"
                          id="ChevronDown"
                          size={20}
                          strokeWidth={1}
                        />
                      </summary>

                      <ul
                        class={`flex flex-wrap items-center gap-2`}
                      >
                        {pagamento?.map((pagamento) => (
                          <li class="pt-[25px] mb-[20px]">
                            <Picture class="w-[45px]">
                              <img
                                class="object-cover w-[45px] h-auto"
                                loading={"lazy"}
                                src={pagamento.image}
                                alt={pagamento?.alt}
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

        <div class="lg:hidden">
          <Container class="w-full">
            <FooterContainer class="w-full py-[15px] text-[10px] text-[#adb5bd] text-center">
              <div class="flex justify-center items-center mb-[15px]">
                <span
                  class="flex items-center gap-1 text-[12px] text-[#000]"
                >
                  Created by{" "}
                  <a
                    href="https://www.deco.cx"
                    aria-label="powered by https://www.deco.cx"
                  >
                    <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                  </a>
                </span>
              </div>
              <div class="flex justify-center items-center mb-[15px]">
                <span
                  class="flex items-center gap-1 text-[12px] text-[#000]"
                >
                  Powered by{" "}
                  <a
                    href="https://www.deco.cx"
                    aria-label="powered by https://www.deco.cx"
                  >
                    <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                  </a>
                </span>
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
