var busService = $(".busService");
var busStopCode = $(".busStopCode");

var busStopCodeInput = $(".busStopCodeInput");
var submitButton = $(".submitButton");

var refreshButton = $(".refreshButton");

var emptyError = $(".emptyError");

emptyError.hide();

submitButton.on("click", function () {

    if (busStopCodeInput.val() == "") {
        emptyError.text("ENTER SOMETHING INTO THE BUS STOP CODE")
        emptyError.show("fast", () => {
            setInterval(function () {
                emptyError.hide("fast")
            }, 5000)
        });


    } else {
        busStopCodeGet = busStopCodeInput.val()
        $.get("https://arrivelah.herokuapp.com/?id=" + busStopCodeGet, function (data) {

            busStopCode.append(busStopCodeGet)

            for (var i = 0; i < data["services"].length; i++) {

                var busNumber = data["services"][i]["no"];

                var date = data["services"][i]["next"]["time"].split(/\D/);
                var dateYear = date[0];
                var dateMonth = date[1];
                var dateDay = date[2];


                var time = data["services"][i]["next"]["time"].split(/\D/)
                var timeHour = time[3];
                var timeMinute = time[4];
                var timeSecond = time[5];

                var subsequentTime = data["services"][i]["subsequent"]["time"].split(/\D/)
                var subsequentTimeHour = subsequentTime[3];
                var subsequentTimeMinute = subsequentTime[4];
                var subsequentTimeSecond = subsequentTime[5];


                var busType;

                if (data["services"][i]["next"]["type"] === "DD") {
                    busType = "Double Deck";
                } else if (data["services"][i]["next"]["type"] === "SD") {
                    busType = "Single Deck";
                }

                busService.append(
                    "<div class='oneBusService'>" +
                    "<h1 class='busNumber'>" + busNumber + "</h1>" +
                    "<p class='busTiming_one'>" + timeHour + ":" + timeMinute + " || " + subsequentTimeHour + ":" + subsequentTimeMinute + "</p>" +
                    "<p class='busType'>" + busType + "</p>" +
                    "</div>"
                )

            }

        })
    }

})