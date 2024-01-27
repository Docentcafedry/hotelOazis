import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <Row type="vertical">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
      <img
        src="https://chmxwomcygqppcafonqr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
        alt="cabin"
      ></img>
    </Row>
  );
}

export default Dashboard;
