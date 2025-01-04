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

  const Popover = {
    Backdrop_Container: document.querySelector(".Popover-Backdrop-Container"),
    Main_Container: document.querySelector(".Popover-Main-Container"),
    Container_Header: document.querySelector(".Popover-Header h3"),
    Decline_Button: document.getElementById("Popover-Decline-Button"),
    Close_Button: document.getElementById("Popover-Close-Button"),
    Accept_Button: document.getElementById("Popover-Accept-Button"),
    Show_Terms_Button: document.getElementById("Terms-Button"),
    Show_Privacy_Button: document.getElementById("Privacy-Button"),
    Terms_Content: document.querySelector(".Terms-of-Use-Content"),
    Privacy_Content: document.querySelector(".Privacy-Policy-Content"),
  };

  const USER_RESPONSE_KEY = "termsAgreement";
  let userResponse = localStorage.getItem(USER_RESPONSE_KEY);

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

  const Images = Array.from(document.querySelectorAll("img"));

  function change_title() {
    window.onblur = () => {
      document.title = Web_Titles[Math.floor(Math.random() * Web_Titles.length)];
    };
    window.onfocus = () => {
      document.title = "My Portfolio Website";
    };
  }

  const Modals_Function = () => {
    const togglePopoverVisibility = (isVisible) => {
      const { Backdrop_Container, Main_Container } = Popover;
      if (isVisible) {
        Backdrop_Container.style.display = "flex";
        Main_Container.style.display = "flex";
        requestAnimationFrame(() => {
          Backdrop_Container.classList.add("Popover-Backdrop-Container-Show");
          Main_Container.classList.add("Popover-Main-Container-Show");
        });
      } else {
        Backdrop_Container.classList.remove("Popover-Backdrop-Container-Show");
        Main_Container.classList.remove("Popover-Main-Container-Show");
        setTimeout(() => {
          Backdrop_Container.style.display = "none";
          Main_Container.style.display = "none";
        }, 300);
      }
    };

    const closePopup = () => {
      togglePopoverVisibility(false);
    };

    const getPopoverContent = (headerText, contentType) => {
      Popover.Container_Header.innerHTML = headerText;
      Popover.Decline_Button.style.display = "none";
      Popover.Accept_Button.style.display = "none";
      Popover.Close_Button.style.display = "block";

      Popover.Terms_Content.style.display = "none";
      Popover.Privacy_Content.style.display = "none";

      if (contentType === "terms") {
        Popover.Terms_Content.style.display = "flex";
      } else if (contentType === "privacy") {
        Popover.Privacy_Content.style.display = "flex";
      }

      togglePopoverVisibility(true);
    };

    const initializePopup = () => {
      if (userResponse !== "Terms Accepted") togglePopoverVisibility(true);

      Popover.Decline_Button.onclick = () => {
        if (confirm("By Declining the Terms, this website will automatically close. Are you sure you want to proceed?")) {
          window.location.href = "https://www.google.com";
        }
      };

      Popover.Close_Button.onclick = closePopup;

      Popover.Accept_Button.onclick = () => {
        userResponse = "Terms Accepted";
        localStorage.setItem(USER_RESPONSE_KEY, userResponse);
        togglePopoverVisibility(false);
      };

      Popover.Show_Terms_Button.onclick = () => getPopoverContent("Terms of Use", "terms");
      Popover.Show_Privacy_Button.onclick = () => getPopoverContent("Privacy Policy", "privacy");

      Popover.Backdrop_Container.onclick = () => {
        if (userResponse === "Terms Accepted") togglePopoverVisibility(false);
      };

      Popover.Main_Container.onclick = (event) => event.stopPropagation();
    };

    initializePopup();
  };

  function changeActiveLink() {
    const index = [...Web_Sections].reverse().findIndex((section) => window.scrollY + 50 >= section.offsetTop);
    NavigationMenu.forEach((link) => link.classList.remove("nav-active"));
    if (index !== -1) NavigationMenu[Web_Sections.length - 1 - index].classList.add("nav-active");
  }
  window.addEventListener("scroll", changeActiveLink, { passive: true });

  function Toggle_Navigation() {
    Navigation_Buttons[0].classList.toggle("toggle");
    Navigationbar.classList.toggle("Drop-Navigation");
    NavigationMenuGroup.classList.toggle("Drop-Navigation-Menu");

    for (let menu of NavigationMenu) {
      menu.classList.toggle("Show-Menu");
    }
  }

  function content_protection() {
    for (let image of Images) {
      image.addEventListener("contextmenu", (event) => event.preventDefault());
    }
  }

  // Initialize functions
  change_title();
  Modals_Function();
  Navigation_Buttons.forEach((button) => button.addEventListener("click", Toggle_Navigation));

  content_protection();
});
