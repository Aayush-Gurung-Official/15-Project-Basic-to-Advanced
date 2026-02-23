const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const acBtn = document.getElementById("ac");
const delBtn = document.getElementById("del");
const equalsBtn = document.querySelector(".equal"); // select the equal button

let expression = "";

// Handle number & operator buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Skip special buttons, handled separately
        if (button.id === "ac" || button.id === "del" || button.classList.contains("equal")) {
            return;
        }

        expression += value;
        display.value = expression;
    });
});

// AC - Clear all
acBtn.addEventListener("click", () => {
    expression = "";
    display.value = "";
});

// DEL - Delete last character
delBtn.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    display.value = expression;
});

// Equal - Evaluate expression
equalsBtn.addEventListener("click", () => {
    try {
        // Evaluate expression safely
        expression = eval(expression).toString();
        display.value = expression;
    } catch {
        display.value = "Error";
        expression = "";
    }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    // Numbers and operators
    if ((e.key >= "0" && e.key <= "9") || "+-*/.%".includes(e.key)) {
        expression += e.key;
        display.value = expression;
    }

    // Enter key to calculate
    if (e.key === "Enter") {
        try {
            expression = eval(expression).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    }

    // Backspace key for DEL
    if (e.key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }

    // Escape key for AC
    if (e.key === "Escape") {
        expression = "";
        display.value = "";
    }
});