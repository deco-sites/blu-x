import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Features, { Feature } from "$store/components/ui/Features.tsx";
import { useId } from "preact/hooks";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Container from "./Container.tsx";

export interface Props {
  alerts: Feature[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function AlertCustom({ alerts = [], interval = 4 }: Props) {
  const id = useId() + 1;

  return (
    <div id={id}>
      <Slider class="gap-6 scrollbar-none px-5 max-w-[300px] mx-auto">
        {alerts.map((alert) => (
          <div class="mx-auto min-w-[300px]">
            <div class="flex justify-center items-center gap-4 max-w-full">
              <Icon
                class="text-badge"
                id={alert.icon}
                width={40}
                height={40}
                strokeWidth={2}
              />
              <Text
                class="text-[14px]"
                variant="caption"
                tone="default"
              >
                {alert.title}
              </Text>
            </div>
          </div>
        ))}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default AlertCustom;
