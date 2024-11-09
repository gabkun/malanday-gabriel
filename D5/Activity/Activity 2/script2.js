function printRange() {
    const startInput = document.getElementById("startInput").value;
    const endInput = document.getElementById("endInput").value;
    const resultElement = document.getElementById("result");
  
    const start = parseInt(startInput);
    const end = parseInt(endInput);
  
    if (isNaN(start) || isNaN(end)) {
      resultElement.innerText = "Please enter valid numbers for both start and end.";
      console.error("Invalid range input");
      return;
    }
  
    if (start > end) {
      resultElement.innerText = "Starting number must be less than or equal to ending number.";
      console.error("Start number is greater than end number");
      return;
    }

    resultElement.innerText = "Check the console for the printed range.";
  
    for (let i = start; i <= end; i++) {
      console.log(i);
    }
  }
  