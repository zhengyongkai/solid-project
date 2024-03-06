import useCharts from "@/hooks/useCharts";
import { Line } from "solid-chartjs";
import { LineInf } from "@/types/echarts";

export default function Administrator() {
  let { chartData, setChartData, chartOptions } = useCharts<LineInf>({
    labels: [],
    datasets: [],
  });

  return (
    <div>
      <div
        style={{ width: "100px" }}
        onClick={() =>
          setChartData({
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                label: "Sales",
                data: [50, 60, 70, 80, 90],
              },
            ],
          })
        }
      >
        Click ME
      </div>
      <div>
        <Line
          data={chartData()}
          options={chartOptions}
          width={50}
          height={200}
        />
      </div>
    </div>
  );
}
