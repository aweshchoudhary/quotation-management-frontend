import { useDispatch, useSelector } from "react-redux";
import {
  addItemToTable,
  removeItemFromTable,
  removeTable,
  updateTable,
} from "@/redux/features/quoteSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const Table = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <section className="p-5 border-t">
      <div className="flex items-center mb-3 justify-between">
        <h2 className="text-xl">{data.name}</h2>
        <button
          onClick={() => dispatch(removeTable(data.index))}
          className="btn-outlined text-sm"
        >
          delete table
        </button>
      </div>
      <table className="min-w-full border text-left table-fixed">
        <TableHead />
        <TableBody tableIndex={data.index} tableName={data.name} />
      </table>
    </section>
  );
};

const TableBody = ({ tableName, tableIndex }) => {
  const dispatch = useDispatch();
  const currentTable = useSelector((state) => state.quote.tables[tableIndex]);
  const [displayAddRow, setDisplayAddRow] = useState(false);
  const [position, setPosition] = useState(0);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState({
    discount: false,
    gst: true,
  });

  useEffect(() => {
    let subtotal = 0;
    currentTable.items.forEach((item) => {
      subtotal = subtotal + item.total;
    });
    dispatch(
      updateTable({ index: tableIndex, name: "subtotal", value: subtotal })
    );
  }, [currentTable.items, tableIndex, dispatch]);

  useEffect(() => {
    let discountedSubtotal = 0;
    let gst = 0;
    let total = 0;
    if (active.discount) {
      discountedSubtotal = currentTable.subtotal - currentTable.discount;
      dispatch(
        updateTable({
          index: tableIndex,
          name: "dicountedSubtotal",
          value: discountedSubtotal,
        })
      );
    }
    if (active.gst) {
      gst = active.discount
        ? currentTable.discountedSubtotal * 0.18
        : currentTable.subtotal * 0.18;
      dispatch(updateTable({ index: tableIndex, name: "gst", value: gst }));
      total = active.discount
        ? currentTable.discountedSubtotal + currentTable.gst
        : currentTable.subtotal + currentTable.gst;
      dispatch(updateTable({ index: tableIndex, name: "total", value: total }));
    } else {
      total = active.discount
        ? currentTable.discountedSubtotal
        : currentTable.subtotal;
      dispatch(updateTable({ index: tableIndex, name: "total", value: total }));
    }
  }, [
    currentTable.subtotal,
    currentTable.discount,
    currentTable.discountedSubtotal,
    currentTable.gst,
    active.discount,
    active.gst,
    dispatch,
    tableIndex,
  ]);

  return (
    <>
      <tbody>
        {currentTable.items &&
          currentTable.items.map((item, index) => {
            return (
              <tr key={index} className="border-b relative">
                <td
                  onMouseEnter={() => setFocus(true)}
                  onMouseLeave={() => setFocus(false)}
                  className="p-5 border-r"
                >
                  <div className="flex flex-wrap gap-2 h-[80px] items-start">
                    {focus && (
                      <button
                        onClick={() => {
                          setPosition(index);
                          setDisplayAddRow(true);
                        }}
                        className="absolute p-1 bg-bg border -top-3 rounded-full left-0"
                      >
                        <Icon icon={"uil:plus"} />
                      </button>
                    )}
                    <button className="btn-outlined">
                      <Icon icon="uil:pen" />
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          removeItemFromTable({
                            name: tableName,
                            position: index,
                          })
                        )
                      }
                      className="btn-outlined"
                    >
                      <Icon icon="uil:trash" />
                    </button>
                  </div>
                </td>
                <td className="p-5 text-sm border-r">
                  <div className="h-[80px] overflow-y-auto">
                    {item.description}
                  </div>
                </td>
                <td className="p-5 text-sm border-r text-right">
                  <div className="h-[80px] w-full">
                    {+item.rate.toLocaleString("hi-IN")}
                  </div>
                </td>
                <td className="p-5 text-sm border-r text-right">
                  <div className="h-[80px] w-full">{item.qty}</div>
                </td>
                <td className="p-5 text-sm border-r">
                  <div className="h-[80px] w-full">{item.unit}</div>
                </td>
                <td className="p-5 text-sm text-right">
                  <div className="h-[80px] w-full">
                    {item.total.toLocaleString("hi-IN")}
                  </div>
                </td>
              </tr>
            );
          })}
        {currentTable?.items?.length ? (
          <>
            <tr className="border-b relative">
              <td colSpan={5} className="p-2 text-right text-sm border-r">
                Subtotal
              </td>
              <td className="p-2 text-sm text-right">
                {currentTable.subtotal.toLocaleString("hi-IN")}
              </td>
            </tr>
            {active.discount && (
              <>
                <tr className="border-b relative">
                  <td colSpan={5} className="p-2 text-right text-sm border-r">
                    Discount
                  </td>
                  <td className="p-2 text-sm text-right">
                    {currentTable.discount.toLocaleString("hi-IN")}
                  </td>
                </tr>
                <tr className="border-b relative">
                  <td colSpan={5} className="p-2 text-right text-sm border-r">
                    Total Before Tax
                  </td>
                  <td className="p-2 text-sm text-right">
                    {currentTable.discountedSubtotal.toLocaleString("hi-IN")}
                  </td>
                </tr>
              </>
            )}
            <tr className="border-b relative">
              <td colSpan={5} className="p-2 text-right text-sm border-r">
                G.S.T @18%
              </td>
              <td className="p-2 text-sm text-right">
                {currentTable.gst.toLocaleString("hi-IN")}
              </td>
            </tr>
            <tr className="border-b relative">
              <td colSpan={5} className="p-2 text-right text-sm border-r">
                Grand Total
              </td>
              <td className="p-2 text-sm text-right">
                {currentTable.total.toLocaleString("hi-IN")}
              </td>
            </tr>
          </>
        ) : null}
        {displayAddRow || !currentTable.items?.length ? (
          <AddTableRow
            tableName={tableName}
            setIsOpen={setDisplayAddRow}
            position={position}
          />
        ) : null}
      </tbody>
      {!displayAddRow && currentTable.items?.length ? (
        <button
          onClick={() => {
            setDisplayAddRow(true);
            setPosition(currentTable?.items?.length);
          }}
          className="btn-filled m-3"
        >
          Add Item
        </button>
      ) : null}
    </>
  );
};
const AddTableRow = ({ tableName, position, setIsOpen }) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    description: "",
    rate: null,
    qty: 1,
    unit: "nos",
    total: 0,
  });
  function addFieldsToItem(name, value) {
    setNewItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function addItem() {
    dispatch(
      addItemToTable({
        name: tableName,
        position: position,
        item: newItem,
      })
    );
    setNewItem({
      description: "",
      rate: null,
      qty: 1,
      unit: "nos",
    });
    setIsOpen(false);
  }
  useEffect(() => {
    const total = newItem.qty ? newItem.rate * newItem.qty : newItem.rate;
    setNewItem((prev) => {
      return {
        ...prev,
        total,
      };
    });
  }, [newItem.rate, newItem.qty]);
  return (
    <tr className="border-b">
      <td className="p-5 text-sm border-r">
        <button
          disabled={
            !newItem.description ||
            !newItem.rate ||
            !newItem.qty ||
            !newItem.unit ||
            !newItem.total
          }
          onClick={addItem}
          className="btn-outlined"
        >
          <Icon icon="uil:plus" />
        </button>
        <button className="btn-outlined mt-2">{position}</button>
      </td>
      <td className="p-2 text-sm border-r">
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          className="input"
          cols="30"
          rows="3"
          value={newItem.description}
          onChange={(e) => addFieldsToItem(e.target.name, e.target.value)}
        ></textarea>
      </td>
      <td className="p-2 text-sm border-r">
        <input
          type="number"
          placeholder="Rate"
          name="rate"
          id="rate"
          className="input"
          onChange={(e) => addFieldsToItem(e.target.name, e.target.value)}
          min={0}
          value={newItem.rate}
        />
      </td>
      <td className="p-2 text-sm border-r">
        <input
          type="number"
          placeholder="Qty"
          min={1}
          name="qty"
          id="qty"
          className="input"
          value={newItem.qty}
          onChange={(e) => addFieldsToItem(e.target.name, e.target.value)}
        />
      </td>
      <td className="p-2 text-sm border-r">
        <input
          type="text"
          name="unit"
          id="unit"
          placeholder="Unit"
          className="input"
          value={newItem.unit}
          onChange={(e) => addFieldsToItem(e.target.name, e.target.value)}
        />
      </td>
      <td className="p-5 text-sm border-r">
        {newItem?.total?.toLocaleString("hi-IN")}
      </td>
    </tr>
  );
};
const TableHead = () => {
  return (
    <thead className="bg-paper">
      <tr>
        <th
          scope="col"
          className="py-3 px-5 text-xs border-r tracking-wider uppercase text-txt"
        >
          Action
        </th>
        <th
          scope="col"
          className="py-3 px-5 text-xs border-r tracking-wider uppercase text-txt"
        >
          Description
        </th>
        <th
          scope="col"
          className="py-3 px-5 text-xs border-r tracking-wider uppercase text-txt"
        >
          Rate
        </th>
        <th
          scope="col"
          className="py-3 px-5 text-xs border-r tracking-wider uppercase text-txt"
        >
          Qty
        </th>
        <th
          scope="col"
          className="py-3 px-5 text-xs border-r tracking-wider uppercase text-txt"
        >
          Unit
        </th>
        <th className="py-3 px-5 text-xs  tracking-wider uppercase text-txt">
          Total
        </th>
      </tr>
    </thead>
  );
};
export default Table;
