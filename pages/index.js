import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useTable } from "react-table";
import 'chart.js/auto';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // check if there's no active session and redirect to login page
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, router, status]);

  // Dummy data for the chart
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Blog Posts",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  // Dummy data for the table
  const data = React.useMemo(
    () => [
      {
        category: "Technology",
        posts: 20,
      },
      {
        category: "Health",
        posts: 15,
      },
      {
        category: "Lifestyle",
        posts: 30,
      },
      {
        category: "Business",
        posts: 25,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category", // accessor is the "key" in the data
      },
      {
        Header: "Posts",
        accessor: "posts",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (!session) {
    return null; // or a loading spinner, or any other content you want to show while the session is loading
  }

  return (
    <div className="min-h-screen bg-gray-100 p-28">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-700">Total Blogs</h2>
            <p className="text-2xl mt-4 text-gray-800">120</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-700">Total Topics</h2>
            <p className="text-2xl mt-4 text-gray-800">45</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-700">Draft Blogs</h2>
            <p className="text-2xl mt-4 text-gray-800">15</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Year Overview</h2>
          <div className="relative h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Topics Data</h2>
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
