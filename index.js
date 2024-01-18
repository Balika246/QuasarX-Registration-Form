document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("sheetdb-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validation logic
        const first_name = document.getElementById('first_name');
        const surname = document.getElementById('surname');
        const username = document.getElementById('username');
        const emailInput = document.getElementById('email'); // Updated variable name
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');

        const setError = (element, message) => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');

            errorDisplay.innerText = message;
            inputControl.classList.add('error');
            inputControl.classList.remove('success');
        };

        const setSuccess = element => {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');

            errorDisplay.innerText = '';
            inputControl.classList.add('success');
            inputControl.classList.remove('error');
        };

        const isValidEmail = email => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        const validateInputs = () => {
            const first_nameValue = first_name.value.trim();
            const surnameValue = surname.value.trim();
            const usernameValue = username.value.trim();
            const emailValue = emailInput.value.trim(); // Updated variable name
            const phoneValue = phone.value.trim();
            const addressValue = address.value.trim();

            // Reset all input field styles
            [first_name, surname, username, emailInput, phone, address].forEach(inputElement => {
                setSuccess(inputElement);
            });

            // Validation logic for each input field
            if (first_nameValue === '') {
                setError(first_name, 'Please enter your first name');
            }
            if (surnameValue === '') {
                setError(surname, 'Please enter your surname');
            }
            if (usernameValue === '') {
                setError(username, 'Please enter a username');
            }

            if (emailValue === '') {
                setError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailValue)) {
                setError(emailInput, 'Please provide a valid email address');
            }

            if (phoneValue === '') {
                setError(phone, 'Please enter your number');
            } else if (phoneValue.length < 10) {
                setError(phone, 'Please provide a valid number');
            }

            if (addressValue === '') {
                setError(address, 'Please enter your address');
            }

            // Perform form submission logic only if all inputs are valid
            if (
                first_nameValue !== '' &&
                surnameValue !== '' &&
                usernameValue !== '' &&
                emailValue !== '' &&
                isValidEmail(emailValue) &&
                phoneValue !== '' &&
                phoneValue.length >= 10 &&
                addressValue !== ''
            ) {
                // Perform form submission logic here (e.g., sending data to server)
                fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                }).then(
                    function (response) {
                        return response.json();
                    }
                ).then(function (html) {
                    // Show the popup on successful form submission
                    document.querySelector(".popup").classList.add("active");
                    document.querySelector(".popup").style.display = "flex";
                });
            }
        };

        validateInputs();
    });

    // Add an event listener to the dismiss button inside the popup
    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
        document.querySelector(".popup").classList.remove("active");
    });
});
