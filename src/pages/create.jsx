import Head from "next/head";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

// Components
import PageHeader from "@/components/global/PageHeader";
import CompanyDetails from "@/components/create/CompanyDetails";
import QuoteDetails from "@/components/create/QuoteDetails";
import ProductModel from "@/components/create/ProductModel";
import Model from "@/components/model/Model";
import ProductList from "@/components/create/ProductList";
import TableModel from "@/components/create/TableModel";
import TableList from "@/components/create/TableList";

const Create = () => {
  const quotation = useSelector((state) => state.quote);
  const [isProductModelOpen, setIsProductModelOpen] = useState(false);
  const [isTableModelOpen, setIsTableModelOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <PageHeader>Create</PageHeader>
      <section className="flex border-b">
        <div className="md:w-1/2 p-5 shrink-0 border-r">
          <QuoteDetails />
        </div>
        <div className="md:w-1/2 p-5 shrink-0">
          <CompanyDetails />
        </div>
      </section>
      <section className="px-5 py-3 border-b flex gap-3">
        <button
          onClick={() => setIsProductModelOpen(true)}
          className="btn-filled text-sm"
        >
          <Icon icon="uil:plus" className="text-xl" />
          <span>Add Product</span>
        </button>
        <button
          onClick={() => setIsTableModelOpen(true)}
          className="btn-filled text-sm"
        >
          <Icon icon="uil:plus" className="text-xl" />
          <span>Add Table</span>
        </button>
      </section>
      <Model
        isOpen={isProductModelOpen}
        title="Add Product"
        setIsOpen={setIsProductModelOpen}
      >
        <ProductModel setIsModelOpen={setIsProductModelOpen} />
      </Model>
      <Model
        isOpen={isTableModelOpen}
        title="Create Table"
        setIsOpen={setIsTableModelOpen}
      >
        <TableModel setIsModelOpen={setIsTableModelOpen} />
      </Model>
      <ProductList />
      <TableList />
      {quotation.tables.length || quotation.products.length
        ? quotation.quoteDetails &&
          quotation.company && (
            <footer className="px-5 py-3 bg-paper flex gap-3">
              <button className="btn-outlined">Discard</button>
              <button className="btn-filled bg-bg">Add Quote</button>
            </footer>
          )
        : null}
    </>
  );
};

export default Create;
