function reloadUsers() {

    // Remove/clean all rows in the table
    $("#usersTable tbody tr").remove();

    $.get("/api/users", function (data) {

        for (let i = 0; i < data.length; i++) {
            const row = "<tr><td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].email + "</td></tr>";
            $("#usersTable > tbody").append(row);
        }



    });
}

$(document).ready(function () {

    // Every time you open the webpage, 
    // the browser will retrieve the users from
    // the backend and update the table
    reloadUsers();

    $("#btnClear").click(function () {
        $("#userId").val("");
        $("#userName").val("");
        $("#userEmail").val("");
    })

    $("form").submit(function () {

        const id = $("#userId").val();
        const name = $("#userName").val();
        const email = $("#userEmail").val();

        $.post("/api/users", { id: id, name: name, email: email }, function (data) {

            console.log(id + "," + name + "," + email);

            // Everytime you save a new user,
            // the user's table will be refreshed
            reloadUsers();

        });

        return false; // Don't remove this line.
    });
});
