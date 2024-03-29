import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';


ChartJS.register(ArcElement, Tooltip, Legend);

const ColorsScheme = (num) => {
    const colors = {
        bg: [`rgba(0, 0, 255, 1)`, `rgba(0, 180, 255, 1)`, `rgba(0, 255, 0, 1)`],
        brd: [],
    };
    for (let i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        const color1 = `rgba(${r}, ${g}, ${b}, 1)`;
        const color2 = `rgba(255, 255, 255, 1)`;
        // colors['bg'].push(color1);
        colors['brd'].push(color2);
    }
    return colors;
};

function PieChart(labels_in, dt_in, title_in){
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
            }
        ]
    });

    useEffect(() => {
        const labels = labels_in.labels;
        const values = labels_in.data;
        const lbll = labels_in.title;
        const scheme = ColorsScheme(labels.length);
        const bgcolors = scheme.bg;
        const brdcolors = scheme.brd;

        setChartData(prevChartData => ({
            ...prevChartData,
            labels,
            datasets : [
                {
                    ...prevChartData.datasets[0],
                    label: lbll,
                    data: values,
                    backgroundColor: bgcolors,
                    borderColor: brdcolors,
                    borderWidth: 3,
                    hoverOffset: 4,
                }
            ]
        }))

    }, [labels_in, dt_in, title_in]);

    return (
            <Pie 
                width = "30%"
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            position: "bottom",
                            font: {
                                size: 20,
                                weight: 'bold',
                            },
                        },
                        legend: {
                            display: true,
                            position: "left",
                            align: "center",
                            labels: {
                                pointStyle: 'circle',
                            },
                        },
                    },
                    height: 400,
                    width: 400,
                }}
                data={chartData}
            />
    )
}

export default PieChart;