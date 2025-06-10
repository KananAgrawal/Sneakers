const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1,
        title: "Air Force",
        price: 10200,
        colors: [
            {
                code: "black",
                img: "./img/air.png",
            },
            {
                code: "darkblue",
                img: "./img/air2.png",
            },
        ],
    },
    {
    id: 2,
    title: "Air Jordan",
    price: 12750,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 9299,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 11000,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 8475,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        //change the current slide
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        //change the choosen product
        choosenProduct = products[index];

        //change texts of currentProduct
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "Rs." + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;

        //assign new colors
        currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = choosenProduct.colors[index].code;
        });
    });
});

currentProductColors.forEach((color,index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size,index) => {
  size.addEventListener("click",() => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor= "white";
      size.style.color= "black";
    });
    size.style.backgroundColor= "black";
    size.style.color= "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click",() => {
  payment.style.display="flex";
});
close.addEventListener("click",() => {
  payment.style.display="none";
});

document.addEventListener("DOMContentLoaded", function () {
    const checkoutButton = document.querySelector(".payButton");
    const monthInput = document.querySelector("input[placeholder='mm']");
    const yearInput = document.querySelector("input[placeholder='yyyy']");
    const cvvInput = document.querySelector("input[placeholder='cvv']");
    const phoneInput = document.querySelector("input[placeholder='Phone Number']");

    // Function to show error message below the field
    function showError(inputField, message) {
        let existingError = inputField.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
            existingError.remove();
        }

        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.innerText = message;

        inputField.style.border = "2px solid red";
        inputField.parentNode.insertBefore(errorMsg, inputField.nextSibling);
    }

    // Function to remove error message
    function removeError(inputField) {
        inputField.style.border = "";
        let existingError = inputField.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
            existingError.remove();
        }
    }

    // Validate month field
    monthInput.addEventListener("input", function () {
        let monthValue = parseInt(monthInput.value, 10);
        if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
            showError(monthInput, "Month must be between 1 and 12");
        } else {
            removeError(monthInput);
        }
    });

    // Validate CVV field (must be 3 digits)
    cvvInput.addEventListener("input", function () {
        let cvvValue = cvvInput.value;
        if (!/^\d{3}$/.test(cvvValue)) {
            showError(cvvInput, "CVV must be a 3-digit number");
        } else {
            removeError(cvvInput);
        }
    });

    // Validate Indian phone number format
    phoneInput.addEventListener("input", function () {
        let phoneValue = phoneInput.value;
        if (!/^[6-9]\d{9}$/.test(phoneValue)) {
            showError(phoneInput, "Enter a valid Indian phone number");
        } else {
            removeError(phoneInput);
        }
    });

    // Handle form submission
    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        const name = document.querySelector("input[placeholder='Name']").value;
        const phone = phoneInput.value;
        const address = document.querySelector("input[placeholder='Address']").value;
        const cardNumber = document.querySelector("input[placeholder='Card Number']").value;
        const expiryMonth = monthInput.value;
        const expiryYear = yearInput.value;
        const cvv = cvvInput.value;

        let monthValue = parseInt(expiryMonth, 10);
        let isValid = true;

        // Validate all fields before submission
        if (!name || !phone || !address || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
            showToast("Please fill in all fields!", "red");
            isValid = false;
        }
        if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
            showError(monthInput, "Month must be between 1 and 12");
            isValid = false;
        }
        if (!/^\d{3}$/.test(cvv)) {
            showError(cvvInput, "CVV must be a 3-digit number");
            isValid = false;
        }
        if (!/^[6-9]\d{9}$/.test(phone)) {
            showError(phoneInput, "Enter a valid Indian phone number");
            isValid = false;
        }

        // If all validations pass, show success toast
        if (isValid) {
            showToast("Payment Successful!", "#4CAF50");
        }
    });

    // Function to show toast notification at the top
    function showToast(message, bgColor) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = message;
        toast.style.backgroundColor = bgColor;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
        }, 100);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const joinButton = document.querySelector(".fButton");
    const emailInput = document.querySelector(".fInput");

    // Function to show error message below the field
    function showError(inputField, message) {
        let existingError = inputField.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
            existingError.remove();
        }

        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.innerText = message;

        inputField.style.border = "2px solid red";
        inputField.parentNode.insertBefore(errorMsg, inputField.nextSibling);
    }

    // Function to remove error message
    function removeError(inputField) {
        inputField.style.border = "";
        let existingError = inputField.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
            existingError.remove();
        }
    }

    // Validate email field
    emailInput.addEventListener("input", function () {
        let emailValue = emailInput.value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            showError(emailInput, "Enter a valid email address");
        } else {
            removeError(emailInput);
        }
    });

    // Handle subscription submission
    joinButton.addEventListener("click", function (event) {
        event.preventDefault();

        const email = emailInput.value;
        let isValid = true;

        // Validate email before submission
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailInput, "Enter a valid email address");
            isValid = false;
        }

        // If validation passes, show success toast
        if (isValid) {
            showToast("Successfully joined!", "#4CAF50");
        }
    });

    // Function to show toast notification at the top
    function showToast(message, bgColor) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = message;
        toast.style.backgroundColor = bgColor;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
        }, 100);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});

//Design Upload Section Script
document.addEventListener("DOMContentLoaded", function () {
  const submitDesignButton = document.querySelector(".submitDesignButton");
  const designNameInput = document.querySelector(".designInput[placeholder='Your Name']");
  const designEmailInput = document.querySelector(".designInput[placeholder='Your Email']");
  const designDescriptionInput = document.querySelector(".designInput.designTextarea");
  const designFileInput = document.getElementById("designFile");

  submitDesignButton.addEventListener("click", function (event) {
    event.preventDefault();

    const name = designNameInput.value.trim();
    const email = designEmailInput.value.trim();
    const description = designDescriptionInput.value.trim();
    const file = designFileInput.files[0];
    const age = designAgeInput.value.trim();
    const designId = designDesignId.value.trim();

      console.log('contact from submitted');
      console.log('Name:',name);

      gtag('event' , 'contactform_event',{
          user_name: name,
          user_email: email,
          user_message: description,
          user_age: age,
          user_designId: designId,
          submission_count: 1
      })

      console.log('contactform_event sent successfully')
    let isValid = true;

    // Basic validation for demonstration
    if (!name) {
      showToast("Please enter your name for design submission.", "red");
      isValid = false;
    } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email for design submission.", "red");
      isValid = false;
    } else if (!description) {
      showToast("Please describe your design idea.", "red");
      isValid = false;
    } else if (!file) {
      showToast("Please upload a design file.", "red");
      isValid = false;
    }

    if (isValid) {
      // Here you would typically handle the file upload and form submission
      // For this example, we'll just show a success message and clear the form.
      showToast("Your design idea has been submitted!", "#4CAF50");

      // Clear the form fields
      designNameInput.value = "";
      designEmailInput.value = "";
      designDescriptionInput.value = "";
      designFileInput.value = ""; // Clear the selected file
    }
  });

  // Function to show toast notification at the top (re-used from existing)
  function showToast(message, bgColor) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    toast.style.backgroundColor = bgColor;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
});
