import { Box, Button } from "@mui/joy";
import s from "./style.module.css";

export function FilterBar({ placeholder = "Select a talent...", onTextChange }) {
  return (
    <Box 
      className={s.container} 
      sx={{ width: { xs: '100%', sm: '185px', md: '60%' ,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'} }}
    >
      <select
        className={`${s.input} ${s.coloredFocus}`}
        onChange={onTextChange}
        style={{ width: '50%' }} 
      >
        <option value="" disabled selected>{placeholder}</option>
        <option value="programming">Programming</option>
        <option value="singer">Singer</option>
        <option value="designer">Designer</option>
        <option value="writer">Writer</option>
        <option value="photographer">Photographer</option>
        <option value="painter">Painter</option>
      </select>
      <Button className={`${s.butt} ${s.coloredFocus}`} sx={{ backgroundColor:'#041458',borderRadius:"0px 10px 10px 0px"}}>Discover</Button>
    </Box>
  );
}