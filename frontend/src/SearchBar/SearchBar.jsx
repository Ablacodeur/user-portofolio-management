import { Box } from "@mui/joy";
import s from "./style.module.css";

export function SearchBar({ placeholder = "🔍 Search by name ...", onTextChange , onKeyDown}) {
  return (
    <Box 
      className={s.container} 
      sx={{ width: { xs: '100%'} }}
    >
      <input
        type="text"
        className={`${s.input} ${s.coloredFocus}`}
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        style={{ width: '100%' }} 
      />
    </Box>
  );
}
