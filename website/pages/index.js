import Layout from "../components/Layout";
import Notifications from "../components/Notifications";
import LineGraph from "../components/graphs/LineGraph";
import PieChart from "../components/graphs/PieChart";
import { notificationUrgency } from "../components/Notifications";
import { Box, Grid } from "@chakra-ui/layout";

// All notifications, this would be fetched from the server
const notifications = [
  {
    content: "Solar panel 1 has stopped working!",
    urgency: notificationUrgency.ERROR
  },
  {
    content: "Wind turbine farm 12 is starting to produce less energy.",
    urgency: notificationUrgency.WARN
  },
  {
    content: "Energy demand has grown 20% over the past month.",
    urgency: notificationUrgency.INFO
  }
];

// Weekly energy generation data, this would be fetched from the server
const weeklyEnergyGenerationData = {
  labels: ["May 22", "May 29", "June 5", "June 12"],
  datasets: [
    {
      label: 'Energy Generated (kWh)',
      data: [1250, 1425, 1010, 1350],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

// Current energy generation from all sources, this would be fetched from the server
const energyGenerationFromAllSources = {
  labels: ["Solar Energy (kWh)", "Wind Energy (kWh)", "Hydro Energy (kWh)", "Nuclear Energy (kWh)"],
  datasets: [
    {
      label: 'kWh',
      data: [200, 150, 400, 600],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Home() {
  return (
    <Layout name="Overview">
      <Box mb={12}>
        <Notifications pNotifications={notifications} />
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <LineGraph title="Weekly Energy Generation" data={weeklyEnergyGenerationData} />
        <PieChart title="Energy Generation from All Sources" data={energyGenerationFromAllSources} />
      </Grid>
    </Layout>
  );
}