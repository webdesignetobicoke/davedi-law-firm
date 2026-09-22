import Image from "next/image";
import Link from "next/link";
import { Lawyer } from "@/lib/lawyers";
import { WhatsAppButton } from "./WhatsAppButton";

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <div className="flex h-full flex-col bg-white border border-line">
      <Link href={`/lawyers/${lawyer.slug}`} className="block relative h-80 overflow-hidden bg-navy-deep/5">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl text-navy">
          <Link href={`/lawyers/${lawyer.slug}`} className="hover:text-gold transition-colors">
            {lawyer.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold">{lawyer.title}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{lawyer.bio[0]}</p>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Link
            href={`/lawyers/${lawyer.slug}`}
            className="flex w-full items-center justify-center bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep"
          >
            Full Profile
          </Link>
          <WhatsAppButton href={lawyer.whatsapp} label="WhatsApp" className="w-full py-2.5 text-xs" />
        </div>
      </div>
    </div>
  );
}
