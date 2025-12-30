import {
  Dialog,
  InputLabel,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { HexColorPicker } from "react-colorful";
import { useMemo, useState } from "react";

export default function ColorPickerDialog(template, setQrFormData) {
  const [dialogBox, setdialogBox] = useState(false);
  const [color, setColor] = useState({
    colorType: "solid",
    gradientType: "linear",
    color: ["#ff0000", "#0029ff"],
    rotation: 0,
  });
  const updateOptionPayload = () => {
    let temp = template;
    let options;
    if (color.colorType === "solid") {
      delete temp?.gradient;
      options = { ...temp, color: color.color[0] };
    } else {
      delete temp?.color;
      options = {
        ...temp,
        gradient: {
          type: color.gradientType,
          colorStops: [
            { offset: 0, color: color.color[0] },
            { offset: 1, color: color.color[1] },
          ],
          rotation: 0,
        },
      };
      if (color.gradientType === "linear") {
        options.gradient.rotation = color.rotation;
      }
    }
    setQrFormData(options);
    setdialogBox(false);
  };

  const conatinerColor = useMemo(() => {
    let color;
    if (template?.color) {
      color = template?.color;
    } else {
      color = `${template?.gradient?.type}-gradient(${
        template?.gradient?.type === "linear"
          ? `${template?.gradient?.rotation}deg`
          : "circle"
      }, ${template?.gradient?.colorStops[0].color}, ${
        template?.gradient?.colorStops[1].color
      })`;
    }
    return color;
  }, [template]);
  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 2, sm: 1 }}>
          <ColorLensIcon className="color-picker-icon" />
        </Grid>
        <Grid size={{ xs: 10, sm: 11 }}>
          <div
            className="color-picker"
            style={{
              background: conatinerColor,
            }}
            onClick={() => setdialogBox(true)}
          ></div>
        </Grid>
      </Grid>
      <Dialog
        open={dialogBox}
        onClose={() => setdialogBox(false)}
        slotProps={{
          paper: {
            sx: { height: 500, width: 505, alignItems: "center", padding: 2 },
          },
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          style={{ padding: "20px" }}
          alignContent="center"
        >
          <Grid size={4}>
            <FormControl>
              <FormLabel>Color Type</FormLabel>
              <Select
                value={color.colorType}
                onChange={(event) => {
                  setColor({ ...color, colorType: event.target.value });
                }}
              >
                <MenuItem value="solid">Solid</MenuItem>
                <MenuItem value="gradient">Gradient</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {color.colorType === "gradient" && (
            <Grid size={4}>
              <FormControl>
                <FormLabel>Gradient Type</FormLabel>
                <Select
                  value={color.gradientType}
                  onChange={(event) => {
                    setColor({ ...color, gradientType: event.target.value });
                  }}
                >
                  <MenuItem value="linear">Linear</MenuItem>
                  <MenuItem value="radial">Radial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          {color.gradientType === "linear" &&
            color.colorType === "gradient" && (
              <Grid size={4}>
                <InputLabel>Rotation</InputLabel>
                <TextField
                  value={color.rotation}
                  onChange={(event) => {
                    setColor({
                      ...color,
                      rotation: Number(event.target.value),
                    });
                  }}
                ></TextField>
              </Grid>
            )}
        </Grid>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          style={{ padding: "20px" }}
        >
          <Grid>
            <HexColorPicker
              color={color.color[0]}
              onChange={(event) => {
                setColor({ ...color, color: [event, color.color[1]] });
              }}
            />
            <InputLabel>Hex Value</InputLabel>
            <TextField
              value={color.color[0]}
              onChange={(event) =>
                setColor({
                  ...color,
                  color: [event.target.value, color.color[1]],
                })
              }
            ></TextField>
          </Grid>
          {color.colorType === "gradient" && (
            <Grid>
              <HexColorPicker
                color={color.color[1]}
                onChange={(event) => {
                  setColor({ ...color, color: [color.color[0], event] });
                }}
              />
              <InputLabel>Hex Value</InputLabel>
              <TextField
                value={color.color[1]}
                onChange={(event) =>
                  setColor({
                    ...color,
                    color: [event.target.value, color.color[1]],
                  })
                }
              ></TextField>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid>
            <Button
              variant="outlined"
              onClick={() => {
                setdialogBox(false);
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={() => {
                updateOptionPayload();
              }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
