import React, { Fragment } from "react";
import { TextField } from "@mui/material";

function MyForm({ label, formData, formErr, handleChange,inputColor,color }) {
  const getValue = (name, data) => {
    const values = Object.keys(data);
    return values.includes(name) ? data[name] : "";
  };
  const getError = (name, data) => {
    const values = Object.keys(data);
    return values.includes(name) ? data[name] : "";
  };
  return (

    <Fragment >
      {label &&
        label.map((item) => (
          <TextField
            key={item.name}
            label={item.name}
            name={item.label}
            value={getValue(item.label, formData)}
            variant="outlined"
            size="small"
            onChange={handleChange}
            helperText={getError(item.label, formErr)}
            error={!!getError(item.label, formErr)}
            fullWidth
            color={color}
            focused
            sx={{marginTop:{xs:2,md:3},'& input':{color:inputColor}}}
          />
        ))}
    </Fragment>

  );
}

export default MyForm;
