import { useState } from "react";
import { Box, Button } from "@mui/joy";
import s from "./style.module.css";

export function FilterBar({ placeholder = "Select a talent...", onFilter }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      onFilter(selectedOption); 
    } else {
      alert("Please select a talent before discovering!");
    }
  };

  return (
    <Box
      className={s.container}
      sx={{
        width: { xs: "100%", sm: "185px", md: "60%" },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        className={`${s.input} ${s.coloredFocus}`}
        value={selectedOption}
        onChange={handleSelectChange}
        style={{
          width: "50%",
          border: "1px solid #ccc",
          borderRadius: "10px 0 0 10px",
          padding: "8px",
          outline: "none",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="programming">Programming</option>
        <option value="singer">Singer</option>
        <option value="designer">Designer</option>
        <option value="writer">Writer</option>
        <option value="photographer">Photographer</option>
        <option value="painter">Painter</option>
      </select>

      <Button
        onClick={handleButtonClick}
        className={`${s.butt} ${s.coloredFocus}`}
        sx={{
          backgroundColor: "#041458",
          borderRadius: "0 10px 10px 0",
          height: "42px",
          color: "white",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#052089",
          },
        }}
      >
        Discover
      </Button>
    </Box>
  );
}
