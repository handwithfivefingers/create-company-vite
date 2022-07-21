import { Card, Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Error({ statusCode }) {
  // return <Card>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</Card>;
  let navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
