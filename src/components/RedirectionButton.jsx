import { Button } from "@mui/material";

export default function RedirectionButton(buttonParameters) {
    console.log(buttonParameters);
    return (
        buttonParameters.map((button)=>(
        <Button key={button.name} style={{color: "white", margin: "10px"}} onClick={()=> (
            window.open(button.url)
        )}>{button.icon}{button.name}</Button>
        ))
    )
}