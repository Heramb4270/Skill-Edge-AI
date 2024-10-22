"use client";
import { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { MdLibraryBooks } from "react-icons/md";
import { db, storage } from "@/firebase/firebase"; // Import Firestore and Storage
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadResources() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [tab, setTab] = useState("view");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resources, setResources] = useState([]);

  // Fetch resources from Firestore when "View" tab is clicked
  useEffect(() => {
    if (tab === "view") {
      fetchResources();
    }
  }, [tab]);

  // Handle file upload
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Fetch resources from Firestore
  const fetchResources = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const fetchedResources = querySnapshot.docs.map((doc) => doc.data());
      setResources(fetchedResources);
    } catch (error) {
      console.error("Error fetching resources: ", error);
    }
    setLoading(false);
  };

  // Submit resource (either file or link)
  const handleSubmitResource = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if both file and link are empty
      if (!file && !link) {
        setError("Please upload a file or provide a link.");
        setLoading(false);
        return;
      }

      let resourceUrl = link || null; // Store null if no link is provided
      if (file) {
        // If the user uploads a file, store it in Firebase Storage
        const fileRef = ref(storage, `resources/${file.name}`);
        await uploadBytes(fileRef, file);
        resourceUrl = await getDownloadURL(fileRef); // Get the file URL after upload
      }

      // Store resource details in Firestore
      await addDoc(collection(db, "resources"), {
        name: name || file?.name,
        link: link || null, // Store null if no link is provided
        url: resourceUrl,
        date: serverTimestamp(), // Use Firebase server timestamp
      });

      // Clear input fields
      setFile(null);
      setLink("");
      setName("");
      alert("Resource uploaded successfully.");
      // Fetch updated resources
      fetchResources();
    } catch (error) {
      setError("Failed to upload resource.");
      console.error("Error uploading resource: ", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Upload and View Resources</h1>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {/* <li className="me-2">
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
          </li> */}
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
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="The resource name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          {resources.map((resource, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {resource.name}
              </h3>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-4 py-2 mt-2 mr-5 text-white ${
                  resource.url ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-400 cursor-not-allowed"
                } rounded-md transition duration-300`}
                onClick={resource.url ? null : (e) => e.preventDefault()}
              >
                {resource.url ? "Open Resource" : "Resource Not Available"}
              </a>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-4 py-2 mt-2 text-white ${
                  resource.link ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                } rounded-md transition duration-300`}
                onClick={resource.link ? null : (e) => e.preventDefault()}
              >
                {resource.link ? "Open Link" : "Link Not Available"}
              </a>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Uploaded on: {resource.date?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
          {loading && <CgSpinner className="animate-spin mx-auto text-2xl" />}
        </div>
      )}
    </div>
  );
}
