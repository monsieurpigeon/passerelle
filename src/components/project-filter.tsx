import type { RenderedContent } from "astro:content";
import { Link2 } from "lucide-react";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

interface Project {
  id: string;
  body?: string;
  collection: "projects";
  data: {
    index?: number | undefined;
    Name?: string | undefined;
    Description?: string | undefined;
    Level?: number | undefined;
    Link?: string | undefined;
    instagram?: string | undefined;
    X?: string | undefined;
    Assignees?: unknown | undefined;
    "Name (from Assignee)"?: string[] | undefined;
    Stack?: unknown | undefined;
    "Name (from Stack)"?: string[] | undefined;
  };
  rendered?: RenderedContent;
  filePath?: string;
}

interface ProjectFilterProps {
  projects: Project[];
}

export default function ProjectFilter({ projects }: ProjectFilterProps) {
  const [sortBy, setSortBy] = useState<"level" | "recent">("level");

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold">{projects.length} Projets</h1>

        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setSortBy("level")}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              sortBy === "level"
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Niveau
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
        {projects
          .sort((a, b) => {
            if (sortBy === "level") {
              return (b.data.Level || 0) - (a.data.Level || 0);
            } else {
              return (b.data.index || 0) - (a.data.index || 0);
            }
          })
          .map((project) => {
            const ids = project.data.Stack as string[];
            const stack = project.data["Name (from Stack)"]
              ?.map((name, index) => {
                return {
                  name,
                  id: ids[index],
                };
              })
              .sort((a, b) => a.name.localeCompare(b.name));

            return (
              <li className="border p-4 rounded flex flex-col gap-4 justify-between bg-slate-50 shadow-md">
                <div>
                  <div className="flex items-center justify-between relative">
                    <div className="text-lg font-bold">
                      <span className="px-2 rounded-full absolute -top-7 -left-4 bg-slate-100 shadow-md">
                        {project.data.Level}
                        ⭐️
                      </span>
                      <a
                        href={`/project/${project.id}`}
                        className="hover:underline"
                      >
                        {project.data.Name}
                      </a>
                    </div>

                    <div className="flex">
                      {project.data.instagram && (
                        <a
                          href={`https://www.instagram.com/${project.data.instagram}`}
                          target="_blank"
                          aria-label="Lien Instagram"
                        >
                          <div className="p-1 rounded hover:bg-slate-200">
                            <FaInstagram size={20} />
                          </div>
                        </a>
                      )}
                      {project.data.Link && (
                        <a href={project.data.Link} target="_blank">
                          <div className="p-1 rounded hover:bg-slate-200">
                            <Link2 size={20} />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.data["Name (from Assignee)"]?.map(
                      (person, index) => {
                        return (
                          <a
                            href={`/person/${
                              (project.data.Assignees as string[])[index]
                            }`}
                            className="text-sm hover:opacity-70"
                          >
                            {person}
                          </a>
                        );
                      }
                    )}
                  </div>

                  <p className="opacity-70">{project.data.Description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stack?.map((tool) => (
                    <a href={`/tool/${tool.id}`} className="hover:underline">
                      <div className="border shadow px-2 rounded">
                        {tool.name}
                      </div>
                    </a>
                  ))}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
