const socket = io(process.env.SERVER_URL, {
    autoConnect: false
});

socket.onAny((event, ...args) => {
    console.log(event, ...args);
})