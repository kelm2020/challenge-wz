interface Rule {
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

export type { Alerts, DataAlerts, Agents, DataAgents, DataAgent }