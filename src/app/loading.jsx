import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center mt-16">
      <Image
        className="h-52"
        src="/spinner.svg"
        alt="Loading..."
        width={208}
        height={208}
      />
    </div>
  );
}
