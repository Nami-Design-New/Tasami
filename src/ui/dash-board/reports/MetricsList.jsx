// const MetricsList = ({ list, handleMetricToggle, watch, errors, setValue }) => {
//   return (
//     <>
//       {/* <ul className="metrics-list">
//         <li className="metrics-item">
//           <input
//             type="checkbox"
//             className="metrics-input"
//             id="selectAllMetrics"
//             checked={watch("metrics")?.length === list.length}
//             onChange={(e) => {
//               if (e.target.checked) {
//                 setValue(
//                   "metrics",
//                   list.map((m) => m.id)
//                 );
//               } else {
//                 setValue("metrics", []);
//               }
//             }}
//           />
//           <label htmlFor="selectAllMetrics">تحديد الكل</label>
//         </li>

//         {list.map((metric) => (
//           <li key={metric.id} className="metrics-item">
//             <input
//               type="checkbox"
//               className="metrics-input"
//               id={`metric-${metric.id}`}
//               checked={watch("metrics")?.includes(metric.id)}
//               onChange={() => handleMetricToggle(metric.id)}
//             />
//             <label htmlFor={`metric-${metric.id}`}>{metric.name}</label>
//           </li>
//         ))}
//       </ul>
//       {errors.metrics && (
//         <div className="text-danger small">{errors.metrics.message}</div>
//       )} */}

//     </>
//   );
// };

// export default MetricsList;
import { Accordion, Form } from "react-bootstrap";
import { useForm, useFormContext } from "react-hook-form";

const MetricsAccordion = ({ list }) => {
  const { watch, setValue } = useFormContext();
  console.log(useFormContext());

  const selectedMetrics = watch("metrics") || [];

  const handleSubToggle = (id) => {
    const current = new Set(selectedMetrics);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    setValue("metrics", Array.from(current));
  };

  const handleCategoryToggle = (category) => {
    const allSubIds = category.children.map((c) => c.id);
    const allSelected = allSubIds.every((id) => selectedMetrics.includes(id));

    let updated;
    if (allSelected) {
      updated = selectedMetrics.filter((id) => !allSubIds.includes(id));
    } else {
      updated = Array.from(new Set([...selectedMetrics, ...allSubIds]));
    }

    setValue("metrics", updated);
  };

  return (
    <Accordion className="metrics-accordion" defaultActiveKey="0">
      {list.map((category, index) => {
        const allChecked = category.children.every((c) =>
          selectedMetrics.includes(c.id)
        );

        return (
          <Accordion.Item eventKey={index.toString()} key={category.id}>
            <Accordion.Header>
              <h6>{category.name} </h6>
              <div className="icon-toggle">
                <span className="horizontal"></span>
                <span className="vertical"></span>
              </div>
              {/* <i className="fa-solid fa-plus"> </i> */}
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <Form.Check
                  type="checkbox"
                  id={`cat-${category.id}`}
                  label={"تحديد الكل"}
                  checked={allChecked}
                  onChange={() => handleCategoryToggle(category)}
                />
                {category.children.map((sub) => (
                  <li key={sub.id}>
                    <Form.Check
                      type="checkbox"
                      id={`metric-${sub.id}`}
                      label={sub.name}
                      checked={selectedMetrics.includes(sub.id)}
                      onChange={() => handleSubToggle(sub.id)}
                    />
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default MetricsAccordion;
