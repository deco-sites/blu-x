import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import ContainerCustom from "$store/components/ui/ContainerCustom.tsx";
import AlertCustom from "$store/components/ui/AlertCustom.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: AvailableIcons;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  features: Feature[];
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <ContainerCustom class="p-6 sm:px-0 sm:py-10 bg-gray-100">
      <div>
        <div class="md:hidden">
          <AlertCustom alerts={features} />
        </div>
        <div class="hidden md:flex flex-row justify-evenly sm:flex-row divide-y-1 sm:divide-y-0 sm:divide-x-1 divide-default mx-6 sm:mx-0 sm:my-10">
          {features.map(({ icon: id = "Truck", title, description }) => (
            <div class="w-2/6">
              <div class="flex md:justify-center items-center gap-4 py-6 sm:py-0 sm:px-10">
                <Icon
                  class="text-badge"
                  id={id}
                  width={40}
                  height={40}
                  strokeWidth={3}
                />
                <Text variant="body">{title}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerCustom>
  );
}

export default FeatureHighlights;
