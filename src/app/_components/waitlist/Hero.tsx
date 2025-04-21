import WaitlistForm from '@/app/_components/waitlist/WaitlistForm'

export default function Hero() {
  return (
    <section className="relative min-h-screen py-20 md:py-44">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Beta badge with animated lines */}
          <div className="badge-glow">
            <div className="badge-glow-line-left" />
            <div className="flex items-center gap-1">
              <span className="badge-glow-icon">🧪</span>
              <span className="badge-glow-text">Beta Access · Coming Soon</span>
            </div>
            <div className="badge-glow-line" />
          </div>

          {/* Animated headline */}
          <h1 className="animated-headline mb-6 text-4xl font-extrabold tracking-tight text-foreground/90 sm:text-5xl md:text-6xl">
            Add smart control to your Notion forms
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed tracking-tight text-muted-foreground md:text-lg">
            Show or hide fields, validate responses —
            <br className="hidden sm:inline" />
            without breaking your flow in Notion. More control, right where you
            need it.
          </p>
        </div>

        {/* Waitlist form */}
        <div className="mx-auto max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
