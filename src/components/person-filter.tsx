import type { RenderedContent } from "astro:content";
import { CircleDollarSign, Github, Link2, Linkedin } from "lucide-react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { PiXLogo } from "react-icons/pi";

interface Person {
  id: string;
  body?: string;
  collection: "persons";
  data: {
    index?: number | undefined;
    Name?: string | undefined;
    Surname?: string | undefined;
    Ville?: string | undefined;
    Description?: string | undefined;
    job?: string | undefined;
    discord?: string | undefined;
    linkedin?: string | undefined;
    github?: string | undefined;
    perso?: string | undefined;
    x?: string | undefined;
    freelance?: string | undefined;
    projects?: unknown | undefined;
    Specialist?: unknown | undefined;
    "Name (from Projects)"?: string[] | undefined;
    "Level (from Projects)"?: number[] | undefined;
    "Name (from Specialist)"?: string[] | undefined;
  };
  rendered?: RenderedContent;
  filePath?: string;
}

interface PersonFilterProps {
  persons: Person[];
}

export default function PersonFilter({ persons }: PersonFilterProps) {
  const [sortBy, setSortBy] = useState<"alpha" | "recent">("alpha");

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold">{persons.length} Indies</h1>

        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setSortBy("alpha")}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              sortBy === "alpha"
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Alphabétique
          </button>
          <button
            onClick={() => setSortBy("recent")}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              sortBy === "recent"
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Plus récent
          </button>
        </div>
      </div>

      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {persons
          .filter((person) => person.data.Name)
          .sort((a, b) => {
            if (sortBy === "alpha") {
              return (a.data.Surname || "").localeCompare(b.data.Surname || "");
            } else {
              // Pour le tri par date, on utilise l'index (les plus récents ont un index plus élevé)
              const indexA = a.data.index || 0;
              const indexB = b.data.index || 0;
              return indexB - indexA;
            }
          })
          .map((person) => {
            const ids = person.data.projects as string[];
            const projects = person.data["Name (from Projects)"]
              ?.map((name, index) => {
                return {
                  name,
                  id: ids[index],
                };
              })
              .sort((a, b) => {
                return (b.name || "").localeCompare(a.name || "");
              });

            return (
              <li key={person.id}>
                <div className="h-full border p-4 rounded flex flex-col gap-4 justify-between bg-slate-50 shadow-md">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold flex gap-1 items-center leading-3">
                          <a
                            href={`/person/${person.id}`}
                            className="hover:underline"
                          >
                            {person.data.Name}
                          </a>
                        </div>

                        <p className="opacity-70">
                          {person.data.job}{" "}
                          <span className="text-sm">📍{person.data.Ville}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <FaDiscord />

                          <p className="text-sm opacity-50">
                            {person.data.discord}
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        {person.data.perso && (
                          <a
                            href={person.data.perso}
                            target="_blank"
                            aria-label="Site web perso"
                          >
                            <div className="p-1 rounded hover:bg-slate-200">
                              <Link2 size={20} />
                            </div>
                          </a>
                        )}
                        {person.data.freelance && (
                          <a
                            href={person.data.freelance}
                            target="_blank"
                            aria-label="Lien Freelance"
                          >
                            <div className="p-1 rounded hover:bg-slate-200">
                              <CircleDollarSign size={20} />
                            </div>
                          </a>
                        )}
                        {person.data.github && (
                          <a
                            href={`https://github.com/${person.data.github}`}
                            target="_blank"
                            aria-label="Lien Github"
                          >
                            <div className="p-1 rounded hover:bg-slate-200">
                              <Github size={20} />
                            </div>
                          </a>
                        )}
                        {person.data.linkedin && (
                          <a
                            href={`https://www.linkedin.com/in/${person.data.linkedin}`}
                            target="_blank"
                            aria-label="Lien LinkedIn"
                          >
                            <div className="p-1 rounded hover:bg-slate-200">
                              <Linkedin size={20} />
                            </div>
                          </a>
                        )}
                        {person.data.x && (
                          <a
                            href={`https://x.com/${person.data.x}`}
                            target="_blank"
                            aria-label="Lien X"
                          >
                            <div className="p-1 rounded hover:bg-slate-200">
                              <PiXLogo size={20} />
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {projects?.map((project) => (
                      <a
                        key={project.id}
                        href={`/project/${project.id}`}
                        className="hover:underline"
                      >
                        <div className="border shadow px-2 rounded">
                          {project.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
