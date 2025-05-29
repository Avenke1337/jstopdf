import { robotobase64 } from "./robotop.js";
import { robotobase64bold } from "./robotop.js";

function formValidation() {
    let imie = document.getElementById('imie').value.trim();
    let nazwisko = document.getElementById('nazwisko').value.trim();
    let telefon = document.getElementById('telefon').value.trim();
    let email = document.getElementById('email').value.trim();
    let dataurodzenia = document.getElementById('data').value.trim();
    let pesel = document.getElementById('pesel').value.trim();
    let adres = document.getElementById('adres').value.trim();
    let kodpocztowy = document.getElementById('kodpocztowy').value.trim();
    let miasto = document.getElementById('miasto').value.trim();
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
    let imie = document.getElementById('imie').value.trim();
    let nazwisko = document.getElementById('nazwisko').value.trim();
    let telefon = document.getElementById('telefon').value.trim();
    let email = document.getElementById('email').value.trim();
    let dataurodzenia = document.getElementById('data').value.trim();
    let pesel = document.getElementById('pesel').value.trim();
    let adres = document.getElementById('adres').value.trim();
    let kodpocztowy = document.getElementById('kodpocztowy').value.trim();
    let miasto = document.getElementById('miasto').value.trim();

    let zawodText = '';
    switch (document.getElementById('zawod').value) {
        case '1':
            zawodText = 'Technik masazysta';
            break;
        case '2':
            zawodText = 'Technik fizjoterapeuta';
            break;
        default:
            zawodText = 'Nieznany zawód';
    }

    const today = new Date();
    const date1 = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    let doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage('PSM_SVG.jpg', 'jpg', 10, 10, 30, 30);

    doc.addFileToVFS("Roboto-Regular.ttf", robotobase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.addFileToVFS("Roboto-bold.ttf", robotobase64bold);
    doc.addFont("Roboto-bold.ttf", "Roboto", "bold");

    doc.setFont("Roboto", "bold");
    doc.text(140, 40, 'Data wygenerowania:');
    doc.setFont("Roboto", "normal");
    doc.text(140, 50, date1);

    function centerText(text, y) {
        const textWidth = doc.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        doc.text(x, y, text);
    }

    let y = 70;
    const lineHeight = 10;
    doc.setFontSize(20);
    doc.setFont("Roboto", "bold");
    centerText('PODANIE O PRZYJECIE DO SZKOLY POLICEALNEJ', y); y += lineHeight;
    doc.setFontSize(16);
    centerText('Na zawod: ' + zawodText, y); y += lineHeight;

    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");
    centerText('Płeć: ' + plec, y); y += lineHeight;
    centerText('Imię: ' + imie, y); y += lineHeight;
    centerText('Nazwisko: ' + nazwisko, y); y += lineHeight;
    centerText('Telefon: ' + telefon, y); y += lineHeight;
    centerText('Email: ' + email, y); y += lineHeight;
    centerText('Data urodzenia: ' + dataurodzenia, y); y += lineHeight;
    centerText('PESEL: ' + pesel, y); y += lineHeight;
    centerText('Adres zamieszkania: ' + adres, y); y += lineHeight;
    centerText('Kod pocztowy: ' + kodpocztowy, y); y += lineHeight;
    centerText('Miasto: ' + miasto, y); y += lineHeight;

    doc.save('podanie.pdf');
}

function handleForm() {
    if (formValidation()) {
        generatePDF();
    }
}

document.getElementById('GenPdf').addEventListener('click', handleForm);