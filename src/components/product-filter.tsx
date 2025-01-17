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
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Outils</h1>
        <div className="filters">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`filter-btn ${
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
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      <ul className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {filteredTools.map((tool) => (
          <li className="border p-4 rounded flex flex-col gap-4 justify-between bg-slate-50 shadow-md">
            <div>
              <div className="flex items-start justify-between">
                <h2 className="font-semibold">{tool.data.Name}</h2>

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

            <div className="flex gap-2 flex-wrap">
              {tool.data["Name (from Category)"]?.map((category) => (
                <div className="border px-2 rounded-md shadow">{category}</div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        .filters {
          margin: 20px 0;
        }
        .filter-btn {
          margin-right: 10px;
          padding: 5px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
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
