import Layout from "../components/Layout";
import UsageOrderedList from "../components/UsageOrderedList";
import LineGraph from "../components/graphs/LineGraph";

import db from "../util/db";

import { Grid, Skeleton } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

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

    return {
        props: {
            generationData
        }
    }
}

export default function Usage({ generationData }) {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        // Set to be loading
        setIsLoading(true);

        // Get notifications from server
        const userDataRef = db.collection("users");
        const userDataSnapshot = await userDataRef.get();

        // Data format for other components
        let userDataTmp = [];

        // Get data from snapshot
        userDataSnapshot.forEach((doc) => {
            userDataTmp.push({
                id: doc.id,
                ...doc.data()
            }); // Layout in database matches layout required
        });

        userDataTmp.sort((a, b) => b.weeklyUsage - a.weeklyUsage); // Sort by weekly usage (descending)

        setUserData(userDataTmp);

        setIsLoading(false);

        return () => {
            setIsLoading(false);
        }
    }, []);

    return (
        <Layout name="Usage">
            <Skeleton isLoaded={!isLoading}>
                <UsageOrderedList data={userData} />
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <LineGraph title="Weekly Energy Usage" data={generationData} />
                </Grid>
            </Skeleton>
        </Layout>
    )
}