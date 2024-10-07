"use client";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { MdLibraryBooks } from "react-icons/md";

// Dummy data for resources to show in cards
const dummyResources = [
  {
    title: "Resource 1",
    link: "https://example.com/resource1",
    date: "2024-10-01",
  },
  {
    title: "Resource 2",
    link: "https://example.com/resource2",
    date: "2024-10-02",
  },
  {
    title: "Resource 3",
    link: "https://example.com/resource3",
    date: "2024-10-03",
  },
  {
    title: "Resource 4",
    link: "https://example.com/resource4",
    date: "2024-10-04",
  },
  {
    title: "Resource 5",
    link: "https://example.com/resource5",
    date: "2024-10-05",
  },
];

export default function UploadResources() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [tab, setTab] = useState("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitResource = () => {
    setLoading(true);
    setError(null);

    // Add your resource submission logic here

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Upload and View Resources</h1>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#"
              className={`inline-flex items-center justify-center p-4 border-b-2 ${
                tab === "upload"
                  ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 "
              } rounded-t-lg group`}
              onClick={() => setTab("upload")}
            >
              <FaFileAlt
                className={`w-5 h-5 me-2 ${
                  tab === "upload"
                    ? "text-orange-600 dark:text-orange-500"
                    : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                }`}
              />
              Upload Resources
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className={`inline-flex items-center justify-center p-4 border-b-2 ${
                tab === "view"
                  ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 "
              } rounded-t-lg group`}
              onClick={() => setTab("view")}
            >
              <MdLibraryBooks
                className={`w-5 h-5 me-2 ${
                  tab === "view"
                    ? "text-orange-600 dark:text-orange-500"
                    : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                }`}
              />
              View Resources
            </a>
          </li>
        </ul>
      </div>

      {tab === "upload" ? (
        <div>
            {/* Resource Name Input */}
            <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Resource Name
            </label>
            <input
            type="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="The resource name"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            />
            </div>
      
          {/* File Upload */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload File
            </label>
            <input
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={handleFileUpload}
            />
          </div>

          {/* Link Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Link
            </label>
            <input
              type="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Paste the link here"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            onClick={handleSubmitResource}
            disabled={loading}
          >
            {loading ? (
              <>
                <CgSpinner className="animate-spin inline-block w-5 h-5 me-2" />
                Uploading...
              </>
            ) : (
              "Submit Resource"
            )}
          </button>

          {error && <div className="text-red-500">{error}</div>}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Display resources in cards */}
          {dummyResources.map((resource, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {resource.title}
              </h3>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline"
              >
                {resource.link}
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Shared on: {resource.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
