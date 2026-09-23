import React from "react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { RxInfoCircled } from "react-icons/rx"
import { Text } from "@radix-ui/themes"
import { useLocale } from "next-intl"

const TooltipIcon = () => {
  const locale = useLocale()
  const isZh = locale === "zh"

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={isZh ? "查看联系提示" : "View contact guidance"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-transparent text-primary transition-colors hover:border-border hover:bg-accent"
          >
            <RxInfoCircled aria-hidden="true" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade max-w-xs select-none rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground shadow-[0_20px_45px_-25px_rgba(3,10,18,0.55)] will-change-[transform,opacity]"
            sideOffset={5}
          >
            <Text as="p" className="text-foreground">
              {isZh
                ? "在这里，您每天最多可发送 3 封邮件"
                : "You can send up to 3 emails per day here."}
            </Text>
            <Text as="p" className="pt-2 text-foreground">
              {isZh
                ? "达到上限后，可以通过 jie.craft@outlook.com 直接联系"
                : "After reaching the limit, contact Jie directly at jie.craft@outlook.com."}
            </Text>
            <Tooltip.Arrow className="fill-card" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipIcon
