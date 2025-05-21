import { Outlet } from "react-router";

const WebsiteLayout = () => {
  return (
    <section>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </section>
  );
};

export default WebsiteLayout;
