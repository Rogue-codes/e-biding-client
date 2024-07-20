import { Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Space, Table, TableProps } from "antd";
import { IBidHistory } from "../../interfaces/interface.bid";
import { Bids } from "../../constants";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export default function BidHistory() {
  const navigate = useNavigate()
  const columns: TableProps<IBidHistory>["columns"] = [
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Bid Description",
      dataIndex: "description",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, row) => (
        <Space size="middle" className="">
          <p>₦{row.amount.toLocaleString()}</p>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, row) => (
        <Space size="middle" className="">
          <p
            className={`${
              row.status !== "BID WON" ? "text-[#B94B72]" : "text-[#269B47]"
            } text-xs font-semibold`}
          >
            {row.status}
          </p>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-EBD/Darkest font-semibold">Marketplace</p>
        <div className="flex justify-start items-center gap-2">
          <p>Sort</p>
          <div className="py-2 px-4 border border-EBD/Light rounded-[4px] cursor-pointer flex justify-between gap-2">
            <p className="text-sm text-EBD/Dark font-medium">Most recent</p>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>
      <Divider
        style={{
          marginTop: "12px",
        }}
      />

      <div>
        <Table
          columns={columns}
          dataSource={Bids}
          pagination={false}
          onRow={(record: IBidHistory) => ({
            onClick: () => navigate(paths.SINGLEBIDHISTORY),
          })}
        />
      </div>
    </div>
  );
}
