const components = {
    cpu: 
    {
        options: ["AMD Ryzen 9", "AMD Ryzen 7", "AMD Ryzen 5", "AMD Ryzen 3"],
        prices: [160000, 80000, 64000, 25000],
    },
    gpu: 
    {
        options: ["NVIDIA RTX 3080", "AMD Radeon RX 6800", "NVIDIA RTX 3060 Ti", "NVIDIA RTX 4060"],
        prices: [201000, 240000, 123000, 137000],
    },
    ram: 
    {
        options: ["8GB DDR4", "16GB DDR4", "8GB DDR5", "16GB DDR5", "32GB DDR5"],
        prices: [9000, 16000, 15000, 22000, 44000],
    },
    storage: 
    {
        options: ["500GB SSD", "1TB SSD", "2TB SSD"],
        prices: [14000, 21000, 60000],
    },
    psu: 
    {
        options: ["Gigabyte P650B 650W", "Chieftec PROTON BDF-750C 750W"],
        prices: [20000, 32000],
    }
};

function getComponentName(componentType, selectedIndex) {
    return components[componentType].options[selectedIndex];
}

function calculateTotalPrice(selections) 
{
    let total = 0;
    for (let part in selections) 
    {
        total += components[part].prices[components[part].options.indexOf(selections[part])];
    }
    return total;
}

document.getElementById('calculatePriceButton').addEventListener('click', function () {
    const selectedParts = 
    {
        cpu: getComponentName('cpu', document.getElementById('cpuSelect').value),
        gpu: getComponentName('gpu', document.getElementById('gpuSelect').value),
        ram: getComponentName('ram', document.getElementById('ramSelect').value),
        storage: getComponentName('storage', document.getElementById('storageSelect').value),
        psu: getComponentName('psu', document.getElementById('psuSelect').value)
    };

    const totalPrice = calculateTotalPrice(selectedParts);

    document.getElementById('totalPrice').innerText = `${totalPrice} Ft`;

    document.getElementById('buyButton').disabled = false;
    document.getElementById('buyButton').addEventListener('click', function () 
    {
        const selectedPartsData = 
        {
            names: selectedParts,
            prices: {},
            totalPrice: totalPrice
        };

        for (let part in selectedParts) 
        {
            selectedPartsData.prices[part] = components[part].prices[components[part].options.indexOf(selectedParts[part])];
        }

        localStorage.setItem('selectedParts', JSON.stringify(selectedPartsData));
        window.location.href = 'buy.html';
    });
});

function goBack() 
{
    window.history.back();
};

function finalize()
{
    window.location.href = 'review.html';
};

function saveReview() {
    var rating = document.getElementById('rating').value;

    if (rating) {

        var existingReviews = localStorage.getItem('reviews');

        var reviews = existingReviews ? JSON.parse(existingReviews) : [];

        reviews.push({rating});

        localStorage.setItem('reviews', JSON.stringify(reviews));

        localStorage.setItem('reviewGiven', 'true');

        document.getElementById('rating').value = '';

        displayReviews();
    } else {
        alert('Kérem adjon meg egy rendes értékelést.');
    }
}

function displayReviews() 
{
    var existingReviews = localStorage.getItem('reviews');
    var reviews = existingReviews ? JSON.parse(existingReviews) : [];
    var reviewsList = document.getElementById('reviews');

    reviewsList.innerHTML = '';

    reviews.forEach(function (review) 
    {
        var li = document.createElement('li');
        li.textContent = 'Értékelés: ' + review.rating;
        reviewsList.appendChild(li);
    });
}

displayReviews();