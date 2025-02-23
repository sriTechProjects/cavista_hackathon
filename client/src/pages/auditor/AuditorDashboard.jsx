import KpiCards from "../../components/seller_components/seller_dashboard_components/KpiCards";
import {
  FaProductHunt,
  IoBagHandle,
} from "../../utils/resource/IconsProvider.util";
import { useState } from "react";
import { GiCardDiscard } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";

import { auditData } from "../../utils/resource/DataProvider.util";
import { IoSearch } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

const ITEMS_PER_PAGE = 10;


const AuditorDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(auditData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedAudits = auditData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  return (
    <>
    

      <div className="relative w-full border rounded-md shadow-sm bg-white mt-2">
        {/* Header with Search Bar */}
        <header className="py-3 px-5 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium text-primary-text">
            Product List
          </h3>
          <div className="flex items-center gap-x-3">
            <div className="searchbar border px-3 py-2 rounded-md flex items-center gap-x-2">
              <IoSearch className="text-[#8b8b8b]" />
              <input
                type="text"
                placeholder="Search"
                className="w-40 outline-none bg-transparent text-sm"
              />
            </div>

            <button
              className="text-sm bg-primary-txt px-3 py-2 rounded-md text-white flex items-center gap-x-2"
              onClick={() => {
                setIsFormOpen(!isFormOpen);
              }}
            >
              <IoAdd className="text-lg" />
              <p>Add Product</p>
            </button>
          </div>
        </header>

        <table className="w-full border-collapse">
          <thead className="bg-[#f7f7f7] text-primary-text uppercase text-sm">
            <tr>
              {[
                "#",
                "Audit Name",
                "Date",
                "Actions",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="px-5 py-3 text-center font-medium text-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayedAudits.map((audit, index) => (
              <tr key={audit.id} className="border-b transition text-sm">
                <td className="py-3 px-5 text-center">{index + 1}</td>
                <td className="py-3 px-5 text-center">{audit.auditName}</td>
                <td className="py-3 px-5 text-center">{audit.date}</td>
                <td className="py-2 px-5 text-center space-x-2">
                  <button className="bg-sky-500 border text-[#333] text-sm p-2 rounded-md hover:bg-[#333] transition-all ease-linear hover:text-white">
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary-btn text-white rounded-md disabled:bg-primary-bg disabled:text-primary-txt"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary-btn text-white rounded-md disabled:bg-primary-bg disabled:text-primary-txt"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AuditorDashboard;