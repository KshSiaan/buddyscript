import { cn } from "@/lib/utils";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

function Spinner({ className, ...props }: Omit<HugeiconsIconProps, "icon">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <HugeiconsIcon
      suppressHydrationWarning
      icon={Loading03Icon}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
