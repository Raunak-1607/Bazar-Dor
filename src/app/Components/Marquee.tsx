import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
interface MarqueeProps {
  image: string;
  nameBn: string;
  today: string;
  change: {
    dir: string;
    pct: number;
  };
}
const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
   {
      cache: "force-cache",
    });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return (
    <div className="mt-8  ">
      <MarqueeText direction="right" duration={16}>
        {
        data.map((mar: MarqueeProps, index: number) => (
          <div
            key={index}
            className="flex items-center border-r border-gray-200 px-5 whitespace-nowrap"
          >
            
            <span>
              {mar.image} {mar.nameBn} {mar.today} টাকা/কেজি
            </span>

            
            <span
              className={`ml-2 ${
                mar.change.dir === "up" ? "text-red-500" : "text-green-500"
              }`}
            >
              {mar.change.dir === "up" ? "▲" : "▼"} {mar.change.pct}%
            </span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;

// <span className="flex gap-5" >{`${mar.image} ${mar.nameBn} ${mar.today} টাকা/কেজি `}<span className={ mar.change.dir === "up"?"text-red-500 " :"text-green-500"}>{mar.change.dir=="up"?"▲":"▼"} {`${mar.change.pct}%`}</span></span>
