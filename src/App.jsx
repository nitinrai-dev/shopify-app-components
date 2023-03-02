import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import productData from "./assets/products";

const itemsPerPage = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allSelected, setAllSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [search, setSearch] = useState("");

  const statusTabs = ["all", "active", "draft", "archived"];

  useEffect(() => {
    setAllSelected(false);
    setSelectedProducts([]);
  }, [selectedCategory, search]);

  useEffect(() => {
    setAllSelected(false);
    setSelectedProducts([]);
  }, []);

  const filteredData = productData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.status === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleAllSelection = (e) => {
    const checked = e.target.checked;
    setAllSelected(checked);
    setSelectedProducts(checked ? filteredData : []);
  };

  const handleItemSelection = (item) => {
    const itemIndex = selectedProducts.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (itemIndex !== -1) {
      setSelectedProducts(
        selectedProducts.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-green-800 px-6 py-4">
        Products
      </h1>

      <div className="relative overflow-x-auto text-center">
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {statusTabs.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="mr-2"
              >
                <a
                  href="#"
                  className={`inline-block px-4 py-3 rounded-lg font-semibold ${
                    category === selectedCategory
                      ? "text-green-700 bg-green-50 active"
                      : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Search all products"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-green-500 ml-2"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Filters
              <AdjustmentsVerticalIcon
                className="h-4 w-4 ml-2"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pl-6 py-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleAllSelection}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Vendor
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className={`border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                  selectedProducts.some((selection) => selection.id === item.id)
                    ? "bg-green-50"
                    : "bg-white"
                }`}
              >
                <td className="w-4 pl-6 py-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      checked={selectedProducts.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      onChange={() => handleItemSelection(item)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    src={item.image?.src}
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{item?.title}</div>
                    <div className="font-normal text-gray-500">
                      ID: {item.id}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full 
                      ${(() => {
                        if (item.status == "active") {
                          return "bg-green-100 text-green-800";
                        } else if (item.status == "draft") {
                          return "bg-orange-100 text-orange-800";
                        } else {
                          return "bg-red-100 text-red-800";
                        }
                      })()}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 
                          ${(() => {
                            if (item.status == "active") {
                              return "bg-green-500";
                            } else if (item.status == "draft") {
                              return "bg-orange-400";
                            } else {
                              return "bg-red-500";
                            }
                          })()}`}
                    ></div>{" "}
                    {item?.status.charAt(0).toUpperCase() +
                      item.status.slice(1)}
                  </div>
                </td>
                <td className="px-6 py-4">{item?.product_type}</td>
                <td className="px-6 py-4">{item?.vendor}</td>
                <td className="px-6 py-4">
                  {/* <!-- Modal toggle --> */}
                  <a
                    href="#"
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium text-green-600 dark:text-green-500 hover:underline flex items-center"
                  >
                    Edit{" "}
                    <PencilSquareIcon
                      className="h-4 w-4 ml-2"
                      aria-hidden="true"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4">
          <p>
            Showing {currentPage}-{filteredData.length / itemsPerPage} of{" "}
            {filteredData.length} items.
          </p>

          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm py-4"
            aria-label="Pagination"
          >
            {currentPage && (
              <a
                onClick={() => handlePageChange(currentPage - 1)}
                href="#"
                className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${
                  currentPage === 1
                    ? "pointer-events-none cursor-default opacity-60"
                    : null
                }`}
                title="Previous"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {currentPage && (
              <a
                onClick={() => handlePageChange(currentPage + 1)}
                href="#"
                className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${
                  currentPage >= totalPages
                    ? "pointer-events-none cursor-default opacity-60"
                    : null
                }`}
                title="Next"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
