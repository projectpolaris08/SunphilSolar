import React, { useState } from "react";
import { X, Save, Image as ImageIcon } from "lucide-react";

interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  metaDescription: string;
  featuredImage: {
    url: string;
    alt: string;
    width?: string;
    height?: string;
    credits?: { author: string; source: string; link: string };
  };
  tags: string[];
  status: "draft" | "published";
  readingTime?: string;
  isFeatured?: boolean;
}

interface BlogFormProps {
  blog?: BlogFormData;
  onSave: (blog: BlogFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

// Helper to update nested fields
function setNestedFormData(
  setter: React.Dispatch<React.SetStateAction<BlogFormData>>,
  path: string[],
  value: any
) {
  setter((prev) => {
    let obj: any = { ...prev };
    let cur = obj;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      cur[key] = { ...cur[key] };
      cur = cur[key];
    }
    cur[path[path.length - 1]] = value;
    return obj;
  });
}

const BlogForm: React.FC<BlogFormProps> = ({
  blog,
  onSave,
  onCancel,
  isOpen,
}) => {
  const [formData, setFormData] = useState<BlogFormData>(
    blog || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      metaDescription: "",
      featuredImage: {
        url: "",
        alt: "",
        width: "",
        height: "",
        credits: { author: "", source: "", link: "" },
      },
      tags: [],
      status: "draft",
      readingTime: "",
      isFeatured: false,
    }
  );

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slug,
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {blog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Solar Energy Trends 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="solar-energy-trends-2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description *
              </label>
              <input
                type="text"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    metaDescription: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Meta description for SEO"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reading Time (minutes)
              </label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    readingTime: e.target.value,
                  }))
                }
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 5"
              />
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={!!formData.isFeatured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Is Featured?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="featuredImage.url"
                  value={formData.featuredImage?.url || ""}
                  onChange={(e) =>
                    setNestedFormData(
                      setFormData,
                      ["featuredImage", "url"],
                      e.target.value
                    )
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief summary of the blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Write your blog post content here... You can use Markdown formatting."
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports Markdown formatting
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Featured Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="featuredImage.alt"
                value={formData.featuredImage?.alt || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "alt"],
                    e.target.value
                  )
                }
                placeholder="Alt text"
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="featuredImage.width"
                value={formData.featuredImage?.width || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "width"],
                    e.target.value
                  )
                }
                placeholder="Width (px)"
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="featuredImage.height"
                value={formData.featuredImage?.height || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "height"],
                    e.target.value
                  )
                }
                placeholder="Height (px)"
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="featuredImage.credits.author"
                value={formData.featuredImage?.credits?.author || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "credits", "author"],
                    e.target.value
                  )
                }
                placeholder="Credits Author"
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="featuredImage.credits.source"
                value={formData.featuredImage?.credits?.source || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "credits", "source"],
                    e.target.value
                  )
                }
                placeholder="Credits Source"
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="featuredImage.credits.link"
                value={formData.featuredImage?.credits?.link || ""}
                onChange={(e) =>
                  setNestedFormData(
                    setFormData,
                    ["featuredImage", "credits", "link"],
                    e.target.value
                  )
                }
                placeholder="Credits Link"
                className="border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {blog ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
