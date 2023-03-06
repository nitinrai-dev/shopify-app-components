import { createPortal } from "react-dom";

const Drawer = ({ isOpen, setIsOpen, drawerTitle, children }) => {
  return (
    <>
      {createPortal(
        <div className="drawer">
          <div
            className={`absolute top-0 left-0 transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl`}
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">
                {isOpen ? drawerTitle : null}
              </h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {isOpen ? children : null}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Drawer;
