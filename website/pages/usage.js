import Layout from "../components/Layout";
import UsageOrderedList from "../components/UsageOrderedList";
import LineGraph from "../components/graphs/LineGraph";

import db from "../util/db";

import { Grid } from "@chakra-ui/react";
import { DateTime } from "luxon";

export async function getServerSideProps(context) {
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


    // Get notifications from server
    const userDataRef = db.collection("users");
    const userDataSnapshot = await userDataRef.get();

    // Data format for other components
    let userData = [];

    // Get data from snapshot
    userDataSnapshot.forEach((doc) => {
        userData.push({
            id: doc.id,
            ...doc.data()
        }); // Layout in database matches layout required
    });

    return {
        props: {
            generationData,
            userData
        }
    }
}

export default function Usage({ generationData, userData }) {
    userData.sort((a, b) => b.weeklyUsage - a.weeklyUsage); // Sort by weekly usage (descending)

    return (
        <Layout name="Usage">
            <UsageOrderedList data={userData} />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <LineGraph title="Weekly Energy Usage" data={generationData} />
            </Grid>
        </Layout>
    )
}