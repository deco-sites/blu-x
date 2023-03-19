import Text from "$store/components/ui/Text.tsx";
import ContainerCustom from "../ui/ContainerCustom.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col px-4 md:flex-row items-center gap-6 sm:gap-10">
      <div class="max-w-[350px] text-center md:text-left">
        <Text
            variant="heading-2"
            tone="default-inverse"
            class="uppercase"
          >
            <strong class="font-semibold">Cadastre-se</strong>{" "}
            e receba novidades e promoções 
          </Text>
      </div>
      <form class="flex flex-col md:flex-row items-center gap-4 font-body text-body sm:w-[458px]" style={{width:'100%'}}>
        <input
          class="h-12 w-full px-3 flex-grow bg-footer text-[#dee2e6] border-1 border-[#dee2e6]"
          placeholder="Nome"
        />
        <input
          class="h-12 w-full px-3 flex-grow bg-footer text-[#dee2e6] border-1 border-[#dee2e6]"
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
