import { laptop, table } from "../assets";
import { IBidHistory } from "../interfaces/interface.bid";
import { paths } from "../routes/paths";

export const Links: {
  label: string;
  link: string;
}[] = [
  {
    label: "HOME",
    link: paths.HOME,
  },
  {
    label: "MARKETPLACE",
    link: paths.MARKETPLACE,
  },
  {
    label: "BID HISTORY",
    link: paths.BIDHISTORY,
  },
];

export const pendingBidArr:{
  img:string;
  desc:string;
}[] = [
  {
    img:table,
    desc:"80 units 1.6m executive tables, with extension..."
  },
  {
    img:laptop,
    desc:"100 units, Hp 21 All-in-one PC - 20.7” display core i3..."
  },
]

export const interestingBidArr: {
  img: string;
  desc: string;
}[] = [
  {
    img: table,
    desc: "80 units 1.6m executive tables, with extension...",
  },
  {
    img: laptop,
    desc: "100 units, Hp 21 All-in-one PC - 20.7” display core i3...",
  },
  {
    img: table,
    desc: "80 units 1.6m executive tables, with extension...",
  },
  {
    img: laptop,
    desc: "100 units, Hp 21 All-in-one PC - 20.7” display core i3...",
  },
  {
    img: table,
    desc: "80 units 1.6m executive tables, with extension...",
  },
  {
    img: laptop,
    desc: "100 units, Hp 21 All-in-one PC - 20.7” display core i3...",
  },
  {
    img: table,
    desc: "80 units 1.6m executive tables, with extension...",
  },
  {
    img: laptop,
    desc: "100 units, Hp 21 All-in-one PC - 20.7” display core i3...",
  },
  {
    img: table,
    desc: "80 units 1.6m executive tables, with extension...",
  },
  {
    img: laptop,
    desc: "100 units, Hp 21 All-in-one PC - 20.7” display core i3...",
  },
];

export const Bids: IBidHistory[] = [
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "08d 23h 15m 28s",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "BID WON",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "BID WON",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "BID LOST",
  },
  {
    amount: 8400000,
    date: "01-01-2023",
    description:
      "20 Pcs This space saver office desk is suitable for an office with space constrain...",
    status: "BID LOST",
  },
];