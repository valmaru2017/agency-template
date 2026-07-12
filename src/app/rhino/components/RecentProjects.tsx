import Image from "next/image";

const PROJECTS = [
  {
    photo: "/rhino/project-1.jpg",
    location: "SPRING BRANCH · HOUSTON",
    name: "Full Kitchen Remodel",
    body: "Complete gut renovation with custom cabinetry and quartz counters.",
  },
  {
    photo: "/rhino/project-2.jpg",
    location: "THE HEIGHTS · HOUSTON",
    name: "Master Bath Renovation",
    body: "Spa-inspired remodel with marble finishes and a walk-in shower.",
  },
  {
    photo: "/rhino/project-3.jpg",
    location: "KATY · HOUSTON",
    name: "Investor Property Flip",
    body: "Full interior renovation completed in 9 weeks, staged and sold.",
  },
];

export default function RecentProjects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-[100px]"
    >
      <div
        data-anim="section-header"
        className="flex items-center justify-between"
      >
        <h2 className="text-meta text-muted">RECENT WORK</h2>
        <a
          href="#contact"
          className="font-sans text-[14px] font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          See all projects →
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article key={project.name} data-anim="project-card" className="group">
            <figure>
              <div className="aspect-[4/3] w-full overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={project.photo}
                    alt={`${project.name} — Rhino Construction project photo`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <figcaption className="mt-5">
                <p className="text-meta text-muted">{project.location}</p>
                <h3 className="text-display-m mt-2 text-foreground">
                  {project.name}
                </h3>
                <p className="mt-2 font-sans text-[14px] text-muted">
                  {project.body}
                </p>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
