import axios from "axios";
import React, { useEffect, useState } from "react";

const KpiCards = ({ title, icon, url }) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(`API Response for ${title}:`, response?.data);

        const productsCount = response?.data?.length || 0;
        setData(!url ? "0" : productsCount);
      } catch (err) {
        console.error(`Failed to fetch data for ${title}:`, err);
      }
    };

    fetchData();
  }, [url, title]);

  return (
    <div className="md:w-1/4 border rounded-md bg-white shadow-sm px-4 py-4 flex justify-between">
      <div className="left flex flex-col gap-y-1">
        <h3 className="text-sm text-[#8b8b8b]">{title}</h3>
        <h1 className="font-semibold text-2xl text-primary-txt">{data}</h1>
      </div>
      <div className="right">
        <div className="border p-2 rounded-md text-xl">{icon}</div>
      </div>
    </div>
  );
};

export default KpiCards;
