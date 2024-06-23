import axios from "axios";
import { useRouter } from "next/router";
import React, { Children, useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import 'react-markdown-editor-lite/lib/index.css'

const Blog = () => {
  const [redirect, setRedirect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const categories = ["Mobile", "Laptop", "Tablets"];
  const statuses = ["Draft", "Publish"];

  const router = useRouter();

  const toggleDropdownCategory = () => {
    setDropdownOpenCategory(!dropdownOpenCategory);
    if (dropdownOpenStatus) setDropdownOpenStatus(false);
  };

  const toggleDropdownStatus = () => {
    setDropdownOpenStatus(!dropdownOpenStatus);
    if (dropdownOpenCategory) setDropdownOpenCategory(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDropdownOpenCategory(false); // Close the dropdown after selection
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setDropdownOpenStatus(false); // Close the dropdown after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission

    const data = {
      title,
      slug,
      description,
      blogCategory: selectedCategory,
      status: selectedStatus,
    };

    if (_id) {
      await axios.put("/api/blogapi", { ...data, _id });
    } else {
      await axios.post("/api/blogapi");
    }

    setRedirect(true);

    console.log({
      title,
      slug,
      description,
      blogCategory: selectedCategory,
      status: selectedStatus,
    });
  };

  if (redirect) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title here"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Blog Slug */}
          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block text-gray-700 font-bold mb-2"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter slug URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Blog Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Blog Content
            </label>

            <MarkdownEditor
            className="w-full h-full"
              value={description}
              onChange={(e) => setDescription(e.text)}
              renderHTML={(text) => {
                <ReactMarkdown
                
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      if (inline) {
                        return <code>{children}</code>;
                      } else if (match) {
                        return (
                          <div style={{ position: "relative" }}>
                            <pre
                              style={{
                                padding: "0",
                                borderRadius: "5px",
                                overflowX: "auto",
                                whiteSpace: "pre-wrap",
                              }}
                              {...props}
                            >
                              <code>{children}</code>
                            </pre>
                            <button
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                zIndex: "1",
                              }}
                              onClick={() =>
                                navigator.clipboard.writeText(children)
                              }
                            >
                              copy code
                            </button>
                          </div>
                        );
                      } else {
                        return <code {...props}> {children}</code>;
                      }
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>;
              }}
            />

           
          </div>

          {/* Blog Category */}
          <div className="mb-6 relative">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <div
              onClick={toggleDropdownCategory}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer flex justify-between items-center"
            >
              <span>
                {selectedCategory ? selectedCategory : "Select category"}
              </span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
            {dropdownOpenCategory && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`p-3 cursor-pointer hover:bg-gray-100 ${
                      selectedCategory === category ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Blog Status */}
          <div className="mb-6 relative">
            <label
              htmlFor="status"
              className="block text-gray-700 font-bold mb-2"
            >
              Status
            </label>
            <div
              onClick={toggleDropdownStatus}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer flex justify-between items-center"
            >
              <span>{selectedStatus ? selectedStatus : "Select status"}</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
            {dropdownOpenStatus && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {statuses.map((status) => (
                  <li
                    key={status}
                    className={`p-3 cursor-pointer hover:bg-gray-100 ${
                      selectedStatus === status ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
