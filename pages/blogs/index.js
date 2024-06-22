// pages/blogs.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const Blogs = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return null;
    }
    // Fetch blogs data here (replace with your API call)
    //   const fetchBlogs = async () => {
    //     const response = await fetch('/api/blogs');
    //     const data = await response.json();
    //     setBlogs(data);
    //   };
    //   fetchBlogs();
    // }, [session, router]);

    const fetchBlogs = async () => {
      const data = [
        { id: 1, title: "Blog Post 1", category: "Technology" },
        { id: 2, title: "Blog Post 2", category: "Health" },
        { id: 3, title: "Blog Post 3", category: "Business" },
        // Add more dummy blogs as needed
      ];
      setBlogs(data);
    };
    fetchBlogs();
  }, [session, router]);

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-28">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {blog.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
