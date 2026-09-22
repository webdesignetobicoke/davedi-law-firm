import Image from "next/image";
import Link from "next/link";
import { PracticeArea } from "@/lib/services";

export function PracticeAreaCard({ area }: { area: PracticeArea }) {
  return (
    <div id={area.slug} className="group flex h-full flex-col bg-white border border-line scroll-mt-28">
      <Link href={`/services/${area.slug}`} className="block relative h-56 overflow-hidden">
        <Image
          src={area.image}
          alt={area.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl text-navy">
          <Link href={`/services/${area.slug}`} className="hover:text-gold transition-colors">
            {area.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{area.summary}</p>
        <ul className="mt-4 mb-5 space-y-2">
          {area.services.map((service) => (
            <li key={service} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
              {service}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${area.slug}`}
          className="mt-auto flex w-full items-center justify-center bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold hover:text-navy-deep"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
