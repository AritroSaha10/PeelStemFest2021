import HeadingAndBox from "../components/HeadingAndBox";
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

export default function Usage() {
    users.sort((a, b) => a.weeklyUsage - b.weeklyUsage); // Sort by weekly usage (ascending)

    return (
        <Layout name="Usage">
            <UsageOrderedList data={users} />
        </Layout>
    )
}