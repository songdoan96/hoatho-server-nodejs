import { Flex } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Flex
      gap={"large"}
      id="error-page"
      vertical
      justify="center"
      align="center"
      style={{ height: "100vh" }}
    >
      <h2>Rất tiếc, đã xảy ra lỗi không mong muốn.</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}>Home</Link>
    </Flex>
  );
}
