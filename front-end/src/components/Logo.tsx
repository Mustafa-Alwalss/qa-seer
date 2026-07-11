import {Image} from "react-bootstrap";

import logo from "../assets/qa-seer_LOGO_Withe.webp"

function Logo() {
    return (
        <>
            <Image
                   src={logo}
                   className={"w-50"}
            />
        </>
    )
}

export default Logo;