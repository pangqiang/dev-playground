import { useThreeStore } from "../../store";

function Properties() {
  const { data } = useThreeStore();

  return <div className="Properties">
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
}

export default Properties;
