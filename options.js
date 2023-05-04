// Get the form element from the HTML
const form = document.querySelector('#options-form');

// Retrieve the saved values from Chrome's storage
chrome.storage.sync.get([
    'citizen',
    'authorized',
    'sponsorship',
    'gender',
    'is_hispanic',
    'race',
    'veteran',
    'disability',
    'sex_orientation'
], (items) => {
    // Set the selected option for each dropdown
    document.querySelector('#citizen').value = items.citizen || '---';
    document.querySelector('#authorized').value = items.authorized || '---';
    document.querySelector('#sponsorship').value = items.sponsorship || '---';
    document.querySelector('#gender').value = items.gender || '---';
    document.querySelector('#is_hispanic').value = items.is_hispanic || '---';
    document.querySelector('#race').value = items.race || '---';
    document.querySelector('#veteran').value = items.veteran || '---';
    document.querySelector('#disability').value = items.disability || '---';
    document.querySelector('#sex_orientation').value = items.sex_orientation || '---';
});

// Add an event listener to the form's submit button
form.addEventListener('submit', event => {
    event.preventDefault();

    // Get the values of each input element in the form
    const citizen = document.querySelector('#citizen').value;
    const authorized = document.querySelector('#authorized').value;
    const sponsorship = document.querySelector('#sponsorship').value;
    const gender = document.querySelector('#gender').value;
    const is_hispanic = document.querySelector('#is_hispanic').value;
    const race = document.querySelector('#race').value;
    const veteran = document.querySelector('#veteran').value;
    const disability = document.querySelector('#disability').value;
    const sex_orientation = document.querySelector('#sex_orientation').value;

    // Save the input values to Chrome's storage
    chrome.storage.sync.set({
        citizen,
        authorized,
        sponsorship,
        gender,
        is_hispanic,
        race,
        veteran,
        disability,
        sex_orientation,
    }, () => {
        // Notify the user that their preferences have been saved
        const message = document.createElement('p');
        message.textContent = 'Your preferences have been saved.';
        message.style.color = 'green';
        form.appendChild(message);
    });
});
