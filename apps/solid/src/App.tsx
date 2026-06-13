import { For, createMemo, type Component } from "solid-js"
import { Button } from "./button"
import { createStore } from "solid-js/store"

type Die = { id: number; value: number; frozen: boolean }

function randDie(id: number): Die {
    return { id, value: Math.ceil(Math.random() * 6), frozen: false }
}

function initDice(): Die[] {
    return Array.from({ length: 10 }, (_, i) => randDie(i))
}

const App: Component = () => {
    const [dice, setDice] = createStore<Die[]>(initDice())

    const hasWon = createMemo(() => dice.every((d) => d.frozen) && new Set(dice.map((d) => d.value)).size === 1)

    function toggleFreeze(id: number) {
        setDice(
            (d) => d.id === id,
            "frozen",
            (f) => !f
        )
    }

    function roll() {
        if (hasWon()) {
            setDice(initDice())
            return
        }
        setDice(
            (d) => !d.frozen,
            "value",
            () => Math.ceil(Math.random() * 6)
        )
    }

    return (
        <div class="flex justify-center items-center h-screen bg-[#0B2434]">
            <div class="flex flex-col gap-5 p-10 bg-white max-w-1/2 text-center">
                <header class="flex flex-col items-center gap-2">
                    <h1 class="text-4xl">Tenzies</h1>
                    <p>
                        Roll until all dice are the same. Click each die to freeze it at its current value between
                        rolls.
                    </p>
                </header>
                <main class="flex flex-col gap-10 justify-center items-center">
                    <div class="grid grid-cols-5 grid-rows-2 gap-4">
                        <For each={dice}>
                            {(die) => (
                                <Button frozen={die.frozen} onClick={() => toggleFreeze(die.id)}>
                                    {die.value}
                                </Button>
                            )}
                        </For>
                    </div>
                    {hasWon() && <p class="text-green-600 font-bold text-lg">🎉 You won!</p>}
                    <button
                        class="bg-[#5035FF] text-2xl text-white px-10 py-3 rounded-lg cursor-pointer hover:opacity-90"
                        onClick={roll}
                    >
                        {hasWon() ? "New Game" : "Roll"}
                    </button>
                </main>
            </div>
        </div>
    )
}

export default App
