import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function HardwareTab() {
    const [metrics, setMetrics] = useState([
        { name: 'Видеокарта', value: 30 },
        { name: 'Процессор', value: 45 },
        { name: 'ОЗУ', value: 60 }
    ]);

    const [newMetric, setNewMetric] = useState({ name: '', value: 0 });

    const handleAddMetric = () => {
        if (newMetric.name) {
            setMetrics([...metrics, newMetric]);
            setNewMetric({ name: '', value: 0 });
        }
    };

    const chartData = {
        labels: metrics.map(m => m.name),
        datasets: [
            {
                label: 'Показатели (%)',
                data: metrics.map(m => m.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Аппаратные показатели</h2>
            <div style={{ height: '400px' }}>
                <Line data={chartData} />
            </div>
            <div>
                <h3>Добавить/Изменить показатель</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Название"
                        value={newMetric.name}
                        onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
                    />
                    <input
                        type="number"
                        value={newMetric.value}
                        onChange={(e) => setNewMetric({ ...newMetric, value: parseInt(e.target.value) })}
                    />
                    <button onClick={handleAddMetric}>Добавить</button>
                </div>
                <ul>
                    {metrics.map((metric, index) => (
                        <li key={index}>
                            {metric.name}: {metric.value}%
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
