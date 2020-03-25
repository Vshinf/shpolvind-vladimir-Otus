import React from "react";
import {render} from "react-dom";

interface IProps {
    name: string
}

const HelloName = ({name}: IProps) => (
    <div>
        Hello {name}!
    </div>
);

render(
    <HelloName name="Vladimir"/>,
    document.getElementById('root')
);