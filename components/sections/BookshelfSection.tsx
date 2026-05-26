import Link from "next/link"
import Image from "next/image"
import { getBookshelf } from "@/lib/content"

export default async function BookshelfSection() {
  const { books } = await getBookshelf()
  if (books.length === 0) return null

  const top = books.slice(0, 3)

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gradient">Bookshelf</h2>
            <p className="text-foreground/80 max-w-xl">One-line takes. The good, the weird, the overrated.</p>
          </div>
          <Link href="/writing/books" className="text-primary font-semibold hover:underline whitespace-nowrap">
            Book reviews →
          </Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-6">
          {top.map((book) => (
            <li
              key={`${book.title}-${book.author}`}
              className="glass glass-hover rounded-[1.75rem] p-5 flex gap-4 items-start"
            >
              <div className="w-16 h-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-muted/40">
                {book.cover ? (
                  <Image src={book.cover} alt="" fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-indigo-500/20 flex items-center justify-center text-2xl font-bold text-primary/40">
                    {book.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground leading-snug">{book.title}</p>
                <p className="text-sm text-foreground/65 mb-2">{book.author}</p>
                {book.take ? (
                  <p className="text-sm text-foreground/80 line-clamp-3 italic leading-relaxed">&ldquo;{book.take}&rdquo;</p>
                ) : null}
                {book.rating != null ? <p className="text-xs text-foreground/50 mt-2">Rating: {book.rating}/5</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
