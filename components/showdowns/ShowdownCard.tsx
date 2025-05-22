export interface ShowdownCardProps {
  id: string;
  title: string;
  description?: string;
  optionA: string;
  optionB: string;
  imageA?: string;
  imageB?: string;
}

export function ShowdownCard({
  id,
  title,
  description,
  optionA,
  optionB,
  imageA,
  imageB,
}: ShowdownCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border bg-white">
      <div className="w-full h-40 flex">
        <Image
          src={imageA || "/presets/placeholder.jpg"}
          alt={optionA}
          className="w-1/2 object-cover"
        / />
        <Image
          src={imageB || "/presets/placeholder.jpg"}
          alt={optionB}
          className="w-1/2 object-cover"
        / />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
