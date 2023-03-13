import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import orders from "../../assets/orders.json";

const itemsPerPage = 10;

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");
  const [allSelected, setAllSelected] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orderData = orders.orders;

  const orderStatus = [
    ...new Set(orderData.map((order) => order.financial_status)),
  ];
  orderStatus.unshift("all");

  useEffect(() => {
    setAllSelected(false);
    setSelectedOrders([]);
  }, [selectedTab]);

  useEffect(() => {
    setAllSelected(false);
    setSelectedOrders([]);
  }, []);

  const filteredData = orderData.filter((item) => {
    const matchesCategory =
      selectedTab === "all" || item.financial_status === selectedTab;
    return matchesCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedTab(category);
    setCurrentPage(1);
  };

  const handleAllSelection = (e) => {
    const checked = e.target.checked;
    setAllSelected(checked);
    setSelectedProducts(checked ? filteredData : []);
  };

  const handleItemSelection = (item) => {
    const itemIndex = selectedOrders.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (itemIndex !== -1) {
      setSelectedProducts(
        selectedOrders.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedProducts([...selectedOrders, item]);
    }
  };

  return (
    <>
    <div className="h-full relative">
      <div className="px-3 py-4 md:px-6">
        <h2 className="text-2xl font-semibold text-green-800">Orders</h2>
      </div>

      <div className="relative overflow-x-auto text-center">
            <div className="flex items-start lg:items-center justify-between px-3 py-4 md:px-6 bg-white dark:bg-gray-800 flex-col-reverse gap-y-3 lg:flex-row">
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {orderStatus.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="mr-2"
                  >
                    <a
                      href="#"
                      className={`inline-block px-4 py-3 rounded-lg font-semibold ${
                        category === selectedTab
                          ? "text-green-700 bg-green-50 active"
                          : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
  
              <div className="flex items-center w-full lg:w-auto">
                <div className="relative w-full">
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
                    className="block w-full lg:w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder={`Search ${selectedTab} orders`}
                  />
                </div>
              </div>
            </div>
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400${
                selectedOrders.length > 0 ? "bg-green-100 " : ""
              }`}
            >
              <tr>
                <th scope="col" className="pl-3 py-4 md:pl-6">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleAllSelection}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  Order
                </th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  Total
                </th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  Payment Status
                </th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  Fulfillment Status
                </th>
                <th scope="col" className="px-3 py-3 md:px-6">
                  Items
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    selectedOrders.some(
                      (selection) => selection.id === item.id
                    )
                      ? "bg-green-50 hover:bg-green-100"
                      : "bg-white"
                  }`}
                >
                  <td className="w-4 pl-3 py-4 md:pl-6">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={selectedOrders.some(
                          (selectedItem) => selectedItem.id === item.id
                        )}
                        onChange={() => handleItemSelection(item)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
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
                    className="w-max flex items-center px-3 py-4 md:px-6 text-gray-900 dark:text-white cursor-pointer"
                  >
                    <div className="pl-3">
                      <div className="text-base font-semibold min-w-[25ch] max-w-min">
                        #{item?.order_number}
                      </div>
                      <div className="font-normal text-gray-500">
                        Date: {item.created_at}
                      </div>
                    </div>
                  </th>
                  <td className="px-3 py-4 md:px-6">{item.total_price}</td>
                  <td className="px-3 py-4 md:px-6">
                    <div
                          className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full 
                          ${item.financial_status == "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${item.financial_status == "paid" ? "bg-green-500" : "bg-orange-500"}`}
                          ></div>{" "}
                          {item?.financial_status.charAt(0).toUpperCase() +
                            item.financial_status.slice(1)}
                        </div>
                  </td>
                  <td className="px-3 py-4 md:px-6">
                  <div
                          className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full 
                          ${item.fulfillment_status ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}
                        >
                    {item.fulfillment_status ? "Fulfilled" : "Unfulfilled"}
                    </div>
                  </td>
                  <td className="px-3 py-4 md:px-6">{item.line_items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex items-center justify-between px-4">
              <p>
                Showing {currentPage}-
                {Math.ceil(filteredData.length / itemsPerPage)} of{" "}
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
    </div>
    </>
  );
};

export default Orders;
