import { Outlet } from "react-router";
import PageHeader from "../../../ui/PageHeader";

const Tasks = () => {
  return (
    <section>
      <PageHeader />
      <div className="row">
        <div className="col-12 p-2 p-md-0">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
