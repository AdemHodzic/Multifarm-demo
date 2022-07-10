import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { HistoryValue } from "../services/asset";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

const buildGradient = (ctx: CanvasRenderingContext2D, height: number) => { 
    var gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(138,67,178,.6)');
    gradient.addColorStop(1, 'rgba(57,93,137,.3)');

    return gradient
}


type ChartJsData = {
    labels: string[];
    datasets: any[];
}

type LineChartProps = {
    rawData: HistoryValue[];
    label: string;
}

const LineChart = ({ rawData, label }: LineChartProps) => {
    const chartRef = useRef<ChartJS>(null);

    const [data, setData] = useState<ChartJsData>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const labels = rawData.map(elem => elem.date)
        const datasets = [
            {
                fill: true,
                backgroundColor: buildGradient(chartRef.current!.ctx, chartRef.current!.height),
                borderColor: "rgb(138,67,178)",
                data: rawData.map(elem => elem.value),
            }
        ]

        setData({
            labels,
            datasets
        })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: label,
            },
        },
    };

    return (
    <div style={{ flex: '1 1 100%' }}>
      <Chart ref={chartRef} type="line" options={options} data={data} />
    </div>
  );
};

export default LineChart;
