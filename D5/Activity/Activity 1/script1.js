function calculateGrade() {
    const scoreInput = document.getElementById("scoreInput").value;
    const resultElement = document.getElementById("result");
    let grade;
  
    const score = parseInt(scoreInput);
  
    if (isNaN(score) || score < 0 || score > 100) {
      resultElement.innerText = "Please enter a valid score between 0 and 100.";
      console.error("Invalid score entered");
      return;
    }
  
    if (score >= 90) {
      grade = 'A';
    } else if (score >= 80) {
      grade = 'B';
    } else if (score >= 70) {
      grade = 'C';
    } else if (score >= 60) {
      grade = 'D';
    } else {
      grade = 'F';
    }
  
    resultElement.innerText = `Your grade is: ${grade}`;
    console.log(`Score: ${score}, Grade: ${grade}`);
  }