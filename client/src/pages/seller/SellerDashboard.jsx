import KpiCards from "../../components/seller_components/seller_dashboard_components/KpiCards";
import {
  FaProductHunt,
  IoBagHandle,
} from "../../utils/resource/IconsProvider.util";
import { GiCardDiscard } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";

import {
  BarChart,
  DoughnutChart,
} from "../../utils/resource/ComponentsProvider.util";

const SellerDashboard = () => {
  return (
    <>
      <div className="kpi-cards-div w-full rounded-md py-2 flex flex-col md:flex-row gap-2 md:justify-between md:gap-x-4">
        <KpiCards
          title="Total Products"
          icon={<FaProductHunt />}
          url="http://localhost:8000/api/products/getAll"
        />

        <KpiCards
          title="Expired Products"
          description="145"
          icon={<GiCardDiscard />}
          url=""
        />
        <KpiCards
          title="Pending Orders"
          description="189"
          icon={<MdOutlinePendingActions />}
        />
        <KpiCards
          title="Total Orders"
          description="233"
          icon={<IoBagHandle />}
          // url="http://localhost:8000/api/orders/getAll"
        />
      </div>

      <div className="chartdiv w-full rounded-md flex flex-col gap-2 md:gap-3 md:flex-row gap-x-4 mt-2">
        <BarChart />
        <DoughnutChart />
      </div>
    </>
  );
};

export default SellerDashboard;
