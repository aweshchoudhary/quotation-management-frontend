import { useDispatch, useSelector } from "react-redux";
import Accordian, { AccordianCard } from "../global/Accordian";
import { removeProduct } from "@/redux/features/quoteSlice";
import { Icon } from "@iconify/react";

const ProductList = () => {
  const data = useSelector((state) => state.quote.products);
  const dispatch = useDispatch();
  return (
    data &&
    data.map((item, index) => {
      return (
        <section key={index}>
          <div className="flex">
            <div className="left p-5">
              <div className="h-[200px] w-[200px] border">
                {/* <Image
              src={""}
              alt="product title"
              className="h-full w-full object-cover"
              width={200}
              height={200}
            /> */}
              </div>
            </div>
            <div className="right p-5">
              <h2 className="capitalize text-lg font-medium flex items-center justify-between">
                <span>
                  {item.title} - <span className="uppercase">{item.model}</span>
                </span>
                <button
                  className="btn-filled"
                  onClick={() => dispatch(removeProduct(index))}
                >
                  <Icon icon={"uil:trash"} />
                </button>
              </h2>
              <Accordian>
                {item.description && (
                  <AccordianCard title="Description">
                    {item.description}
                  </AccordianCard>
                )}
                {item.features &&
                  item.features.map((item, index) => {
                    return (
                      <AccordianCard key={index} title={item.name}>
                        <ul className="ml-5 list-disc">
                          {item.list.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </ul>
                      </AccordianCard>
                    );
                  })}
                {item.tables &&
                  item.tables.map((item, index) => {
                    return (
                      <AccordianCard key={index} title={item.name}>
                        {item.table}
                      </AccordianCard>
                    );
                  })}
              </Accordian>
              <div className="flex flex-wrap">
                <div className="px-4 py-2 border">
                  Rate: {item.rate.toLocaleString("hi-IN")}
                </div>
                {item.discount && (
                  <div className="px-4 py-2 border">
                    Discount: {item.discount.toLocaleString("hi-IN")}
                  </div>
                )}
                <div className="px-4 py-2 border">Quantitiy: {item.qty}</div>
                <div className="px-4 py-2 border">Unit: {item.unit}</div>
                {item.subtotal && (
                  <div className="px-4 py-2 border">
                    Subtotal: {item.subtotal.toLocaleString("hi-IN")}
                  </div>
                )}
                {item.gst && (
                  <div className="px-4 py-2 border">
                    GST @18%: {item.gst.toLocaleString("hi-IN")}
                  </div>
                )}
                <div className="px-4 py-2 border">
                  {item.gst ? "Grand Total" : "Total Before Tax"}:{" "}
                  {item.total.toLocaleString("hi-IN")}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default ProductList;
