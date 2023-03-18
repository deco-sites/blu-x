import Text from "$store/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-20">
      <div class="flex flex-col gap-2 max-w-[350px]">
        <Text
          variant="heading-2"
          tone="default-inverse"
          class="font-newsletter"
        >
          <strong class="font-semibold">CADASTRE-SE</strong>{" "}
          E RECEBA NOVIDADES E PROMOÇÕES
        </Text>
      </div>
      <form class="flex flex-col md:flex-row items-center gap-4 font-body text-body w-full sm:w-[458px]">
        <input
          class="h-12 px-3 flex-grow bg-footer text-[#dee2e6] border-1 border-[#dee2e6]"
          placeholder="Nome"
        />
        <input
          class="h-12 px-3 flex-grow bg-footer text-[#dee2e6] border-1 border-[#dee2e6]"
          placeholder="E-mail"
        />
        <button
          class="h-12 px-10 text-sm text-white bg-badge min-w-max font-bold"
          type="bgutton" // prevent form's default behavior
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
