import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressBarVote({ value }) {
    return (
        <div
            style={{ width: "60px", height: '60px', backgroundColor: '#204529', borderRadius: '50%' }}
            className={'me-3'}
        >
            <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={10}
                styles={{
                    root: {
                        width: "100%",
                        height: "100%",
                    },
                    path: {
                        stroke: "#18e21b",
                        strokeLinecap: "butt",
                        transition: "stroke-dashoffset 0.5s ease 0s",
                    },
                    trail: {
                        stroke: "#204529",
                        strokeLinecap: "butt",
                    },
                    text: {
                        fill: "#d6d6d6",
                        fontSize: "24px",
                        fontWeight: "bold",
                        dominantBaseline: "middle",
                        textAnchor: "middle",
                    },
                }}
            />
        </div>
    );
}

export default CircularProgressBarVote;
