import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  LineController,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { HistoryValue } from "../services/asset";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler,
);

const buildGradient = (ctx: CanvasRenderingContext2D, height: number) => { 
    var gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(214,81,255,0.3)');
    gradient.addColorStop(1, 'rgba(54,92,133, .3)');

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
                borderColor: "rgb(214,81,255)",
                data: rawData.map(elem => elem.value),
            }
        ]

        setData({
            labels,
            datasets
        })
    }, [rawData])

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
