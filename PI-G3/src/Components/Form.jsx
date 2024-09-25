import React from "react";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ fields, buttonText, onSubmit, className, inputClassName, children, paragraphText }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className={className}>
        {children}
        {fields.map((field, index) => {
          if (field.type === "group") {
            return (
              <div key={index} className={field.className}>
                {field.fields.map((subField, subIndex) => (
                  <input
                    key={subIndex}
                    className={inputClassName}
                    type={subField.type}
                    placeholder={subField.placeholder}
                    name={subField.name}
                    value={subField.value}
                    onChange={subField.onChange}
                  />
                ))}
              </div>
            );   
          } else if (field.type === "select") {
            return (
              <div key={index} className={inputClassName}>
              <label >
                {field.label}
                <select
                  key={index}
                  className={inputClassName}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  
                >
                  {field.options && field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
                </div>
              
            );
          } else if (field.type === "checkbox") {
            return (
              <div key={index} className="form-group">
                <label>
                  <input
                    className={inputClassName}
                    type={field.type}
                    name={field.name}
                    checked={field.checked}
                    onChange={field.onChange}
                  />
                  {field.label}
                </label>
              </div>
            );
          } else if (field.type === "custom") {
            return (
              <div key={index} className={inputClassName}>
                {field.render()}
              </div>
            );
          }
          else if (field.type === "label") {
            return (
              <div key={index} className={inputClassName}>
                <label> {field.label}
                  <input
                    className={inputClassName}
                    type={field.type}
                    name={field.name}
                    checked={field.checked}
                    onChange={field.onChange}
                    value={field.value}
                    autoComplete={field.autoComplete}
                    onClick={field.onClick}
                  />
                  
                </label>
              </div>
            );
          } 
           else {
            return (
              <input
               key={index}
                className={inputClassName}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                autoComplete={field.autoComplete}
                onClick={field.onClick}
              />
             
            );
          }
        })}
        {paragraphText && <p className="form-paragraph">{paragraphText}</p>}
        <Button className={"btn-search"}>{buttonText}</Button>
      </form>
    </div>
  );
};

export default Form;

