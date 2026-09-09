import Reveal from './Reveal.jsx'

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-beige/50 pb-14 pt-28 lg:pb-20 lg:pt-36">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            {eyebrow}
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h1 className="section-title mt-4">{title}</h1>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  )
}
