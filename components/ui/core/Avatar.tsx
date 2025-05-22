import Image from "next/image";

export default function Avatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border shadow-sm">
      <Image src={src} alt={alt || "avatar"} width={40} height={40} className="object-cover" />
    </div>
  );
}