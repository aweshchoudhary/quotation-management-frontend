import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Accordian, { AccordianCard } from "../global/Accordian";
import products from "@/data/products.json";
import { useDispatch } from "react-redux";
import { setProduct } from "@/redux/features/quoteSlice";

const ProductModel = ({ setIsModelOpen }) => {
  const [data, setData] = useState(null);
  function setLocalProduct(id) {
    products.forEach((item) => {
      if (item.id === +id) {
        setData(item);
        return;
      }
    });
  }
  return (
    <>
      <section className="p-5">
        <div className="w-[400px]">
          <select
            name="product"
            onChange={(e) => setLocalProduct(e.target.value)}
            className="input uppercase"
            id="product"
          >
            <option selected>Select Product</option>
            {products.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.title} - {item.model}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section>
        {data ? (
          <Product
            setIsModelOpen={setIsModelOpen}
            data={data}
            setData={setData}
          />
        ) : null}
      </section>
    </>
  );
};

const Product = ({ data, setData, setIsModelOpen }) => {
  const [active, setActive] = useState({
    discount: false,
    gst: true,
  });
  const dispatch = useDispatch();
  // Functions
  function setFieldActive(name) {
    setActive((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  }
  function removeFieldActive(name) {
    const newData = { ...data };
    delete newData[name];
    setData(newData);
    setActive((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
  }
  function addData(name, value) {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addProduct() {
    setIsModelOpen(false);
    dispatch(setProduct(data));
  }
  function discardProduct() {
    setIsModelOpen(false);
  }

  // UseEffects
  useEffect(() => {
    const subtotal = data.rate * data.qty;
    addData("subtotal", subtotal);
  }, [data.qty, data.rate]);

  useEffect(() => {
    if (active.discount) {
      const discountedRate = data.subtotal - data.discount;
      addData("discountedRate", discountedRate);
    } else {
      addData("discountedRate", 0);
    }
  }, [data.discount, data.subtotal, setData]);

  useEffect(() => {
    function calculateTotal() {
      let total = data.discountedRate
        ? data.discountedRate * data.qty
        : data.subtotal * data.qty;
      if (active.gst) {
        const gst = data.discountedRate
          ? data.discountedRate * 0.18
          : data.subtotal * 0.18;
        total += gst;
        addData("gst", gst);
        addData("total", total);
      } else {
        addData("total", total);
      }
    }
    calculateTotal();
  }, [active.gst, data.discountedRate, setData, data.qty, data.subtotal]);

  return data ? (
    <>
      <section>
        <div className="flex">
          <div className="p-5">
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
          <div className="p-5">
            <h2 className="capitalize text-lg font-medium">
              {data.title} - <span className="uppercase">{data.model}</span>
            </h2>
            <Accordian>
              {data.description && (
                <AccordianCard title="Description">
                  {data.description}
                </AccordianCard>
              )}
              {data.features &&
                data.features.map((item, index) => {
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
              {data.tables &&
                data.tables.map((item, index) => {
                  return (
                    <AccordianCard key={index} title={item.name}>
                      {item.table}
                    </AccordianCard>
                  );
                })}
            </Accordian>
          </div>
        </div>
      </section>
      <section className="border-t p-5 flex items-start">
        <div className="quote-details flex-1 shrink-0">
          <div className="flex items-center mb-3 w-full">
            {active &&
              Object.entries(active).map((item) => {
                return (
                  <button
                    key={item}
                    className="chip btn-outlined flex items-center gap-1 p-1 px-2 mr-2 mb-2 text-sm"
                    onClick={() =>
                      item[1]
                        ? removeFieldActive(item[0])
                        : setFieldActive(item[0])
                    }
                  >
                    <Icon icon={item[1] ? "uil:minus" : "uil:plus"} />
                    {item[0]}
                  </button>
                );
              })}
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="w-[45%] shrink-0">
              <label className="block mb-1">Rate</label>
              <input
                type="number"
                value={data.rate}
                min={0}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, rate: +e.target.value };
                  })
                }
                className="input"
              />
            </div>
            {active.discount && (
              <div className="w-[45%] shrink-0">
                <label className="block mb-1">Discount</label>
                <input
                  value={data.dicount}
                  onChange={(e) =>
                    setData((prev) => {
                      return { ...prev, discount: e.target.value };
                    })
                  }
                  min={0}
                  type="number"
                  className="input"
                />
              </div>
            )}
            <div className="w-1/5">
              <label className="block mb-1">Qty</label>
              <input
                type="number"
                value={data.qty}
                min={1}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, qty: e.target.value };
                  })
                }
                className="input"
              />
            </div>
            <div className="w-1/4">
              <label className="block mb-1">Unit</label>
              <input type="text" value={data.unit} className="input" />
            </div>
            {active.gst && (
              <div className="w-1/3">
                <label className="block mb-1">GST 18%</label>
                <h2 className="border p-2 rounded">{data.gst}</h2>
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 w-1/2 border border-b-0">
          <div className="rate border-b w-full flex items-center">
            <p className="p-3 w-[40%] text-right">Sub Total</p>
            <p className="p-3 flex-1 text-right">
              {data.subtotal?.toLocaleString("hi-IN")}
            </p>
          </div>
          {active.discount && (
            <div className="discount border-b w-full flex items-center">
              <p className="p-3 w-[40%] text-right">Discount</p>
              <p className="p-3 flex-1 text-right">
                {data.discount?.toLocaleString("hi-IN") || 0}
              </p>
            </div>
          )}
          {active.discount && (
            <div className="qty border-b w-full flex items-center">
              <p className="p-3 w-[40%] text-right">Total Before Tax</p>
              <p className="p-3 flex-1 text-right">
                {data.discountedRate?.toLocaleString("hi-IN") || 0}
              </p>
            </div>
          )}
          {active.gst && (
            <div className="gst border-b w-full flex items-center">
              <p className="p-3 w-[40%] text-right">GST @18%</p>
              <p className="p-3 flex-1 text-right">
                {data.gst?.toLocaleString("hi-IN")}
              </p>
            </div>
          )}
          <div className="total border-b w-full flex items-center">
            <p className="p-3 w-[40%] text-right">Grand Total</p>
            <p className="p-3 flex-1 text-right">
              {data.total?.toLocaleString("hi-IN")}
            </p>
          </div>
        </div>
      </section>
      <section className="flex gap-3 px-5 py-3 bg-bg">
        <button onClick={discardProduct} className="btn-outlined">
          Discard
        </button>
        <button onClick={addProduct} className="btn-filled">
          Add
        </button>
      </section>
    </>
  ) : null;
};

export default ProductModel;
