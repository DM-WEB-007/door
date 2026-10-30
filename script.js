
// WHATSAPP CONTACT FORM

document.getElementById('whatsappForm').addEventListener('submit', function(e) {

    e.preventDefault();

    const visitorName = document.getElementById('visitorName').value.trim();

    const visitorRequirement = document.getElementById('visitorRequirement').value.trim();

    // YOUR WHATSAPP NUMBER
    const whatsappNumber = "8801700000000";

    const message =
`Hello NEW KING STAR!

Visitor Name: ${visitorName}

My Requirements:
${visitorRequirement}

I am interested in your furniture products. Please contact me.

Thank you!`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

});
