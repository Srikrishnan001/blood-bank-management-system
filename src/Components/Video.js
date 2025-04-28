import React from 'react'
import '../Css/Video.css'
const Video =()=>{

    return(
        <div class='hero'>
            <video autoPlay loop muted plays-inline>
                <source src="Images/ten.mp4" type="video/mp4"/>
            </video>
        </div>
    )
}
export default Video