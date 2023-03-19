import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  setCompanyField,
  removeCompanyField,
} from "@/redux/features/quoteSlice";

const CompanyDetails = () => {
  const company = useSelector((state) => state.quote.company);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([
    {
      name: "companyName",
      active: false,
      label: "Company Name",
      type: "text",
    },
    {
      name: "contactPerson",
      active: false,
      label: "Contact Person",
      type: "text",
    },
    {
      name: "email",
      active: false,
      label: "Email",
      type: "email",
    },
    {
      name: "number",
      active: false,
      label: "Phone Number",
      type: "number",
    },
    {
      name: "gstin",
      active: false,
      label: "GST Number",
      type: "text",
    },
  ]);
  function setFieldActive(name) {
    const editedField = [...fields];
    editedField.forEach((item) => {
      if (item.name === name) {
        item.active = true;
      }
    });
    setFields(editedField);
  }
  function removeFieldActive(name) {
    const editedField = [...fields];
    editedField.forEach((item) => {
      if (item.name === name) {
        item.active = false;
        dispatch(removeCompanyField(name));
      }
    });
    setFields(editedField);
  }

  return (
    <>
      <h2 className="text-lg font-medium mb-5">Company Details</h2>
      <div className="chips mb-3 flex flex-wrap">
        {fields &&
          fields.map((item, index) => {
            return (
              <button
                key={index}
                className="chip btn-outlined shrink-0 p-1 px-2 mr-2 mb-2 text-sm"
                onClick={() => setFieldActive(item.name)}
                disabled={item.active}
              >
                {item.label}
              </button>
            );
          })}
      </div>
      {fields &&
        fields.map((item, index) => {
          return (
            item.active && (
              <div key={index} className="flex mb-3 items-stretch gap-2">
                <div className="flex-1">
                  <input
                    type={item.type}
                    placeholder={item.label}
                    name={item.name}
                    id={item.name}
                    value={company[item.name]}
                    onChange={(e) =>
                      dispatch(
                        setCompanyField({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                    className="input text-sm h-full"
                  />
                </div>
                <button
                  onClick={() => removeFieldActive(item.name)}
                  className="text-2xl w-[10%] btn-outlined flex items-center justify-center"
                >
                  <Icon icon="uil:trash" />
                </button>
              </div>
            )
          );
        })}
    </>
  );
};

export default CompanyDetails;
