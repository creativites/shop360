import {render} from "react-dom"
import { App } from "./app";


require("./css/base.css")
require("./less/style.less")
let w = document.documentElement.clientWidth;
//计算出需要给到html元素上 实际的font-size的值
let fs = w/375*100;
document.documentElement.style.fontSize = `${fs}px`;

render(<App />,document.getElementById("app"));
