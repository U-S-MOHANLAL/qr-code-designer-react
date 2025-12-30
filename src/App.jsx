import QRCodeStyling from "qr-code-styling";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  Switch,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import colorPickerDialog from "./components/ColorPickerDialog";

export default function Qrcode() {
  const initialQROptions = {
    data: "https://github.com/U-S-MOHANLAL/qr-code-designer-react",
    width: 200,
    height: 200,
    shape: "square",
    margin: 0,
    dotsOptions: {
      color: "#000000",
      type: "square",
    },
    backgroundOptions: {
      color: "#FFFFFF",
    },
    image: "",
    imageOptions: {
      hideBackgroundDots: false,
      margin: 0,
    },
    cornersSquareOptions: {
      color: "#fc0000ff",
      type: "square",
    },
    cornersDotOptions: {
      color: "#00ff80ff",
      type: "square",
    },
  };

  const downloadOption = {
    name: "qr-code",
    extension: "png",
  };

  const [download, setDownload] = useState(downloadOption);
  const [qrFormData, setQrFormData] = useState(initialQROptions);

  const qrCodeFormation = (isDownload = false) => {
    const qrCode = new QRCodeStyling(qrFormData);
    let imageHTML = document?.getElementById?.("qr-image");
    if (imageHTML) {
      imageHTML.innerHTML = "";
      qrCode.append(imageHTML);
    }
    isDownload &&
      qrCode.download({ name: "qr-code", extension: download.extension });
  };

  useEffect(() => {
    qrCodeFormation();
  }, [qrFormData]);
  return (
    <div>
      <Header />
      <Grid container spacing={2} className="qr-form-body" alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid>
            <InputLabel>Input Text</InputLabel>
            <TextField
              fullWidth={true}
              id="context"
              placeholder="Enter text to be convert into QR"
              value={qrFormData.data}
              onChange={(event) => {
                setQrFormData({ ...qrFormData, data: event?.target.value });
              }}
            />
          </Grid>
          <Grid>
            <InputLabel>Width</InputLabel>
            <TextField
              fullWidth={true}
              id="width"
              placeholder="Enter Width of an QR"
              value={qrFormData.width}
              onChange={(event) => {
                setQrFormData({
                  ...qrFormData,
                  width: Number(event?.target.value) ?? 200,
                });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <InputLabel>Height</InputLabel>
            <TextField
              fullWidth={true}
              id="height"
              placeholder="Enter Height of an QR"
              value={qrFormData.height}
              onChange={(event) => {
                setQrFormData({
                  ...qrFormData,
                  height: Number(event?.target.value) ?? 200,
                });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <InputLabel>Margin</InputLabel>
            <TextField
              fullWidth={true}
              value={qrFormData.margin}
              onChange={(event) => {
                setQrFormData({
                  ...qrFormData,
                  margin: Number(event?.target.value),
                });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <InputLabel>Image URL</InputLabel>
            <TextField
              value={qrFormData.image}
              placeholder="Enter image URL to place at the center of the QR code"
              fullWidth={true}
              onChange={(event) => {
                setQrFormData({ ...qrFormData, image: event.target.value });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <InputLabel>Image Margin</InputLabel>
            <TextField
              value={qrFormData.imageOptions.margin}
              fullWidth={true}
              onChange={(event) => {
                setQrFormData({
                  ...qrFormData,
                  imageOptions: {
                    ...qrFormData.imageOptions,
                    margin: Number(event.target.value),
                  },
                });
              }}
            ></TextField>
          </Grid>
          <Grid>
            <InputLabel>Hide Background Dots - Image</InputLabel>
            <Switch
              checked = {qrFormData.imageOptions.hideBackgroundDots}
              onChange={(event) => {
                setQrFormData({
                  ...qrFormData,
                  imageOptions: {
                    ...qrFormData.imageOptions,
                    hideBackgroundDots: event.target.checked,
                  },
                });
              }}
            ></Switch>
          </Grid>
          <Grid>
            <InputLabel>Color</InputLabel>
            {colorPickerDialog(qrFormData.dotsOptions, (event) => {
              setQrFormData({ ...qrFormData, dotsOptions: { ...event } });
            })}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} alignSelf={"start"}>
          <Grid>
            <FormControl fullWidth={true}>
              <FormLabel>Shape</FormLabel>
              <Select
                value={qrFormData.shape}
                onChange={(event) => {
                  setQrFormData({
                    ...qrFormData,
                    shape: event?.target.value,
                  });
                }}
              >
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="circle">Circle</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl fullWidth={true}>
              <FormLabel>Dot Type</FormLabel>
              <Select
                value={qrFormData.dotsOptions.type}
                onChange={(event) => {
                  setQrFormData({
                    ...qrFormData,
                    dotsOptions: {
                      ...qrFormData.dotsOptions,
                      type: event?.target.value,
                    },
                  });
                }}
              >
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="rounded">Rounded</MenuItem>
                <MenuItem value="classy">Classy</MenuItem>
                <MenuItem value="classy-rounded">Classy Rounded</MenuItem>
                <MenuItem value="dots">Dots</MenuItem>
                <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <InputLabel>Background Color</InputLabel>
            {colorPickerDialog(qrFormData.backgroundOptions, (event) =>
              setQrFormData({
                ...qrFormData,
                backgroundOptions: { ...event },
              })
            )}
          </Grid>
          <Grid>
            <FormControl fullWidth={true}>
              <FormLabel>Corners Square Type</FormLabel>
              <Select
                value={qrFormData.cornersSquareOptions.type}
                onChange={(event) => {
                  setQrFormData({
                    ...qrFormData,
                    cornersSquareOptions: {
                      ...qrFormData.cornersSquareOptions,
                      type: event?.target.value,
                    },
                  });
                }}
              >
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="dot">Dot</MenuItem>
                <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
                <MenuItem value="rounded">Rounded</MenuItem>
                <MenuItem value="dots">Dots</MenuItem>
                <MenuItem value="classy">Classy</MenuItem>
                <MenuItem value="classy-rounded">Classy Rounded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <InputLabel>Corners Square Color</InputLabel>
            {colorPickerDialog(qrFormData.cornersSquareOptions, (event) =>
              setQrFormData({
                ...qrFormData,
                cornersSquareOptions: { ...event },
              })
            )}
          </Grid>
          <Grid>
            <FormControl fullWidth={true}>
              <FormLabel>Corners Dot Type</FormLabel>
              <Select
                value={qrFormData.cornersDotOptions.type}
                onChange={(event) => {
                  setQrFormData({
                    ...qrFormData,
                    cornersDotOptions: {
                      ...qrFormData.cornersDotOptions,
                      type: event?.target.value,
                    },
                  });
                }}
              >
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="dot">Dot</MenuItem>
                <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
                <MenuItem value="rounded">Rounded</MenuItem>
                <MenuItem value="dots">Dots</MenuItem>
                <MenuItem value="classy">Classy</MenuItem>
                <MenuItem value="classy-rounded">Classy Rounded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <InputLabel>Corners Dot Color</InputLabel>
            {colorPickerDialog(qrFormData.cornersDotOptions, (event) =>
              setQrFormData({
                ...qrFormData,
                cornersDotOptions: { ...event },
              })
            )}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} justifyItems="center">
          <Grid>
            <div id="qr-image"></div>
          </Grid>
          <Grid>
            <FormControl fullWidth={true}>
              <FormLabel>File Format</FormLabel>
              <Select
                value={download.extension}
                onChange={(event) => {
                  setDownload({
                    ...download,
                    extension: event?.target.value,
                  });
                }}
              >
                <MenuItem value="png">PNG</MenuItem>
                <MenuItem value="jpeg">JPEG</MenuItem>
                <MenuItem value="webp">WEBP</MenuItem>
                <MenuItem value="svg">SVG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "20px" }}
              onClick={() => {
                qrCodeFormation(true);
              }}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
