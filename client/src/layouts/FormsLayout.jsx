import { Outlet } from "react-router-dom";
import warehouse from '../assets/images/warehouse.jpg'


const FormsLayout = () => {
  return (
    <section className="h-screen flex p-1">
      <div className="relative w-0 sm:w-[40%] md:w-[55%] lg:w-[65%] h-full rounded-tl-3xl rounded-br-3xl overflow-hidden">
        
        <img src={warehouse} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
          }}
        ></div>
      </div>
      <div className="relative w-full sm:w-[60%] md:w-[55%] lg:w-[35%] px-3 flex justify-center items-center h-full">
        {<Outlet />}
      </div>
    </section>
  );
};

export default FormsLayout;
