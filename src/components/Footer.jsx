import { Grid, Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Grid alignSelf="end" className="footer">
      <Typography
        variant="body2"
        color="white"
        style={{
          paddingTop: "7px",
          paddingLeft: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          window.open("https://github.com/U-S-MOHANLAL/qr-code-designer-react");
        }}
      >
        © {currentYear} Mohanlal S
      </Typography>
    </Grid>
  );
}
