/*export default function Overview() {
    return (
      <div className="text-xl font-semibold text-gray-800">
        Payments Screen Placeholder
      </div>
    );
  }*/
    export default function Payments() {
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Payments</h1>
    
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-semibold">$0</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="text-2xl font-semibold">$0</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
    
          {/* Filters + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex gap-2 mb-2 sm:mb-0">
              <select className="border rounded p-2 text-sm">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Canceled</option>
                <option>Failed</option>
              </select>
              <button className="bg-gray-100 px-4 py-2 text-sm rounded hover:bg-gray-200">
                Export CSV
              </button>
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="border p-2 rounded text-sm w-full sm:w-64"
            />
          </div>
    
          {/* Payment Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Client</th>
                  <th className="p-3">Membership</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Payment</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-gray-500 italic" colSpan="5">
                    No payment records yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }