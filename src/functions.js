var csrfToken = '{{ csrf_token }}';
function appendToDisplay(value) {
    // Append the user's input value to the display
    const display = document.getElementById('display');
    const startPos = display.selectionStart;
    const endPos = display.selectionEnd;
    const currentValue = display.value;
    const newValue = currentValue.substring(0, startPos) + value + currentValue.substring(endPos);
    display.value = newValue;
    display.setSelectionRange(startPos + value.length, startPos + value.length);
    display.focus();
}

function clearAll() {
    // Clear the display
    document.getElementById('display').value = '';
}
var temp;
var last;
function getResult() {

    const display = document.getElementById('display');
    const formula = display.value;
    const formData = new FormData();
    formData.append('formula', formula);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/calculate_result',
        data: { 'formula': formula },
        // headers: {
        //     'X-CSRFToken': csrfToken,
        // },
        success: function (data) {
            last = data.result;
            temp = formula + '=' + data.result + ' ';
            document.getElementById('display').value = data.result; // Update the display with the calculated result
        },
        error: function (error) {
            document.getElementById('display').value = 'Error';
        }
    });

}
function getlast() {
    document.getElementById('display').value = last;
}

function setHistory() {
    // const display = document.getElementById('display');
    const data = temp;
    const formData = new FormData();
    formData.append('data', data);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/set_history',
        data: { 'data': data },
        // headers: {
        //     'X-CSRFToken': csrfToken,
        // },
        success: function () {
            document.getElementById('display').value = 'success'; // Update the display with the calculated result
        },
        error: function (error) {
            document.getElementById('display').value = 'Error';
        }
    });
}
function getHistory() {
    const historylist = document.getElementById('history-list');
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/read_history',
        // data: { 'data': data },
        // headers: {
        //     'X-CSRFToken': csrfToken,
        // },
        success: function (record) {

            recording.innerHTML = record.result; // Update the display with the calculated result
            recording.innerHTML = recording.innerHTML.replaceAll(" ,", "\n");
        }

    });

}






function DeleteTheLastChar() {
    // Move the cursor one position to the left
    // const display = document.getElementById('display');
    // const currentPosition = display.selectionStart;
    // if (currentPosition > 0) {
    //     display.setSelectionRange(currentPosition - 1, currentPosition - 1);
    //     display.focus();
    // }
    var str = document.getElementById('display').value
    document.getElementById('display').value = document.getElementById('display').value.substring(0, str.length - 1)
}