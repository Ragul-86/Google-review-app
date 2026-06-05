
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AdminPage() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://google-review-app-wi5e.onrender.com/api/reviews"
      );

      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetchReviews();
  }, [fetchReviews, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const deleteReview = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this review?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://google-review-app-wi5e.onrender.com/api/reviews/${id}`
      );

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(reviews);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Reviews"
    );

    XLSX.writeFile(
      workbook,
      "reviews.xlsx"
    );
  };

  const positiveCount =
    reviews.filter(
      (r) => r.rating >= 4
    ).length;

  const negativeCount =
    reviews.filter(
      (r) => r.rating <= 3
    ).length;

  const filteredReviews =
    reviews.filter(
      (review) =>
        review.feedback
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.customerName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.customerEmail
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const chartData = [
    {
      name: "Positive",
      value: positiveCount,
    },
    {
      name: "Negative",
      value: negativeCount,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Review Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-lg shadow">

          <h2 className="text-xl font-semibold">
            Total Reviews
          </h2>

          <p className="text-3xl mt-2">
            {reviews.length}
          </p>

        </div>

        <div className="bg-green-100 p-5 rounded-lg shadow">

          <h2 className="text-xl font-semibold">
            Positive Reviews
          </h2>

          <p className="text-3xl mt-2">
            {positiveCount}
          </p>

        </div>

        <div className="bg-red-100 p-5 rounded-lg shadow">

          <h2 className="text-xl font-semibold">
            Negative Reviews
          </h2>

          <p className="text-3xl mt-2">
            {negativeCount}
          </p>

        </div>

      </div>

      {/* Search + Export */}

      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <input
          type="text"
          placeholder="Search Reviews..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 p-3 border rounded"
        />

        <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 py-3 rounded"
        >
          Export Excel
        </button>

      </div>

      {/* Pie Chart */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h2 className="text-xl font-bold mb-4">
          Review Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Reviews Table */}

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-3 text-left">
                Rating
              </th>

              <th className="p-3 text-left">
                Feedback
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredReviews.map(
              (review) => (
                <tr
                  key={review._id}
                  className="border-b"
                >

                  <td className="p-3">
                    ⭐ {review.rating}
                  </td>

                  <td className="p-3">
                    {review.feedback}
                  </td>

                  <td className="p-3">
                    {
                      review.customerName
                    }
                  </td>

                  <td className="p-3">
                    {
                      review.customerEmail
                    }
                  </td>

                  <td className="p-3">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        deleteReview(
                          review._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminPage;

