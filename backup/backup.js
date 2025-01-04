document.addEventListener("DOMContentLoaded", () => {
  const Web_Titles = [
    "Feel free to explore my work! 🌟",
    "Come back here! ✨",
    "You’ll love what’s here! ❤️",
    "Check this out! 🌟",
    "Don't miss the creativity! 🎉",
    "Let’s create magic! 🎨",
    "Discover my skills! 💪🏽",
  ];

  const elements = {
    Popover_Backdrop_Container: document.querySelector(".Popover-Backdrop-Container"),
    Terms_Content_Container: document.querySelector(".Terms-of-Use-Main-Container"),
    Terms_Decline_Button: document.getElementById("Terms-Decline-Button"),
    Terms_Close_Button: document.getElementById("Terms-Close-Button"),
    Terms_Accept_Button: document.getElementById("Terms-Accept-Button"),
    Show_Terms_Button: document.getElementById("Terms-Button"),
  };

  let Get_User_Response = localStorage.getItem("termsAgreement");

  const Navigationbar = document.querySelector(".Navigationbar");
  const NavigationMenuGroup = document.querySelector(".Navigation-Menu");
  const NavigationMenu = document.querySelectorAll(".Navigation-Menu a");
  const Navigation_Buttons = [
    document.getElementById("Navigation-Toggle"),
    document.getElementById("Navigation-Home"),
    document.getElementById("Navigation-About"),
    document.getElementById("Navigation-Projects"),
    document.getElementById("Navigation-Contacts"),
  ];

  const Web_Sections = [
    document.getElementById("home"),
    document.getElementById("about"),
    document.getElementById("projects"),
    document.getElementById("contacts"),
  ];

  function change_title() {
    window.addEventListener("blur", () => {
      this.document.title = Web_Titles[Math.floor(Math.random() * Web_Titles.length)];
    });
    window.addEventListener("focus", () => {
      this.document.title = "My Portfolio Website";
    });
  }

  const handleTermsDisplay = (show) => {
    if (show) {
      elements.Popover_Backdrop_Container.style.display = "flex";
      elements.Terms_Content_Container.style.display = "flex";
      requestAnimationFrame(() => {
        elements.Popover_Backdrop_Container.classList.add("Backdrop-Container-Show");
        elements.Terms_Content_Container.classList.add("Terms-of-Use-Main-Container-Show");
      });
    } else {
      elements.Popover_Backdrop_Container.classList.remove("Backdrop-Container-Show");
      elements.Terms_Content_Container.classList.remove("Terms-of-Use-Main-Container-Show");
      setTimeout(() => {
        elements.Popover_Backdrop_Container.style.display = "none";
        elements.Terms_Content_Container.style.display = "none";
      }, 300);
    }
  };

  const initializePopup = () => {
    if (Get_User_Response != "Terms Accepted") {
      handleTermsDisplay(true);
    }

    elements.Terms_Decline_Button.onclick = () => {
      if (confirm("By Declining the Terms, this website will automatically close. Are you sure you want to proceed?")) {
        window.location.href = "https://www.google.com";
      }
    };

    elements.Terms_Close_Button.onclick = () => {
      localStorage.clear(); // Remove this script after testing of Terms Modals
      handleTermsDisplay(false);
    };

    elements.Terms_Accept_Button.onclick = () => {
      if (confirm("By clicking Accept, you confirm that you have read and agree to my Terms and Conditions.")) {
        Get_User_Response = "Terms Accepted";
        localStorage.setItem("termsAgreement", Get_User_Response);
        handleTermsDisplay(false);
      }
    };

    elements.Show_Terms_Button.onclick = () => {
      elements.Terms_Decline_Button.style.display = "none";
      elements.Terms_Accept_Button.style.display = "none";
      elements.Terms_Close_Button.style.display = "block";
      handleTermsDisplay(true);
    };

    elements.Popover_Backdrop_Container.onclick = () => {
      if (Get_User_Response === "Terms Accepted") {
        handleTermsDisplay(false);
      }
    };

    elements.Terms_Content_Container.onclick = (event) => event.stopPropagation();
  };

  function changeActiveLink() {
    let index = Web_Sections.length;
    while (--index && window.scrollY + 50 < Web_Sections[index].offsetTop) {}
    NavigationMenu.forEach((link) => link.classList.remove("nav-active"));
    if (NavigationMenu[index]) {
      NavigationMenu[index].classList.add("nav-active");
    }
    this.window.addEventListener("scroll", changeActiveLink);
  }

  function Toggle_Navigation() {
    Navigation_Buttons[0].classList.toggle("toggle");
    Navigationbar.classList.toggle("Drop-Navigation");
    NavigationMenuGroup.classList.toggle("Drop-Navigation-Menu");

    NavigationMenu.forEach((menu) => {
      menu.classList.toggle("Show-Menu");
    });
  }

  // TODO: Include all image and Instantiate
  function Content_Protection() {
    const Images = [];

    Images.forEach((image) => {
      image.addEventListener("contextmenu", (event) => event.preventDefault());
    });
  }

  change_title();
  initializePopup();
  changeActiveLink();
  Navigation_Buttons.forEach((button) => {
    button.addEventListener("click", Toggle_Navigation);
  });
});
