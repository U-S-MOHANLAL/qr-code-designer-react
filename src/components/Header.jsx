import { Grid } from "@mui/material";
import RedirectionButton from "./redirectionButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Header() {
  const buttonParameters = [
    {
      name: "GitHub",
      url: "https://github.com/U-S-MOHANLAL",
      icon: <GitHubIcon style={{ marginRight: "8px" }} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohanlal-s-7723603a2/",
      icon: <LinkedInIcon style={{ marginRight: "8px" }} />,
    },
  ];
  return (
    <div className="navbar">
      <Grid container alignItems="right" justifyContent="right">
        <Grid>{RedirectionButton(buttonParameters)}</Grid>
      </Grid>
    </div>
  );
}
