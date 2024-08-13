// Initialize the page when it's ready
document.addEventListener("DOMContentLoaded", function () {
    // Process bar animation
    setTimeout(function () {
      firstQuestion();
      document.querySelector(".spinner").style.display = "none";
      document.querySelector("#preloader").style.display = "none";
      document.body.style.overflow = "visible";
    }, 600);
  });
  
  // Initialize the page elements
  function init() {
    // Set the page title
    document.getElementById("titleWeb").innerHTML = CONFIG.titleWeb;
  
    // Set the main title and description
    document.getElementById("title").textContent = CONFIG.title;
    document.getElementById("desc").textContent = CONFIG.desc;
  
    // Set the button texts
    document.getElementById("yes").textContent = CONFIG.btnYes;
    document.getElementById("no").textContent = CONFIG.btnNo;
  
    // Calculate the button positions
    var xYes = (0.9 * window.innerWidth - document.getElementById("yes").offsetWidth - document.getElementById("no").offsetWidth) / 2;
    var xNo = xYes + document.getElementById("yes").offsetWidth + 0.1 * window.innerWidth;
    var y = 0.75 * window.innerHeight;
  
    // Set the button positions
    document.getElementById("yes").style.left = xYes + "px";
    document.getElementById("yes").style.top = y + "px";
  
    document.getElementById("no").style.left = xNo + "px";
    document.getElementById("no").style.top = y + "px";
  }
  
  // Display the first question
  function firstQuestion() {
    // Hide the main content
    document.querySelector(".content").style.display = "none";
  
    // Display a SweetAlert modal with a title, description, and image
    Swal.fire({
      title: CONFIG.introTitle,
      text: CONFIG.introDesc,
      imageUrl: "img/logi.gif",
      imageWidth: 300,
      imageHeight: 300,
      background: "#fff url(img/iput-bg.jpg)",
      imageAlt: "Custom image",
      confirmButtonText: CONFIG.btnIntro,
    }).then(function () {
      // Show the main content
      document.querySelector(".content").style.display = "block";
  
      // Play a sound effect
      var audio = new Audio("sound/sound.mp3");
      audio.play();
    });
  }
  
  // Switch the button positions
  function switchButton() {
    // Play a sound effect
    var audio = new Audio("sound/duck.mp3");
    audio.play();
  
    // Switch the button positions
    var leftNo = document.getElementById("no").style.left;
    var topNO = document.getElementById("no").style.top;
    var leftY = document.getElementById("yes").style.left;
    var topY = document.getElementById("yes").style.top;
    document.getElementById("no").style.left = leftY;
    document.getElementById("no").style.top = topY;
    document.getElementById("yes").style.left = leftNo;
    document.getElementById("yes").style.top = topNO;
  }
  
  // Move the "No" button to a random position
  function moveButton() {
    // Play a sound effect
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
  
    // Calculate a random position for the "No" button
    var x = Math.random() * (window.innerWidth - document.getElementById("no").offsetWidth) * 0.9;
    var y = Math.random() * (window.innerHeight - document.getElementById("no").offsetHeight) * 0.9;
  
    // Set the "No" button position
    var left = x + "px";
    var top = y + "px";
    document.getElementById("no").style.left = left;
    document.getElementById("no").style.top = top;
  }
  
  // Initialize the page elements
  init();
  
  // Variable to keep track of the button state
  var n = 0;
  
  // Move the "No" button when the user hovers over it
  document.getElementById("no").addEventListener("mousemove", function () {
    // Randomly switch or move the button positions
    if (Math.random() < 0.5 || n == 1) {
      switchButton();
    } else {
      moveButton();
    }
    n++;
  });
  
  // Switch the button positions when the user clicks
  document.getElementById("no").addEventListener("click", function () {
    if (window.innerWidth >= 900) {
      switchButton();
    }
  });

// generate text in input
function textGenerate() {
    var inputField = document.getElementById('txtReason');
    var text = ' ' + CONFIG.reply;
    var textArray = Array.from(text);
    var inputValue = inputField.value;
    var count = inputValue.length;
  
    if (count > 0) {
      var newText = '';
      for (let i = 1; i <= count; i++) {
        newText += textArray[i];
        if (i === textArray.length) {
          inputField.value = '';
          newText = '';
          break;
        }
      }
      inputField.value = newText;
    }
  
    setTimeout(textGenerate, 1);
  }

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})