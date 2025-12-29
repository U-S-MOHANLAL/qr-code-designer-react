import QRCodeStyling from "qr-code-styling"
import { TextField, InputLabel, FormControl, Select, MenuItem, FormLabel } from '@mui/material';
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react"
import colorPickerDialog from "./components/ColorPickerDialog";


export default function Qrcode() {
    const [qrFormData, setQrFormData] = useState(
        {
            data: '',
            width: 200,
            height: 200,
            shape: 'square',
            margin: 0,
            dotsOptions: {
                color: '#000000',
                type: 'square'
            },
            backgroundOptions: {
                color: '#FFFFFF'
            }
        })
    
    useEffect(() => {
        const qrCode = new QRCodeStyling(qrFormData)
        let imageHTML = document?.getElementById?.('qr-image')
        if (imageHTML) {
            imageHTML.innerHTML = ''
            qrCode.append(imageHTML)
        }
    }, [qrFormData])
    return (
        <div>
            <Grid className="qr-form-body"
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 3, md: 4 }}
            >
                <Grid>
                    <InputLabel htmlFor="context">Input Text</InputLabel>
                    <TextField id="context" placeholder="Enter text to be convert into QR" value={qrFormData.data} onChange={(event) => {
                        setQrFormData({ ...qrFormData, data: event?.target.value })
                    }} />
                </Grid>
                <Grid>
                    <InputLabel htmlFor="width">Width</InputLabel>
                    <TextField id="width" placeholder="Enter Width of an QR" value={qrFormData.width} onChange={(event) => {
                        setQrFormData({ ...qrFormData, width: Number(event?.target.value) ?? 200 })
                    }} ></TextField>
                </Grid>
                <Grid>
                    <InputLabel htmlFor="height">Height</InputLabel>
                    <TextField id="height" placeholder="Enter Height of an QR" value={qrFormData.height} onChange={(event) => {
                        setQrFormData({ ...qrFormData, height: Number(event?.target.value) ?? 200 })
                    }} ></TextField>
                </Grid>
                <Grid>
                    <InputLabel>Margin</InputLabel>
                    <TextField value={qrFormData.margin} onChange={(event) => {
                        setQrFormData({ ...qrFormData, margin: Number(event?.target.value) })
                    }}></TextField>
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <FormLabel>Shape</FormLabel>
                        <Select value={qrFormData.shape} onChange={(event) => {
                            setQrFormData({ ...qrFormData, shape: event?.target.value })
                        }}>
                            <MenuItem value='square'>Square</MenuItem>
                            <MenuItem value='circle'>Circle</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <InputLabel>Color</InputLabel>
                    {colorPickerDialog(qrFormData.dotsOptions, (event) => {
                        setQrFormData({ ...qrFormData, dotsOptions: { ...event } })
                    })}
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <FormLabel>Type</FormLabel>
                        <Select value={qrFormData.dotsOptions.type} onChange={(event) => {
                            setQrFormData({ ...qrFormData, dotsOptions: { ...qrFormData.dotsOptions, type: event?.target.value } })
                        }}>
                            <MenuItem value='square'>Square</MenuItem>
                            <MenuItem value='rounded'>Rounded</MenuItem>
                            <MenuItem value='classy'>Classy</MenuItem>
                            <MenuItem value='classy-rounded'>Classy Rounded</MenuItem>
                            <MenuItem value='dots'>Dots</MenuItem>
                            <MenuItem value='extra-rounded'>Extra Rounded</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <InputLabel>Background Color</InputLabel>
                    {colorPickerDialog(qrFormData.backgroundOptions, (event) => setQrFormData({ ...qrFormData, backgroundOptions: { ...event }}))}
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid>
                    <div id="qr-image"></div>
                </Grid>

            </Grid>
        </div>
    )
}