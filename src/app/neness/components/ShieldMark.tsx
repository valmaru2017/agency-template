import Image from "next/image";

export default function ShieldMark({ className }: { className?: string }) {
  return (
    <Image
      src="/neness/logo-full.png"
      alt="Neness"
      width={1135}
      height={318}
      className={`${className ?? ""} object-contain`}
    />
  );
}
