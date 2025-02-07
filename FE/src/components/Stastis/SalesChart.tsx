import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import instance from "../../config/axios";
import { Order } from "../../interfaces/Order";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function SalesChart() {
  const [chartDataDaily, setChartDataDaily] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [chartDataMonthly, setChartDataMonthly] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean }[];
  }>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    instance.get<Order[]>("/order")
      .then(response => {
        const orders = response.data.order;

        // Doanh thu hàng ngày
        const salesByDate: Record<string, number> = {};
        orders.forEach(order => {
          const date = new Date(order.orderDate).toISOString().split("T")[0]; // YYYY-MM-DD
          salesByDate[date] = (salesByDate[date] || 0) + order.totalPrice;
        });

        // Doanh thu hàng tháng
        const salesByMonth: Record<string, number> = {};
        orders.forEach(order => {
          const date = new Date(order.orderDate);
          const monthLabel = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
          salesByMonth[monthLabel] = (salesByMonth[monthLabel] || 0) + order.totalPrice;
        });

        // Cập nhật dữ liệu cho biểu đồ hàng ngày
        setChartDataDaily({
          labels: Object.keys(salesByDate),
          datasets: [
            {
              label: "Doanh thu hàng ngày",
              data: Object.values(salesByDate),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.72)",
              fill: true,
            },
          ],
        });

      

        setChartDataMonthly({
          labels: Object.keys(salesByMonth),
          datasets: [
            {
              label: "Doanh thu hàng tháng",
              data: Object.values(salesByMonth),
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.88)",
              fill: true,
            },
          ],
        });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div className="my-6">
        <h3 className="text-white my-2">Doanh thu hàng ngày</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Bar data={chartDataDaily} />
        </div>
      </div>
      <div>
        <h3 className="text-white my-2">Doanh thu hàng tháng</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Bar data={chartDataMonthly} />
        </div>
      </div>
    </div>
  );
}

export default SalesChart;
