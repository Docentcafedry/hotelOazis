import Heading from "../ui/Heading";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row>
        <Heading as="h1">App dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
