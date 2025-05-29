function handleForm(){
    function formValidation(){
        
        
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

    if(imie == "" || nazwisko == "" || telefon == "" || email == "" || dataurodzenia == "" || pesel == "" || adres == "" || kodpocztowy == "" || miasto == "" || zawod == "Wybierz zawod") {
        alert("Uzupełnij wszystkie dane");
        return false;
    }
    let plec = document.querySelector('input[name="plec"]:checked');
    if (!plec) {
        alert("Wybierz płeć");
        return false;
    }

    

    let regexpesel = /^[0-9]{11}$/;
    if(!regexpesel.test(pesel)){
    alert("Niepoprawny numer PESEL");
    return false;
    }
    let regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexemail.test(email)){
    alert("Niepoprawny adres email");
    return false;
    }
    let regexkodpocztowy = /^[0-9]{2}-[0-9]{3}$/;
    if(!regexkodpocztowy.test(kodpocztowy)){
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

function zawodValue() {
let selectedValue = document.getElementById('zawod').value;
let zawodText = '';

if (selectedValue == 1) {
    zawodText = 'Technik masazysta';
} else if (selectedValue == 2) {
    zawodText = 'Technik fizjoterapeuta';
}

return zawodText;
}

let zawod = zawodValue();


const today = new Date();
const date1 = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

let doc = new jsPDF();
const pageWidth = doc.internal.pageSize.getWidth();


doc.addImage('PSM_SVG.jpg', 'jpg', 10, 10, 30, 30);

doc.setFont('helvetica', 'bold');
doc.text(140, 40, 'Data wygenerowania:');
doc.setFont('helvetica', 'normal');
doc.text(140, 50, date1);


function centerText(text, y) {
const textWidth = doc.getTextWidth(text);
const x = (pageWidth - textWidth) / 2;
doc.text(x, y, text);
}

let y = 70;
const lineHeight = 10;
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
centerText('PODANIE O PRZYJECIE DO SZKOLY POLICEALNEJ', y); y += lineHeight;
doc.setFontSize(16);
centerText('Na zawod: ' + zawod, y); y += lineHeight;

doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
centerText('Plec: ' + plec, y); y += lineHeight;
centerText('Imie: ' + imie, y); y += lineHeight;
centerText('Nazwisko: ' + nazwisko, y); y += lineHeight;
centerText('Telefon: ' + telefon, y); y += lineHeight;

centerText('Email: ' + email, y); y += lineHeight;
centerText('Data urodzenia: ' + dataurodzenia, y); y += lineHeight;
centerText('PESEL: ' + pesel, y); y += lineHeight;
centerText('Adres zamieszkania: ' + adres, y); y += lineHeight;
centerText('Kod pocztowy: ' + kodpocztowy, y); y += lineHeight;
centerText('Miasto: ' + miasto, y); y += lineHeight;

doc.save('form-data.pdf');
}
if(formValidation() == true){
generatePDF();
}



}