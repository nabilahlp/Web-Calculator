// Membuat objek calculator untuk menyimpan data dan kondisi pd calculator
const calculator = {
  displayNumber: "0", //angka yang muncul di calcu
  operator: null, //akan diberikan nilai  ketika  pengguna melakukan aksi
  firstNumber: null, //akan diberikan nilai  ketika  pengguna melakukan aksi
  waitingForSecondNumber: false, //kondisi calcu menunggu angka kedua
};

// Membuat fungsi update
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Membuat fungsi clear
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// Fungsi input angka ke displayNumber
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// Fungsi inverseNumber
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// Fungsi operator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dr angka 0
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

// Fungsi performCalculator
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

// Variable buttons
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    //Mendapatkan objek element yang diklik
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
