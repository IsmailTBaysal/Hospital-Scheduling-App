import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function SearchBar({ searchValueFunction }) {
  return (
    // <form>
    //   {" "}
    //   <Box
    //     component="form"
    //     sx={{
    //       "& > :not(style)": { m: 1, width: "25ch" },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <TextField
    //       id="outlined-basic"
    //       label="Search Patient"
    //       variant="outlined"
    //       onChange={(e) => searchValueFunction(e.target.value)}
    //     />
    //   </Box>
    // </form>
    <TextField
      label="Search Patients"
      onChange={(e) => searchValueFunction(e.target.value)}
      variant="outlined"
      margin="normal"
      sx={{
        width: "200px",
        marginLeft: "10px",
        "& .MuiOutlinedInput-input": {
          padding: "8px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
