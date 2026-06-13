document.addEventListener("DOMContentLoaded", function () {
    const qrText = document.querySelector(".qr-header input");
    const qrSize = document.querySelector("#sizes");
    const qrBody = document.querySelector(".qr-body");
    const generateBtn = document.querySelector("#generateBtn");
    const downloadBtn = document.querySelector("#downloadBtn");

    let qrImageUrl = "";

    generateBtn.addEventListener("click", function () {
        const text = qrText.value.trim();
        const size = qrSize.value;

        if (text === "") {
            alert("Please enter text to generate QR code");
            return;
        }

        qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

        qrBody.innerHTML = `<img src="${qrImageUrl}" alt="QR Code">`;
    });

    downloadBtn.addEventListener("click", async function () {
        if (qrImageUrl === "") {
            alert("Please generate a QR code first");
            return;
        }

        try {
            const response = await fetch(qrImageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "qr-code.png";
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            alert("Failed to download QR code");
        }
    });
});