// utils.js
function capitalizeFirstLetter(string) {
    if (!string) return 'N/A';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Link copied to clipboard');
            // alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

function formatServiceName(serviceName) {
    const spacedServiceName = serviceName.replace(/_/g, ' ');

    const formattedServiceName = spacedServiceName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedServiceName;
}

function createButton(iconSrc, altText, onClickHandler, url = null) {
    if (url) {
        return `
            <button class="download-action-button" onclick="${onClickHandler}">
                <a href="${url}" onclick="event.preventDefault();">
                    <img src="${iconSrc}" loading="lazy" alt="${altText}">
                </a>
            </button>
        `;
    } else {
        return `
            <button class="download-action-button" onclick="${onClickHandler}">
                <img src="${iconSrc}" loading="lazy" alt="${altText}">
            </button>
        `;
    }
}

function updateSettings(data) {
    fetch('/api/update_settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function toggleVisibility() {
    const div = document.getElementById('toggle_visibility');
    const img = document.getElementById('collapse_button_icon');
    // Check current display style and toggle
    if (div.style.display === 'none' || div.style.display === '') {
        div.style.display = 'block'; // Show the div
        img.src = '/icons/collapse_up.png'
    } else {
        div.style.display = 'none'; // Hide the div
        img.src = '/icons/collapse_down.png'
    }
}
