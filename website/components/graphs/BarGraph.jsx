import { Bar } from "react-chartjs-2";
import HeadingAndBox from "../HeaderAndBox";

export default function BarGraph({ data, title }) {
    return (
        <HeadingAndBox heading={title}>
            <Bar data={data} />
        </HeadingAndBox>
    );
}