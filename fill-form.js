function selectOptionsByKeyword(element, keyword) {
  if (keyword == "---") {
    return;
  }
  if (element.type == "select-one") {
    const options = element.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.text.toLowerCase().includes(keyword.toLowerCase())) {
        element.selectedIndex = i;
        break;
      }
    }

    // Update the displayed label to match the selected option
    const optionText = options[element.selectedIndex].text;
    try {
      const select2Chosen = element.closest('.field').querySelector('.select2-chosen');
      if (select2Chosen) {
        select2Chosen.textContent = optionText;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    const checkboxElements = element.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxElements.length; i++) {
      const checkboxElement = checkboxElements[i];
      if (checkboxElement.labels[0].textContent.toLowerCase().includes(keyword.toLowerCase())) {
        checkboxElement.checked = true;
        break;
      }
      else {
        console.log(checkboxElement.labels[0].textContent.toLowerCase());
      }
    }
  }
}

function autofillJobApplicationForm(citizen, authorized, sponsorship, gender, is_hispanic, race, veteran, disability, sex_orientation) {
  const formElements = document.querySelectorAll("input, select");
  for (let i = 0; i < formElements.length; i++) {
    let element = formElements[i];

    let label = "";
    if (element.type == "select-one") {
      try {
        label = element.labels[0].textContent.toLowerCase();
      } catch (err) {
        const closestLabel = element.closest("label");
        if (closestLabel) {
          label = closestLabel.textContent.toLowerCase();
        }
      }
    } else if (element.type == "checkbox") {
      const outerDiv = element.closest('.field');
      if (outerDiv) {
        label = outerDiv.textContent.toLowerCase();
      }
      element = outerDiv;
    }
    if (label.includes("citizen")) {
      selectOptionsByKeyword(element, citizen);
    } else if (label.includes("authorized")) {
      selectOptionsByKeyword(element, authorized);
    } else if (label.includes("sponsorship")) {
      selectOptionsByKeyword(element, sponsorship);
    } else if (label.includes("gender")) {
      selectOptionsByKeyword(element, gender);
    } else if (label.includes("race")) {
      selectOptionsByKeyword(element, race);
    } else if (label.includes("ethnicity") || label.includes("hispanic")) {
      selectOptionsByKeyword(element, is_hispanic);
    } else if (label.includes("veteran")) {
      selectOptionsByKeyword(element, veteran);
    } else if (label.includes("disability")) {
      selectOptionsByKeyword(element, disability);
    }
    else if (label.includes("sex_orientation")) {
      selectOptionsByKeyword(element, sex_orientation);
    }
  }
}


// Usage Example with keyword
console.log("fill-form.js loaded");
chrome.storage.sync.get({
  citizen: "yes",
  authorized: "yes",
  sponsorship: "no",
  gender: "male",
  is_hispanic: "no",
  race: "asian",
  veteran: "no",
  disability: "no",
  sex_orientation: "heterosexual"
}, function (options) {
  autofillJobApplicationForm(
    options.citizen,
    options.authorized,
    options.sponsorship,
    options.gender,
    options.is_hispanic,
    options.race,
    options.veteran,
    options.disability,
    options.sex_orientation
  );
});