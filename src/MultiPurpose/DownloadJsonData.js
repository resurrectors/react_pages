
function DownloadJsonData({ data, filename }) {

    const downloadJSON = () => {
        // Convert data to JSON string
        const jsonData = JSON.stringify(data);

        // Create a Blob object for the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'data.json'; // Set filename or default to 'data.json'

        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (


        <div>
            <button className="btn btn-primary" onClick={downloadJSON}>Save data</button>
        </div>

    );
}

export default DownloadJsonData;