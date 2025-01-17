// src/components/ProductFilter.tsx
import { Link2 } from "lucide-react";
import { useState } from "react";

interface Tool {
  id: string;
  body?: string;
  collection: "tools";
  data: {
    Name?: string | undefined;
    Category?: unknown | undefined;
    "Name (from Category)"?: string[] | undefined;
    Description?: string | undefined;
    link?: string | undefined;
    Persons?: unknown | undefined;
    Projects?: unknown | undefined;
  };
  filePath?: string;
}

interface ToolFilterProps {
  tools: Tool[];
}

export default function ToolFilter({ tools }: ToolFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = selectedCategory
    ? tools.filter((tool) =>
        (tool.data["Name (from Category)"] || [""]).includes(selectedCategory)
      )
    : tools;

  const categories = tools.reduce((acc, tool) => {
    const toolCategories = tool.data["Name (from Category)"] || [];
    toolCategories.forEach((category) => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, [] as string[]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-xl font-bold">Outils</h1>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full filter-btn ${
              selectedCategory === null ? "active" : ""
            }`}
          >
            Tous
          </button>
          {categories
            .sort((a, b) => a.localeCompare(b))
            .map((category) => (
              <button
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredTools.map((tool) => (
          <li className="border p-4 rounded flex flex-col gap-4 justify-between bg-slate-50 shadow-md">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center flex-wrap">
                  <div className="font-semibold">{tool.data.Name}</div>
                  <div className="flex gap-2 flex-wrap">
                    {tool.data["Name (from Category)"]
                      ?.sort((a, b) => a.localeCompare(b))
                      .map((category) => (
                        <div className="text-xs px-1 rounded-full shadow break-keep">
                          {category}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {tool.data.link && (
                    <a href={tool.data.link} target="_blank">
                      <div className="p-1 rounded hover:bg-slate-200">
                        <Link2 size={20} />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <p className="opacity-70">{tool.data.Description}</p>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        .filters {
          margin: 20px 0;
        }
        .filter-btn {
          padding: 0px 8px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }
        .filter-btn.active {
          background: #007bff;
          color: white;
          border-color: #0056b3;
        }
        .product-card {
          border: 1px solid #eee;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
