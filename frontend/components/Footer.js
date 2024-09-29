import React from "react";
import Link from "next/link";

export default function () {
  return (
    <div>
      <footer class="bg-white rounded-lg shadow dark:bg-gray-900  mt-10">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://promptopia.vercel.app/assets/images/logo.svg"
                className="h-8"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SkillEdge AI
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="/about" class="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <a href="/contact" class="hover:underline me-4 md:me-6">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            Web Weavers
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
