import { Pie } from "react-chartjs-2";
import HeadingAndBox from "../HeaderAndBox";

export default function PieChart({ data, title }) {
    return (
        <HeadingAndBox heading={title}>
            <Pie data={data} options={{ maintainAspectRatio: false }} />
        </HeadingAndBox>
    );
}