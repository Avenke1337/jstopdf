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
  const lineHeight = 10;
  let y = 20;

  function centerText(text, y) {
        const textWidth = doc.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        doc.text(x, y, text);
    }


  doc.addImage('PSM_SVG.jpg', 'jpg', 20, 15, 25, 25);
  doc.setFontSize(10);
  doc.text(`Data wygenerowania: ${date1}`, pageWidth - 70, 30);


  doc.addFileToVFS("Roboto-Regular.ttf", robotobase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal");

  doc.addFileToVFS("Roboto-Bold.ttf", robotobase64bold);
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");

  y = 50;
  doc.setFontSize(18);
  doc.setFont("Roboto", "bold");
  centerText("PODANIE O PRZYJĘCIE DO SZKOŁY POLICEALNEJ",y); y += lineHeight;
  doc.setFontSize(14);
  doc.setFont("Roboto", "normal");
  centerText(`Na zawód: ${zawodText}`,y); y += 15;


  doc.setFont("Roboto", "bold");
  centerText("DANE OSOBOWE", y); y += lineHeight;


  doc.setFont("Roboto", "normal");
  centerText(`Imię: ${imie}`,  y); y += lineHeight;
  centerText(`Nazwisko: ${nazwisko}`, y); y += lineHeight;
  centerText(`Płeć: ${plec}`,  y); y += lineHeight;
  centerText(`Data urodzenia: ${dataurodzenia}`, y); y += lineHeight;
  centerText(`PESEL: ${pesel}`, y); y += 15;


  doc.setFont("Roboto", "bold");
  centerText("DANE KONTAKTOWE", y); y += lineHeight;


  doc.setFont("Roboto", "normal");
  centerText(`Telefon: ${telefon}`, y); y += lineHeight;
  centerText(`Email: ${email}`,  y); y += 15;


  doc.setFont("Roboto", "bold");
  centerText("ADRES ZAMIESZKANIA", y); y += lineHeight;


  doc.setFont("Roboto", "normal");
  centerText(`Adres: ${adres}`, y); y += lineHeight;
  centerText(`Kod pocztowy: ${kodpocztowy}`, y); y += lineHeight;
  centerText(`Miasto: ${miasto}`,  y); y += lineHeight;


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