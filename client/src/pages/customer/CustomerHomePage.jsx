import React from "react";

// import components
import { ProductCategoryCardComponent } from '../../utils/resource/ComponentsProvider.util'

// import images
import images from '../../utils/resource/ImageProvider.util'

const CustomerHomePage = () => {
  return (
    <>
      <section className="bg-white m-5 rounded-lg shadow-sm">
        <div className="mx-auto w-[84vw] flex flex-col gap-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[#333333] text-xl font-semibold">
                Browse by <span class="text-primary">Category</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center mt-2 w-full">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="hide-scrollbar flex gap-4 text-0 px-1.5 py-2">

                <ProductCategoryCardComponent title="Fruits" image={images.category_fruits}/>
                <ProductCategoryCardComponent title="Vegetables" image={images.category_vegetable}/>
                <ProductCategoryCardComponent title="Snacks" image={images.category_snacks}/>
                <ProductCategoryCardComponent title="Rice" image={images.category_rice}/>
                <ProductCategoryCardComponent title="Flour" image={images.category_atta}/>
                <ProductCategoryCardComponent title="Spices" image={images.category_spices}/>
                <ProductCategoryCardComponent title="Sugar" image={images.category_sugar}/>
                <ProductCategoryCardComponent title="Salt" image={images.category_salt}/>
                <ProductCategoryCardComponent title="Oil" image={images.category_oil}/>
                <ProductCategoryCardComponent title="Ghee" image={images.category_ghee}/>
                <ProductCategoryCardComponent title="Beverages" image={images.category_beverages}/>
                <ProductCategoryCardComponent title="Sweets" image={images.category_sweets}/>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerHomePage;
