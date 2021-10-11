// localStorage hanya dpt menyimpan data primitif spt string
// Key untuk mengakses dan menyimpan data pd localStorage
const CACHE_KEY = "calculation_history";

// Fungsi untuk mengembalikan nilai boolean dr pengecekan fitur storage
function checkForStorage() {
  return typeof Storage !== "undefined";
}

// Fungsi utk menyimpan data riwayat kalkulasi pd localStorage
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      //parse utk mengubah nilai objek dlm bentuk string kembali pd bentuk objek JS
      // JSON adl format pertukaran data
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }
    //unshift utk menambahkan nilai baru pada array yang ditempatkan pada awal index
    historyData.unshift(data);

    //ukuran history data tidak pernah > 5, agar riwayat kalkulasi yg muncul adl 5 hasil terakhir
    if (historyData.length > 5) {
      //pop fungsi utk mengahous nilai index terakhir pd array
      historyData.pop();
    }
    //stringify utk mengubah objek JS ke String
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

// Fungsi mendapatkan data dr localStorage: mengembalikan nilai array dr localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse()
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

// Fungsi render data riwayat kalkulasi pada tabel HTML
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten html pd elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

// panggil fungsi render
renderHistory();
