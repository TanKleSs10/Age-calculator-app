window.addEventListener("load", function () {
  const form = document.querySelector("#form");
  const results = document.querySelectorAll(".result__text");
  const inputs = document.querySelectorAll(".calc__input");
  const current_date = new Date();
  const daysOfMonth = new Date(
    current_date.getFullYear(),
    current_date.getMonth() + 1,
    0
  ).getDate();
  const currentYear = new Date().getFullYear();
  const expressions = {
    day: /^(0?[1-9]|[1-2][0-9]|3[0-1])$/,
    month: /^(0?[1-9]|1[0-2])$/,
    year: /^[0-9]{4}$/,
    dayField: false,
    monthField: false,
    yearField: false,
  };

  const mistakes = (expression, input, field, msj) => {
    if (input.value == "") {
      input.parentNode.classList.add("calc__item-error");
      input.nextElementSibling.innerText = "This field is required";
      expressions[field] = false;
    } else if (field === "yearField" && input.value > currentYear) {
      input.parentNode.classList.add("calc__item-error");
      input.nextElementSibling.innerText = `Must be in the past`;
      expressions[field] = false;
    } else if (field === "dayField" && input.value > daysOfMonth) {
      input.parentNode.classList.add("calc__item-error");
      input.nextElementSibling.innerText = `${msj}`;
      expressions[field] = false;
    } else if (!expression.test(input.value)) {
      input.parentNode.classList.add("calc__item-error");
      input.nextElementSibling.innerText = `${msj}`;
      expressions[field] = false;
    } else {
      input.parentNode.classList.remove("calc__item-error");
      input.nextElementSibling.innerText = "";
      expressions[field] = true;
    }
  };
  function validate(e) {
    switch (e.target.name) {
      case "day":
        mistakes(expressions.day, e.target, "dayField", "Must be a valid Day");
        break;
      case "month":
        mistakes(
          expressions.month,
          e.target,
          "monthField",
          "Must be a valid Month"
        );
        break;
      case "year":
        mistakes(
          expressions.year,
          e.target,
          "yearField",
          "Must be a valid Year"
        );
        break;
    }
  }

  function calc_diff(date) {
    let yearPassed = current_date.getFullYear() - date.getFullYear();
    let monthPassed = current_date.getMonth() - date.getMonth();
    if (monthPassed < 0) {
      yearPassed--;
      monthPassed += 12;
    }
    let daysPassed = current_date.getDate() - date.getDate();
    if (daysPassed < 0) {
      monthPassed--;
      let dayMonthPrev = new Date(
        current_date.getFullYear(),
        date.getMonth(),
        0
      ).getDate();
      daysPassed += dayMonthPrev;
    }
    return (calcDate = [yearPassed, monthPassed, daysPassed]);
  }

  inputs.forEach((input) => {
    input.addEventListener("keyup", validate);
    input.addEventListener("blur", validate);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      expressions.dayField &&
      expressions.monthField &&
      expressions.yearField
    ) {
      const data = Object.fromEntries(new FormData(e.target));
      date = new Date(data.month + "/" + data.day + "/" + data.year);
      calc_diff(date);
      results.forEach((result, i) => {
        result.innerText = calcDate[i];
      });
    }
  });
  form.reset();
});
