import { Line } from "react-chartjs-2";
import HeadingAndBox from "../HeaderAndBox";

export default function LineGraph({ data, title, height }) {
    return (
        <HeadingAndBox heading={title}>
            <Line data={data} height={height} options={{ maintainAspectRatio: false }}/>
        </HeadingAndBox>
    );
}