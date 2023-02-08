const connectButton = document.querySelector("#Connect")
const disconnectButton = document.querySelector("#Disconnect")

connectButton.addEventListener("click", function() {
    const websocketClient = new WebSocket("ws://127.0.0.1:12345/");
    if (websocketClient.readyState !== WebSocket.CLOSED) {
        document.getElementById("alert_success").hidden = false;
        document.getElementById("box_message").hidden = false;
        document.getElementById("Connect").hidden = true;
        document.getElementById("Disconnect").hidden = false;
        const messgeContainer = document.querySelector("#message_container");
        const messgeInput = document.querySelector("[name=message_input]");
        const sendButton = document.querySelector("[name=send_message]");


        websocketClient.onopen = function() {
            console.log("Client connected");
            sendButton.onclick = function() {

                websocketClient.send(messgeInput.value);
                messgeInput.value = '';
            };

            websocketClient.onmessage = function(message) {
                const newMessage = document.createElement("div");
                newMessage.innerHTML = message.data;
                messgeContainer.appendChild(newMessage);
                console.log(message.data);
            };
            websocketClient.onclose = function() {
                console.log("Closed websocket connection");
                document.getElementById("Connect").hidden = false;
                document.getElementById("Disconnect").hidden = true;

            };
        };

        disconnectButton.addEventListener("click", function() {

            document.getElementById("Connect").hidden = true;
            document.getElementById("Disconnect").hidden = true;
            document.getElementById("box_message").hidden = true;
            websocketClient.close();
            document.getElementById("alert_danger").hidden = false;
            document.getElementById("alert_success").hidden = true;
        });
    }

}, false);