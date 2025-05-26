import { Outlet } from "react-router";
import PageHeader from "../../../ui/PageHeader";

const Tasks = () => {
  return (
    <section>
      <PageHeader />
      <div className="row">
        <div className="col-12 mt-5 ">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
