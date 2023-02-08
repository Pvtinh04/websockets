import asyncio
import websockets


all_clients = []
async def send_message(message: str):
    for client in all_clients:
        await client.send(message)
async def client_connected(client_socket, path):
    print("Client connected")
    all_clients.append(client_socket)
    while True:
        new_message = await client_socket.recv()
        print("Client send: ", new_message)
        await send_message(new_message)
        
async def start_server():
    print("Started server")
    try:
        await websockets.serve(client_connected, "127.0.0.1",12345)
    except websockets.exceptions.ConnectionClosedOK as e:
        print("A client just disconnected")
    
    
if __name__ == "__main__":
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()



