export type Portal = {
  name: string;
  text: string;
  /** [To confirm] Campbell Munro / Discoverable to supply the official login and app URLs. Buttons stay inactive until set. */
  loginUrl?: string;
  appUrl?: string;
};

export const portals: Portal[] = [
  { name: "Plannr", text: "Your financial plan, documents and secure messages." },
  { name: "Transact", text: "Your investment platform account." },
  { name: "M&G", text: "Your M&G investments and pensions." },
  { name: "AJ Bell", text: "Your AJ Bell investment account." },
];
