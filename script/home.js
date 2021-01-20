// jQuery
$(document).ready(() => {

    // # 1
    $("#myListName").html(localStorage.getItem("list-title"));

    // #2
    for (i = 0; i < localStorage.length - 1; i++) {
        $("#list").append(localStorage.getItem([i]));
    }

    // #3
    $("ul#list").on("pointerdown", () => {
        if (($(event.target).hasClass("far"))) {
            null;
        } else if ($(event.target).hasClass("fas")) {
            // Initalize Sortable; 
            $("#list").sortable();
            $("#list").sortable("enable");
            $("ul#list").on("pointerup", () => {
                $("#list").sortable("disable");
            })
        } else {
            $(event.target).toggleClass("stk");
            if ($(event.target).hasClass("stk")) {
                $(event.target).siblings("div").children("i").removeClass("far fa-circle");
                $(event.target).siblings("div .list-end").children("i").addClass("far fa-check-circle");
            } else {
                $(event.target).siblings("div .list-end").children("i").removeClass("far fa-check-circle");
                $(event.target).siblings("div .list-end").children("i").addClass("far fa-circle");
            }
        }
    });

    // #12: 
    function ColorAlts(count) {
        for (i = 0; i < count.length; i++) {
            if (i % 2 === 1) {
                $(count[i]).css("background-color", "#d3d3d3");
            }
            else {
                $(count[i]).css("background-color", "#fff");
            }
        }
    }

    // #4
    $(this).on("mouseup pointerup", () => {
        const liTotal = $("#list").children("div.ui-sortable-handle");
        ColorAlts(liTotal);
    });

    // #5
    $("#addButton").click(() => {
        let inputValue = $("#newItem").html("value").val()
        $("#list").append("<div class='row no-gutters bg-alternate'><div class='col-1 list-beg'><i class='fas fa-bars sortBurger'></i></div><li class='col-10 text-center'>" + inputValue + "</li><div class='col-1 list-end'><i class='far fa-circle'></i></div></div>");
    });

    // #6
    $("#removeButton").click(() => {
        let itemsToClear = $("#list").find(".stk");
        $(itemsToClear).parent().remove();
        const liTotal = $("#list").children("div.ui-sortable-handle");
        ColorAlts(liTotal);
    });

    // #7:
    $("#removeAll").click(() => {
        $("#list").children().remove()
    });

    // #8:
    $("#listRenameConfirm").click(() => {
        let newListName = $("#titleRename").html("value").val();
        $("#myListName").text(newListName);
    });

    // #9:
    function collectUserItems() {
        let num = 0;
        let myDict = {};
        $("#list").each(function () {
            let param = $(this).html();
            myDict[num] = param;
            localStorage.setItem(num, param)
            num++;
            // Loops do not work, all li items are appended to the same dict through each loop pass. (ie. 5 list items in a single dict will have 25 (5x5) keys.)
        });
    }

    // #10:
    function collectUserTitle() {
        let $currentListTitle = $("#myListName").html();
        localStorage.setItem("list-title", $currentListTitle);
    }

    // #11:
    $(window).on("beforeunload", function () {
        localStorage.clear();
        collectUserItems();
        collectUserTitle();
    });
});


/*
 ██████╗ ██████╗ ███╗   ███╗███╗   ███╗███████╗███╗   ██╗████████╗
██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
██║     ██║   ██║██╔████╔██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║
██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝

Compendium (P5R)

#1:
Output: Grabs list title from local storage and sets it.


#2:
Output: Takes all items in local storage, minus one (the title element), and appends them to the user's list.


#3:
User drags on a list item.
Output: List item is selected and dragged using jQuery UI when clicking and moving a list's hamburger icon.

Note: keys in function behave as a JSON option.

$("#list").sortable();


#4:
Count "liTotal" is cached after sorting placeholder is destroyed.

When .sortable() is in effect, the function creates a hidden UI placeholder class. Having the list item total before the function is run gives an accurate count of how many list items there are before the sorting takes effect, preventing miscoloration of list item backgrounds.


#5:
Click Add Button
Output: Function grabs input value next to add button and drills down to its value parameter and sets the value of the value parameter as the inputValue variable.
Output: Variable is appended to the list with Bootstrap classes that add icons and styling to the item.

#6:
Removes list items by locating either their "strike" or "stk" class.

#7:
Click Clear All
Output: All <div class="row"> elements and there children are cleared from the user's list.

#8:
Create new List Name, then click Rename
Output: Stores input value, drilling down to the value parameter, and storing the value of "value".
Output: jQuery selects ID of Title, and rewrites its html, as a string, to what is stored in the newListName variable.

#9:
Output: Each children <div> with class = .row is stored as the value in the param variable.
Output: That variable is appended to the dictionary "myDict" as a value with a numeric key.
Output: For each list item, the key integer increases by 1. ie. {1: "listItem1", 2: "listItem2"}
Notes: param = each <div class="row"><div><i><li></li><i></div><div> as html.
Notes: myDict = {num: param, num, param}

#10:
Output: Variable stores html of List Title as a ($) jQuery Object.
Output: Local storage sets the List Title in this format {list-title: $currentListTitle}

#11:
User closes and revists page, or reloads page.
Output: Local Storage is cleared.
Output: User's list title and list items are stored to local storage.


███████╗██████╗ ██████╗███████████╗   ██╗██████╗███████████████╗
██╔════██╔═══████╔═══██╚══██╔══████╗  ████╔═══██╚══██╔══██╔════╝
█████╗ ██║   ████║   ██║  ██║  ██╔██╗ ████║   ██║  ██║  █████╗  
██╔══╝ ██║   ████║   ██║  ██║  ██║╚██╗████║   ██║  ██║  ██╔══╝  
██║    ╚██████╔╚██████╔╝  ██║  ██║ ╚████╚██████╔╝  ██║  ███████╗
╚═╝     ╚═════╝ ╚═════╝   ╚═╝  ╚═╝  ╚═══╝╚═════╝   ╚═╝  ╚══════╝
                                                                
Functionality for the "AddButton" feature can be compiled in one of two ways:

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