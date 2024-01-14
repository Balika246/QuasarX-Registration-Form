document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("sheetdb-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Perform form submission logic here (e.g., sending data to server)
        fetch(form.action, {
            method: "POST",
            body: new FormData(document.getElementById("sheetdb-form")),
        }).then(
            function (response) {
                return response.json();
            }
        ).then(function (html) {
            // Show the popup on successful form submission
            document.querySelector(".popup").classList.add("active");
        });
    });

    // Add an event listener to the dismiss button inside the popup
    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
        document.querySelector(".popup").classList.remove("active");
    });
});
