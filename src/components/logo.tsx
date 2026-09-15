import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * اللوجو الرسمي مقصوص من صورة البروفايل على الصفحات الرسمية.
 * خلفية الصورة بيج ثابت (#E6D9C9) فبتتحط على شريحة بنفس اللون عشان تبان مقصودة.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-beige",
        className
      )}
    >
      <Image
        src="/brand/logo-square.png"
        alt=""
        width={512}
        height={512}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}

export function Logo({
  ar,
  tagline,
  className,
  invert = false,
}: {
  ar: string;
  tagline?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="overflow-hidden rounded-2xl bg-beige px-2.5 py-1.5">
        <Image
          src="/brand/logo.png"
          alt={ar}
          width={700}
          height={370}
          className="h-9 w-auto"
          priority
        />
      </span>
      {tagline && (
        <span
          className={cn(
            "hidden text-[11.5px] font-bold leading-tight sm:block",
            invert ? "text-white/60" : "text-muted"
          )}
        >
          {tagline}
        </span>
      )}
    </span>
  );
}
