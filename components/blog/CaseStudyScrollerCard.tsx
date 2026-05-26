import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface CaseStudyItem {
  slug: string
  title: string
  excerpt: string
  cover: string
  domain: string
  stack: string
  gradient: string
}

export default function CaseStudyScrollerCard({ item }: { item: CaseStudyItem }) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className={cn(
        "group block snap-start shrink-0 w-[300px] sm:w-[360px] md:w-[420px]",
        "rounded-2xl glass glass-hover overflow-hidden border border-primary/25 dark:border-primary/30",
        "transition-transform duration-300 hover:-translate-y-1"
      )}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted/40">
        {item.cover ? (
          <Image
            src={item.cover}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="420px"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", item.gradient)} aria-hidden />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
            Case Study
          </span>
          <span className="rounded-full bg-background/70 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-foreground/85 border border-white/20">
            {item.domain}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-foreground/75 line-clamp-2 leading-relaxed">{item.excerpt}</p>
        <div className="pt-1 flex items-center gap-2 text-[11px] text-foreground/55">
          <span className="font-mono">{item.stack}</span>
        </div>
      </div>
    </Link>
  )
}
