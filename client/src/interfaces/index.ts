interface Rule {
  [x: string]: any;
  "firedtimes": number
  "mail": boolean
  "level": number
  "pci_dss": Array<string>
  "hipaa": Array<string>
  "description": string
  "groups": Array<string>
  "id": string
  "nist_800_53": Array<string>
  "gpg13": Array<string>
  "gdpr": Array<string>
}

interface Agents {
  "id": string
  "name": string
  "ip": string
}

interface Source {
  "@sampledata": boolean
  timestamp: string
  "rule": Rule
  "agent": Agents
  "manager": {}
  "cluster": {}
  id: string
  predecoder: {}
  decoder: {}
  data: {}
  location: string
  syscheck: {}
}

interface DataAlerts {
  _index: string
  _type: string
  _id: string
  _score: number
  _source: Source
}

interface Alerts {
  total_items: number
  data: Array<DataAlerts>
}

interface DataAgents {
  id: string
  name: string
  ip: string
  total_alerts: number
}

interface Agents {
  total_items: number
  data: Array<DataAgents>
}

interface DataAgent {
  id: string
  name: string
  ip: string
  total_alerts: number
  alerts: Array<DataAlerts>
}

type FlexDirection = "column" | "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "column-reverse" | "row" | "row-reverse" | undefined;

type Style = {
  flexDirection: FlexDirection
  display: string,
  background: string, 
  borderRadius: string,
  color: string,
  width: string,
  height: string,
  minHeight: string,
  boxShadow: string,
  justifyContent: string,
  alignItems: string,
  fontWeight: string,
  fontSize: string,
  cursor: string,
  lineHeight: string
}

interface DataRule extends Rule {
  total_alerts: number,
  alerts: Array<DataAlerts>
}

interface MouseEventTarget extends EventTarget {
  id: number
}

interface MouseEvent extends React.MouseEvent<HTMLDivElement> {
  target: MouseEventTarget
}

interface MouseEventImg extends React.MouseEvent<HTMLImageElement> {
  target: MouseEventTarget
}

interface IModal {
  open: boolean
  handleClose: () => void
  id: string
}

interface IRuleModal {
  open: boolean
  handleClose: () => void
  dataRule: DataRule
}

export type { 
  Alerts, 
  DataAlerts, 
  Agents, 
  DataAgents, 
  DataAgent, 
  Rule, 
  Source, 
  Style,
  DataRule,
  MouseEvent,
  MouseEventImg,
  IModal,
  IRuleModal
}