import { FaMoneyBill } from "react-icons/fa";

const ContentSidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Trending Posts
      </h2>

      <div className="flex items-center p-4 space-x-4 text-white transition duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700">
        <div className="text-4xl">
          <FaMoneyBill />
        </div>
        <div>
          <h3 className="text-lg font-bold">600</h3>
          <h4 className="text-sm font-medium">Total earnings</h4>
        </div>
      </div>

      <div className="flex items-center p-4 space-x-4 text-white transition duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700">
        <div className="text-4xl">
          <FaMoneyBill />
        </div>
        <div>
          <h3 className="text-lg font-bold">600</h3>
          <h4 className="text-sm font-medium">Total earnings</h4>
        </div>
      </div>

      <div className="flex items-center p-4 space-x-4 text-white transition duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700">
        <div className="text-4xl">
          <FaMoneyBill />
        </div>
        <div>
          <h3 className="text-lg font-bold">600</h3>
          <h4 className="text-sm font-medium">Total earnings</h4>
        </div>
      </div>

      {/* Add any other content here if needed */}
    </div>
  );
};

export default ContentSidebar;
