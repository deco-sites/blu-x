import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-6 right-6 z-40"
      aria-label="Chat on WhatsApp"
    >
      <div class="bg-[#DDDDDE] py-2 px-4 rounded-full flex items-center justify-center gap-4">
        <button
          class="bg-[#45D268] text-white p-2 rounded-full shadow-lg"
          aria-label="Chat on WhatsApp"
        >
          <Icon id="WhatsApp" size={15} />
        </button>
        <p class="text-[#4d4d44] text-[11px] tracking-[3px]">Ajuda</p>
      </div>
    </a>
  );
}

export default WhatsApp;
