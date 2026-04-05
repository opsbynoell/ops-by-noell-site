import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconEye, IconShieldCheck } from "@tabler/icons-react";
import React from "react";

export const SkeletonThree = () => {
  return (
    <div className="flex-1 rounded-t-3xl gap-2 flex flex-col z-20 mx-auto w-full h-full absolute inset-0 pt-2 px-2 perspective-[4000px] max-w-lg">
      <div
        className={cn(
          "flex items-center justify-center gap-12 h-[200%]",
          "absolute -inset-x-[150%] -inset-y-40",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,var(--color-neutral-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-200)_1px,transparent_1px)]",
          "mask-radial-from-50% mask-t-from-50% mask-b-from-50%"
        )}
        style={{
          transform: "rotateY(20deg) rotateX(50deg) rotateZ(40deg)",
        }}
      >
        <div className="px-4 py-2 rounded-full bg-teal-50 border border-teal-300 text-teal-600 font-semibold flex items-center gap-2 text-sm">
          <IconShieldCheck className="size-4" />
          <span>Active</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-green-50 border border-green-300 text-green-600 font-semibold flex items-center gap-2 text-sm">
          <IconBrandGoogle className="size-4" />
          <span>Monitoring</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-300 text-blue-600 font-semibold flex items-center gap-2 text-sm">
          <IconEye className="size-4" />
          <span>Responding</span>
        </div>
      </div>
    </div>
  );
};
