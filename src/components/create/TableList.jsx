import { useSelector } from "react-redux";
import Table from "./Table";

const TableList = () => {
  const tables = useSelector((state) => state.quote.tables);
  return tables.map((item, index) => {
    return <Table key={index} data={{ ...item, index }} />;
  });
};

export default TableList;
