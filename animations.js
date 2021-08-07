// header animation
Array.from(document.getElementById("header").children).forEach((elem, ind) => {
  setTimeout(() => elem.classList.add("animation"), ind * 250);
});

let current = 0,
  prev = -1;
let timeouts = [];
let setTimeoutWithCancel = (handler, timeout) => {
  timeouts.push(setTimeout(handler, timeout));
};
let cancelTimeouts = () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];
};
let sections = [
  {
    id: "home",
    animation: () => {
      // trigger fade in animation
      document
        .getElementById("home")
        .children["first-name"].classList.add("opacity-animation");
      // delay fade in animation
      setTimeoutWithCancel(
        () =>
          document
            .getElementById("home")
            .children["last-name"].classList.add("opacity-animation"),
        500
      );
      setTimeoutWithCancel(() => {
        Array.from(document.getElementsByClassName("qualifications")).forEach(
          (wrapper) => {
            Array.from(wrapper.getElementsByTagName("h3")).forEach(
              (element, ind) =>
                setTimeoutWithCancel(
                  () => element.classList.add("opacity-animation"),
                  ind * 100
                )
            );
          }
        );
      }, 1000);
    },
    clearAnimation: () => {
      // reset all home animations
      document
        .getElementById("home")
        .children["first-name"].classList.remove("opacity-animation");
      document
        .getElementById("home")
        .children["last-name"].classList.remove("opacity-animation");
      Array.from(document.getElementsByClassName("qualifications")).forEach(
        (wrapper) => {
          Array.from(wrapper.getElementsByTagName("h3")).forEach((element) =>
            element.classList.remove("opacity-animation")
          );
        }
      );
    },
  },
  {
    id: "about",
    animation: () => {
      // fade in title
      document
        .getElementById("about-section-title")
        .classList.add("opacity-animation");
      console.log(document.getElementById("about-section-title").classList);
      // bio animation
      setTimeoutWithCancel(
        () =>
          Array.from(document.getElementsByClassName("bio-list")).forEach(
            (list) =>
              Array.from(list.getElementsByTagName("h3")).forEach(
                (element, ind) =>
                  setTimeoutWithCancel(
                    () => element.classList.add("list-animation"),
                    ind * 500
                  )
              )
          ),
        500
      );
    },
    clearAnimation: () => {
      // reset all about animations
      document
        .getElementById("about-section-title")
        .classList.remove("opacity-animation");
      Array.from(document.getElementsByClassName("bio-list")).forEach((list) =>
        Array.from(list.getElementsByTagName("h3")).forEach((element) =>
          element.classList.remove("list-animation")
        )
      );
    },
  },
  {
    id: "contact",
    animation: () => {
      document
        .getElementById("contact-section-title")
        .classList.add("opacity-animation");
      document
        .getElementById("contact-email")
        .classList.add("opacity-animation");
    },
    clearAnimation: () => {
      document
        .getElementById("contact-section-title")
        .classList.remove("opacity-animation");
      document
        .getElementById("contact-email")
        .classList.remove("opacity-animation");
    },
  },
];

let update = () => {
  if (prev !== -1) {
    // remove all pending animations
    cancelTimeouts();
    // clean up previous section
    document.getElementById(sections[prev].id).style.opacity = 0;
    sections[prev].clearAnimation();
  }
  // show new section and trigger its animations
  document.getElementById(sections[current].id).style.opacity = 100;
  setTimeoutWithCancel(sections[current].animation, 500);
  prev = current;
};

// activate nav links
Array.from(document.getElementById("header").children).forEach((link) => {
  link.addEventListener("click", () => {
    current = sections.findIndex(
      (section) => section.id === link.attributes.section.nodeValue
    );
    if (current !== prev) {
      update();
    }
  });
});

update();
