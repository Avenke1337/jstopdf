import { robotobase64 } from "./fonts/robotop.js";
import { robotobase64bold } from "./fonts/robotop.js";

function formValidation() {
    let imie = document.getElementById('imie').value;
    let nazwisko = document.getElementById('nazwisko').value;
    let telefon = document.getElementById('telefon').value;
    let email = document.getElementById('email').value;
    let dataurodzenia = document.getElementById('data').value;
    let pesel = document.getElementById('pesel').value;
    let adres = document.getElementById('adres').value;
    let kodpocztowy = document.getElementById('kodpocztowy').value;
    let miasto = document.getElementById('miasto').value;
    let zawod = document.getElementById('zawod').value;


 

    if (imie === "" || nazwisko === "" || telefon === "" || email === "" || dataurodzenia === "" || pesel === "" || adres === "" || kodpocztowy === "" || miasto === "" || zawod === "Wybierz zawod") {
        alert("Uzupełnij wszystkie dane");
        return false;
    }

    let plec = document.querySelector('input[name="plec"]:checked');
    if (!plec) {
        alert("Wybierz płeć");
        return false;
    }

    let regexpesel = /^[0-9]{11}$/;
    if (!regexpesel.test(pesel)) {
        alert("Niepoprawny numer PESEL");
        return false;
    }

    let regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexemail.test(email)) {
        alert("Niepoprawny adres email");
        return false;
    }

    let regexkodpocztowy = /^[0-9]{2}-[0-9]{3}$/;
    if (!regexkodpocztowy.test(kodpocztowy)) {
        alert("Niepoprawny kod pocztowy");
        return false;
    }

    return true;
}

    function generatePDF() {
  const { jsPDF } = window.jspdf;

  let plec = document.querySelector('input[name="plec"]:checked').value;
  let imie = document.getElementById('imie').value;
  let nazwisko = document.getElementById('nazwisko').value;
  let telefon = document.getElementById('telefon').value;
  let email = document.getElementById('email').value;
  let dataurodzenia = document.getElementById('data').value;
  let pesel = document.getElementById('pesel').value;
  let adres = document.getElementById('adres').value;
  let kodpocztowy = document.getElementById('kodpocztowy').value;
  let miasto = document.getElementById('miasto').value;

  let zawodText = '';
  switch (document.getElementById('zawod').value) {
    case '1':
      zawodText = 'Technik masażysta';
      break;
    case '2':
      zawodText = 'Technik fizjoterapeuta';
      break;
  }

  const today = new Date();
  const date1 = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();



doc.addImage('template.jpg', 'JPEG', 0, 0, pageWidth, pageHeight);
doc.addImage('PSM_SVG.jpg', 'jpg', 10, 3, 20, 20);

doc.addFileToVFS("Roboto-Regular.ttf", robotobase64);
doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

doc.setFont("Roboto", "normal");
doc.setFontSize(15);
//data
doc.text(`${miasto} ${date1}`, 130, 50);

doc.addFileToVFS("Roboto-Bold.ttf", robotobase64bold);
doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
doc.setFont("Roboto", "normal");
doc.setFontSize(14);

//dane
doc.text(`${imie} ${nazwisko}`, 26, 74);
doc.text(`${adres}`, 26, 90);
doc.text(`${telefon}`, 26, 106);
doc.text(`${email}`, 26, 122);

//podanie
doc.text(`${zawodText}`, 65, 155);
doc.setFontSize(12);
doc.text(`2025/2026`, 60, 161);

//podpis
doc.text(`${imie} ${nazwisko}`, 26, 205.5);


  doc.setFontSize(10);
  doc.text("Dokument wygenerowany automatycznie", 20, 285);

  doc.save('podanie.pdf');
}

function handleForm() {
    if (formValidation()) {
        generatePDF();
    }
}

document.getElementById('GenPdf').addEventListener('click', handleForm);