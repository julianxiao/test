$(document).ready(function() {
    $("#sms-target").click(function() {
        var phonenumber = $('#phonenumber').val();
        var password = $('#password').val();
        if (phonenumber != "" && password == "1234") {
            var url = "/api/sms?phonenumber=" + phonenumber;
            $.get(url);
        }
    });

});