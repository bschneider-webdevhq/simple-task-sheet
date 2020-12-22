// jQuery
$(document).ready(() => {

    // Output: Grabs list title from local storage and sets it.
    $("#myListName").html(localStorage.getItem("list-title"));

    // Output: Takes all items in local storage, minus one (the title element),
    // and appends them to the user's list.
    for (i = 0; i < localStorage.length - 1; i++) {
        $("#list").append(localStorage.getItem([i]));
    }

    // User drags on a list item.
    // Output: List item is selected and dragged using jQuery UI.
    // Output: Onmouseup, item is rearranged based on user position.
    
    // Bug: List sort works, but sorts by clicking anywhre in list item.
    // Solution: Need to isolate selector to only run sortable() when users click and drag hamburger.
    $("#list").sortable(); 
   

    // Click List Item. 
    // Output (If): Strikethough added, and icon changed to check mark.
    // Output (Else): Strikethough removed, icon changed to circle.
    $("ul#list").click(() => {
        if ($(event.target).hasClass("stk")) {
            $(event.target).removeClass("stk");
            $(event.target).siblings("div .list-end").children("i").removeClass("far fa-check-circle");
            $(event.target).siblings("div .list-end").children("i").addClass("far fa-circle");
        } else {
            $(event.target).addClass("stk");
            $(event.target).siblings("div").addClass("stk");
            $(event.target).siblings("div").children("i").removeClass("far fa-circle");
            $(event.target).siblings("div .list-end").children("i").addClass("far fa-check-circle");
        }
    });

    // Click Add Button
    // Output: Function grabs input value next to add button and drills down to its value parameter and sets the value of the value parameter as the inputValue variable.
    // Output: Variable is appended to the list with Bootstrap classes that add icons and styling to the item.
    $("#addButton").click(() => {
        let inputValue = $("#newItem").html("value").val()
        $("#list").append("<div class='row no-gutters bg-alternate'><div class='col-1 list-beg'><i class='fas fa-bars' id='sortBurger'></i></div><li class='col-10 text-center'>" + inputValue + "</li><div class='col-1 list-end'><i class='far fa-circle'></i></div></div>");
    });

    // Removes list items by locating either their "strike" or "stk" class.
    $("#removeButton").click(() => {
        let itemsToClear = $("li").find("strike");
        let dynamicItemsToClear = $(".stk");
        $(itemsToClear).parent().remove();
        $(dynamicItemsToClear).remove();
    });

    // Click Clear All
    // Output: All <div class="row"> elements and there children are cleared from the user's list.
    $("#removeAll").click(() => {
        $("#list").children().remove()
    });

    // Create new List Name, then click Rename
    // Output: Stores input value, drilling down to the value parameter, and storing the value of "value".
    // Output: jQuery selects ID of Title, and rewrites its html, as a string, to what is stored in the newListName variable.
    $("#listRenameConfirm").click(() => {
        let newListName = $("#titleRename").html("value").val();
        $("#myListName").text(newListName);
    });

    // Temp test local storage button.
    $("#testButton").click(() => {
        collectUserItems();
        console.log(localStorage);
    })

    // Output: Each children <div> with class = .row is stored as the value in the param variable.
    // Output: That variable is appended to the dictionary "myDict" as a value with a numeric key.
    // Output: For each list item, the key integer increases by 1. ie. {1: "listItem1", 2: "listItem2"}
    // Notes: param = each <div class="row"><div><i><li></li><i></div><div> as html.
    // Notes: myDict = {num: param, num, param}
    function collectUserItems() {
        let num = 0;
        let myDict = {};
        $("#list").each(function () {
            let param = $(this).html();
            myDict[num] = param;
            localStorage.setItem(num, param)
            num++;
            // Loops do not work, all li items are appended to the same dict through each loop pass.
            // ie. 5 list items in a single dict will have 25 (5x5) keys.
        });
    }

    // Output: Variable stores html of List Title as a ($) jQuery Object.
    // Output: Local storage sets the List Title in this format {list-title: $currentListTitle}
    function collectUserTitle() {
        let $currentListTitle = $("#myListName").html();
        localStorage.setItem("list-title", $currentListTitle);
    }

    // User closes and revists page, or reloads page.
    // Output: Local Storage is cleared.
    // Output: User's list title and list items are stored to local storage.
    $(window).on("beforeunload", function () {
        localStorage.clear();
        collectUserItems();
        collectUserTitle();
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