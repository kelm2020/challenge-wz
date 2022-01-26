import { CircularProgress } from "@mui/material";
import React from "react";
import { Agents } from "../../interfaces";
import SunburstChart from "./SunburstChart";

const Sunburst = () => {
  const [ agents, setAgents ] = React.useState<Agents | undefined>(undefined);

  const getAgents = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/agents')
      const data = await response.json()
      setAgents(data.json)
    } catch (e) {
      console.error(e);
    }
  }, []);

  React.useEffect(() => {
    agents === undefined && getAgents();
  }, [agents]);

  const data = {
    name: "flare",
    children: []
  };

  agents && agents.data && agents.data.forEach((agent) => {
    data.children.push({ name: agent.name, value: agent.total_alerts })
  })

  return (
    <>
      {
        data.children.length > 0 ?
        <SunburstChart data={data} /> :
        <CircularProgress />
      }
    </>
  );
};

export default Sunburst;
