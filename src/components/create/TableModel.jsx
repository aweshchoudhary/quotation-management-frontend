import { useState } from "react";
import { createTable } from "@/redux/features/quoteSlice";
import { useDispatch } from "react-redux";

const TableModel = ({ setIsModelOpen }) => {
  const [tableName, setTableName] = useState("");
  const dispatch = useDispatch();
  function createNewTable() {
    dispatch(createTable({ name: tableName }));
    setIsModelOpen(false);
  }
  return (
    <section className="p-5">
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Enter table name"
          id="table"
          name="table"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="input"
        />
      </div>
      <div className="mt-5">
        <button className="btn-filled" onClick={createNewTable}>
          Create Table
        </button>
      </div>
    </section>
  );
};

export default TableModel;
