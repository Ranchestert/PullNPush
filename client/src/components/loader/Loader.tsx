import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useRef, type FC } from "react";
import "./Loader.css";

interface LoaderProps {
    amount: number
}

export const Loader: FC<LoaderProps> = ({amount}) => {
    const containerRef = useRef(null);

    useGSAP(()=>{
        const circles = gsap.utils.toArray<HTMLElement>(".loader-circle");

        circles.forEach((item,i)=>{
            gsap.to(item, {
                y:-20,
                repeat: -1,
                delay: 0.2*i,
                yoyo: true,
                ease: "sine.inOut",
                duration: 0.7
            })})
    },{scope: containerRef})

    return (
        <div className="loader" ref={containerRef}>
            {[...Array(amount).keys()].map((id)=>(<div key={id} className="loader-circle"></div>))}
        </div>
    );
}