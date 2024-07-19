
interface IBid{
  img:string;
  description:string;
}

export default function Bid({description,img}:IBid) {
  return (
    <div className=" max-w-[13vw] min-w-[13vw] pb-3">
      <div className="w-full h-[6.75rem] object-cover">
        <img src={img} className="w-full h-full object-cover" alt="" />
      </div>
      <div>
        <p className="text-sm leading-[18px] font-medium mt-5">{description}</p>
      </div>
    </div>
  );
}
