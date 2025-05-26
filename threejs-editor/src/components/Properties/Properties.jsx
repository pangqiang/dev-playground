import { useThreeStore } from "../../store";

function Properties() {
  const { data, selectedObj } = useThreeStore();

  return <div className="Properties">
    <div>
      {selectedObj?.name}
    </div>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
}

export default Properties;
