import { Grid } from "@chakra-ui/react";
import LineGraph from "../components/graphs/LineGraph";
import Layout from "../components/Layout";
import UsageOrderedList from "../components/UsageOrderedList";

// Data of all users, as well as their addresses and weekly usage
const users = [
    {
        name: "John Smith",
        weeklyUsage: 10620, // in kWh
        address: "1234 Somewhere Street",
        restricted: false
    },
    {
        name: "Jane Smith",
        weeklyUsage: 9302, // in kWh
        address: "4321 Someplace Drive",
        restricted: true
    },
    {
        name: "Jack Smith",
        weeklyUsage: 21032, // in kWh
        address: "9302-832 Place Road",
        restricted: true
    }
];

// Weekly energy usage data, this would be fetched from the server
const weeklyEnergyUsageData = {
    labels: ["May 22", "May 29", "June 5", "June 12"],
    datasets: [
      {
        label: 'Energy Used (kWh)',
        data: [48930, 46938, 41932, 40954],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

export default function Usage() {
    users.sort((a, b) => b.weeklyUsage - a.weeklyUsage); // Sort by weekly usage (descending)

    return (
        <Layout name="Usage">
            <UsageOrderedList data={users} />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <LineGraph title="Weekly Energy Usage" data={weeklyEnergyUsageData} />
            </Grid>
        </Layout>
    )
}