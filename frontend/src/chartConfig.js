// Applies global configuration and styles to all charts

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    TimeScale
} from 'chart.js';
import { MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    TimeScale,
    MatrixElement, 
);

// Font settings
ChartJS.defaults.font.family = "'Eudoxus Sans', sans-serif";
ChartJS.defaults.color = 'rgba(209, 213, 219, 1)'; 
ChartJS.defaults.font.size = 14;

// Responsiveness settings
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false; 









