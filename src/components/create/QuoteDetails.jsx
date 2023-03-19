import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuoteField } from "@/redux/features/quoteSlice";

const QuoteDetails = () => {
  const quote = useSelector((state) => state.quote.quoteDetails);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([
    {
      name: "date",
      label: "Date",
      type: "date",
    },
    {
      name: "quoteNo",
      label: "Quote No",
      type: "number",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
    },
    {
      name: "reference",
      label: "Reference",
      type: "text",
    },
  ]);
  // function setFieldActive(name) {
  //   const editedField = [...fields];
  //   editedField.forEach((item) => {
  //     if (item.name === name) {
  //       item.active = true;
  //     }
  //   });
  //   setFields(editedField);
  // }
  // function removeFieldActive(name) {
  //   const editedField = [...fields];
  //   editedField.forEach((item) => {
  //     if (item.name === name) {
  //       item.active = false;
  //       dispatch(removeCompanyField(name));
  //     }
  //   });
  //   setFields(editedField);
  // }
  return (
    <>
      <h2 className="text-lg font-medium mb-5">Quote Details</h2>
      {fields &&
        fields.map((item, index) => {
          return (
            <div key={index} className="flex mb-3 item-center gap-2">
              <div className="flex-1">
                <input
                  type={item.type}
                  placeholder={item.label}
                  name={item.name}
                  id={item.name}
                  value={quote[item.name]}
                  onChange={(e) =>
                    e.target.value || +e.target.value < 1
                      ? dispatch(
                          setQuoteField({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        )
                      : null
                  }
                  className="input text-sm"
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default QuoteDetails;
