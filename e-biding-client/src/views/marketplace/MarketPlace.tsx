import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CircularProgress, Divider } from "@mui/material";
import MarketPlaceCard from "./MarketPlaceCard";
import { useGetAuctionsQuery } from "../../api/auction.api";
import { IAuction } from "../../interfaces/auction.interface";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

export default function MarketPlace() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allResults, setAllResults] = useState<IAuction[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isSuccess } = useGetAuctionsQuery({
    page: currentPage,
  });

  // useEffect(() => {
  //   if (isSuccess && data?.data.length > 0) {
  //     setAllResults((prevResults) => [...prevResults, ...data.data]);

  //     // Check if we are on the last page
  //     if (currentPage >= data?.lastPage) {
  //       setHasMore(false);
  //     }
  //   } else if (isSuccess && data?.data.length === 0) {
  //     setHasMore(false);
  //   }
  // }, [isSuccess, data, currentPage]);

  useEffect(() => {
    if (isSuccess && data?.data.length > 0) {
      // Filter out duplicates based on bidId
      const newItems = data.data.filter(
        (newItem) =>
          !allResults.some(
            (existingItem) => existingItem.bidId === newItem.bidId
          )
      );

      setAllResults((prevResults) => [...prevResults, ...newItems]);

      // Check if we are on the last page
      if (currentPage >= data?.lastPage) {
        setHasMore(false);
      }
    } else if (isSuccess && data?.data.length === 0) {
      setHasMore(false);
    }
  }, [isSuccess, data, currentPage]);

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
        {isLoading && currentPage === 1 ? (
          <div className="w-full flex justify-center items-center">
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={15}
            />
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={allResults?.length} // Number of items loaded so far
              next={() => {
                if (!isLoading) {
                  setCurrentPage((prevState) => prevState + 1);
                }
              }}
              height={"700px"}
              hasMore={hasMore}
              loader={<h4 className="flex justify-center items-center">Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }} className="text-[#B94B72]">
                  <b>No more auctions</b>
                </p>
              }
              scrollableTarget="autoCompletContainer"
            >
              <div className="mt-8" id="autoCompletContainer">
                {allResults?.map((item: IAuction) => (
                  <MarketPlaceCard bid={item} key={item?.bidId} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
}
