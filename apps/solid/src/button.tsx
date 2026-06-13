import type { Component, JSX } from "solid-js"

type ButtonProps = {
    frozen?: boolean
    onClick?: () => void
    children?: JSX.Element
}

export const Button: Component<ButtonProps> = (props) => {
    return (
        <button
            onClick={props.onClick}
            class={`w-14 h-14 rounded-xl text-xl font-bold cursor-pointer transition-all
                ${
                    props.frozen
                        ? "bg-green-400 text-green-900 shadow-[0_0_12px_rgba(74,222,128,0.5)]"
                        : "bg-white text-gray-800 shadow-md hover:-translate-y-0.5"
                }`}
        >
            {props.children}
        </button>
    )
}
