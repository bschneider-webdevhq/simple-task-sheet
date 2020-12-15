
// jQuery
$(document).ready(() => {

    for (i = 0; i < localStorage.length; i++) {
        $("#list").append("<li>" + localStorage.getItem([i]) + "</li>");
    }

    // let newItem = $("#newItem").val("");

    $("#list").click(() => {
        if (event.target.tagName.toLowerCase() == "strike") {
            $(event.target).parent().addClass("stk");
        }
        else {
            $(event.target).addClass("stk");
        }
    });

    $("#button").click(() => {

        let inputValue = $("#newItem").html("value").val()
        let newItem = $("#newItem").val(inputValue);
        $("#list").append("<li>" + newItem.val() + "</li>");
    }
    );

    // Removes list items by locating either their "strike" or "stk" class.
    $("#removeButton").click(() => {
        let itemsToClear = $("li").find("strike");
        let dynamicItemsToClear = $(".stk");
        $(itemsToClear).parent().remove();
        $(dynamicItemsToClear).remove();
    });

    $("#removeAll").click(() => {
        $("#list").children("li").remove()
    });

    $("#listRenameConfirm").click(() => {
        let newListName = $("#titleRename").html("value").val();
        $("#myListName").text(newListName);
    });

    // on close, func collects items in list, and storages them to local storage.

    // on doc load, append those items to the list, or set a cahce that holds those items

    $("#testButton").click(() => {
        collectUserItems();
    })

    function collectUserItems() {
        localStorage.clear();
        let num = 0;
        let myDict = {};
        $("#list").children("li").each(function () {
            // Stores first li value
            let param = $(this).html();
            // Appends Dict with li as param
            myDict[num] = param;
            localStorage.setItem(num, param)
            // next li
            num++;
            // Loops do not work, all li items are appended to the same dict through each loop pass. ie. 5 list items in a single dict will have 25 (5x5) keys.
        }
        );
        console.log(localStorage)
    }

    // Sends list items to local storage before page close
    $(window).on("beforeunload", function(){
        collectUserItems();
    });
    
});



/* Footnotes
There are two ways to make sure that the user's input is appended to the list.

1. The first is by declaring a variable as a string, using jQuery, by specifying the <input> using the ID selector, and using the .val() method with an empty string when the page loads.

This tells the program that the variable is a string, and initalizes the starting input in that textbox as a blank string value.

Then, using JavaScript, use the .append() method to add that item to the list by referencing the value of the input again with the dynamic user content.


2. The second is by declaring two variables on button press. The first variable drills down the <input> element by first identifying it with an ID selector, then using the .html() tags to get its "value" property in the HTML, then referencing the value of the value property. The value of the value property is what's held in the variable.

You then use the same JS solution as in #1 to dynamically append user input to the list.

You CAN NOT have the variable declared at start in the first solution in the same scope as the button click event, as it will wipe the user generated input and append a blank, undefined value.

*/

/*This works :) adds a border to a div when visible.
if($("#donate").is(":visible")) {
    $("#donate div").addClass("border border-dark");
};
*/