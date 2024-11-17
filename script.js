// Convert Images to PDF (langsung download, tanpa margin)
async function convertImagesToPDF() {
    const { jsPDF } = window.jspdf;
    const imgInput = document.getElementById('imgInput').files;

    if (imgInput.length === 0) {
        alert('Please select at least one image!');
        return;
    }

    const pdf = new jsPDF();
    for (let i = 0; i < imgInput.length; i++) {
        const file = imgInput[i];
        const imgData = await getImageDataURL(file);

        // Mendapatkan ukuran gambar asli untuk mengubah ukuran di PDF
        const img = new Image();
        img.src = imgData;

        img.onload = function () {
            const width = img.width;
            const height = img.height;

            // Ukuran gambar sesuai dengan ukuran halaman PDF
            const pageWidth = pdf.internal.pageSize.width;
            const pageHeight = pdf.internal.pageSize.height;

            // Menambahkan gambar ke PDF (tanpa margin, menyesuaikan ukuran halaman PDF)
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);

            // Tambah halaman jika ada gambar berikutnya
            if (i < imgInput.length - 1) {
                pdf.addPage();
            }

            // Setelah semua gambar ditambahkan, simpan PDF
            if (i === imgInput.length - 1) {
                pdf.save('images-to-pdf.pdf');
            }
        }
    }
}

// Helper function untuk membaca gambar sebagai Data URL
function getImageDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Convert Text to PDF (langsung download)
function convertTextToPDF() {
    const { jsPDF } = window.jspdf;
    const textInput = document.getElementById('textInput').value;

    if (textInput.trim() === '') {
        alert('Please enter some text!');
        return;
    }

    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(textInput, 180); // Automatically splits long text
    pdf.text(lines, 10, 20);
    pdf.save('text-to-pdf.pdf');
}