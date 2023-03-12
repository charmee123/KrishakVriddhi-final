function sendEmail() {
    Email.send({
        SecureToken: "05ad47e5-2c4e-4b36-bc31-02641a3440dc",
        To: 'charmeegandhi0@gmail.com',
        From: document.getElementById("email").value,
        Subject: "Contact Form for get in touch",
        Body: "Name:" + document.getElementById("name").value
            + "<br> Email: " + document.getElementById("email").value
            + "<br> Phone No: " + document.getElementById("phone").value
            + "<br> Comments: " + document.getElementById("comment").value
    }).then(
        message => alert("Message sent successfully")
    );
}

document.addEventListener("DOMContentLoaded", function () {
    fields.name = document.getElementById("name");
    fields.email = document.getElementById("email");
    fields.phone = document.getElementById("phone");
    fields.comment = document.getElementById("comment");
});

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
}

// function isNumber(num) {
//     return (num.length =10) && !isNaN(num);
// }

var phone_input = document.getElementById("phone");

phone_input.addEventListener('input', () => {
  phone_input.setCustomValidity('');
  phone_input.checkValidity();
});

phone_input.addEventListener('invalid', () => {
  if(phone_input.value === '') {
    phone_input.setCustomValidity('Enter phone number!');
  } else {
    phone_input.setCustomValidity('Enter phone number in this format: 9882223456');
  }
});
 

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

function isValid(){
    var valid= true;
    valid &= fieldValidation(fields.name, isNotEmpty);
    valid &= fieldValidation(fields.email, isNotEmpty);
    valid &= fieldValidation(fields.phone, isNotEmpty);
    valid &= fieldValidation(fields.comment, isNotEmpty);

    return valid;
}

