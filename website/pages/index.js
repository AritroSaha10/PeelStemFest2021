import Layout from "../components/Layout";

import Notifications from "../components/Notifications";
import { notificationUrgency } from "../components/Notifications";

import LineGraph from "../components/graphs/LineGraph";
import PieChart from "../components/graphs/PieChart";

import db from "../util/db";

import { Box, Grid } from "@chakra-ui/layout";
import { DateTime } from "luxon";

export async function getStaticProps(context) {
  // Get reference and snapshot to weekly generation data
  const wegRef = db.collection("data").doc("weekly").collection("generation").orderBy("date");
  const wegQSnapshot = await wegRef.get();

  // Has to be in this format for chart.js
  let generationData = {
    labels: [],
    datasets: [
      {
        label: 'Energy Generated (kWh)',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // Get data from snapshot
  wegQSnapshot.forEach((doc) => {
    const data = doc.data();

    // Turn unix timestamp to something like "May 23"
    const label = DateTime.fromMillis(data.date.seconds * 1000).toFormat("LLL dd");
    const generated = data.energyGenerated;

    // Push to global data
    generationData.labels.push(label);
    generationData.datasets[0].data.push(generated);
  });


  // Get reference and snapshot to energy generation ratios
  const egrRef = db.collection("data").doc("ratios").collection("energyGenerationFromAllSources");
  const egrQSnapshot = await egrRef.get();

  let generationRatios = {
    labels: [],
    datasets: [
      {
        label: 'kWh',
        data: [],
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

  // Get data from snapshot
  egrQSnapshot.forEach((doc) => {
    const data = doc.data();

    // Turn unix timestamp to something like "May 23"
    const label = data.name;
    const generated = data.generated;

    // Push to global data
    generationRatios.labels.push(label);
    generationRatios.datasets[0].data.push(generated);
  });


  // Get notifications from server
  const notifRef = db.collection("notifications");
  const notifSnapshot = await notifRef.get();

  // Data format for other components
  let notifData = [];

  // Get data from snapshot
  notifSnapshot.forEach((doc) => {
    notifData.push(doc.data()); // Layout in database matches layout required
  });

  notifData.sort((a, b) => a.urgency - b.urgency); // Sort by urgency

  return {
    props: {
      generationData,
      generationRatios,
      notifData
    }
  }
}

export default function Home({ generationData, generationRatios, notifData }) {
  return (
    <Layout name="Overview">
      <Box mb={12}>
        <Notifications pNotifications={notifData} />
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <LineGraph title="Weekly Energy Generation" data={generationData} />
        <PieChart title="Energy Generation from All Sources" data={generationRatios} />
      </Grid>
    </Layout>
  );
}